'use client'

import { useState } from 'react'

export default function UserTransactions() {
  const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور']
  const [activeMonth, setActiveMonth] = useState(months[0])
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)

  const formatCurrency = (num: number) => num.toLocaleString('fa-IR') + ' تومان'

  const sections = [
    {
      title: '📊 خرید و فروش‌های کاربر',
      key: 'userTrades',
      color: 'bg-yellow-50',
      data: {
        فروردین: [
          { time: '14:30', total: 2500000, items: ['خرید طلا', 'فروش تتر'], status: 'Completed' },
          { time: '14:30', total: 2500000, items: ['خرید طلا', 'فروش تتر'], status: 'Completed' },
          { time: '14:30', total: 2500000, items: ['خرید طلا', 'فروش تتر'], status: 'Completed' },
          { time: '14:30', total: 2500000, items: ['خرید طلا', 'فروش تتر'], status: 'Completed' },
        ],
        اردیبهشت: [
          { time: '14:30', total: 2500000, items: ['خرید طلا', 'فروش تتر'], status: 'Completed' },
          { time: '14:30', total: 2500000, items: ['خرید طلا', 'فروش تتر'], status: 'Completed' },
          { time: '14:30', total: 2500000, items: ['خرید طلا', 'فروش تتر'], status: 'Completed' },
        ],
        خرداد: [
          { time: '14:30', total: 2500000, items: ['خرید طلا', 'فروش تتر'], status: 'Completed' },
          { time: '14:30', total: 2500000, items: ['خرید طلا', 'فروش تتر'], status: 'Completed' },
        ],
        تیر: [
          { time: '14:30', total: 2500000, items: ['خرید طلا', 'فروش تتر'], status: 'Completed' },
          { time: '14:30', total: 2500000, items: ['خرید طلا', 'فروش تتر'], status: 'Completed' },
          { time: '14:30', total: 2500000, items: ['خرید طلا', 'فروش تتر'], status: 'Completed' },
        ],
        مرداد: [
          { time: '14:30', total: 2500000, items: ['خرید طلا', 'فروش تتر'], status: 'Completed' },
          { time: '14:30', total: 2500000, items: ['خرید طلا', 'فروش تتر'], status: 'Completed' },
          { time: '14:30', total: 2500000, items: ['خرید طلا', 'فروش تتر'], status: 'Completed' },
        ],
        شهریور: [
          { time: '12:00', total: 5000000, items: ['فروش طلا'], status: 'Completed' },
          { time: '12:00', total: 5000000, items: ['فروش طلا'], status: 'Completed' },
        ],
      },
    },
    {
      title: '📊 خرید و فروش پورتفولیو',
      key: 'portfolioTrades',
      color: 'bg-blue-50',
      data: {
        فروردین: [
          { id: 'p1', user: 'پورتفولیو رشد', time: '11:00', total: 15000000, items: ['خرید صندوق'], status: 'Completed' },
        ],
        اردیبهشت: [
          { id: 'p1', user: 'پورتفولیو رشد', time: '11:00', total: 15000000, items: ['خرید صندوق'], status: 'Completed' },
        ],
        خرداد: [
          { id: 'p1', user: 'پورتفولیو رشد', time: '11:00', total: 15000000, items: ['خرید صندوق'], status: 'Completed' },
        ],
        تیر: [
          { id: 'p1', user: 'پورتفولیو رشد', time: '11:00', total: 15000000, items: ['خرید صندوق'], status: 'Completed' },
        ],
        مرداد: [
          { id: 'p1', user: 'پورتفولیو رشد', time: '11:00', total: 15000000, items: ['خرید صندوق'], status: 'Completed' },
        ],
        شهریور: [
          { id: 'p2', user: 'پورتفولیو متعادل', time: '16:00', total: 12000000, items: ['فروش سهم'], status: 'Completed' },
        ],
      },
    },
    {
      title: '📊 واریز و برداشت وجه',
      key: 'fundTransfers',
      color: 'bg-green-50',
      data: {
        فروردین: [
          {   time: '09:30', total: 1000000, items: ['واریز از کارت'], status: 'Completed' },
        ],
        اردیبهشت: [
          {   time: '09:30', total: 1000000, items: ['واریز از کارت'], status: 'Completed' },
        ],
        خرداد: [
          {   time: '09:30', total: 1000000, items: ['واریز از کارت'], status: 'Completed' },
        ],
        تیر: [
          {   time: '09:30', total: 1000000, items: ['واریز از کارت'], status: 'Completed' },
        ],
        مرداد: [
          {   time: '09:30', total: 1000000, items: ['واریز از کارت'], status: 'Completed' },
        ],
        شهریور: [
          {   time: '10:15', total: 2000000, items: ['برداشت به حساب'], status: 'In Progress' },
        ],
      },
    },
    {
      title: '🔁 تبدیل دارایی‌ها',
      key: 'assetConversions',
      color: 'bg-purple-50',
      data: {
        فروردین: [
          {  time: '17:00', total: 4500000, items: ['تتر → طلا'], status: 'Completed' },
        ],
        اردیبهشت: [
          {  time: '17:00', total: 4500000, items: ['تتر → طلا'], status: 'Completed' },
        ],
        خرداد: [
          {  time: '17:00', total: 4500000, items: ['طلا → تتر'], status: 'Completed' },
        ],
        تیر: [
          {  time: '17:00', total: 4500000, items: ['تتر → طلا'], status: 'Completed' },
        ],
        مرداد: [
          { time: '17:00', total: 4500000, items: ['تتر → طلا'], status: 'Completed' },
        ],
        شهریور: [
          {  time: '18:30', total: 7000000, items: ['طلا → ملک'], status: 'Completed' },
        ],
      },
    },
  ]

  return (
    <div className="space-y-10 p-4 md:p-6">
      {sections.map((section) => (
        <div key={section.key} className={`${section.color} rounded-xl p-4 shadow-md`}>
          {/* عنوان و تب‌ها */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">{section.title}</h3>
            <div className="flex gap-1 overflow-x-auto scrollbar-hide">
              {months.map((m) => (
                <button
                  key={m + section.key}
                  onClick={() => setActiveMonth(m)}
                  className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition ${
                    activeMonth === m
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white border text-gray-700'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* کارت‌ها - ۳ ستون، ۴ ردیف و اسکرول افقی */}
          <div className="overflow-x-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 min-w-[900px]">
              {(section.data[activeMonth] || []).slice(0, 4).map((tx, index) => (
                <div
                  key={tx.id || index}
                  className="bg-white border rounded-xl p-4 shadow-sm flex flex-col justify-between min-w-[280px]"
                >
                  {tx.user && <div className="text-sm font-semibold text-gray-700 mb-1">{tx.user}</div>}
                  <div className="text-xs text-gray-500 mb-2">ساعت {tx.time}</div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {tx.items.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                  <div className="mt-3 text-sm font-bold text-gray-800">مجموع: {formatCurrency(tx.total)}</div>
                  <div className="flex justify-between items-center mt-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        tx.status === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {tx.status === 'Completed' ? 'تکمیل‌شده' : 'در حال انجام'}
                    </span>
                    <button
                      onClick={() => setSelectedTransaction(tx)}
                      className="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                      جزئیات
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Modal جزئیات تراکنش */}
      {selectedTransaction && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h3 className="text-lg font-bold mb-3">📄 جزئیات تراکنش</h3>
            <p><b>کاربر:</b> {selectedTransaction.user}</p>
            <p><b>زمان:</b> {selectedTransaction.time}</p>
            <p><b>موارد:</b></p>
            <ul className="list-disc list-inside text-sm text-gray-700 mb-3">
              {selectedTransaction.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p><b>مبلغ:</b> {formatCurrency(selectedTransaction.total)}</p>
            <div className="text-right mt-4">
              <button
                onClick={() => setSelectedTransaction(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
