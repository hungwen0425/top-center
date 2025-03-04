'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Edit2, Camera } from 'lucide-react';
import AccountLayout from '../components/layouts/AccountLayout';

const orders = [
  {
    id: 'ORD001',
    date: '2024-03-15',
    status: '已发货',
    total: 798,
    items: [
      {
        id: 1,
        name: "时尚休闲包",
        price: 299,
        image: "https://picsum.photos/400/400?random=1",
        quantity: 1
      },
      {
        id: 2,
        name: "运动鞋",
        price: 499,
        image: "https://picsum.photos/400/400?random=2",
        quantity: 1
      }
    ]
  }
];

export default function UserAccountPage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <AccountLayout>
      <div className="space-y-8">
        {/* Profile Section */}
        <div className="flex items-start gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <Image
                src="https://picsum.photos/200/200"
                alt="用户头像"
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-sm">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xl font-bold">用户名</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-gray-600 hover:text-purple-600"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-600">user@example.com</p>
            <p className="text-gray-600">手机：138****8888</p>
          </div>
        </div>

        {/* Recent Orders */}
        <div>
          <h2 className="text-xl font-bold mb-4">最近订单</h2>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                  <div>
                    <span className="font-semibold">订单号：{order.id}</span>
                    <span className="text-gray-600 ml-4">{order.date}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-purple-600 font-bold">¥{order.total}</span>
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-gray-600">数量：{item.quantity}</p>
                          <p className="text-purple-600 font-bold">¥{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Account Settings */}
        <div>
          <h2 className="text-xl font-bold mb-4">账户设置</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">修改密码</h3>
              <p className="text-gray-600 text-sm mb-4">定期更改密码可以提高账户安全性</p>
              <button className="text-purple-600 hover:text-purple-700 text-sm">
                修改密码 →
              </button>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">通知设置</h3>
              <p className="text-gray-600 text-sm mb-4">管理您接收的通知类型</p>
              <button className="text-purple-600 hover:text-purple-700 text-sm">
                管理通知 →
              </button>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">隐私设置</h3>
              <p className="text-gray-600 text-sm mb-4">控制您的个人信息显示</p>
              <button className="text-purple-600 hover:text-purple-700 text-sm">
                隐私设置 →
              </button>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">账户安全</h3>
              <p className="text-gray-600 text-sm mb-4">查看您的账户安全状态</p>
              <button className="text-purple-600 hover:text-purple-700 text-sm">
                安全设置 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
} 