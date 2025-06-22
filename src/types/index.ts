export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  features: string[];
  brand: string;
  category: string;
  inStock: boolean;
  seller: {
    id: string;
    name: string;
    rating: number;
    reputationScore: number;
  };
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  headline: string;
  content: string;
  date: string;
  verified: boolean;
  helpful: number;
  authenticityScore: number;
  isFake: boolean;
  fakeReasons: string[];
  location?: string;
}

export interface TrustScore {
  overall: number;
  components: {
    reviewAuthenticity: {
      score: number;
      weight: number;
      details: {
        totalReviews: number;
        fakeReviews: number;
        averageAuthenticity: number;
      };
    };
    viewQuality: {
      score: number;
      weight: number;
      details: {
        organicViews: number;
        botViews: number;
        viewQualityRatio: number;
      };
    };
    purchasePatterns: {
      score: number;
      weight: number;
      details: {
        totalPurchases: number;
        fraudulentPurchases: number;
        legitimacyRate: number;
      };
    };
    sellerReputation: {
      score: number;
      weight: number;
      details: {
        accountAge: number;
        totalProducts: number;
        averageRating: number;
        suspiciousActivities: number;
      };
    };
  };
  trend: 'improving' | 'stable' | 'declining';
  lastUpdated: string;
}

export interface KafkaEvent {
  event_id: string;
  timestamp: string;
  [key: string]: any;
}

export interface MLResponse {
  score: number;
  confidence: number;
  classification: string;
  indicators: string[];
  recommendation: string;
}