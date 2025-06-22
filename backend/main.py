import os
import json
import asyncio
from datetime import datetime
from typing import Dict, List, Optional
from contextlib import asynccontextmanager

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import redis.asyncio as redis
from kafka import KafkaProducer, KafkaConsumer
import httpx
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Environment variables
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
KAFKA_BOOTSTRAP_SERVERS = os.getenv("KAFKA_BOOTSTRAP_SERVERS", "localhost:9092")
ML_SERVICE_URL = os.getenv("ML_SERVICE_URL", "http://localhost:8000")

# Global variables
redis_client = None
kafka_producer = None
connected_websockets: List[WebSocket] = []

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    global redis_client, kafka_producer
    
    try:
        # Initialize Redis
        redis_client = redis.from_url(REDIS_URL, decode_responses=True)
        await redis_client.ping()
        logger.info("Connected to Redis")
        
        # Initialize Kafka Producer with error handling
        try:
            kafka_producer = KafkaProducer(
                bootstrap_servers=[KAFKA_BOOTSTRAP_SERVERS],
                value_serializer=lambda v: json.dumps(v).encode('utf-8'),
                retries=3,
                retry_backoff_ms=1000
            )
            logger.info("Connected to Kafka")
        except Exception as kafka_error:
            # logger.warning(f"Kafka connection failed: {kafka_error}. Running in demo mode.")
            kafka_producer = None
        
        # Start parallel Kafka consumers for different event types (if Kafka is available)
        if kafka_producer:
            # asyncio.create_task(consume_kafka_events()) # need to remove
            logger.info("parallel Kafka consumers commented out for demo mode")
    
    except Exception as e:
        logger.error(f"Failed to initialize services: {e}")
    
    yield
    
    # Shutdown
    if redis_client:
        await redis_client.close()
    if kafka_producer:
        kafka_producer.close()

app = FastAPI(
    title="Fraud Detection API",
    description="Advanced fraud detection system with parallel processing",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models matching frontend types
class KafkaEvent(BaseModel):
    topic: str
    event: Dict

class TrustScoreComponent(BaseModel):
    score: int
    weight: float
    details: Dict

class TrustScore(BaseModel):
    overall: int
    components: Dict[str, TrustScoreComponent]
    trend: str
    lastUpdated: str

class ReviewSubmission(BaseModel):
    rating: int
    headline: str
    content: str
    typingDuration: int
    editCount: int
    pasteCount: int

class Review(BaseModel):
    id: str
    productId: str
    userId: str
    userName: str
    userAvatar: str
    rating: int
    headline: str
    content: str
    date: str
    verified: bool
    helpful: int
    authenticityScore: int
    isFake: bool
    fakeReasons: List[str]
    location: Optional[str] = None

# Health check
@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

# Get trust score for a product
@app.get("/api/trust-score/{product_id}")
async def get_trust_score(product_id: str):
    try:
        # Try to get from Redis cache first
        if redis_client:
            cached_score = await redis_client.get(f"trust_score:{product_id}")
            if cached_score:
                return json.loads(cached_score)
        
        # Generate trust score (in production, this would come from database)
        trust_score = await calculate_trust_score(product_id)
        
        # Cache the result
        if redis_client:
            await redis_client.setex(f"trust_score:{product_id}", 300, json.dumps(trust_score))
        
        return trust_score
    
    except Exception as e:
        logger.error(f"Failed to get trust score: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Kafka event producer with parallel processing
@app.post("/api/kafka/produce")
async def produce_kafka_event(event_data: KafkaEvent):
    try:
        if not kafka_producer:
            logger.warning("Kafka producer not available, running in demo mode")
            # For demo mode, just process the event directly
            asyncio.create_task(process_event_parallel(event_data.topic, event_data.event))
            return {"status": "success", "topic": event_data.topic, "processing": "demo_mode"}
        
        # Send event to Kafka for parallel processing
        kafka_producer.send(event_data.topic, event_data.event)
        kafka_producer.flush()
        
        logger.info(f"Event sent to topic {event_data.topic} for parallel processing: {event_data.event}")
        
        # Trigger parallel processing based on event type
        asyncio.create_task(process_event_parallel(event_data.topic, event_data.event))
        
        return {"status": "success", "topic": event_data.topic, "processing": "parallel"}
    
    except Exception as e:
        logger.error(f"Failed to produce Kafka event: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Enhanced review submission with ML integration
@app.post("/api/reviews")
async def submit_review(review: ReviewSubmission):
    try:
        # Call ML service for real-time review analysis
        try:
            async with httpx.AsyncClient() as client:
                ml_response = await client.post(
                    f"{ML_SERVICE_URL}/analyze/review",
                    json={
                        "rating": review.rating,
                        "headline": review.headline,
                        "review_text": review.content,
                        "typing_duration_seconds": review.typingDuration,
                        "edit_count": review.editCount,
                        "paste_count": review.pasteCount,
                        "verified_purchase": True,
                        "account_age_days": 365,
                        "review_length_chars": len(review.content),
                        "contains_images": False,
                        "previous_reviews_count": 5
                    },
                    timeout=10.0
                )
                
                if ml_response.status_code == 200:
                    analysis = ml_response.json()
                else:
                    raise Exception("ML service unavailable")
        except Exception as ml_error:
            logger.warning(f"ML service error: {ml_error}. Using fallback analysis.")
            # Fallback analysis
            analysis = {
                "authenticity_score": max(20, 100 - (review.pasteCount * 20) - (max(0, 10 - review.typingDuration) * 5)),
                "is_fake": review.pasteCount > 2 or review.typingDuration < 5,
                "fake_indicators": []
            }
            if review.pasteCount > 2:
                analysis["fake_indicators"].append("Multiple paste operations detected")
            if review.typingDuration < 5:
                analysis["fake_indicators"].append("Extremely fast typing speed")
        
        # Create review object with analysis
        new_review = Review(
            id=f"review_{int(datetime.now().timestamp())}",
            productId="prod_001",
            userId="current_user",
            userName="Current User",
            userAvatar="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2",
            rating=review.rating,
            headline=review.headline,
            content=review.content,
            authenticityScore=analysis["authenticity_score"],
            isFake=analysis["is_fake"],
            fakeReasons=analysis.get("fake_indicators", []),
            date=datetime.now().isoformat(),
            verified=True,
            helpful=0
        )
        
        # Send to Kafka for parallel processing (if available)
        review_event = {
            "event_id": f"review_{datetime.now().timestamp()}",
            "timestamp": new_review.date,
            "review_id": new_review.id,
            "user_id": new_review.userId,
            "product_id": "prod_001",
            "rating": review.rating,
            "headline": review.headline,
            "review_text": review.content,
            "authenticity_score": analysis["authenticity_score"],
            "is_fake": analysis["is_fake"]
        }
        
        if kafka_producer:
            kafka_producer.send("reviews-posted", review_event)
            kafka_producer.flush()
        
        # Broadcast new review via WebSocket
        await broadcast_websocket_message({
            "type": "new_review",
            "payload": new_review.dict()
        })
        
        # Trigger trust score recalculation
        asyncio.create_task(update_trust_score("prod_001"))
        
        return new_review.dict()
    
    except Exception as e:
        logger.error(f"Failed to submit review: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# WebSocket endpoint for real-time updates
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connected_websockets.append(websocket)
    
    try:
        while True:
            # Keep connection alive and handle ping/pong
            await websocket.receive_text()
    except WebSocketDisconnect:
        connected_websockets.remove(websocket)

# Parallel event processing function
async def process_event_parallel(topic: str, event: Dict):
    """Process events in parallel based on topic type"""
    try:
        if topic == "product-views":
            # This goes through Flink first, then to ML
            await process_view_event_via_flink(event)
        elif topic == "reviews-posted":
            # Direct to ML processing
            await process_review_event_direct(event)
        elif topic == "purchase-data":
            # Direct to ML processing
            await process_purchase_event_direct(event)
        elif topic == "seller-activities":
            # Direct to ML processing
            await process_seller_event_direct(event)
            
    except Exception as e:
        logger.error(f"Failed to process event in parallel: {e}")

async def process_view_event_via_flink(event: Dict):
    """Process view events through Flink then ML"""
    try:
        # Simulate Flink stream processing
        logger.info(f"Processing view event through Flink: {event}")
        
        # Simulate Flink aggregation and pattern detection
        flink_result = {
            "product_id": event.get("product_id"),
            "view_quality_score": 82,
            "bot_probability": 0.15,
            "traffic_pattern": "organic",
            "aggregated_metrics": {
                "avg_view_duration": 45,
                "interaction_rate": 0.67,
                "bounce_rate": 0.23
            }
        }
        
        # Send Flink result to ML for further analysis
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{ML_SERVICE_URL}/analyze/view-pattern",
                    json=flink_result,
                    timeout=5.0
                )
                
                if response.status_code == 200:
                    analysis = response.json()
                    logger.info(f"View pattern analysis completed: {analysis}")
                    
                    # Update trust score
                    await update_trust_score(event.get("product_id", "prod_001"))
        except Exception as ml_error:
            logger.warning(f"ML service unavailable for view analysis: {ml_error}")
            
    except Exception as e:
        logger.error(f"Failed to process view event via Flink: {e}")

async def process_review_event_direct(event: Dict):
    """Process review events directly through ML"""
    try:
        logger.info(f"Processing review event directly through ML: {event}")
        # Review processing is already handled in submit_review endpoint
        # This is for events coming from Kafka consumer
        
    except Exception as e:
        logger.error(f"Failed to process review event: {e}")

async def process_purchase_event_direct(event: Dict):
    """Process purchase events directly through ML"""
    try:
        logger.info(f"Processing purchase event directly through ML: {event}")
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{ML_SERVICE_URL}/analyze/purchase",
                    json=event,
                    timeout=5.0
                )
                
                if response.status_code == 200:
                    analysis = response.json()
                    logger.info(f"Purchase analysis completed: {analysis}")
                    
                    await update_trust_score(event.get("product_id", "prod_001"))
        except Exception as ml_error:
            logger.warning(f"ML service unavailable for purchase analysis: {ml_error}")
            
    except Exception as e:
        logger.error(f"Failed to process purchase event: {e}")

async def process_seller_event_direct(event: Dict):
    """Process seller events directly through ML"""
    try:
        logger.info(f"Processing seller event directly through ML: {event}")
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{ML_SERVICE_URL}/analyze/seller",
                    json=event,
                    timeout=5.0
                )
                
                if response.status_code == 200:
                    analysis = response.json()
                    logger.info(f"Seller analysis completed: {analysis}")
                    
                    await update_trust_score(event.get("product_id", "prod_001"))
        except Exception as ml_error:
            logger.warning(f"ML service unavailable for seller analysis: {ml_error}")
            
    except Exception as e:
        logger.error(f"Failed to process seller event: {e}")

async def calculate_trust_score(product_id: str) -> Dict:
    """Calculate comprehensive trust score"""
    try:
        # In production, this would aggregate data from database
        # For demo, we'll use realistic values with some randomization
        import random
        
        base_scores = {
            "reviewAuthenticity": 75 + random.randint(-5, 10),
            "viewQuality": 82 + random.randint(-3, 8),
            "purchasePatterns": 79 + random.randint(-4, 6),
            "sellerReputation": 87 + random.randint(-2, 5)
        }
        
        # Apply weights
        weights = {
            "reviewAuthenticity": 0.4,
            "viewQuality": 0.15,
            "purchasePatterns": 0.25,
            "sellerReputation": 0.2
        }
        
        # Calculate weighted average
        overall_score = sum(base_scores[key] * weights[key] for key in base_scores.keys())
        overall_score = max(10, min(100, int(overall_score)))
        
        trust_score = {
            "overall": overall_score,
            "components": {
                "reviewAuthenticity": {
                    "score": base_scores["reviewAuthenticity"],
                    "weight": weights["reviewAuthenticity"],
                    "details": {
                        "totalReviews": 2847,
                        "fakeReviews": 487,
                        "averageAuthenticity": 76.3
                    }
                },
                "viewQuality": {
                    "score": base_scores["viewQuality"],
                    "weight": weights["viewQuality"],
                    "details": {
                        "organicViews": 15420,
                        "botViews": 3280,
                        "viewQualityRatio": 0.82
                    }
                },
                "purchasePatterns": {
                    "score": base_scores["purchasePatterns"],
                    "weight": weights["purchasePatterns"],
                    "details": {
                        "totalPurchases": 1893,
                        "fraudulentPurchases": 127,
                        "legitimacyRate": 0.93
                    }
                },
                "sellerReputation": {
                    "score": base_scores["sellerReputation"],
                    "weight": weights["sellerReputation"],
                    "details": {
                        "accountAge": 1247,
                        "totalProducts": 156,
                        "averageRating": 4.7,
                        "suspiciousActivities": 3
                    }
                }
            },
            "trend": "stable",
            "lastUpdated": datetime.now().isoformat()
        }
        
        return trust_score
        
    except Exception as e:
        logger.error(f"Failed to calculate trust score: {e}")
        raise

async def update_trust_score(product_id: str):
    """Calculate and broadcast updated trust score"""
    try:
        # Recalculate trust score
        new_score = await calculate_trust_score(product_id)
        
        # Cache the score
        if redis_client:
            await redis_client.setex(f"trust_score:{product_id}", 300, json.dumps(new_score))
        
        # Broadcast via WebSocket
        await broadcast_websocket_message({
            "type": "trust_score_update",
            "payload": new_score
        })
        
        logger.info(f"Trust score updated for product {product_id}: {new_score['overall']}")
        
    except Exception as e:
        logger.error(f"Failed to update trust score: {e}")

async def broadcast_websocket_message(message: Dict):
    """Broadcast message to all connected WebSocket clients"""
    if connected_websockets:
        message_str = json.dumps(message)
        for websocket in connected_websockets.copy():
            try:
                await websocket.send_text(message_str)
            except:
                connected_websockets.remove(websocket)

async def consume_kafka_events():
    """Background task to consume Kafka events in parallel"""
    try:
        # Create multiple consumers for parallel processing
        consumers = {
            'reviews': KafkaConsumer(
                'reviews-posted',
                bootstrap_servers=[KAFKA_BOOTSTRAP_SERVERS],
                value_deserializer=lambda m: json.loads(m.decode('utf-8')),
                group_id='fraud-detection-reviews'
            ),
            'views': KafkaConsumer(
                'product-views',
                bootstrap_servers=[KAFKA_BOOTSTRAP_SERVERS],
                value_deserializer=lambda m: json.loads(m.decode('utf-8')),
                group_id='fraud-detection-views'
            ),
            'purchases': KafkaConsumer(
                'purchase-data',
                bootstrap_servers=[KAFKA_BOOTSTRAP_SERVERS],
                value_deserializer=lambda m: json.loads(m.decode('utf-8')),
                group_id='fraud-detection-purchases'
            ),
            'sellers': KafkaConsumer(
                'seller-activities',
                bootstrap_servers=[KAFKA_BOOTSTRAP_SERVERS],
                value_deserializer=lambda m: json.loads(m.decode('utf-8')),
                group_id='fraud-detection-sellers'
            )
        }
        
        logger.info("Started parallel Kafka consumers")
        
        # Process each consumer in parallel
        async def process_consumer(name, consumer):
            for message in consumer:
                topic = message.topic
                event = message.value
                logger.info(f"[{name}] Consumed event from topic {topic}: {event}")
                await process_event_parallel(topic, event)
        
        # Start all consumers in parallel
        tasks = [
            asyncio.create_task(process_consumer(name, consumer))
            for name, consumer in consumers.items()
        ]
        
        await asyncio.gather(*tasks)
                
    except Exception as e:
        logger.error(f"Kafka consumer error: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)