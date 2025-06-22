import React, { useState } from 'react';
import { Star, ThumbsUp, AlertTriangle, Shield, ChevronDown, ChevronUp, Plus, Info } from 'lucide-react';
import { ReviewCard } from './ReviewCard';
import { ReviewForm } from './ReviewForm';
import type { Review } from '../types';

interface ReviewsSectionProps {
  reviews: Review[];
  onNewReview: (review: Partial<Review>) => void;
  productId: string;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onNewReview,
  productId
}) => {
  const [showForm, setShowForm] = useState(false);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'helpful' | 'rating'>('newest');
  const [showFakeOnly, setShowFakeOnly] = useState(false);

  const renderStars = (rating: number, size: 'sm' | 'md' = 'sm') => {
    const sizeClass = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${sizeClass} ${
          i < Math.floor(rating)
            ? 'text-amazon-orange fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  // Calculate rating distribution
  const ratingDistribution = Array.from({ length: 5 }, (_, i) => {
    const rating = 5 - i;
    const count = reviews.filter(r => r.rating === rating).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { rating, count, percentage };
  });

  const fakeReviewsCount = reviews.filter(r => r.isFake).length;
  const averageAuthenticity = reviews.length > 0 
    ? reviews.reduce((sum, r) => sum + r.authenticityScore, 0) / reviews.length 
    : 0;

  // Filter and sort reviews
  let filteredReviews = reviews;
  
  if (filterRating) {
    filteredReviews = filteredReviews.filter(r => r.rating === filterRating);
  }
  
  if (showFakeOnly) {
    filteredReviews = filteredReviews.filter(r => r.isFake);
  }

  filteredReviews.sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'helpful':
        return b.helpful - a.helpful;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Customer Reviews
          </h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Review Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Rating Overview */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="text-4xl font-bold text-gray-900">
                {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length || 0).toFixed(1)}
              </div>
              <div>
                <div className="flex items-center space-x-1 mb-1">
                  {renderStars(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length || 0, 'md')}
                </div>
                <p className="text-sm text-gray-600">
                  {reviews.length} total reviews
                </p>
              </div>
            </div>

            {/* Fraud Detection Summary */}
            <div className="bg-gradient-to-r from-error-50 to-warning-50 border border-error-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-error-600" />
                <span className="font-semibold text-error-800">Fraud Detection</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Fake Reviews Detected:</span>
                  <span className="font-medium text-error-700">{fakeReviewsCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Average Authenticity:</span>
                  <span className="font-medium text-gray-900">{averageAuthenticity.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Rating Distribution</h3>
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <button
                key={rating}
                onClick={() => setFilterRating(filterRating === rating ? null : rating)}
                className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                  filterRating === rating
                    ? 'bg-primary-50 border border-primary-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <span className="text-sm font-medium text-gray-700 w-6">
                  {rating}
                </span>
                <div className="flex items-center space-x-1">
                  {renderStars(rating)}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-amazon-orange h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">
                  {count}
                </span>
              </button>
            ))}
          </div>

          {/* Filters and Sort */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort by:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="helpful">Most helpful</option>
                <option value="rating">Highest rating</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showFakeOnly}
                  onChange={(e) => setShowFakeOnly(e.target.checked)}
                  className="rounded border-gray-300 text-error-600 focus:ring-error-500"
                />
                <span className="text-sm text-gray-700">Show fake reviews only</span>
              </label>
            </div>

            {(filterRating || showFakeOnly) && (
              <button
                onClick={() => {
                  setFilterRating(null);
                  setShowFakeOnly(false);
                }}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Review Form */}
        {showForm && (
          <div className="mb-8">
            <ReviewForm
              onSubmit={(reviewData) => {
                onNewReview(reviewData);
                setShowForm(false);
              }}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-12">
              <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {showFakeOnly ? 'No fake reviews found with current filters.' : 'No reviews found with current filters.'}
              </p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          )}
        </div>

        {filteredReviews.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              Showing {filteredReviews.length} of {reviews.length} reviews
            </p>
          </div>
        )}
      </div>
    </div>
  );
};