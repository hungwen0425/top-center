'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Mail, MessageSquare } from 'lucide-react';

interface InfoLayoutProps {
  children: React.ReactNode;
}

export default function InfoLayout({ children }: InfoLayoutProps) {
  const pathname = usePathname();

  const menuItems = [
    { href: '/company-info', label: '公司简介' },
    { href: '/company-info/history', label: '发展历程' },
    { href: '/company-info/mission', label: '企业使命' },
    { href: '/company-info/team', label: '团队介绍' },
    { href: '/company-info/location', label: '公司地址' },
  ];

  const supportItems = [
    { href: '/customer-service', label: '帮助中心' },
    { href: '/customer-service/faq', label: '常见问题' },
    { href: '/customer-service/contact', label: '联系我们' },
    { href: '/customer-service/chat', label: '在线客服' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Side Navigation */}
        <nav className="md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="font-bold mb-4">公司信息</h2>
            <div className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    block px-4 py-2 rounded-lg
                    ${pathname === item.href
                      ? 'bg-orange-50 text-orange-600'
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <h2 className="font-bold mt-8 mb-4">客户支持</h2>
            <div className="space-y-2">
              {supportItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    block px-4 py-2 rounded-lg
                    ${pathname === item.href
                      ? 'bg-orange-50 text-orange-600'
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-8 p-4 bg-orange-50 rounded-lg">
              <h3 className="font-semibold mb-3">需要帮助？</h3>
              <div className="space-y-3">
                <a href="tel:400-123-4567" className="flex items-center gap-2 text-gray-600 hover:text-orange-600">
                  <Phone className="w-4 h-4" />
                  <span>400-123-4567</span>
                </a>
                <a href="mailto:support@topcenter.com" className="flex items-center gap-2 text-gray-600 hover:text-orange-600">
                  <Mail className="w-4 h-4" />
                  <span>support@topcenter.com</span>
                </a>
                <button className="flex items-center gap-2 text-gray-600 hover:text-orange-600">
                  <MessageSquare className="w-4 h-4" />
                  <span>在线客服</span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 