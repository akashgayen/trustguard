import React, { useState, useEffect } from 'react';
// import { ProductHeader } from './components/ProductHeader';
import { ProductDetails } from './ProductDetails';
import { ReviewsSection } from './ReviewsSection';
import { useWebSocket } from '../hooks/useWebSocket';
import { useKafkaProducer } from '../hooks/useKafkaProducer';
import { mockProduct, initializeMockReviews } from '../data/mockData';
import type { Product, Review, TrustScore } from '../types';

function ProductPage() {
  const [product] = useState<Product>(mockProduct);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [trustScore, setTrustScore] = useState<TrustScore | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Initializing fraud detection system...');

  const { sendEvent } = useKafkaProducer();
  const { lastMessage, connectionStatus } = useWebSocket('ws://localhost:8080/ws');

  // Initialize reviews with ML analysis and fetch trust score
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoadingMessage('Analyzing existing reviews with ML service...');
        
        // Initialize mock reviews with ML analysis
        const analyzedReviews = await initializeMockReviews();
        setReviews(analyzedReviews);
        
        setLoadingMessage('Fetching trust score from backend...');
        
        // Fetch initial trust score from backend
        try {
          const response = await fetch(`http://localhost:8080/api/trust-score/${product.id}`);
          if (response.ok) {
            const data = await response.json();
            setTrustScore(data);
          } else {
            throw new Error('Failed to fetch trust score');
          }
        } catch (error) {
          console.error('Failed to fetch trust score:', error);
          // For demo, we'll calculate a basic trust score based on analyzed reviews
          const fakeReviewsCount = analyzedReviews.filter(r => r.isFake).length;
          const averageAuthenticity = analyzedReviews.length > 0 
            ? analyzedReviews.reduce((sum, r) => sum + r.authenticityScore, 0) / analyzedReviews.length 
            : 75;
          
          const reviewAuthenticityScore = Math.max(20, Math.min(100, averageAuthenticity));
          const overallScore = Math.round(
            reviewAuthenticityScore * 0.4 + // 40% weight for reviews
            82 * 0.15 + // 15% weight for view quality
            79 * 0.25 + // 25% weight for purchase patterns  
            87 * 0.2    // 20% weight for seller reputation
          );
          
          setTrustScore({
            overall: overallScore,
            components: {
              reviewAuthenticity: {
                score: reviewAuthenticityScore,
                weight: 0.4,
                details: {
                  totalReviews: analyzedReviews.length,
                  fakeReviews: fakeReviewsCount,
                  averageAuthenticity: Math.round(averageAuthenticity * 10) / 10
                }
              },
              viewQuality: {
                score: 82,
                weight: 0.15,
                details: {
                  organicViews: 15420,
                  botViews: 3280,
                  viewQualityRatio: 0.82
                }
              },
              purchasePatterns: {
                score: 79,
                weight: 0.25,
                details: {
                  totalPurchases: 1893,
                  fraudulentPurchases: 127,
                  legitimacyRate: 0.93
                }
              },
              sellerReputation: {
                score: 87,
                weight: 0.2,
                details: {
                  accountAge: 1247,
                  totalProducts: 156,
                  averageRating: 4.7,
                  suspiciousActivities: 3
                }
              }
            },
            trend: overallScore > 75 ? 'stable' : overallScore > 60 ? 'stable' : 'declining',
            lastUpdated: new Date().toISOString()
          });
        }
        
        setLoadingMessage('System ready!');
        
      } catch (error) {
        console.error('Failed to initialize data:', error);
        setLoadingMessage('Failed to initialize system. Please refresh the page.');
      } finally {
        setTimeout(() => setLoading(false), 500); // Small delay to show completion message
      }
    };

    initializeData();
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
    if (!loading && trustScore) {
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
    }
  }, [product.id, sendEvent, loading, trustScore]);

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
        authenticityScore: Math.floor(Math.random() * 30) + 70,
        isFake: false,
        fakeReasons: []
      };
      
      setReviews(prev => [newReview, ...prev]);
    }
  };

  if (loading || !trustScore) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium mb-2">{loadingMessage}</p>
          <div className="space-y-1 text-sm text-gray-500">
            <p>WebSocket: {connectionStatus}</p>
            <p>ML Service: Analyzing review authenticity...</p>
            <p>Backend: Calculating trust scores...</p>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700">
              <strong>Real-time Analysis:</strong> Each review is being analyzed by our ML fraud detection system 
              to determine authenticity scores based on content patterns, typing behavior, and user characteristics.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <ProductHeader /> */}
      
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

export default ProductPage;