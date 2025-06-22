import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MainPart: React.FC = () => {
  return (
    <main className="relative bg-gradient-to-b from-gray-100 to-white min-h-screen">
      {/* Hero Section / Main Banner */}
      <div className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden mb-4">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop"
          alt="Shop the latest deals"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center justify-between p-4">
          <button
            className="bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-full text-white hover:bg-white/30 transition-all duration-300 shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
          </button>
          <button
            className="bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-full text-white hover:bg-white/30 transition-all duration-300 shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>
        <div className="absolute bottom-4 left-4 right-4 sm:left-8 sm:right-auto sm:max-w-md text-white">
          <div className="bg-black/60 backdrop-blur-sm p-4 sm:p-6 rounded-lg">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">Discover Amazing Deals</h2>
            <p className="text-sm sm:text-base mb-2">Up to 70% off on electronics</p>
            <div className="flex items-center gap-2 text-lg sm:text-xl font-bold">
              <span className="line-through text-gray-300">₹45,999</span>
              <span className="text-orange-400">₹13,999</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* First Row - 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Card 1: Electronics */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-6 group">
            <h2 className="text-base sm:text-lg font-bold mb-4 text-gray-800">Top Electronics</h2>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
              <div className="relative overflow-hidden rounded-md group/item">
                <img
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=150&h=150&fit=crop"
                  alt="Laptop"
                  className="w-full h-20 sm:h-24 object-cover group-hover/item:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="relative overflow-hidden rounded-md group/item">
                <img
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&h=150&fit=crop"
                  alt="Smartphone"
                  className="w-full h-20 sm:h-24 object-cover group-hover/item:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="relative overflow-hidden rounded-md group/item">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop"
                  alt="Headphones"
                  className="w-full h-20 sm:h-24 object-cover group-hover/item:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="relative overflow-hidden rounded-md group/item">
                <img
                  src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=150&h=150&fit=crop"
                  alt="Camera"
                  className="w-full h-20 sm:h-24 object-cover group-hover/item:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline">
              See all deals
            </a>
          </div>

          {/* Card 2: Fashion */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-6 group">
            <h2 className="text-base sm:text-lg font-bold mb-4 text-gray-800">Fashion Essentials</h2>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
              <div className="text-center">
                <div className="relative overflow-hidden rounded-md group/item mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=150&h=120&fit=crop"
                    alt="Men's Fashion"
                    className="w-full h-16 sm:h-20 object-cover group-hover/item:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-600">Men's Fashion</span>
              </div>
              <div className="text-center">
                <div className="relative overflow-hidden rounded-md group/item mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=150&h=120&fit=crop"
                    alt="Women's Fashion"
                    className="w-full h-16 sm:h-20 object-cover group-hover/item:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-600">Women's Fashion</span>
              </div>
              <div className="text-center">
                <div className="relative overflow-hidden rounded-md group/item mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=150&h=120&fit=crop"
                    alt="Shoes"
                    className="w-full h-16 sm:h-20 object-cover group-hover/item:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-600">Footwear</span>
              </div>
              <div className="text-center">
                <div className="relative overflow-hidden rounded-md group/item mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=150&h=120&fit=crop"
                    alt="Accessories"
                    className="w-full h-16 sm:h-20 object-cover group-hover/item:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-600">Accessories</span>
              </div>
            </div>
            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline">
              Explore fashion
            </a>
          </div>

          {/* Card 3: Home & Living */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-6 group">
            <h2 className="text-base sm:text-lg font-bold mb-4 text-gray-800">Home & Living</h2>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
              <div className="text-center">
                <div className="relative overflow-hidden rounded-md group/item mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=120&fit=crop"
                    alt="Furniture"
                    className="w-full h-16 sm:h-20 object-cover group-hover/item:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-600">Furniture</span>
              </div>
              <div className="text-center">
                <div className="relative overflow-hidden rounded-md group/item mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=150&h=120&fit=crop"
                    alt="Home Decor"
                    className="w-full h-16 sm:h-20 object-cover group-hover/item:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-600">Home Decor</span>
              </div>
              <div className="text-center">
                <div className="relative overflow-hidden rounded-md group/item mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=150&h=120&fit=crop"
                    alt="Kitchen"
                    className="w-full h-16 sm:h-20 object-cover group-hover/item:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-600">Kitchen</span>
              </div>
              <div className="text-center">
                <div className="relative overflow-hidden rounded-md group/item mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=150&h=120&fit=crop"
                    alt="Storage"
                    className="w-full h-16 sm:h-20 object-cover group-hover/item:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-600">Storage</span>
              </div>
            </div>
            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline">
              Shop home
            </a>
          </div>

          {/* Card 4: Special Offer */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-6 text-white">
            <h2 className="text-base sm:text-lg font-bold mb-2">Prime Members</h2>
            <p className="text-sm mb-4 opacity-90">Get exclusive deals</p>
            <div className="relative mb-4">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=100&fit=crop"
                alt="Prime Benefits"
                className="w-full h-20 sm:h-24 object-cover rounded-md"
              />
            </div>
            <a href="#" className="text-white hover:text-orange-200 text-sm font-medium hover:underline">
              Join Prime
            </a>
          </div>
        </div>

        {/* Second Row - 3 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Footwear Section */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-bold mb-4 text-gray-800">Up to 60% off | Footwear</h2>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
              <div className="text-center">
                <div className="relative overflow-hidden rounded-md group/item mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=120&fit=crop"
                    alt="Sports Shoes"
                    className="w-full h-16 sm:h-20 object-cover group-hover/item:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-600">Sports Shoes</span>
              </div>
              <div className="text-center">
                <div className="relative overflow-hidden rounded-md group/item mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=150&h=120&fit=crop"
                    alt="Casual Shoes"
                    className="w-full h-16 sm:h-20 object-cover group-hover/item:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-600">Casual Shoes</span>
              </div>
              <div className="text-center">
                <div className="relative overflow-hidden rounded-md group/item mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=150&h=120&fit=crop"
                    alt="Formal Shoes"
                    className="w-full h-16 sm:h-20 object-cover group-hover/item:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-600">Formal Shoes</span>
              </div>
              <div className="text-center">
                <div className="relative overflow-hidden rounded-md group/item mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=150&h=120&fit=crop"
                    alt="Sandals"
                    className="w-full h-16 sm:h-20 object-cover group-hover/item:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-600">Sandals</span>
              </div>
            </div>
            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline">
              See all offers
            </a>
          </div>

          {/* Headphones Section */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-bold mb-4 text-gray-800">Up to 75% off | Audio</h2>
            <div className="relative mb-4 group/main">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop"
                alt="Premium Headphones"
                className="w-full h-32 sm:h-40 object-cover rounded-md group-hover/main:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                75% OFF
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-bold text-gray-800">Premium Audio</span>
              <div className="text-right">
                <span className="line-through text-gray-400 text-sm">₹9,999</span>
                <span className="text-lg font-bold text-green-600 ml-2">₹2,499</span>
              </div>
            </div>
            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline">
              Shop Now
            </a>
          </div>

          {/* Mobile Accessories */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-bold mb-4 text-gray-800">Mobile Accessories</h2>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
              <div className="text-center">
                <div className="relative overflow-hidden rounded-md group/item mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=150&h=120&fit=crop"
                    alt="Phone Cases"
                    className="w-full h-16 sm:h-20 object-cover group-hover/item:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-600">Phone Cases</span>
              </div>
              <div className="text-center">
                <div className="relative overflow-hidden rounded-md group/item mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1609712725935-dc9e2bf4ca4a?w=150&h=120&fit=crop"
                    alt="Chargers"
                    className="w-full h-16 sm:h-20 object-cover group-hover/item:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-600">Chargers</span>
              </div>
              <div className="text-center">
                <div className="relative overflow-hidden rounded-md group/item mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=120&fit=crop"
                    alt="Power Banks"
                    className="w-full h-16 sm:h-20 object-cover group-hover/item:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-600">Power Banks</span>
              </div>
              <div className="text-center">
                <div className="relative overflow-hidden rounded-md group/item mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=150&h=120&fit=crop"
                    alt="Wireless Earbuds"
                    className="w-full h-16 sm:h-20 object-cover group-hover/item:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-600">Earbuds</span>
              </div>
            </div>
            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline">
              See all offers
            </a>
          </div>
        </div>

        {/* Third Row - 2 Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Home Appliances */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-bold mb-4 text-gray-800">Home Appliances | Up to 55% off</h2>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
              <div className="text-center">
                <div className="relative overflow-hidden rounded-md group/item mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=150&h=120&fit=crop"
                    alt="Air Conditioner"
                    className="w-full h-16 sm:h-20 object-cover group-hover/item:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-600">Air Conditioners</span>
              </div>
              <div className="text-center">
                <div className="relative overflow-hidden rounded-md group/item mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=150&h=120&fit=crop"
                    alt="Refrigerator"
                    className="w-full h-16 sm:h-20 object-cover group-hover/item:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-600">Refrigerators</span>
              </div>
              <div className="text-center">
                <div className="relative overflow-hidden rounded-md group/item mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=150&h=120&fit=crop"
                    alt="Washing Machine"
                    className="w-full h-16 sm:h-20 object-cover group-hover/item:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-600">Washing Machines</span>
              </div>
              <div className="text-center">
                <div className="relative overflow-hidden rounded-md group/item mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=150&h=120&fit=crop"
                    alt="Microwave"
                    className="w-full h-16 sm:h-20 object-cover group-hover/item:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-600">Microwaves</span>
              </div>
            </div>
            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline">
              See more
            </a>
          </div>

          {/* Furniture */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-bold mb-4 text-gray-800">Furniture | Up to 60% off</h2>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
              <div className="text-center">
                <div className="relative overflow-hidden rounded-md group/item mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=120&fit=crop"
                    alt="Sofa"
                    className="w-full h-16 sm:h-20 object-cover group-hover/item:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-600">Sofas</span>
              </div>
              <div className="text-center">
                <div className="relative overflow-hidden rounded-md group/item mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=150&h=120&fit=crop"
                    alt="Bed"
                    className="w-full h-16 sm:h-20 object-cover group-hover/item:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-600">Beds</span>
              </div>
              <div className="text-center">
                <div className="relative overflow-hidden rounded-md group/item mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1549497538-303791108f95?w=150&h=120&fit=crop"
                    alt="Office Chair"
                    className="w-full h-16 sm:h-20 object-cover group-hover/item:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-600">Office Chairs</span>
              </div>
              <div className="text-center">
                <div className="relative overflow-hidden rounded-md group/item mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=150&h=120&fit=crop"
                    alt="Dining Table"
                    className="w-full h-16 sm:h-20 object-cover group-hover/item:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-600">Dining Sets</span>
              </div>
            </div>
            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline">
              Explore all
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainPart;
