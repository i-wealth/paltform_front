'use client'

import { FaArrowDown, FaArrowUp } from 'react-icons/fa'

const transactions = [
  { title: 'خرید بیت‌کوین', date: '1404/01/01', amount: 16000000, type: 'income' },
  { title: 'فروش تتر', date: '1404/01/03', amount: -140000, type: 'expense' },
  { title: 'خرید اتریوم', date: '1404/01/05', amount: 2500000, type: 'income' },
]

export default function TransactionsHistory() {
  return (
    <div className="relative w-full rounded-2xl p-6 bg-white/40 backdrop-blur-xl border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden group">
      {/* Glow effect */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-blue-200 via-white to-transparent opacity-20 rounded-full blur-2xl group-hover:opacity-30 transition-all" />

      <h3 className="text-lg font-bold text-gray-800 mb-6">تراکنش‌های ارز دیجیتال</h3>

      <div className="space-y-5">
        {transactions.map((tx, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-white/20 pb-4"
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
    </div>
  )
}
