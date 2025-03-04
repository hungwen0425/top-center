'use client';

import { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';

interface ShopLayoutProps {
  children: React.ReactNode;
}

export default function ShopLayout({ children }: ShopLayoutProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = [
    { id: 1, name: '服装', subcategories: ['上衣', '裤子', '裙子', '外套'] },
    { id: 2, name: '鞋类', subcategories: ['运动鞋', '休闲鞋', '正装鞋', '凉鞋'] },
    { id: 3, name: '包包', subcategories: ['手提包', '双肩包', '钱包', '旅行包'] },
    { id: 4, name: '配饰', subcategories: ['手表', '项链', '手链', '耳环'] },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Mobile Filter Button */}
      <button
        className="md:hidden flex items-center gap-2 mb-6"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <Filter className="w-5 h-5" />
        <span>筛选</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
      </button>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className={`
          w-64 flex-shrink-0
          ${isFilterOpen ? 'block' : 'hidden'}
          md:block
          bg-white p-6 rounded-lg shadow-sm
        `}>
          <h2 className="font-bold mb-4">分类</h2>
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.id}>
                <h3 className="font-semibold mb-2">{category.name}</h3>
                <ul className="space-y-2">
                  {category.subcategories.map((sub) => (
                    <li key={sub}>
                      <button className="text-gray-600 hover:text-orange-600 text-sm">
                        {sub}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="font-bold mb-4">价格范围</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">¥0 - ¥100</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">¥100 - ¥500</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">¥500 - ¥1000</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">¥1000以上</span>
              </label>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-bold mb-4">评分</h2>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">{rating}星及以上</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
} 