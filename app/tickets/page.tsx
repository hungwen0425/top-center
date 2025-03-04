'use client';

import { useState } from 'react';
import { Plane } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { zhTW } from 'date-fns/locale';

export default function TicketsPage() {
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [passengers, setPassengers] = useState(1);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [preferredTime, setPreferredTime] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 這裡可以處理表單提交邏輯
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <Plane className="w-8 h-8 text-orange-600" />
              <h1 className="text-2xl font-bold">機票諮詢服務</h1>
            </div>
            
            <p className="text-gray-600 mb-8">
              找到最適合您的航班！填寫以下表單，我們的專業顧問將為您提供最優惠的機票方案。
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">出發地</label>
                  <input
                    type="text"
                    placeholder="例：台北(TPE)"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">目的地</label>
                  <input
                    type="text"
                    placeholder="例：東京(NRT)"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">預計出發日期</label>
                  <DatePicker
                    selected={departureDate}
                    onChange={date => setDepartureDate(date)}
                    dateFormat="yyyy/MM/dd"
                    minDate={new Date()}
                    locale={zhTW}
                    placeholderText="選擇日期"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">預計回程日期</label>
                  <DatePicker
                    selected={returnDate}
                    onChange={date => setReturnDate(date)}
                    dateFormat="yyyy/MM/dd"
                    minDate={departureDate || new Date()}
                    locale={zhTW}
                    placeholderText="選擇日期"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">旅客人數</label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setPassengers(Math.max(1, passengers - 1))}
                      className="px-3 py-2 border rounded-l-lg hover:bg-gray-100"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={passengers}
                      onChange={(e) => setPassengers(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-3 py-2 border-t border-b text-center focus:outline-none"
                      min="1"
                    />
                    <button
                      type="button"
                      onClick={() => setPassengers(passengers + 1)}
                      className="px-3 py-2 border rounded-r-lg hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">預算範圍（每人）</label>
                  <input
                    type="text"
                    placeholder="例：20000-30000"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-lg font-semibold mb-4">聯絡資訊</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">姓名</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">聯絡電話</label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-600 mb-1">電子郵件</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">方便聯絡時段（可複選）</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['早上 10-13', '下午 13-18', '晚上 18-22', '隨時皆可'].map((time) => (
                    <label key={time} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={preferredTime.includes(time)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setPreferredTime([...preferredTime, time]);
                          } else {
                            setPreferredTime(preferredTime.filter(t => t !== time));
                          }
                        }}
                        className="rounded text-orange-600 focus:ring-orange-600"
                      />
                      <span className="ml-2 text-sm">{time}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">其他需求或備註</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                  placeholder="例：希望有素食餐點、需要輪椅服務等"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  送出諮詢
                </button>
              </div>
            </form>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">為什麼選擇我們的機票諮詢服務？</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2">專業顧問團隊</h3>
                <p className="text-gray-600">經驗豐富的航空票務專家，為您提供最專業的建議。</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">最優惠價格</h3>
                <p className="text-gray-600">與各大航空公司合作，確保您能獲得最優惠的票價。</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">貼心後續服務</h3>
                <p className="text-gray-600">訂票後的各項需求變更，我們都將全力協助處理。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 