import React, { useState, useEffect } from 'react';
import { ProductHeader } from './components/ProductHeader';
import { ProductDetails } from './components/ProductDetails';
import { ReviewsSection } from './components/ReviewsSection';
import { useWebSocket } from './hooks/useWebSocket';
import { useKafkaProducer } from './hooks/useKafkaProducer';
import { mockProduct, mockReviews } from './data/mockData';
import type { Product, Review, TrustScore } from './types';

function App() {
  const [product] = useState<Product>(mockProduct);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [trustScore, setTrustScore] = useState<TrustScore | null>(null);
  const [loading, setLoading] = useState(true);

  const { sendEvent } = useKafkaProducer();
  const { lastMessage, connectionStatus } = useWebSocket('ws://localhost:8080/ws');

  // Fetch initial trust score from backend
  useEffect(() => {
    const fetchTrustScore = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/trust-score/${product.id}`);
        if (response.ok) {
          const data = await response.json();
          setTrustScore(data);
        }
      } catch (error) {
        console.error('Failed to fetch trust score:', error);
        // Fallback to mock data for demo
        // setTrustScore({
        //   overall: 78,
        //   components: {
        //     reviewAuthenticity: { score: 75, weight: 0.4, details: { totalReviews: 2847, fakeReviews: 487, averageAuthenticity: 76.3 } },
        //     viewQuality: { score: 82, weight: 0.15, details: { organicViews: 15420, botViews: 3280, viewQualityRatio: 0.82 } },
        //     purchasePatterns: { score: 79, weight: 0.25, details: { totalPurchases: 1893, fraudulentPurchases: 127, legitimacyRate: 0.93 } },
        //     sellerReputation: { score: 87, weight: 0.2, details: { accountAge: 1247, totalProducts: 156, averageRating: 4.7, suspiciousActivities: 3 } }
        //   },
        //   trend: 'stable',
        //   lastUpdated: new Date().toISOString()
        // });
      } finally {
        setLoading(false);
      }
    };

    fetchTrustScore();
  }, [product.id]);

  // Handle WebSocket updates
  useEffect(() => {
    if (lastMessage) {
      try {
        const data = JSON.parse(lastMessage);
        if (data.type === 'trust_score_update') {
          setTrustScore(data.payload);
        } else if (data.type === 'new_review') {
          setReviews(prev => [data.payload, ...prev]);
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    }
  }, [lastMessage]);

  // Send product view event on mount - triggers parallel processing
  useEffect(() => {
    const viewEvent = {
      event_id: `view_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      user_id: 'user_123',
      product_id: product.id,
      session_id: 'session_abc',
      view_duration_seconds: 0,
      scroll_percentage: 0,
      interaction_count: 0,
      referrer_source: 'organic',
      device_type: 'desktop',
      is_returning_viewer: false
    };

    // This triggers parallel processing: Kafka → Flink → ML
    sendEvent('product-views', viewEvent);
  }, [product.id, sendEvent]);

  type ReviewInput = Partial<Review> & {
    typingDuration?: number;
    editCount?: number;
    pasteCount?: number;
  };

  const handleNewReview = async (reviewData: ReviewInput) => {
    try {
      // Submit review to backend for ML analysis
      const response = await fetch('http://localhost:8080/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: reviewData.rating,
          headline: reviewData.headline,
          content: reviewData.content,
          typingDuration: reviewData.typingDuration || 45,
          editCount: reviewData.editCount || 2,
          pasteCount: reviewData.pasteCount || 0
        })
      });

      if (response.ok) {
        const newReview = await response.json();
        setReviews(prev => [newReview, ...prev]);
      } else {
        throw new Error('Failed to submit review');
      }
    } catch (error) {
      console.error('Failed to submit review:', error);
      
      // Fallback for demo
      const newReview: Review = {
        id: `review_${Date.now()}`,
        productId: product.id,
        userId: 'current_user',
        userName: 'Current User',
        userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
        rating: reviewData.rating || 5,
        headline: reviewData.headline || '',
        content: reviewData.content || '',
        date: new Date().toISOString(),
        verified: true,
        helpful: 0,
        authenticityScore: Math.floor(Math.random() * 30) + 70, //to be changed
        isFake: false,
        fakeReasons: []
      };
      
      setReviews(prev => [newReview, ...prev]);
    }
  };

  if (loading || !trustScore) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading fraud detection system...</p>
          <p className="text-sm text-gray-500 mt-2">WebSocket: {connectionStatus}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Product Details with integrated Trust Score */}
          <ProductDetails 
            product={product} 
            trustScore={trustScore}
            onTrustScoreUpdate={setTrustScore}
          />
          
          {/* Reviews Section */}
          <ReviewsSection 
            reviews={reviews} 
            onNewReview={handleNewReview}
            productId={product.id}
          />
        </div>
      </div>
    </div>
  );
}

export default App;