import React, { useState, useRef, useEffect } from 'react';
import { Star, X } from 'lucide-react';

interface ReviewFormProps {
  onSubmit: (review: {
    rating: number;
    headline: string;
    content: string;
    typingDuration: number;
    editCount: number;
    pasteCount: number;
  }) => void;
  onCancel: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, onCancel }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [headline, setHeadline] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Tracking metrics for fraud detection
  const [metrics, setMetrics] = useState({
    startTime: Date.now(),
    editCount: 0,
    pasteCount: 0
  });

  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMetrics(prev => ({ ...prev, startTime: Date.now() }));
  }, []);

  const handleContentChange = (value: string) => {
    setContent(value);
    setMetrics(prev => ({
      ...prev,
      editCount: prev.editCount + 1
    }));
  };

  const handlePaste = () => {
    setMetrics(prev => ({
      ...prev,
      pasteCount: prev.pasteCount + 1
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0 || !headline.trim() || !content.trim()) {
      return;
    }

    setIsSubmitting(true);

    const typingDuration = Math.round((Date.now() - metrics.startTime) / 1000);

    await onSubmit({
      rating,
      headline: headline.trim(),
      content: content.trim(),
      typingDuration,
      editCount: metrics.editCount,
      pasteCount: metrics.pasteCount
    });

    setIsSubmitting(false);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const starRating = i + 1;
      const isActive = starRating <= (hoveredRating || rating);
      
      return (
        <button
          key={i}
          type="button"
          onClick={() => setRating(starRating)}
          onMouseEnter={() => setHoveredRating(starRating)}
          onMouseLeave={() => setHoveredRating(0)}
          className="p-1 transition-colors duration-150"
        >
          <Star
            className={`h-8 w-8 transition-colors duration-150 ${
              isActive
                ? 'text-amazon-orange fill-current'
                : 'text-gray-300 hover:text-gray-400'
            }`}
          />
        </button>
      );
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Write a Review</h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 p-1"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Overall Rating *
          </label>
          <div className="flex items-center space-x-1">
            {renderStars()}
            {rating > 0 && (
              <span className="ml-3 text-sm text-gray-600">
                {rating} out of 5 stars
              </span>
            )}
          </div>
        </div>

        {/* Headline */}
        <div>
          <label htmlFor="headline" className="block text-sm font-medium text-gray-700 mb-2">
            Review Headline *
          </label>
          <input
            type="text"
            id="headline"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="Summarize your experience in a few words"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            maxLength={100}
            required
          />
          <div className="mt-1 text-xs text-gray-500">
            {headline.length}/100 characters
          </div>
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Your Review *
          </label>
          <textarea
            ref={contentRef}
            id="content"
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            onPaste={handlePaste}
            placeholder="Tell others about your experience with this product. What did you like or dislike? How did you use it?"
            rows={6}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            maxLength={2000}
            required
          />
          <div className="mt-1 text-xs text-gray-500">
            {content.length}/2000 characters
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            * Required fields
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={rating === 0 || !headline.trim() || !content.trim() || isSubmitting}
              className="px-6 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors duration-200"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing...</span>
                </div>
              ) : (
                'Submit Review'
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Privacy Notice */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600">
          <strong>Privacy Notice:</strong> This review will be analyzed by our AI fraud detection system 
          to ensure authenticity. We track typing patterns and behavior to maintain review quality.
        </p>
      </div>
    </div>
  );
};