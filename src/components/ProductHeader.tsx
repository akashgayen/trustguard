import React from 'react';
import { ShieldCheck, TrendingUp, Users, Zap } from 'lucide-react';

export const ProductHeader: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-8 w-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">TrustGuard</h1>
            </div>
            <div className="hidden md:flex items-center space-x-1 text-sm text-gray-500">
              <span>Advanced Fraud Detection System</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm">
              <TrendingUp className="h-4 w-4 text-success-500" />
              <span className="text-gray-700">Real-time Analysis</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Users className="h-4 w-4 text-primary-500" />
              <span className="text-gray-700">Live Demo</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Zap className="h-4 w-4 text-accent-500" />
              <span className="text-gray-700">Hackathon 2024</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};