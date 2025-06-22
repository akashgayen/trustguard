-- Fraud Detection Database Schema

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    brand VARCHAR(100),
    category VARCHAR(200),
    price DECIMAL(10,2),
    trust_score INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(200),
    account_age_days INTEGER DEFAULT 0,
    reputation_score INTEGER DEFAULT 50,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id VARCHAR(50) PRIMARY KEY,
    product_id VARCHAR(50) REFERENCES products(id),
    user_id VARCHAR(50) REFERENCES users(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    headline VARCHAR(200),
    content TEXT,
    verified_purchase BOOLEAN DEFAULT FALSE,
    authenticity_score INTEGER DEFAULT 0,
    is_fake BOOLEAN DEFAULT FALSE,
    fake_reasons TEXT[],
    helpful_count INTEGER DEFAULT 0,
    typing_duration_seconds INTEGER,
    edit_count INTEGER,
    paste_count INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product views table (for Flink processing)
CREATE TABLE IF NOT EXISTS product_views (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(50) REFERENCES products(id),
    user_id VARCHAR(50),
    session_id VARCHAR(100),
    view_duration_seconds INTEGER,
    scroll_percentage INTEGER,
    interaction_count INTEGER,
    referrer_source VARCHAR(100),
    device_type VARCHAR(50),
    is_bot BOOLEAN DEFAULT FALSE,
    quality_score INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Purchase transactions table
CREATE TABLE IF NOT EXISTS purchases (
    id VARCHAR(50) PRIMARY KEY,
    product_id VARCHAR(50) REFERENCES products(id),
    user_id VARCHAR(50) REFERENCES users(id),
    amount DECIMAL(10,2),
    quantity INTEGER,
    payment_method VARCHAR(50),
    fraud_risk_level VARCHAR(20) DEFAULT 'low',
    legitimacy_score INTEGER DEFAULT 100,
    requires_review BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seller activities table
CREATE TABLE IF NOT EXISTS seller_activities (
    id SERIAL PRIMARY KEY,
    seller_id VARCHAR(50),
    activity_type VARCHAR(100),
    product_id VARCHAR(50),
    change_details JSONB,
    risk_level VARCHAR(20) DEFAULT 'low',
    reputation_impact INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trust score history table
CREATE TABLE IF NOT EXISTS trust_score_history (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(50) REFERENCES products(id),
    overall_score INTEGER,
    review_authenticity_score INTEGER,
    view_quality_score INTEGER,
    purchase_patterns_score INTEGER,
    seller_reputation_score INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fraud indicators table
CREATE TABLE IF NOT EXISTS fraud_indicators (
    id SERIAL PRIMARY KEY,
    entity_type VARCHAR(50), -- 'review', 'purchase', 'seller', 'view'
    entity_id VARCHAR(50),
    indicator_type VARCHAR(100),
    severity VARCHAR(20),
    description TEXT,
    confidence DECIMAL(3,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ML model predictions table
CREATE TABLE IF NOT EXISTS ml_predictions (
    id SERIAL PRIMARY KEY,
    model_name VARCHAR(100),
    input_data JSONB,
    prediction JSONB,
    confidence DECIMAL(3,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_authenticity ON reviews(authenticity_score);
CREATE INDEX IF NOT EXISTS idx_product_views_product_id ON product_views(product_id);
CREATE INDEX IF NOT EXISTS idx_purchases_product_id ON purchases(product_id);
CREATE INDEX IF NOT EXISTS idx_trust_score_history_product_id ON trust_score_history(product_id);
CREATE INDEX IF NOT EXISTS idx_fraud_indicators_entity ON fraud_indicators(entity_type, entity_id);

-- Insert sample data
INSERT INTO products (id, title, brand, category, price, trust_score) VALUES
('prod_001', 'Premium Wireless Bluetooth Headphones', 'AudioTech Pro', 'Electronics > Headphones', 129.99, 78)
ON CONFLICT (id) DO NOTHING;

INSERT INTO users (id, username, email, account_age_days, reputation_score) VALUES
('user_001', 'Sarah Johnson', 'sarah.j@email.com', 1095, 95),
('user_002', 'Mike Chen', 'mike.c@email.com', 730, 88),
('user_003', 'Jennifer_Smith_2024', 'jen.fake@email.com', 5, 12),
('user_004', 'David Rodriguez', 'david.r@email.com', 450, 82),
('user_005', 'Emma Thompson', 'emma.t@email.com', 920, 91),
('user_006', 'ReviewMaster99', 'fake.reviewer@email.com', 1, 8)
ON CONFLICT (id) DO NOTHING;