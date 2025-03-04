'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, User } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-orange-600">
              歐冠旅行社
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/search" className="hover:text-orange-600">搜索</Link>
              <Link href="/featured" className="hover:text-orange-600">精选</Link>
              <Link href="/new-arrivals" className="hover:text-orange-600">新品</Link>
              <Link href="/promotions" className="hover:text-orange-600">促销</Link>
              <Link href="/cart" className="hover:text-orange-600">
                <ShoppingCart className="w-5 h-5" />
              </Link>
              <Link href="/user-account" className="hover:text-orange-600">
                <User className="w-5 h-5" />
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="md:hidden py-4">
              <div className="flex flex-col gap-4">
                <Link href="/search" className="hover:text-orange-600">搜索</Link>
                <Link href="/featured" className="hover:text-orange-600">精选</Link>
                <Link href="/new-arrivals" className="hover:text-orange-600">新品</Link>
                <Link href="/promotions" className="hover:text-orange-600">促销</Link>
                <Link href="/cart" className="hover:text-orange-600">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    <span>购物车</span>
                  </div>
                </Link>
                <Link href="/user-account" className="hover:text-orange-600">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span>账户</span>
                  </div>
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">关于我们</h3>
              <p className="text-gray-600">歐冠旅行社致力于为您提供最优质的旅游体验。</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">客户服务</h3>
              <ul className="space-y-2">
                <li><Link href="/customer-service" className="text-gray-600 hover:text-orange-600">帮助中心</Link></li>
                <li><Link href="/shipping" className="text-gray-600 hover:text-orange-600">配送信息</Link></li>
                <li><Link href="/returns" className="text-gray-600 hover:text-orange-600">退换货政策</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">公司信息</h3>
              <ul className="space-y-2">
                <li><Link href="/company-info" className="text-gray-600 hover:text-orange-600">关于我们</Link></li>
                <li><Link href="/careers" className="text-gray-600 hover:text-orange-600">加入我们</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-orange-600">联系我们</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">关注我们</h3>
              <div className="flex gap-4">
                <Link href="/social-links" className="text-gray-600 hover:text-orange-600">社交媒体</Link>
                <Link href="/wechat" className="text-gray-600 hover:text-orange-600">微信</Link>
                <Link href="/weibo" className="text-gray-600 hover:text-orange-600">微博</Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-gray-600">
            <p>© 2024 歐冠旅行社. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 