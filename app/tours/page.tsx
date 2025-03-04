'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Heart, Search, SlidersHorizontal, Calendar } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { zhTW } from 'date-fns/locale';

const tourCategories = [
  { id: 'all', name: '全部行程' },
  { id: 'japan-korea', name: '日韓行程' },
  { id: 'southeast-asia', name: '東南亞' },
  { id: 'europe', name: '歐洲行程' },
  { id: 'america', name: '美加行程' },
  { id: 'domestic', name: '國內行程' },
];

const tours = [
  {
    id: 1,
    name: '日本東京6日遊',
    price: 59999,
    image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=800&auto=format&fit=crop',
    category: 'japan-korea',
    rating: 4.8,
    reviews: 128,
    description: '探索東京都市風光，體驗日本傳統文化',
    duration: '6天5夜',
    departure: '台北',
    highlights: ['淺草寺', '東京晴空塔', '迪士尼樂園', '富士山']
  },
  {
    id: 2,
    name: '韓國首爾5日遊',
    price: 45999,
    image: 'https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=800&auto=format&fit=crop',
    category: 'japan-korea',
    rating: 4.7,
    reviews: 96,
    description: '體驗韓國文化與美食的完美旅程',
    duration: '5天4夜',
    departure: '台北',
    highlights: ['明洞', '南山塔', '景福宮', '北村韓屋村']
  },
  {
    id: 3,
    name: '泰國曼谷芭達雅7日遊',
    price: 35999,
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=800&auto=format&fit=crop',
    category: 'southeast-asia',
    rating: 4.6,
    reviews: 156,
    description: '熱帶風情與文化古蹟的完美結合',
    duration: '7天6夜',
    departure: '台北',
    highlights: ['大皇宮', '水上市場', '芭達雅海灘', '考山路']
  },
  {
    id: 4,
    name: '法國巴黎8日遊',
    price: 89999,
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop',
    category: 'europe',
    rating: 4.9,
    reviews: 203,
    description: '浪漫巴黎藝術人文之旅',
    duration: '8天7夜',
    departure: '台北',
    highlights: ['艾菲爾鐵塔', '羅浮宮', '凱旋門', '聖母院']
  },
  {
    id: 5,
    name: '日本大阪京都5日遊',
    price: 52999,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop',
    category: 'japan-korea',
    rating: 4.8,
    reviews: 145,
    description: '關西地區文化探索之旅',
    duration: '5天4夜',
    departure: '台北',
    highlights: ['大阪城', '清水寺', '金閣寺', '環球影城']
  },
  {
    id: 6,
    name: '新加坡濱海灣4日遊',
    price: 32999,
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800&auto=format&fit=crop',
    category: 'southeast-asia',
    rating: 4.7,
    reviews: 112,
    description: '現代都市與自然生態的完美結合',
    duration: '4天3夜',
    departure: '台北',
    highlights: ['濱海灣花園', '魚尾獅公園', '聖淘沙', '夜間動物園']
  },
  {
    id: 7,
    name: '美國紐約7日遊',
    price: 92999,
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=800&auto=format&fit=crop',
    category: 'america',
    rating: 4.8,
    reviews: 167,
    description: '探索大蘋果城市魅力',
    duration: '7天6夜',
    departure: '台北',
    highlights: ['自由女神像', '中央公園', '時代廣場', '大都會博物館']
  },
  {
    id: 8,
    name: '加拿大溫哥華6日遊',
    price: 75999,
    image: 'https://images.unsplash.com/photo-1559511260-66a654ae982a?q=80&w=800&auto=format&fit=crop',
    category: 'america',
    rating: 4.7,
    reviews: 98,
    description: '體驗加拿大西海岸自然風光',
    duration: '6天5夜',
    departure: '台北',
    highlights: ['史丹利公園', '加拿大廣場', '惠斯勒滑雪場', '格蘭維爾島']
  },
  {
    id: 9,
    name: '義大利羅馬佛羅倫斯8日遊',
    price: 86999,
    image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=800&auto=format&fit=crop',
    category: 'europe',
    rating: 4.9,
    reviews: 189,
    description: '文藝復興藝術與美食之旅',
    duration: '8天7夜',
    departure: '台北',
    highlights: ['羅馬競技場', '梵蒂岡博物館', '烏菲茲美術館', '五漁村']
  },
  {
    id: 10,
    name: '台灣環島5日遊',
    price: 25999,
    image: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?q=80&w=800&auto=format&fit=crop',
    category: 'domestic',
    rating: 4.6,
    reviews: 142,
    description: '深度探索寶島之美',
    duration: '5天4夜',
    departure: '台北',
    highlights: ['太魯閣國家公園', '日月潭', '墾丁國家公園', '阿里山']
  }
];

export default function ToursPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const { addItem } = useCart();

  const filteredTours = tours.filter(tour => {
    const matchesCategory = selectedCategory === 'all' || tour.category === selectedCategory;
    const matchesSearch = tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tour.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = tour.price >= priceRange.min && tour.price <= priceRange.max;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* 搜索和篩選 */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="搜尋行程..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowDateFilter(!showDateFilter)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              <Calendar className="w-5 h-5" />
              <span>選擇日期</span>
            </button>
            <button 
              onClick={() => setShowPriceFilter(!showPriceFilter)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>價格篩選</span>
            </button>
          </div>
        </div>

        {/* 日期選擇面板 */}
        {showDateFilter && (
          <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">選擇出發日期</h3>
            <div className="flex flex-col gap-4">
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => setDateRange(update)}
                isClearable={true}
                locale={zhTW}
                dateFormat="yyyy/MM/dd"
                placeholderText="選擇出發日期範圍"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                minDate={new Date()}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setDateRange([null, null])}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  重置
                </button>
                <button
                  onClick={() => setShowDateFilter(false)}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                >
                  確定
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 價格篩選面板 */}
        {showPriceFilter && (
          <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">價格範圍</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">最低價格</label>
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                    min="0"
                    step="1000"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">最高價格</label>
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                    min="0"
                    step="1000"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setPriceRange({ min: 0, max: 100000 })}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  重置
                </button>
                <button
                  onClick={() => setShowPriceFilter(false)}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                >
                  確定
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 分類標籤 */}
        <div className="mb-8 flex flex-wrap gap-2">
          {tourCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category.id
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* 行程列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTours.map(tour => (
            <div key={tour.id} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-48">
                <Image
                  src={tour.image}
                  alt={tour.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button className="p-2 bg-white rounded-full hover:bg-gray-100 shadow-md">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{tour.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{tour.description}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-500">★</span>
                  <span>{tour.rating}</span>
                  <span className="text-gray-400">({tour.reviews}則評價)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <span>{tour.duration}</span>
                  <span>•</span>
                  <span>出發地: {tour.departure}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-500">價格起</span>
                    <div className="text-xl font-bold text-orange-600">
                      NT$ {tour.price.toLocaleString()}
                    </div>
                  </div>
                  <button
                    onClick={() => addItem(tour)}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>加入購物車</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 