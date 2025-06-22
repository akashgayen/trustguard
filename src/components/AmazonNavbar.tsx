import React, { useState } from 'react';
import { MapPin, Search, ChevronDown, ShoppingCart, Menu, ChevronLeft, ChevronRight, X, User } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: '🛡️ TrustGuardAssured', href: '/productlist' },
  { label: 'Mobiles', href: '#' },
  { label: 'MX Player', href: '#' },
  { label: 'Sell', href: '#' },
  { label: 'Amazon Pay', href: '#' },
  { label: 'Gift Cards', href: '#' },
  { label: 'AmazonBasics', href: '#' },
  { label: 'Kindle eBooks', href: '#' },
  { label: 'Books', href: '#' },
  { label: 'Home Improvement', href: '#' },
  { label: 'Gift Ideas', href: '#' },
  { label: 'Health, Household & Personal Care', href: '#' },
];

interface AmazonSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AmazonSidebar: React.FC<AmazonSidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 z-40 transition-opacity duration-300"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gray-800 text-gray-100 shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } overflow-y-auto custom-scrollbar rounded-r-lg`}
      >
        {/* Sidebar Header */}
        <div className="bg-gray-700 p-4 flex items-center justify-between">
          <span className="text-xl font-bold flex items-center">
            <User size={20} className="mr-2" /> Hello, Nilasish
          </span>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition duration-200" aria-label="Close menu">
            <X size={24} />
          </button>
        </div>

        {/* Trending Section */}
        <div className="py-4 border-b border-gray-700">
          <h3 className="text-sm font-bold uppercase text-gray-400 px-4 mb-2">Trending</h3>
          <ul>
            <li className="px-4 py-2 hover:bg-red-800 transition duration-200 cursor-pointer rounded-sm">
              <a href="#" className="flex justify-between items-center w-full">
                Bestsellers
              </a>
            </li>
            <li className="px-4 py-2 hover:bg-red-800 transition duration-200 cursor-pointer rounded-sm">
              <a href="#" className="flex justify-between items-center w-full">
                New Releases
              </a>
            </li>
            <li className="px-4 py-2 hover:bg-red-800 transition duration-200 cursor-pointer rounded-sm">
              <a href="#" className="flex justify-between items-center w-full">
                Movers and Shakers
              </a>
            </li>
          </ul>
        </div>

        {/* Digital Content and Devices */}
        <div className="py-4 border-b border-gray-700">
          <h3 className="text-sm font-bold uppercase text-gray-400 px-4 mb-2">Digital Content and Devices</h3>
          <ul>
            <li className="px-4 py-2 hover:bg-red-800 transition duration-200 cursor-pointer rounded-sm">
              <a href="#" className="flex justify-between items-center w-full">
                Echo & Alexa <ChevronRight size={18} />
              </a>
            </li>
            <li className="px-4 py-2 hover:bg-red-800 transition duration-200 cursor-pointer rounded-sm">
              <a href="#" className="flex justify-between items-center w-full">
                Fire TV <ChevronRight size={18} />
              </a>
            </li>
            <li className="px-4 py-2 hover:bg-red-800 transition duration-200 cursor-pointer rounded-sm">
              <a href="#" className="flex justify-between items-center w-full">
                Kindle E-Readers & eBooks <ChevronRight size={18} />
              </a>
            </li>
            <li className="px-4 py-2 hover:bg-red-800 transition duration-200 cursor-pointer rounded-sm">
              <a href="#" className="flex justify-between items-center w-full">
                Audible Audiobooks <ChevronRight size={18} />
              </a>
            </li>
            <li className="px-4 py-2 hover:bg-red-800 transition duration-200 cursor-pointer rounded-sm">
              <a href="#" className="flex justify-between items-center w-full">
                Amazon Prime Video <ChevronRight size={18} />
              </a>
            </li>
            <li className="px-4 py-2 hover:bg-red-800 transition duration-200 cursor-pointer rounded-sm">
              <a href="#" className="flex justify-between items-center w-full">
                Amazon Prime Music <ChevronRight size={18} />
              </a>
            </li>
          </ul>
        </div>

        {/* Shop by Category */}
        <div className="py-4">
          <h3 className="text-sm font-bold uppercase text-gray-400 px-4 mb-2">Shop by Category</h3>
          <ul>
            <li className="px-4 py-2 hover:bg-red-800 transition duration-200 cursor-pointer rounded-sm">
              <a href="#" className="flex justify-between items-center w-full">
                Mobiles, Computers <ChevronRight size={18} />
              </a>
            </li>
            <li className="px-4 py-2 hover:bg-red-800 transition duration-200 cursor-pointer rounded-sm">
              <a href="#" className="flex justify-between items-center w-full">
                TV, Appliances, Electronics <ChevronRight size={18} />
              </a>
            </li>
            <li className="px-4 py-2 hover:bg-red-800 transition duration-200 cursor-pointer rounded-sm">
              <a href="#" className="flex justify-between items-center w-full">
                Men's Fashion <ChevronRight size={18} />
              </a>
            </li>
            <li className="px-4 py-2 hover:bg-red-800 transition duration-200 cursor-pointer rounded-sm">
              <a href="#" className="flex justify-between items-center w-full">
                Women's Fashion <ChevronRight size={18} />
              </a>
            </li>
            <li className="px-4 py-2 hover:bg-red-800 transition duration-200 cursor-pointer rounded-sm">
              <a href="#" className="flex justify-between items-center w-full">
                See all <ChevronDown size={18} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};


const AmazonNavbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <> {/* Changed div to a Fragment */}
      {/* Header */}
      <header className="bg-gray-800 text-gray-100 p-2 flex items-center flex-wrap justify-between md:flex-nowrap">
        {/* Amazon Logo and Delivery */}
        <div className="flex items-center flex-shrink-0 mb-2 md:mb-0">
          <a href="#" className="flex items-center mr-4">
            <img
              src="https://www.amazon.in/ref=nav_logo" // Placeholder for Amazon logo
              alt="Amazon India"
              className="h-6 md:h-7 rounded-sm"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://placehold.co/100x30/374151/FFFFFF?text=Amazon";
              }}
            />
          </a>
          <div className="hidden md:flex flex-col text-xs cursor-pointer hover:border hover:border-gray-600 rounded-sm p-1">
            <span className="text-gray-400">Deliver to SuperSurge</span>
            <span className="font-bold">
              <MapPin size={14} className="inline-block mr-1" />
              Kolkata 700012
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-grow flex items-center mx-auto md:mx-4 w-full md:w-auto min-w-[200px] max-w-2xl bg-white rounded-md overflow-hidden shadow-sm">
          <select
            className="hidden sm:block bg-gray-200 text-gray-900 p-2 border-r border-gray-300 focus:outline-none rounded-l-md text-sm cursor-pointer hover:bg-gray-300"
            aria-label="Search category"
          >
            <option>Mobiles & Accessories</option>
            <option>All</option>
            <option>Books</option>
            <option>Electronics</option>
            <option>Fashion</option>
          </select>
          <input
            type="text"
            placeholder="Search Amazon.in"
            className="flex-grow p-2 text-gray-900 focus:outline-none rounded-l-md sm:rounded-none text-sm"
            aria-label="Search input"
          />
          <button
            className="bg-orange-400 text-gray-900 p-2 rounded-r-md hover:bg-orange-500 focus:outline-none transition duration-200"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        </div>

        {/* Language, Account, Returns, Cart */}
        <div className="flex items-center space-x-4 ml-auto mt-2 md:mt-0">
          {/* Language */}
          <div className="relative group flex items-center text-sm cursor-pointer hover:border hover:border-gray-600 rounded-sm p-1">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg"
              alt="Indian Flag"
              className="h-3.5 w-5 mr-1 rounded-sm"
            />
            EN <ChevronDown size={14} className="ml-1" />
            {/* Language Dropdown (Placeholder) */}
            <div className="absolute top-full left-0 mt-2 w-32 bg-gray-700 text-gray-100 rounded-md shadow-lg hidden group-hover:block z-10">
              <ul className="py-1">
                <li className="px-3 py-1 hover:bg-red-800 cursor-pointer rounded-sm">Hindi</li>
                <li className="px-3 py-1 hover:bg-red-800 cursor-pointer rounded-sm">Bengali</li>
                <li className="px-3 py-1 hover:bg-red-800 cursor-pointer rounded-sm">Marathi</li>
              </ul>
            </div>
          </div>

          {/* Hello, Nilasish & Account & Lists */}
          <div className="relative group text-sm cursor-pointer hover:border hover:border-gray-600 rounded-sm p-1">
            <span className="block text-xs">Hello, Nilasish</span>
            <span className="font-bold flex items-center">
              Account & Lists <ChevronDown size={14} className="ml-1" />
            </span>
            {/* Account Dropdown (Placeholder) */}
            <div className="absolute top-full -right-4 mt-2 w-48 bg-gray-700 text-gray-100 rounded-md shadow-lg hidden group-hover:block z-10">
              <ul className="py-1">
                <li className="px-3 py-1 hover:bg-red-800 cursor-pointer rounded-sm">Your Account</li>
                <li className="px-3 py-1 hover:bg-red-800 cursor-pointer rounded-sm">Your Orders</li>
                <li className="px-3 py-1 hover:bg-red-800 cursor-pointer rounded-sm">Your Wish List</li>
              </ul>
            </div>
          </div>

          {/* Returns & Orders */}
          <a href="#" className="flex-col hidden lg:flex text-sm cursor-pointer hover:border hover:border-gray-600 rounded-sm p-1">
            <span className="text-xs">Returns</span>
            <span className="font-bold">& Orders</span>
          </a>

          {/* Cart */}
          <a href="#" className="relative flex items-center text-sm cursor-pointer hover:border hover:border-gray-600 rounded-sm p-1">
            <ShoppingCart size={24} className="mr-1" />
            <span className="absolute -top-1 left-4 bg-orange-400 text-gray-900 text-xs font-bold px-1 rounded-full">0</span>
            Cart
          </a>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-gray-700 text-gray-100 p-2 flex items-center overflow-x-auto whitespace-nowrap scrollbar-hide text-sm">
        {/* All / Hamburger Menu - Trigger Sidebar */}
        <button
          onClick={toggleSidebar}
          className="flex items-center font-bold px-2 py-1 rounded-sm hover:bg-red-800 transition duration-200 flex-shrink-0"
          aria-label="Open all categories menu"
        >
          <Menu size={20} className="mr-1" />
          All
        </button>
        {/* Category Links */}
        {navLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="px-2 py-1 mx-1 rounded-sm hover:bg-red-800 transition duration-200 flex-shrink-0"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Amazon Sidebar Component */}
      <AmazonSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </>
  );
}

export default AmazonNavbar;