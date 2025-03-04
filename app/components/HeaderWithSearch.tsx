'use client';

import { User, ShoppingCart, MessageSquare, Search } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";

export default function HeaderWithSearch() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleSearchClick = () => {
    setIsSearchExpanded(true);
    setIsFocused(true);
  };

  const handleMouseEnter = () => {
    setIsSearchExpanded(true);
  };

  const handleMouseLeave = () => {
    if (!isFocused) {
      setIsSearchExpanded(false);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setIsSearchExpanded(true);
  };

  const handleBlur = (e: React.FocusEvent) => {
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!searchContainerRef.current?.contains(relatedTarget)) {
      setIsFocused(false);
      setIsSearchExpanded(false);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="h-10 flex items-center justify-end space-x-1 text-sm border-b">
          <Link href="/login" className="flex items-center gap-1.5 px-4 py-1.5 border border-gray-400 bg-white text-gray-500 hover:bg-gray-50 rounded">
            <User className="w-3.5 h-3.5" />
            <span>登入會員</span>
          </Link>
          <Link href="/cart" className="flex items-center gap-1.5 px-4 py-1.5 border border-gray-400 bg-white text-gray-500 hover:bg-gray-50 rounded">
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>購物車</span>
          </Link>
          <Link href="/contact" className="flex items-center gap-1.5 px-4 py-1.5 border border-gray-400 bg-white text-gray-500 hover:bg-gray-50 rounded">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>聯絡我們</span>
            </Link>
          <div 
            ref={searchContainerRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className={`flex items-center transition-all duration-300 ${isSearchExpanded ? 'w-40' : 'w-8'} overflow-hidden`}>
              <input
                type="text"
                placeholder="找行程"
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`h-8 border border-gray-400 bg-white text-gray-500 px-8 rounded outline-none w-full text-sm ${
                  isSearchExpanded ? 'opacity-100' : 'opacity-0'
                }`}
              />
              <button 
                onClick={handleSearchClick}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`absolute left-0 top-0 flex items-center justify-center w-8 h-8 border border-gray-400 rounded bg-white ${isSearchExpanded ? 'border-r-0 rounded-r-none' : ''}`}
              >
                <Search className="w-3.5 h-3.5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
        <div className="h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-orange-600">歐冠旅行社</Link>
          <nav className="flex items-center gap-8">
            <Link href="/tours" className="hover:text-orange-600">旅遊行程</Link>
            <Link href="/hotels" className="hover:text-orange-600">住宿預訂</Link>
            <Link href="/tickets" className="hover:text-orange-600">機票</Link>
            <Link href="/visa" className="hover:text-orange-600">簽證</Link>
            <Link href="/insurance" className="hover:text-orange-600">保險</Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 