# Amazon-like Fraud Detection System

A sophisticated real-time fraud detection system for e-commerce platforms, built for hackathon demonstration. This system monitors e-commerce activities using Apache Kafka for event streaming, Apache Flink for selective stream processing, and ML models for comprehensive fraud analysis.

## 🏗️ System Architecture

### Core Components

1. **Frontend**: Amazon-inspired product page with real-time trust scoring
2. **Backend**: Event processing pipeline with Kafka and selective Flink usage  
3. **ML Integration**: External ML services for fraud detection
4. **Real-time Updates**: WebSocket-powered live trust score updates

### Data Flow Architecture

- **Product Views**: Customer views → Kafka → **Flink Processing** → ML Analysis → Database
- **Reviews**: Customer posts → Kafka → **Direct to ML** → Database → Trust Score Update
- **Purchases**: Transaction → Kafka → **Direct to ML** → Database → Trust Score Update  
- **Seller Activities**: Seller actions → Kafka → **Direct to ML** → Database → Trust Score Update

> **Key Design**: Flink is used ONLY for product view stream processing. All other events flow directly from Kafka to ML models.

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for ML service development)

### Running the Complete System

1. **Clone and Setup**
   ```bash
   git clone <repository>
   cd amazon-fraud-detection-system
   ```

2. **Start All Services**
   ```bash
   docker-compose up -d
   ```

3. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - Flink Dashboard: http://localhost:8081
   - ML Service: http://localhost:8000

### Development Mode

For frontend development:
```bash
npm install
npm run dev
```

## 📊 Features

### Real-time Fraud Detection
- **Trust Score Calculation**: Weighted algorithm combining 4 components
- **Review Authenticity**: AI analysis of review patterns and content quality
- **View Quality Analysis**: Flink-powered traffic pattern detection
- **Purchase Fraud Detection**: ML-based transaction risk assessment
- **Seller Reputation Monitoring**: Behavioral analysis and trust metrics

### Interactive Demo Scenarios
1. **Mixed Review Analysis**: Shows authentic vs fake reviews with explanations
2. **Real-time Review Submission**: Live authenticity scoring with ML analysis
3. **Trust Score Updates**: Dynamic score changes based on new data
4. **Fraud Detection Breakdown**: Detailed analytics showing detection factors

### Advanced UI Features
- **Circular Trust Score Gauges**: Animated progress indicators
- **Real-time WebSocket Updates**: Live score and review updates
- **Fraud Detection Explanations**: Detailed reasons for fake review detection
- **Analytics Dashboard**: Comprehensive fraud detection insights
- **Amazon-style Design**: Professional e-commerce interface

## 🔧 Technical Implementation

### Kafka Event Schemas

**Product View Events** (→ Flink → ML):
```json
{
  "event_id": "view_123",
  "timestamp": "2024-01-15T10:30:00Z",
  "user_id": "user_123",
  "product_id": "prod_001",
  "session_id": "session_abc",
  "view_duration_seconds": 45,
  "scroll_percentage": 75,
  "interaction_count": 3,
  "referrer_source": "organic",
  "device_type": "desktop",
  "is_returning_viewer": false
}
```

**Review Events** (→ Direct to ML):
```json
{
  "event_id": "review_456",
  "timestamp": "2024-01-15T10:35:00Z",
  "review_id": "rev_001",
  "user_id": "user_123",
  "product_id": "prod_001",
  "rating": 5,
  "headline": "Great product!",
  "review_text": "Really enjoyed this product...",
  "verified_purchase": true,
  "account_age_days": 365,
  "typing_duration_seconds": 45,
  "edit_count": 2,
  "paste_count": 0
}
```

### ML Model Responses

**Review Analysis**:
```json
{
  "authenticity_score": 85,
  "is_fake": false,
  "confidence_level": 0.92,
  "fake_indicators": [],
  "suggested_action": "approve"
}
```

**Trust Score Calculation**:
- Review Authenticity: 40% weight
- View Quality: 15% weight  
- Purchase Patterns: 25% weight
- Seller Reputation: 20% weight

## 🐳 Docker Services

| Service | Port | Description |
|---------|------|-------------|
| Frontend | 3000 | React application |
| Backend | 8080 | FastAPI server |
| ML Service | 8000 | Python ML models |
| Kafka | 9092 | Event streaming |
| Flink JobManager | 8081 | Stream processing |
| PostgreSQL | 5432 | Database |
| Redis | 6379 | Caching |
| Zookeeper | 2181 | Kafka coordination |

## 📈 Monitoring & Analytics

### Real-time Metrics
- Trust score trends over time
- Fraud detection rates by category
- Traffic quality analysis
- Review authenticity distribution

### Fraud Indicators
- Fake review detection with explanations
- Bot traffic identification
- Suspicious purchase patterns
- Seller behavior anomalies

## 🎯 Demo Scenarios

### 1. Product Page Exploration
- View the Amazon-style product page
- Observe real-time trust score updates
- Explore review authenticity indicators

### 2. Review Submission
- Submit a new review through the form
- Watch real-time ML analysis
- See authenticity score calculation

### 3. Fraud Detection Analysis
- Identify fake reviews with detailed explanations
- View trust score component breakdown
- Explore analytics dashboard

### 4. System Architecture
- Monitor Kafka event flow
- View Flink processing dashboard
- Observe ML model responses

## 🔒 Security & Privacy

- All sensitive data is anonymized
- Review analysis respects user privacy
- Fraud detection focuses on patterns, not personal data
- Secure API endpoints with proper validation

## 🚀 Production Considerations

### Scalability
- Kafka partitioning for high throughput
- Flink parallelism for stream processing
- ML model serving with load balancing
- Database sharding for large datasets

### Monitoring
- Comprehensive logging and metrics
- Real-time alerting for fraud spikes
- Performance monitoring for all components
- Data quality validation

## 📝 API Documentation

### REST Endpoints
- `POST /api/kafka/produce` - Send events to Kafka
- `POST /api/reviews` - Submit new review
- `GET /health` - Health check

### WebSocket
- `ws://localhost:8080/ws` - Real-time updates

### ML Service
- `POST /analyze/review` - Review authenticity analysis
- `POST /analyze/view-pattern` - View quality analysis
- `POST /analyze/purchase` - Purchase fraud detection
- `POST /analyze/seller` - Seller behavior analysis

## 🏆 Hackathon Highlights

This system demonstrates:
- **Real-time Processing**: Kafka + Flink + WebSockets
- **AI/ML Integration**: Multiple fraud detection models
- **Modern UI/UX**: Amazon-quality interface design
- **Scalable Architecture**: Production-ready containerized services
- **Comprehensive Analytics**: Detailed fraud detection insights

Built for hackathon demonstration with production-quality code and design.