'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search, SlidersHorizontal, Calendar, Star, MapPin, Wifi, Car, Utensils, Waves, Dumbbell, TreePine, Users } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { zhTW } from 'date-fns/locale';

const hotelCategories = [
  { id: 'all', name: '全部住宿' },
  { id: 'hotel', name: '飯店' },
  { id: 'resort', name: '度假村' },
  { id: 'hostel', name: '青年旅館' },
  { id: 'apartment', name: '公寓' },
  { id: 'villa', name: '民宿' },
];

type Room = {
  name: string;
  capacity: number;
  price: number;
};

interface Hotel {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  location: string;
  amenities: string[];
  rooms: Room[];
}

const hotels: Hotel[] = [
  {
    id: 1,
    name: '台北君悅酒店',
    price: 8800,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
    category: 'hotel',
    rating: 4.8,
    reviews: 526,
    description: '豪華五星級酒店，位於信義區，鄰近台北101',
    location: '台北市信義區',
    amenities: ['wifi', 'parking', 'swim', 'restaurant', 'gym', 'spa'],
    rooms: [
      { name: '豪華雙人房', capacity: 2, price: 8800 },
      { name: '行政套房', capacity: 2, price: 12800 },
      { name: '總統套房', capacity: 4, price: 35800 }
    ]
  },
  {
    id: 2,
    name: '墾丁夏都沙灘酒店',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop',
    category: 'resort',
    rating: 4.6,
    reviews: 384,
    description: '濱海度假村，擁有私人沙灘和水上活動設施',
    location: '屏東縣恆春鎮',
    amenities: ['wifi', 'parking', 'swim', 'restaurant', 'spa'],
    rooms: [
      { name: '海景房', capacity: 2, price: 6500 },
      { name: '沙灘別墅', capacity: 4, price: 8500 },
      { name: '家庭套房', capacity: 6, price: 9500 }
    ]
  },
  {
    id: 3,
    name: '日月潭涵碧樓',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop',
    category: 'resort',
    rating: 4.9,
    reviews: 412,
    description: '坐擁日月潭美景的頂級度假酒店',
    location: '南投縣魚池鄉',
    amenities: ['wifi', 'parking', 'swim', 'restaurant', 'spa'],
    rooms: [
      { name: '湖景套房', capacity: 2, price: 12000 },
      { name: '豪華套房', capacity: 2, price: 15000 },
      { name: '總統套房', capacity: 4, price: 25000 }
    ]
  },
  {
    id: 4,
    name: '台中林酒店',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format&fit=crop',
    category: 'hotel',
    rating: 4.7,
    reviews: 328,
    description: '位於台中市中心的現代化商務酒店',
    location: '台中市西屯區',
    amenities: ['wifi', 'parking', 'gym', 'restaurant'],
    rooms: [
      { name: '商務房', capacity: 2, price: 5500 },
      { name: '豪華套房', capacity: 2, price: 7500 },
      { name: '家庭房', capacity: 4, price: 9500 }
    ]
  },
  {
    id: 5,
    name: '礁溪老爺酒店',
    price: 7800,
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop',
    category: 'resort',
    rating: 4.8,
    reviews: 456,
    description: '結合溫泉與休閒的度假勝地',
    location: '宜蘭縣礁溪鄉',
    amenities: ['wifi', 'parking', 'spa', 'restaurant'],
    rooms: [
      { name: '溫泉房', capacity: 2, price: 7800 },
      { name: '和式套房', capacity: 2, price: 9800 },
      { name: '豪華套房', capacity: 4, price: 12800 }
    ]
  },
  {
    id: 6,
    name: '阿里山賓館',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?q=80&w=800&auto=format&fit=crop',
    category: 'hotel',
    rating: 4.5,
    reviews: 268,
    description: '位於阿里山國家風景區內的歷史建築旅館',
    location: '嘉義縣阿里山鄉',
    amenities: ['wifi', 'parking', 'restaurant', 'nature'],
    rooms: [
      { name: '標準雙人房', capacity: 2, price: 4500 },
      { name: '豪華山景房', capacity: 2, price: 5500 },
      { name: '家庭房', capacity: 4, price: 7500 }
    ]
  },
  {
    id: 7,
    name: '台北青年旅館',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=800&auto=format&fit=crop',
    category: 'hostel',
    rating: 4.3,
    reviews: 186,
    description: '位於台北市中心的現代化青年旅館',
    location: '台北市中正區',
    amenities: ['wifi', 'restaurant'],
    rooms: [
      { name: '背包客床位', capacity: 1, price: 1200 },
      { name: '雙人房', capacity: 2, price: 2200 },
      { name: '四人房', capacity: 4, price: 3800 }
    ]
  },
  {
    id: 8,
    name: '高雄85大樓公寓',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop',
    category: 'apartment',
    rating: 4.6,
    reviews: 158,
    description: '位於高雄地標85大樓的豪華公寓',
    location: '高雄市前金區',
    amenities: ['wifi', 'parking', 'gym'],
    rooms: [
      { name: '海景套房', capacity: 2, price: 3500 },
      { name: '豪華套房', capacity: 4, price: 5500 }
    ]
  },
  {
    id: 9,
    name: '花蓮海景民宿',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop',
    category: 'villa',
    rating: 4.7,
    reviews: 145,
    description: '位於花蓮市的海景民宿，可遠眺太平洋美景',
    location: '花蓮市美崙區',
    amenities: ['wifi', 'parking', 'nature'],
    rooms: [
      { name: '海景雙人房', capacity: 2, price: 2800 },
      { name: '豪華四人房', capacity: 4, price: 3800 },
      { name: '家庭套房', capacity: 6, price: 4800 }
    ]
  },
  {
    id: 10,
    name: '陽明山溫泉會館',
    price: 4200,
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=800&auto=format&fit=crop',
    category: 'villa',
    rating: 4.6,
    reviews: 167,
    description: '享受陽明山國家公園的自然美景與溫泉',
    location: '台北市北投區',
    amenities: ['wifi', 'parking', 'spa', 'nature'],
    rooms: [
      { name: '溫泉雙人房', capacity: 2, price: 4200 },
      { name: '豪華溫泉套房', capacity: 2, price: 5200 },
      { name: '家庭溫泉套房', capacity: 4, price: 6800 }
    ]
  },
  {
    id: 11,
    name: '金門傳統閩式民宿',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1630660664869-c9d3cc676880?q=80&w=800&auto=format&fit=crop',
    category: 'villa',
    rating: 4.8,
    reviews: 92,
    description: '百年閩式建築改建，體驗金門傳統文化',
    location: '金門縣金城鎮',
    amenities: ['wifi', 'parking', 'nature'],
    rooms: [
      { name: '標準雙人房', capacity: 2, price: 2500 },
      { name: '傳統四人房', capacity: 4, price: 3500 },
      { name: '閩式庭院套房', capacity: 4, price: 4500 }
    ]
  },
  {
    id: 12,
    name: '綠島海景度假村',
    price: 3800,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop',
    category: 'resort',
    rating: 4.5,
    reviews: 178,
    description: '面向太平洋，享受綠島獨特的海島風情',
    location: '台東縣綠島鄉',
    amenities: ['wifi', 'restaurant', 'swim', 'nature'],
    rooms: [
      { name: '海景雙人房', capacity: 2, price: 3800 },
      { name: '豪華海景套房', capacity: 2, price: 4800 },
      { name: '家庭海景套房', capacity: 4, price: 6500 }
    ]
  }
];

export default function HotelsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 20000 });
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [showRooms, setShowRooms] = useState<number | null>(null);

  const filteredHotels = hotels.filter(hotel => {
    const matchesCategory = selectedCategory === 'all' || hotel.category === selectedCategory;
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hotel.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = hotel.price >= priceRange.min && hotel.price <= priceRange.max;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const renderAmenityIcon = (amenity: string) => {
    const iconClass = "w-4 h-4 group-hover:text-orange-600 transition-colors";
    switch (amenity) {
      case 'wifi': return (
        <div className="group" title="無線網路">
          <Wifi className={iconClass} />
        </div>
      );
      case 'parking': return (
        <div className="group" title="停車場">
          <Car className={iconClass} />
        </div>
      );
      case 'restaurant': return (
        <div className="group" title="餐廳">
          <Utensils className={iconClass} />
        </div>
      );
      case 'swim': return (
        <div className="group" title="游泳池">
          <Waves className={iconClass} />
        </div>
      );
      case 'gym': return (
        <div className="group" title="健身房">
          <Dumbbell className={iconClass} />
        </div>
      );
      case 'spa': return (
        <div className="group" title="SPA">
          <Waves className={iconClass} />
        </div>
      );
      case 'nature': return (
        <div className="group" title="自然景觀">
          <TreePine className={iconClass} />
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* 搜索和篩選 */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="搜尋住宿..."
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
              <span>入住日期</span>
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
            <h3 className="text-lg font-semibold mb-4">選擇入住日期</h3>
            <div className="flex flex-col gap-4">
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => setDateRange(update)}
                isClearable={true}
                locale={zhTW}
                dateFormat="yyyy/MM/dd"
                placeholderText="選擇入住和退房日期"
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
                    step="100"
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
                    step="100"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setPriceRange({ min: 0, max: 20000 })}
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
          {hotelCategories.map(category => (
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

        {/* 酒店列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map(hotel => (
            <div key={hotel.id} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-48">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold">{hotel.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{hotel.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-gray-600 text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{hotel.location}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{hotel.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  {hotel.amenities.map((amenity, index) => (
                    <div key={index} className="text-gray-600">
                      {renderAmenityIcon(amenity)}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-500">每晚價格起</span>
                    <div className="text-xl font-bold text-orange-600">
                      NT$ {hotel.price.toLocaleString()}
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowRooms(showRooms === hotel.id ? null : hotel.id)}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                  >
                    查看房型
                  </button>
                </div>
                {/* 房型詳情 */}
                {showRooms === hotel.id && (
                  <div className="mt-4 border-t pt-4">
                    <h4 className="font-semibold mb-2">可訂房型</h4>
                    <div className="space-y-2">
                      {hotel.rooms.map((room, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div>
                            <div className="font-medium">{room.name}</div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Users className="w-4 h-4 mr-1" />
                              <span>可住 {room.capacity} 人</span>
                            </div>
                          </div>
                          <div>
                            <div className="text-orange-600 font-bold">
                              NT$ {room.price.toLocaleString()}
                            </div>
                            <button className="text-sm text-white bg-orange-600 px-3 py-1 rounded hover:bg-orange-700">
                              預訂
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 