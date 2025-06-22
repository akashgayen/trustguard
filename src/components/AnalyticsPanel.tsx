import React from "react";
import {
  X,
  Shield,
  TrendingUp,
  Users,
  Star,
  BarChart3,
  Activity,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { CircularProgress } from "./CircularProgress";
import type { TrustScore } from "../types";

interface AnalyticsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  trustScore: TrustScore;
}

export default function AnalyticsPanel({
  isOpen,
  onClose,
  trustScore,
}: AnalyticsPanelProps) {
  if (!isOpen) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success-600";
    if (score >= 60) return "text-warning-600";
    return "text-error-600";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return "from-success-500 to-success-600";
    if (score >= 60) return "from-warning-500 to-warning-600";
    return "from-error-500 to-error-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "from-success-50 to-success-100";
    if (score >= 60) return "from-warning-50 to-warning-100";
    return "from-error-50 to-error-100";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-secondary-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Trust Analytics Dashboard
              </h2>
              <p className="text-sm text-gray-600">
                Real-time fraud detection insights
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Overall Trust Score */}
          <div className="text-center">
            <div className="inline-block relative">
              <CircularProgress
                value={trustScore.overall}
                size={120}
                strokeWidth={8}
                className={getScoreGradient(trustScore.overall)}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div
                    className={`text-3xl font-bold ${getScoreColor(
                      trustScore.overall
                    )}`}
                  >
                    {trustScore.overall}
                  </div>
                  <div className="text-sm text-gray-500">Trust Score</div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Overall Product Trust
              </h3>
              <p className="text-gray-600">
                Based on comprehensive fraud detection analysis
              </p>
            </div>
          </div>

          {/* Component Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(trustScore.components).map(([key, component]) => {
              const labels = {
                reviewAuthenticity: {
                  name: "Review Authenticity",
                  icon: Shield,
                },
                viewQuality: { name: "Traffic Quality", icon: Activity },
                purchasePatterns: {
                  name: "Purchase Patterns",
                  icon: TrendingUp,
                },
                sellerReputation: { name: "Seller Reputation", icon: Users },
              };

              const { name, icon: Icon } = labels[key as keyof typeof labels];

              return (
                <div
                  key={key}
                  className={`bg-gradient-to-br ${getScoreBg(
                    component.score
                  )} rounded-xl p-6 border border-gray-200`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Icon
                        className={`h-5 w-5 ${getScoreColor(component.score)}`}
                      />
                      <h4 className="font-semibold text-gray-900">{name}</h4>
                    </div>
                    <div
                      className={`text-2xl font-bold ${getScoreColor(
                        component.score
                      )}`}
                    >
                      {component.score}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Weight:</span>
                      <span className="font-medium">
                        {(component.weight * 100).toFixed(0)}%
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${getScoreGradient(
                          component.score
                        )} h-2 rounded-full transition-all duration-1000`}
                        style={{ width: `${component.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Review Analytics */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-5 w-5 text-primary-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Review Analytics
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Reviews</span>
                  <span className="font-semibold text-gray-900">
                    {trustScore.components.reviewAuthenticity.details.totalReviews.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Fake Reviews Detected</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-error-600">
                      {
                        trustScore.components.reviewAuthenticity.details
                          .fakeReviews
                      }
                    </span>
                    <AlertTriangle className="h-4 w-4 text-error-500" />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Authenticity</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-success-600">
                      {
                        trustScore.components.reviewAuthenticity.details
                          .averageAuthenticity
                      }
                      %
                    </span>
                    <CheckCircle className="h-4 w-4 text-success-500" />
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Authenticity Rate</span>
                    <span className="text-gray-700">
                      {(
                        ((trustScore.components.reviewAuthenticity.details
                          .totalReviews -
                          trustScore.components.reviewAuthenticity.details
                            .fakeReviews) /
                          trustScore.components.reviewAuthenticity.details
                            .totalReviews) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-gradient-to-r from-success-500 to-success-600 h-2 rounded-full"
                      style={{
                        width: `${
                          ((trustScore.components.reviewAuthenticity.details
                            .totalReviews -
                            trustScore.components.reviewAuthenticity.details
                              .fakeReviews) /
                            trustScore.components.reviewAuthenticity.details
                              .totalReviews) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Traffic Analytics */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Activity className="h-5 w-5 text-accent-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Traffic Analytics
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Organic Views</span>
                  <span className="font-semibold text-success-600">
                    {trustScore.components.viewQuality.details.organicViews.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Bot Views Detected</span>
                  <span className="font-semibold text-error-600">
                    {trustScore.components.viewQuality.details.botViews.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Quality Ratio</span>
                  <span className="font-semibold text-primary-600">
                    {trustScore.components.viewQuality.details.viewQualityRatio}
                  </span>
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Organic Traffic Rate</span>
                    <span className="text-gray-700">
                      {(
                        (trustScore.components.viewQuality.details
                          .organicViews /
                          (trustScore.components.viewQuality.details
                            .organicViews +
                            trustScore.components.viewQuality.details
                              .botViews)) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-gradient-to-r from-accent-500 to-accent-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (trustScore.components.viewQuality.details
                            .organicViews /
                            (trustScore.components.viewQuality.details
                              .organicViews +
                              trustScore.components.viewQuality.details
                                .botViews)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase Analytics */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="h-5 w-5 text-secondary-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Purchase Analytics
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Purchases</span>
                  <span className="font-semibold text-gray-900">
                    {trustScore.components.purchasePatterns.details.totalPurchases.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Fraudulent Purchases</span>
                  <span className="font-semibold text-error-600">
                    {
                      trustScore.components.purchasePatterns.details
                        .fraudulentPurchases
                    }
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Legitimacy Rate</span>
                  <span className="font-semibold text-success-600">
                    {(
                      trustScore.components.purchasePatterns.details
                        .legitimacyRate * 100
                    ).toFixed(1)}
                    %
                  </span>
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-secondary-500 to-secondary-600 h-2 rounded-full"
                      style={{
                        width: `${
                          trustScore.components.purchasePatterns.details
                            .legitimacyRate * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Seller Analytics */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Users className="h-5 w-5 text-primary-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Seller Analytics
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Account Age (days)</span>
                  <span className="font-semibold text-gray-900">
                    {trustScore.components.sellerReputation.details.accountAge}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Products</span>
                  <span className="font-semibold text-gray-900">
                    {
                      trustScore.components.sellerReputation.details
                        .totalProducts
                    }
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-amazon-orange fill-current" />
                    <span className="font-semibold text-gray-900">
                      {
                        trustScore.components.sellerReputation.details
                          .averageRating
                      }
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Suspicious Activities</span>
                  <span className="font-semibold text-warning-600">
                    {
                      trustScore.components.sellerReputation.details
                        .suspiciousActivities
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Status */}
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border border-primary-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Real-time Monitoring Active
                  </h4>
                  <p className="text-sm text-gray-600">
                    Last updated:{" "}
                    {new Date(trustScore.lastUpdated).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Trend</div>
                <div
                  className={`font-semibold capitalize ${
                    trustScore.trend === "improving"
                      ? "text-success-600"
                      : trustScore.trend === "declining"
                      ? "text-error-600"
                      : "text-gray-600"
                  }`}
                >
                  {trustScore.trend}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
