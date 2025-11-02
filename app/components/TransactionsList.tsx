'use client'

import { FaArrowDown, FaArrowUp } from 'react-icons/fa'

const transactions = [
  { title: 'خرید بیت‌کوین', date: '1404/01/01', amount: 16000000, type: 'income' },
  { title: 'فروش تتر', date: '1404/01/03', amount: -140000, type: 'expense' },
  { title: 'خرید اتریوم', date: '1404/01/05', amount: 2500000, type: 'income' },
  { title: 'خرید سولانا', date: '1404/01/06', amount: 3000000, type: 'income' },
  { title: 'فروش بیت‌کوین', date: '1404/01/07', amount: -800000, type: 'expense' },
  { title: 'خرید اتریوم', date: '1404/01/08', amount: 2200000, type: 'income' },
  { title: 'فروش تتر', date: '1404/01/09', amount: -450000, type: 'expense' },
]

export default function TransactionsHistory() {
  return (
    <div className="relative w-full rounded-3xl p-6 bg-white/40 backdrop-blur-2xl border border-white/30 shadow-3xl ring-1 ring-white/20 transition-all duration-300 overflow-hidden group">
      {/* افکت نور پس‌زمینه */}
      <div className="absolute -top-10 -left-10 w-52 h-52 bg-gradient-to-br from-sky-200 via-white to-transparent opacity-20 rounded-full blur-2xl group-hover:opacity-30 transition-all" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tr from-purple-200 via-white to-transparent opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-all" />

      {/* عنوان کلی */}
      <h3 className="text-lg font-bold text-gray-800 mb-4">لیست تراکنش‌های اخیر</h3>

      {/* فیلتر دکمه‌ها */}
      <div className="flex gap-2 flex-wrap mb-6 z-10 relative">
        {['واریز', 'واریز مستقیم', 'برداشت', 'تبدیل به دارایی دیگر'].map((f) => (
          <button
            key={f}
            className="px-3 py-1 rounded-full border text-sm hover:bg-yellow-100"
          >
            {f}
          </button>
        ))}
      </div>

      {/* بدنه لیست تراکنش‌ها */}
      {transactions.length > 0 ? (
        <div className="overflow-y-auto pr-2 max-h-[300px] space-y-5 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {transactions.map((tx, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b border-white/30 pb-3"
            >
              <div className="flex items-center gap-4">
                <div className="text-xl">
                  {tx.type === 'income' ? (
                    <FaArrowDown className="text-emerald-500 drop-shadow-sm" />
                  ) : (
                    <FaArrowUp className="text-red-400 drop-shadow-sm" />
                  )}
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-gray-800">{tx.title}</p>
                  <p className="text-xs text-gray-500">{tx.date}</p>
                </div>
              </div>
              <div
                className={`text-sm font-bold ${
                  tx.amount >= 0 ? 'text-emerald-600' : 'text-red-500'
                }`}
              >
                {tx.amount.toLocaleString()} تومان
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 mt-12 z-10 relative">
          <img src="/images/empty-box.png" alt="empty" className="mx-auto w-20 mb-4" />
          <p>تراکنشی یافت نشد</p>
        </div>
      )}
    </div>
  )
}
