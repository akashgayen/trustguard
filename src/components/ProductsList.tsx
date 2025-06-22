import React, { useState } from 'react';
import { Star, StarHalf } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  price: string;
  originalPrice: string;
  discount: string;
  rating: number;
  reviews: number;
  image: string;
  features: string[];
  delivery: string;
  freeDelivery: boolean;
  prime: boolean;
}

const ProductsList: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const products: Product[] = [
    {
      id: 1,
      title: "Premium Wireless Bluetooth Headphones - Noise Cancelling Over-Ear Headphones with Deep Bass",
      price: "₹449",
      originalPrice: "₹799",
      discount: "44% off",
      rating: 3.7,
      reviews: 903,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      features: ["3.5mm Jack", "Built-in Microphone", "1.5m Cable", "Soft Ear Cushion"],
      delivery: "Wed, 25 Jun",
      freeDelivery: true,
      prime: false
    },
    {
      id: 2,
      title: "Premium Wireless Bluetooth Headphones - Noise Cancelling Over-Ear Headphones with Deep Bass",
      price: "₹549",
      originalPrice: "₹2,999",
      discount: "78% off",
      rating: 3.6,
      reviews: 6240,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop",
      features: ["Bluetooth 5.0", "10mm Drivers", "Deep Bass", "Fast Charging"],
      delivery: "Tomorrow, 23 Jun",
      freeDelivery: true,
      prime: true
    },
    {
      id: 3,
      title: "Premium Wireless Bluetooth Headphones - Noise Cancelling Over-Ear Headphones with Deep Bass",
      price: "₹7,999",
      originalPrice: "₹14,990",
      discount: "47% off",
      rating: 4.2,
      reviews: 1524,
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop",
      features: ["Noise Canceling", "35Hr Battery", "Dual Noise Sensor", "Wireless"],
      delivery: "Wed, 25 Jun",
      freeDelivery: true,
      prime: true
    }
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 fill-orange-400 text-orange-400" />);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    
    return stars;
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    console.log('Product clicked:', product.title);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-100 px-4 py-2 border-b">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-gray-600">
            1-24 of 255 results for <span className="font-bold">"Headphones"</span>
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar Filters */}
        <div className="w-64 bg-white p-4 border-r">
          <div className="space-y-6">
            {/* Delivery Day */}
            <div>
              <h3 className="font-bold text-sm mb-3">Delivery Day</h3>
              <div className="space-y-2">
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Get it by Tomorrow
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Get it in 2 Days
                </label>
              </div>
            </div>

            {/* Brands */}
            <div>
              <h3 className="font-bold text-sm mb-3">Brands</h3>
              <div className="space-y-2">
                {['boAt', 'pTron', 'SoundMagic', 'Samsung', 'Blaupunkt', 'Concept Kart'].map((brand) => (
                  <label key={brand} className="flex items-center text-sm">
                    <input type="checkbox" className="mr-2" />
                    {brand}
                  </label>
                ))}
                <button className="text-blue-600 text-sm hover:underline">+ See more</button>
              </div>
            </div>

            {/* Price */}
            <div>
              <h3 className="font-bold text-sm mb-3">Price</h3>
              <p className="text-sm text-gray-600 mb-2">₹66 - ₹61,800+</p>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                <div className="flex-1 h-2 bg-gray-200 rounded">
                  <div className="w-1/3 h-2 bg-blue-500 rounded"></div>
                </div>
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                <button className="px-3 py-1 bg-gray-100 text-sm rounded">Go</button>
              </div>
              <div className="mt-2 space-y-1 text-sm">
                <div>Under ₹500</div>
                <div>₹500 - ₹800</div>
                <div>Over ₹800</div>
              </div>
            </div>

            {/* Customer Reviews */}
            <div>
              <h3 className="font-bold text-sm mb-3">Customer Reviews</h3>
              <div className="flex items-center">
                <div className="flex">
                  {[1,2,3,4].map(i => (
                    <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                  ))}
                  <Star className="w-4 h-4 text-gray-300" />
                </div>
                <span className="ml-2 text-sm text-blue-600">& Up</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          {/* Sort */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Results</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Sort by:</span>
              <select className="border rounded px-2 py-1 text-sm">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Customer Reviews</option>
              </select>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-6">Check each product page for other buying options.</p>

          {/* Products */}
          <div className="space-y-6">
            {products.map((product) => (
              <div 
                key={product.id}
                className="flex border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                {/* Product Image */}
                <div className="w-48 h-48 flex-shrink-0 mr-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-2 text-blue-600 hover:text-orange-600 line-clamp-2">
                    <a href='/products'>{product.title}</a>
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {renderStars(product.rating)}
                    </div>
                    <span className="ml-2 text-sm text-blue-600">({product.reviews})</span>
                  </div>

                  {/* Get it in section */}
                  <div className="text-sm text-gray-600 mb-2">
                    Get it <span className="font-medium">in 1 month</span>
                  </div>

                  {/* Limited time deal */}
                  <div className="bg-red-600 text-white text-xs px-2 py-1 rounded inline-block mb-2">
                    Limited time deal
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl font-bold">{product.price}</span>
                    <span className="text-sm">M.R.P:</span>
                    <span className="text-sm line-through text-gray-500">{product.originalPrice}</span>
                    <span className="text-sm text-green-600">({product.discount})</span>
                  </div>

                  {/* Delivery */}
                  <div className="text-sm mb-2">
                    <span className="font-bold">FREE</span> delivery <span className="font-bold">{product.delivery}</span> on ₹499 of items fulfilled by Amazon
                  </div>

                  {/* Prime */}
                  {product.prime && (
                    <div className="text-sm text-blue-600 mb-2">
                      Or Prime members get <span className="font-bold">FREE delivery</span>
                      <br />
                      <span className="font-bold">Tomorrow 8 am - 12 pm</span>
                    </div>
                  )}

                  {/* Add to cart button */}
                  <button 
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Added to cart:', product.title);
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
