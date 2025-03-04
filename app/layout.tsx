import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./contexts/CartContext";
import HeaderWithSearch from "./components/HeaderWithSearch";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "歐冠旅行社 - 您的旅遊平台",
  description: "发现优质商品，享受购物乐趣",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <HeaderWithSearch />
            <main className="flex-1">
              {children}
            </main>

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
                      <li><Link href="/help" className="text-gray-600 hover:text-orange-600">帮助中心</Link></li>
                      <li><Link href="/shipping" className="text-gray-600 hover:text-orange-600">配送信息</Link></li>
                      <li><Link href="/returns" className="text-gray-600 hover:text-orange-600">退换货政策</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold mb-4">公司信息</h3>
                    <ul className="space-y-2">
                      <li><Link href="/about" className="text-gray-600 hover:text-orange-600">关于我们</Link></li>
                      <li><Link href="/careers" className="text-gray-600 hover:text-orange-600">加入我们</Link></li>
                      <li><Link href="/contact" className="text-gray-600 hover:text-orange-600">联系我们</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold mb-4">关注我们</h3>
                    <div className="flex gap-4">
                      <Link href="/social" className="text-gray-600 hover:text-orange-600">社交媒体</Link>
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
        </CartProvider>
      </body>
    </html>
  );
}
