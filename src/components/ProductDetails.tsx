import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, BarChart3, TrendingUp, AlertTriangle, Activity } from 'lucide-react';
import { CircularProgress } from './CircularProgress';
import AnalyticsPanel from './AnalyticsPanel';
import type { Product, TrustScore } from '../types';

interface ProductDetailsProps {
  product: Product;
  trustScore: TrustScore;
  onTrustScoreUpdate: (score: TrustScore) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ 
  product, 
  trustScore, 
  onTrustScoreUpdate 
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'text-amazon-orange fill-current'
            : i < rating
            ? 'text-amazon-orange fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success-600';
    if (score >= 60) return 'text-warning-600';
    return 'text-error-600';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-success-500 to-success-600';
    if (score >= 60) return 'from-warning-500 to-warning-600';
    return 'from-error-500 to-error-600';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="h-4 w-4 text-success-500" />;
      case 'declining':
        return <AlertTriangle className="h-4 w-4 text-error-500" />;
      default:
        return <Activity className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? 'border-primary-500 ring-2 ring-primary-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 leading-tight">
                {product.title}
              </h1>
              <p className="text-sm text-gray-600 mt-1">by {product.brand}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {product.rating}
              </span>
              <span className="text-sm text-gray-500">
                ({product.reviewCount.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-1">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                    <span className="bg-error-50 text-error-700 px-2 py-1 rounded-md text-sm font-medium">
                      -{discount}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600">
                Free shipping on orders over $35
              </p>
            </div>

            {/* Trust Score Section - Right below price */}
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border border-primary-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Trust Score</h3>
                </div>
                <button
                  onClick={() => setIsAnalyticsOpen(true)}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1 bg-white px-3 py-1 rounded-lg border border-primary-200 hover:border-primary-300 transition-colors"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>View Analytics</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Main Score */}
                <div className="text-center">
                  <div className="relative inline-block">
                    <CircularProgress
                      value={trustScore.overall}
                      size={100}
                      strokeWidth={6}
                      className={getScoreGradient(trustScore.overall)}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getScoreColor(trustScore.overall)}`}>
                          {trustScore.overall}
                        </div>
                        <div className="text-xs text-gray-500">out of 100</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm mt-2">
                    {getTrendIcon(trustScore.trend)}
                    <span className="text-gray-600 capitalize">{trustScore.trend}</span>
                  </div>
                </div>

                {/* Component Breakdown */}
                <div className="space-y-3">
                  {Object.entries(trustScore.components).map(([key, component]) => {
                    const labels = {
                      reviewAuthenticity: 'Reviews',
                      viewQuality: 'Traffic',
                      purchasePatterns: 'Purchases',
                      sellerReputation: 'Seller'
                    };
                    
                    return (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                          {labels[key as keyof typeof labels]}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className={`bg-gradient-to-r ${getScoreGradient(component.score)} h-2 rounded-full transition-all duration-1000`}
                              style={{ width: `${component.score}%` }}
                            />
                          </div>
                          <span className={`text-sm font-medium ${getScoreColor(component.score)} w-8`}>
                            {component.score}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Real-time Status */}
              <div className="flex items-center justify-center space-x-2 mt-4 pt-4 border-t border-primary-200">
                <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
                <span className="text-xs text-gray-600">
                  Real-time fraud detection active • Last updated: {new Date(trustScore.lastUpdated).toLocaleTimeString()}
                </span>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                product.inStock ? 'bg-success-500' : 'bg-error-500'
              }`} />
              <span className={`text-sm font-medium ${
                product.inStock ? 'text-success-700' : 'text-error-700'
              }`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Key Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                    Qty:
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 bg-amazon-orange hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
                <button className="p-3 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors duration-200">
                  <Heart className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-3 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors duration-200">
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm">
                <Truck className="h-4 w-4 text-primary-500" />
                <span className="text-gray-700">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="h-4 w-4 text-success-500" />
                <span className="text-gray-700">2-Year Warranty</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <RotateCcw className="h-4 w-4 text-accent-500" />
                <span className="text-gray-700">30-Day Returns</span>
              </div>
            </div>
          </div>

          {/* Seller Information */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Sold by: {product.seller.name}
                </span>
                <div className="flex items-center space-x-1">
                  {renderStars(product.seller.rating)}
                  <span className="text-xs text-gray-600 ml-1">
                    ({product.seller.rating})
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-600">Reputation Score:</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-success-500 to-success-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${product.seller.reputationScore}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-700">
                  {product.seller.reputationScore}/100
                </span>
              </div>
            </div>

            {/* Parallel Processing Status */}
            <div className="bg-gradient-to-r from-accent-50 to-warning-50 rounded-lg border border-accent-200 p-4">
              <h4 className="font-semibold text-accent-800 mb-3 flex items-center space-x-2">
                <Activity className="h-4 w-4" />
                <span>Parallel Event Processing</span>
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Product Views → Flink → ML:</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
                    <span className="text-success-700 font-medium">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Reviews → Direct ML:</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
                    <span className="text-success-700 font-medium">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Purchases → Direct ML:</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
                    <span className="text-success-700 font-medium">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Seller Activities → Direct ML:</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
                    <span className="text-success-700 font-medium">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="border-t border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Product Description
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Enhanced Analytics Panel */}
      <AnalyticsPanel 
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
        trustScore={trustScore}
      />
    </>
  );
};