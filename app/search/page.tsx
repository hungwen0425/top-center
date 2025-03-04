'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search, SlidersHorizontal } from 'lucide-react';
import ShopLayout from '../components/layouts/ShopLayout';

const products = [
  {
    id: 1,
    name: "时尚休闲包",
    price: 299,
    image: "https://picsum.photos/400/400?random=1",
    category: "包包",
    rating: 4.5
  },
  {
    id: 2,
    name: "运动鞋",
    price: 499,
    image: "https://picsum.photos/400/400?random=2",
    category: "鞋类",
    rating: 4.8
  },
  {
    id: 3,
    name: "休闲T恤",
    price: 99,
    image: "https://picsum.photos/400/400?random=3",
    category: "服装",
    rating: 4.2
  },
  {
    id: 4,
    name: "牛仔裤",
    price: 199,
    image: "https://picsum.photos/400/400?random=4",
    category: "服装",
    rating: 4.6
  },
  // 添加更多产品...
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  return (
    <ShopLayout>
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="搜索商品..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Sort Options */}
        <div className="flex justify-end">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="featured">推荐</option>
            <option value="price-asc">价格从低到高</option>
            <option value="price-desc">价格从高到低</option>
            <option value="rating">评分最高</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <h3 className="font-semibold mb-1">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.category}</p>
              <div className="flex items-center justify-between">
                <p className="text-purple-600 font-bold">¥{product.price}</p>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm text-gray-600">{product.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-8">
          <button className="px-4 py-2 rounded-lg border hover:bg-gray-50">上一页</button>
          <button className="px-4 py-2 rounded-lg bg-purple-600 text-white">1</button>
          <button className="px-4 py-2 rounded-lg border hover:bg-gray-50">2</button>
          <button className="px-4 py-2 rounded-lg border hover:bg-gray-50">3</button>
          <button className="px-4 py-2 rounded-lg border hover:bg-gray-50">下一页</button>
        </div>
      </div>
    </ShopLayout>
  );
} 