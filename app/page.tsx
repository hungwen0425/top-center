'use client';

import Image from "next/image";
import { ShoppingCart, Heart, ChevronLeft, ChevronRight, Send, X, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from './contexts/CartContext';
import Link from "next/link";

const slides = [
  {
    url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=1920&auto=format&fit=crop",
    title: "日本之美",
    description: "探索日本傳統文化與現代魅力"
  },
  {
    url: "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1920&auto=format&fit=crop",
    title: "泰國風情",
    description: "體驗泰國獨特的文化與美食"
  },
  {
    url: "https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=1920&auto=format&fit=crop",
    title: "韓國魅力",
    description: "感受韓國流行文化與歷史古蹟"
  },
];

const products = [
  {
    id: 1,
    name: "日本东京6日游",
    price: 5999,
    image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=800&auto=format&fit=crop",
    category: "日本"
  },
  {
    id: 2,
    name: "泰国曼谷5日游",
    price: 3999,
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=800&auto=format&fit=crop",
    category: "泰国"
  },
  {
    id: 3,
    name: "韩国首尔4日游",
    price: 2999,
    image: "https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=800&auto=format&fit=crop",
    category: "韩国"
  },
  {
    id: 4,
    name: "新加坡3日游",
    price: 1999,
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800&auto=format&fit=crop",
    category: "新加坡"
  }
];

const categories = [
  {
    name: '日韓旅遊',
    image: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: '東南亞',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: '歐洲旅遊',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: '美加旅遊',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: '國內旅遊',
    image: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?q=80&w=800&auto=format&fit=crop'
  }
];

const getCategoryParam = (categoryName: string) => {
  const categoryMap: { [key: string]: string } = {
    '日韓旅遊': '日韓',
    '東南亞': '東南亞',
    '歐洲旅遊': '歐洲',
    '美加旅遊': '美加',
    '國內旅遊': '國內'
  };
  return categoryMap[categoryName] || categoryName;
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addItem } = useCart();
  const [showContactForm, setShowContactForm] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [bookingData, setBookingData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    adults: 1,
    children: 0,
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Quick contact form submitted:', formData);
    
    // 顯示成功提示
    setShowSuccess(true);
    
    // 重置表單
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    
    // 關閉表單
    setShowContactForm(false);
    
    // 3秒後隱藏成功提示
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking form submitted:', bookingData);
    
    setShowSuccess(true);
    setBookingData({
      destination: '',
      startDate: '',
      endDate: '',
      adults: 1,
      children: 0,
      name: '',
      email: '',
      phone: ''
    });
    setShowBookingForm(false);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="min-h-screen">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-down z-50">
          <CheckCircle className="w-5 h-5" />
          <span>訊息已成功發送！我們會盡快回覆您。</span>
        </div>
      )}

      {/* Quick Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowContactForm(false);
          }
        }}>
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4 relative animate-fade-in-down">
            <button 
              onClick={() => setShowContactForm(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-4">快速聯絡我們</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">電子郵件</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">聯絡電話</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">主旨</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                  required
                >
                  <option value="">請選擇主旨</option>
                  <option value="行程諮詢">行程諮詢</option>
                  <option value="訂單查詢">訂單查詢</option>
                  <option value="售後服務">售後服務</option>
                  <option value="合作提案">合作提案</option>
                  <option value="其他">其他</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">訊息內容</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  發送訊息
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowBookingForm(false);
          }
        }}>
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4 relative animate-fade-in-down">
            <button 
              onClick={() => setShowBookingForm(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-4">立即預訂</h2>
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">目的地</label>
                <select
                  name="destination"
                  value={bookingData.destination}
                  onChange={handleBookingChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                  required
                >
                  <option value="">請選擇目的地</option>
                  <option value="日本">日本</option>
                  <option value="韓國">韓國</option>
                  <option value="泰國">泰國</option>
                  <option value="新加坡">新加坡</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">出發日期</label>
                  <input
                    type="date"
                    name="startDate"
                    value={bookingData.startDate}
                    onChange={handleBookingChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">返回日期</label>
                  <input
                    type="date"
                    name="endDate"
                    value={bookingData.endDate}
                    onChange={handleBookingChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">成人人數</label>
                  <input
                    type="number"
                    name="adults"
                    value={bookingData.adults}
                    onChange={handleBookingChange}
                    min="1"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">兒童人數</label>
                  <input
                    type="number"
                    name="children"
                    value={bookingData.children}
                    onChange={handleBookingChange}
                    min="0"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                <input
                  type="text"
                  name="name"
                  value={bookingData.name}
                  onChange={handleBookingChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">電子郵件</label>
                <input
                  type="email"
                  name="email"
                  value={bookingData.email}
                  onChange={handleBookingChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">聯絡電話</label>
                <input
                  type="tel"
                  name="phone"
                  value={bookingData.phone}
                  onChange={handleBookingChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  確認預訂
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hero Section with Carousel */}
      <section className="relative h-[500px]">
        <div className="absolute inset-0">
          <Image
            src={slides[currentSlide].url}
            alt="Hero banner"
            fill
            className="object-cover transition-opacity duration-500"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{slides[currentSlide].title}</h1>
            <p className="text-xl md:text-2xl mb-8">{slides[currentSlide].description}</p>
            <button 
              onClick={() => setShowBookingForm(true)}
              className="bg-orange-600 text-white px-8 py-3 rounded-full hover:bg-orange-700 transition-colors"
            >
              立即預訂
            </button>
          </div>
        </div>
        
        {/* Carousel Controls */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentSlide === index ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">熱門旅遊</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link 
                key={category.name} 
                href={`/tours?category=${encodeURIComponent(getCategoryParam(category.name))}`}
                className="block transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
              >
                <div className="relative h-48 rounded-lg overflow-hidden group cursor-pointer shadow-md hover:shadow-xl">
                  <div className="absolute inset-0">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                    <div className="text-center transform group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xl font-semibold group-hover:text-orange-400 transition-colors duration-300">{category.name}</span>
                      <div className="h-0.5 w-0 group-hover:w-full bg-orange-400 mt-2 mx-auto transition-all duration-300"></div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">精选行程</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="group">
                <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                  <div className="absolute inset-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => addItem(product)}
                      className="p-2 bg-white rounded-full hover:bg-gray-100"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <h3 className="font-semibold mb-1">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.category}</p>
                <p className="text-orange-600 font-bold">¥{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">订阅我们的通讯</h2>
          <p className="text-gray-600 mb-6">获取最新旅游资讯和优惠信息</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="输入您的邮箱"
              className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
            <button className="bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700 transition-colors">
              订阅
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
