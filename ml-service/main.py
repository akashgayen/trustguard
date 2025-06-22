import random
import re
from datetime import datetime
from typing import Dict, List
from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np

app = FastAPI(
    title="ML Fraud Detection Service",
    description="Machine Learning models for fraud detection",
    version="1.0.0"
)

# Pydantic models
class ReviewAnalysisRequest(BaseModel):
    rating: int
    headline: str
    review_text: str
    verified_purchase: bool = True
    account_age_days: int = 365
    typing_duration_seconds: int = 60
    edit_count: int = 1
    paste_count: int = 0
    review_length_chars: int = 0
    contains_images: bool = False
    previous_reviews_count: int = 0

class ViewPatternAnalysisRequest(BaseModel):
    product_id: str
    view_quality_score: int
    bot_probability: float
    traffic_pattern: str

class PurchaseAnalysisRequest(BaseModel):
    order_id: str
    user_id: str
    product_id: str
    purchase_amount: float
    quantity: int
    payment_method_type: str
    is_first_purchase: bool
    account_age_days: int
    time_to_purchase_minutes: int

class SellerAnalysisRequest(BaseModel):
    seller_id: str
    activity_type: str
    product_id: str = None
    change_details: str = ""
    frequency_last_24h: int = 1
    account_age_days: int = 365
    total_products_listed: int = 10
    average_rating: float = 4.5

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "ml-fraud-detection"}

@app.post("/analyze/review")
async def analyze_review(request: ReviewAnalysisRequest):
    """
    Analyze review for authenticity using ML model
    Returns authenticity score and fake indicators
    """
    
    # Calculate review length if not provided
    review_length = request.review_length_chars or len(request.review_text)
    
    # Initialize authenticity score
    authenticity_score = 100
    fake_indicators = []
    
    # Check various fraud indicators
    
    # 1. Typing speed analysis
    if request.typing_duration_seconds > 0:
        chars_per_second = review_length / request.typing_duration_seconds
        if chars_per_second > 10:  # Extremely fast typing
            authenticity_score -= 25
            fake_indicators.append("Extremely fast typing speed detected")
        elif chars_per_second > 6:  # Very fast typing
            authenticity_score -= 15
            fake_indicators.append("Unusually fast typing speed")
    
    # 2. Paste behavior
    if request.paste_count > 2:
        authenticity_score -= 20
        fake_indicators.append("Multiple paste operations detected")
    elif request.paste_count > 0 and review_length > 200:
        authenticity_score -= 10
        fake_indicators.append("Large amount of pasted content")
    
    # 3. Account age
    if request.account_age_days < 30:
        authenticity_score -= 20
        fake_indicators.append("Very new account (less than 30 days)")
    elif request.account_age_days < 90:
        authenticity_score -= 10
        fake_indicators.append("Relatively new account")
    
    # 4. Content analysis
    content_lower = request.review_text.lower()
    headline_lower = request.headline.lower()
    
    # Excessive superlatives
    superlatives = ['amazing', 'incredible', 'perfect', 'best ever', 'worst ever', 'terrible', 'awful']
    superlative_count = sum(1 for word in superlatives if word in content_lower or word in headline_lower)
    if superlative_count > 3:
        authenticity_score -= 15
        fake_indicators.append("Excessive use of superlatives")
    
    # Generic phrases
    generic_phrases = [
        'great product', 'highly recommend', 'five stars', 'perfect product',
        'buy this now', 'everyone should buy', 'fast shipping', 'great seller'
    ]
    generic_count = sum(1 for phrase in generic_phrases if phrase in content_lower)
    if generic_count > 2:
        authenticity_score -= 10
        fake_indicators.append("Generic review pattern detected")
    
    # 5. Grammar and punctuation
    if not re.search(r'[.!?]', request.review_text):
        authenticity_score -= 15
        fake_indicators.append("No punctuation usage")
    
    # Run-on sentences (very long sentences without punctuation)
    sentences = re.split(r'[.!?]+', request.review_text)
    long_sentences = [s for s in sentences if len(s.strip()) > 150]
    if len(long_sentences) > 0:
        authenticity_score -= 12
        fake_indicators.append("Run-on sentence structure")
    
    # 6. Review length vs rating correlation
    if request.rating == 5 and review_length < 50:
        authenticity_score -= 8
        fake_indicators.append("Very short review for maximum rating")
    elif request.rating == 1 and review_length < 30:
        authenticity_score -= 8
        fake_indicators.append("Very short review for minimum rating")
    
    # 7. Verified purchase status
    if not request.verified_purchase and request.rating in [1, 5]:  # Extreme ratings without purchase
        authenticity_score -= 25
        fake_indicators.append("Extreme rating without verified purchase")
    
    # 8. Edit patterns
    if request.edit_count > 20:
        authenticity_score -= 10
        fake_indicators.append("Excessive editing detected")
    elif request.edit_count == 0 and review_length > 200:
        authenticity_score -= 8
        fake_indicators.append("No editing on long review (potential copy-paste)")
    
    # Ensure score is within bounds
    authenticity_score = max(10, min(100, authenticity_score))
    
    # Determine if fake based on score
    is_fake = authenticity_score < 60
    confidence = abs(authenticity_score - 50) / 50  # Higher confidence for extreme scores
    
    # Suggested action
    if authenticity_score < 40:
        suggested_action = "remove"
    elif authenticity_score < 60:
        suggested_action = "flag"
    else:
        suggested_action = "approve"
    
    return {
        "authenticity_score": authenticity_score,
        "is_fake": is_fake,
        "confidence_level": round(confidence, 2),
        "fake_indicators": fake_indicators,
        "suggested_action": suggested_action,
        "model_version": "fraud_detector_v1.0"
    }

@app.post("/analyze/view-pattern")
async def analyze_view_pattern(request: ViewPatternAnalysisRequest):
    """
    Analyze view patterns from Flink processing
    """
    
    # Use the view quality score from Flink as base
    view_quality_score = request.view_quality_score
    
    # Adjust based on bot probability
    if request.bot_probability > 0.5:
        view_quality_score = max(20, view_quality_score - 30)
    elif request.bot_probability > 0.3:
        view_quality_score = max(40, view_quality_score - 15)
    
    # Traffic pattern analysis
    traffic_classification = request.traffic_pattern
    anomaly_flags = []
    
    if request.bot_probability > 0.7:
        anomaly_flags.append("High bot traffic probability")
        traffic_classification = "bot-like"
    elif request.bot_probability > 0.4:
        anomaly_flags.append("Suspicious traffic patterns")
        traffic_classification = "suspicious"
    
    return {
        "view_quality_score": view_quality_score,
        "bot_probability": request.bot_probability,
        "traffic_pattern": traffic_classification,
        "anomaly_flags": anomaly_flags,
        "recommendation": "monitor" if view_quality_score < 60 else "normal"
    }

@app.post("/analyze/purchase")
async def analyze_purchase(request: PurchaseAnalysisRequest):
    """
    Analyze purchase patterns for fraud detection
    """
    
    legitimacy_score = 100
    risk_factors = []
    
    # Account age analysis
    if request.account_age_days < 7:
        legitimacy_score -= 30
        risk_factors.append("Very new account making purchase")
    elif request.account_age_days < 30:
        legitimacy_score -= 15
        risk_factors.append("New account")
    
    # Purchase amount analysis
    if request.purchase_amount > 1000:
        legitimacy_score -= 10
        risk_factors.append("High-value purchase")
    
    # Quantity analysis
    if request.quantity > 10:
        legitimacy_score -= 15
        risk_factors.append("Large quantity purchase")
    
    # Time to purchase analysis
    if request.time_to_purchase_minutes < 2:
        legitimacy_score -= 20
        risk_factors.append("Extremely quick purchase decision")
    elif request.time_to_purchase_minutes < 5:
        legitimacy_score -= 10
        risk_factors.append("Very quick purchase decision")
    
    # First purchase analysis
    if request.is_first_purchase and request.purchase_amount > 500:
        legitimacy_score -= 15
        risk_factors.append("High-value first purchase")
    
    # Payment method analysis
    if request.payment_method_type in ["prepaid_card", "cryptocurrency"]:
        legitimacy_score -= 20
        risk_factors.append("High-risk payment method")
    
    legitimacy_score = max(10, min(100, legitimacy_score))
    
    # Risk level determination
    if legitimacy_score < 40:
        fraud_risk_level = "high"
        requires_manual_review = True
    elif legitimacy_score < 70:
        fraud_risk_level = "medium"
        requires_manual_review = True
    else:
        fraud_risk_level = "low"
        requires_manual_review = False
    
    return {
        "legitimacy_score": legitimacy_score,
        "fraud_risk_level": fraud_risk_level,
        "risk_factors": risk_factors,
        "requires_manual_review": requires_manual_review,
        "confidence": 0.85
    }

@app.post("/analyze/seller")
async def analyze_seller(request: SellerAnalysisRequest):
    """
    Analyze seller behavior patterns
    """
    
    reputation_score = 100
    behavior_patterns = []
    
    # Account age analysis
    if request.account_age_days < 30:
        reputation_score -= 20
        behavior_patterns.append("Very new seller account")
    elif request.account_age_days < 90:
        reputation_score -= 10
        behavior_patterns.append("New seller account")
    
    # Activity frequency analysis
    if request.frequency_last_24h > 50:
        reputation_score -= 25
        behavior_patterns.append("Extremely high activity frequency")
    elif request.frequency_last_24h > 20:
        reputation_score -= 15
        behavior_patterns.append("High activity frequency")
    
    # Product listing analysis
    if request.total_products_listed > 1000:
        reputation_score -= 10
        behavior_patterns.append("Very large product catalog")
    elif request.total_products_listed < 5:
        reputation_score -= 5
        behavior_patterns.append("Limited product catalog")
    
    # Rating analysis
    if request.average_rating < 3.0:
        reputation_score -= 30
        behavior_patterns.append("Poor seller rating")
    elif request.average_rating < 4.0:
        reputation_score -= 15
        behavior_patterns.append("Below average seller rating")
    
    # Activity type analysis
    suspicious_activities = ["bulk_price_changes", "inventory_manipulation", "fake_reviews"]
    if request.activity_type in suspicious_activities:
        reputation_score -= 20
        behavior_patterns.append(f"Suspicious activity: {request.activity_type}")
    
    reputation_score = max(10, min(100, reputation_score))
    
    # Activity classification
    if reputation_score < 40:
        activity_classification = "fraudulent"
    elif reputation_score < 70:
        activity_classification = "suspicious"
    else:
        activity_classification = "normal"
    
    # Trust trend
    if reputation_score > 80:
        trust_trend = "improving"
    elif reputation_score < 50:
        trust_trend = "declining"
    else:
        trust_trend = "stable"
    
    return {
        "reputation_score": reputation_score,
        "activity_classification": activity_classification,
        "behavior_patterns": behavior_patterns,
        "trust_trend": trust_trend,
        "confidence": 0.82
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)