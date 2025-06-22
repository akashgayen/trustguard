import React, { useState } from 'react';
import { Star, ThumbsUp, Shield, AlertTriangle, Info, ChevronDown, ChevronUp } from 'lucide-react';
import type { Review } from '../types';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const [showDetails, setShowDetails] = useState(false);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'text-amazon-orange fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getAuthenticityColor = (score: number) => {
    if (score >= 80) return 'text-success-600 bg-success-50 border-success-200';
    if (score >= 60) return 'text-warning-600 bg-warning-50 border-warning-200';
    return 'text-error-600 bg-error-50 border-error-200';
  };

  const getAuthenticityLabel = (score: number) => {
    if (score >= 80) return 'Authentic';
    if (score >= 60) return 'Suspicious';
    return 'Likely Fake';
  };

  return (
    <div className={`border rounded-lg p-6 transition-all duration-200 ${
      review.isFake 
        ? 'border-error-200 bg-error-50/30' 
        : 'border-gray-200 bg-white hover:shadow-md'
    }`}>
      <div className="flex items-start space-x-4">
        {/* User Avatar */}
        <div className="flex-shrink-0">
          <img
            src={review.userAvatar}
            alt={review.userName}
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>

        {/* Review Content */}
        <div className="flex-1 space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-medium text-gray-900">{review.userName}</h4>
                {review.verified && (
                  <div className="flex items-center space-x-1 bg-success-50 text-success-700 px-2 py-1 rounded text-xs border border-success-200">
                    <Shield className="h-3 w-3" />
                    <span>Verified Purchase</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {renderStars(review.rating)}
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </span>
                {review.location && (
                  <span className="text-sm text-gray-500">• {review.location}</span>
                )}
              </div>
            </div>

            {/* Authenticity Score */}
            <div className="flex items-center space-x-2">
              <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getAuthenticityColor(review.authenticityScore)}`}>
                {getAuthenticityLabel(review.authenticityScore)} ({review.authenticityScore}%)
              </div>
              {review.isFake && (
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-error-600 hover:text-error-700 p-1"
                  title="View fake detection details"
                >
                  <Info className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Review Headline */}
          <h5 className="font-semibold text-gray-900">{review.headline}</h5>

          {/* Review Content */}
          <p className="text-gray-700 leading-relaxed">{review.content}</p>

          {/* Fake Review Details */}
          {review.isFake && showDetails && (
            <div className="bg-error-50 border border-error-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-error-600" />
                <span className="font-semibold text-error-800">Fraud Detection Details</span>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-error-700 font-medium">
                  This review was flagged as potentially fake for the following reasons:
                </p>
                <ul className="space-y-1">
                  {review.fakeReasons.map((reason, index) => (
                    <li key={index} className="text-sm text-error-600 flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-error-500 rounded-full mt-2 flex-shrink-0" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
              <ThumbsUp className="h-4 w-4" />
              <span className="text-sm">Helpful ({review.helpful})</span>
            </button>

            {review.isFake && (
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center space-x-1 text-error-600 hover:text-error-700 text-sm font-medium"
              >
                <span>{showDetails ? 'Hide' : 'Show'} Details</span>
                {showDetails ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};