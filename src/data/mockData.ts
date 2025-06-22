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

export const mockReviews: Review[] = [
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
    authenticityScore: 92,
    isFake: false,
    fakeReasons: [],
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
    authenticityScore: 88,
    isFake: false,
    fakeReasons: [],
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
    authenticityScore: 23,
    isFake: true,
    fakeReasons: [
      'Excessive use of superlatives',
      'Generic username pattern',
      'No verified purchase',
      'Extremely short typing duration',
      'Multiple similar reviews from same IP range'
    ],
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
    authenticityScore: 85,
    isFake: false,
    fakeReasons: [],
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
    authenticityScore: 94,
    isFake: false,
    fakeReasons: [],
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
    authenticityScore: 31,
    isFake: true,
    fakeReasons: [
      'Run-on sentence structure',
      'No punctuation usage',
      'Generic review pattern',
      'Posted within 24h of account creation',
      'Similar content to other flagged reviews'
    ],
    location: 'Unknown'
  }
];

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