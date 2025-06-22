import type { Product, Review, TrustScore } from '../types';

export const mockProduct: Product = {
  id: 'prod_001',
  title: 'Premium Wireless Bluetooth Headphones - Noise Cancelling Over-Ear Headphones with Deep Bass',
  price: 129.99,
  originalPrice: 199.99,
  rating: 4.3,
  reviewCount: 2847,
  images: [
    'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=2',
    'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=2',
    'https://images.pexels.com/photos/1649772/pexels-photo-1649772.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=2'
  ],
  description: 'Experience premium audio quality with these professional-grade wireless headphones. Featuring advanced noise cancellation technology, 30-hour battery life, and studio-quality sound reproduction.',
  features: [
    'Active Noise Cancellation Technology',
    '30-Hour Battery Life',
    'Bluetooth 5.0 Connectivity',
    'Quick Charge - 15 mins for 3 hours',
    'Premium Leather Ear Cushions',
    'Built-in Microphone for Calls'
  ],
  brand: 'AudioTech Pro',
  category: 'Electronics > Headphones',
  inStock: true,
  seller: {
    id: 'seller_001',
    name: 'AudioTech Official Store',
    rating: 4.7,
    reputationScore: 87
  }
};

// Base review data without authenticity scores - these will be calculated dynamically
export const mockReviewsBase: Omit<Review, 'authenticityScore' | 'isFake' | 'fakeReasons'>[] = [
  {
    id: 'review_001',
    productId: 'prod_001',
    userId: 'user_001',
    userName: 'Sarah Johnson',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
    rating: 5,
    headline: 'Amazing sound quality and comfort!',
    content: 'These headphones exceeded my expectations. The noise cancellation works perfectly during my daily commute, and the battery life is incredible. I\'ve been using them for 3 months now and they still feel brand new. The sound quality is pristine with deep bass and clear highs. Highly recommend for anyone looking for premium headphones.',
    date: '2024-01-15T10:30:00Z',
    verified: true,
    helpful: 47,
    location: 'New York, NY'
  },
  {
    id: 'review_002',
    productId: 'prod_001',
    userId: 'user_002',
    userName: 'Mike Chen',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
    rating: 4,
    headline: 'Great value for money',
    content: 'Good headphones overall. The noise cancellation is decent but not as good as some premium brands. Battery life is excellent though, easily lasts me the whole week. Build quality feels solid and the comfort is good for long listening sessions.',
    date: '2024-01-12T14:22:00Z',
    verified: true,
    helpful: 23,
    location: 'Los Angeles, CA'
  },
  {
    id: 'review_003',
    productId: 'prod_001',
    userId: 'user_003',
    userName: 'Jennifer_Smith_2024',
    userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
    rating: 5,
    headline: 'Best headphones ever! Amazing quality!',
    content: 'Wow these headphones are absolutely incredible! The sound is perfect and the battery lasts forever. Everyone should buy these right now! The noise cancellation is the best I have ever experienced in my entire life. Perfect product 100% recommended to everyone!',
    date: '2024-01-14T09:15:00Z',
    verified: false,
    helpful: 3,
    location: 'Unknown'
  },
  {
    id: 'review_004',
    productId: 'prod_001',
    userId: 'user_004',
    userName: 'David Rodriguez',
    userAvatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
    rating: 3,
    headline: 'Decent but not perfect',
    content: 'Mixed feelings about these headphones. The audio quality is good, especially for the price range, but I experienced some connectivity issues with my phone. The noise cancellation works well in quiet environments but struggles with sudden loud noises. Comfort is acceptable for 2-3 hour sessions.',
    date: '2024-01-10T16:45:00Z',
    verified: true,
    helpful: 15,
    location: 'Chicago, IL'
  },
  {
    id: 'review_005',
    productId: 'prod_001',
    userId: 'user_005',
    userName: 'Emma Thompson',
    userAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
    rating: 5,
    headline: 'Perfect for work and travel',
    content: 'As someone who travels frequently for work, these headphones have been a game-changer. The noise cancellation is excellent for flights, and the long battery life means I never have to worry about them dying mid-trip. The sound quality is professional-grade, perfect for both music and video calls.',
    date: '2024-01-08T11:20:00Z',
    verified: true,
    helpful: 34,
    location: 'Austin, TX'
  },
  {
    id: 'review_006',
    productId: 'prod_001',
    userId: 'user_006',
    userName: 'ReviewMaster99',
    userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
    rating: 5,
    headline: 'Excellent product fast shipping',
    content: 'Great headphones very good quality sound is amazing battery life excellent recommend to all my friends great seller fast delivery perfect packaging no damage.',
    date: '2024-01-13T08:30:00Z',
    verified: false,
    helpful: 1,
    location: 'Unknown'
  }
];

// Function to analyze review authenticity using ML service
export const analyzeReviewAuthenticity = async (review: Omit<Review, 'authenticityScore' | 'isFake' | 'fakeReasons'>): Promise<{
  authenticityScore: number;
  isFake: boolean;
  fakeReasons: string[];
}> => {
  try {
    // Calculate account age based on review patterns
    const getAccountAge = (userName: string, date: string): number => {
      const reviewDate = new Date(date);
      const now = new Date();
      const daysSinceReview = Math.floor((now.getTime() - reviewDate.getTime()) / (1000 * 60 * 60 * 24));
      
      // Simulate account age based on username patterns and review date
      if (userName.includes('_') && userName.includes('2024')) return Math.max(5, daysSinceReview + 5);
      if (userName.toLowerCase().includes('master') || userName.toLowerCase().includes('99')) return Math.max(1, daysSinceReview + 1);
      return Math.max(30, daysSinceReview + Math.floor(Math.random() * 365) + 30);
    };

    // Simulate typing behavior based on content characteristics
    const getTypingMetrics = (content: string, headline: string): {
      typingDuration: number;
      editCount: number;
      pasteCount: number;
    } => {
      const totalLength = content.length + headline.length;
      
      // Detect potential copy-paste patterns
      const hasRunOnSentences = !content.includes('.') && !content.includes('!') && !content.includes('?');
      const hasExcessiveSuperlatives = (content.toLowerCase().match(/amazing|incredible|perfect|best|worst|terrible|awful/g) || []).length > 3;
      const hasGenericPhrases = (content.toLowerCase().match(/great product|highly recommend|five stars|fast shipping/g) || []).length > 1;
      
      let typingDuration: number;
      let editCount: number;
      let pasteCount: number;
      
      if (hasRunOnSentences || hasGenericPhrases) {
        // Likely copy-pasted or bot-generated
        typingDuration = Math.max(2, Math.floor(totalLength / 15)); // Very fast typing
        editCount = Math.floor(Math.random() * 2); // Few edits
        pasteCount = Math.floor(Math.random() * 3) + 1; // Some paste operations
      } else if (hasExcessiveSuperlatives) {
        // Potentially fake but manually typed
        typingDuration = Math.max(5, Math.floor(totalLength / 8)); // Fast typing
        editCount = Math.floor(Math.random() * 5) + 1;
        pasteCount = Math.floor(Math.random() * 2);
      } else {
        // Likely authentic
        typingDuration = Math.max(30, Math.floor(totalLength / 3) + Math.floor(Math.random() * 60)); // Normal typing
        editCount = Math.floor(Math.random() * 10) + 2; // Normal editing
        pasteCount = Math.floor(Math.random() * 2); // Minimal pasting
      }
      
      return { typingDuration, editCount, pasteCount };
    };

    const accountAge = getAccountAge(review.userName, review.date);
    const typingMetrics = getTypingMetrics(review.content, review.headline);

    const mlRequest = {
      rating: review.rating,
      headline: review.headline,
      review_text: review.content,
      verified_purchase: review.verified,
      account_age_days: accountAge,
      typing_duration_seconds: typingMetrics.typingDuration,
      edit_count: typingMetrics.editCount,
      paste_count: typingMetrics.pasteCount,
      review_length_chars: review.content.length,
      contains_images: false,
      previous_reviews_count: Math.floor(Math.random() * 20) + 1
    };

    console.log(`🤖 Analyzing review "${review.headline}" with ML service...`);
    
    const response = await fetch('http://localhost:8000/analyze/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mlRequest),
      timeout: 10000
    });

    if (response.ok) {
      const analysis = await response.json();
      console.log(`✅ ML analysis completed for "${review.headline}": ${analysis.authenticity_score}% authentic`);
      
      return {
        authenticityScore: analysis.authenticity_score,
        isFake: analysis.is_fake,
        fakeReasons: analysis.fake_indicators || []
      };
    } else {
      throw new Error(`ML service returned status ${response.status}`);
    }
  } catch (error) {
    console.warn(`⚠️ ML service unavailable for review "${review.headline}", using fallback analysis:`, error);
    
    // Fallback analysis based on review characteristics
    const content = review.content.toLowerCase();
    const headline = review.headline.toLowerCase();
    const userName = review.userName.toLowerCase();
    
    let authenticityScore = 100;
    const fakeReasons: string[] = [];
    
    // Check for fake indicators
    if (!review.verified && (review.rating === 1 || review.rating === 5)) {
      authenticityScore -= 25;
      fakeReasons.push('Extreme rating without verified purchase');
    }
    
    if (userName.includes('_') && userName.includes('2024')) {
      authenticityScore -= 20;
      fakeReasons.push('Suspicious username pattern');
    }
    
    if (userName.includes('master') || userName.includes('99')) {
      authenticityScore -= 15;
      fakeReasons.push('Generic username pattern');
    }
    
    const superlatives = ['amazing', 'incredible', 'perfect', 'best ever', 'worst ever', 'terrible', 'awful'];
    const superlativeCount = superlatives.filter(word => content.includes(word) || headline.includes(word)).length;
    if (superlativeCount > 3) {
      authenticityScore -= 15;
      fakeReasons.push('Excessive use of superlatives');
    }
    
    const genericPhrases = ['great product', 'highly recommend', 'five stars', 'fast shipping', 'great seller'];
    const genericCount = genericPhrases.filter(phrase => content.includes(phrase)).length;
    if (genericCount > 2) {
      authenticityScore -= 10;
      fakeReasons.push('Generic review pattern detected');
    }
    
    if (!review.content.match(/[.!?]/)) {
      authenticityScore -= 15;
      fakeReasons.push('No punctuation usage');
    }
    
    if (review.rating === 5 && review.content.length < 50) {
      authenticityScore -= 8;
      fakeReasons.push('Very short review for maximum rating');
    }
    
    authenticityScore = Math.max(10, Math.min(100, authenticityScore));
    
    return {
      authenticityScore,
      isFake: authenticityScore < 60,
      fakeReasons
    };
  }
};

// Function to get reviews with dynamic authenticity scoring
export const getMockReviews = async (): Promise<Review[]> => {
  console.log('🔄 Analyzing mock reviews with ML service...');
  
  const reviewsWithAuthenticity = await Promise.all(
    mockReviewsBase.map(async (baseReview) => {
      const { authenticityScore, isFake, fakeReasons } = await analyzeReviewAuthenticity(baseReview);
      
      return {
        ...baseReview,
        authenticityScore,
        isFake,
        fakeReasons
      } as Review;
    })
  );
  
  console.log('✅ All mock reviews analyzed successfully');
  return reviewsWithAuthenticity;
};

// Keep the original mockReviews export for backward compatibility, but it will be empty initially
export let mockReviews: Review[] = [];

// Initialize mock reviews with ML analysis
export const initializeMockReviews = async (): Promise<Review[]> => {
  if (mockReviews.length === 0) {
    mockReviews = await getMockReviews();
  }
  return mockReviews;
};

export const mockTrustScore: TrustScore = {
  overall: 78,
  components: {
    reviewAuthenticity: {
      score: 75,
      weight: 0.4,
      details: {
        totalReviews: 2847,
        fakeReviews: 487,
        averageAuthenticity: 76.3
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
  trend: 'stable',
  lastUpdated: new Date().toISOString()
};