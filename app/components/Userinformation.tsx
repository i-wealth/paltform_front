'use client'
import { useState, useMemo } from 'react'

type WalletItem = {
  name: string
  amount: string
}

type AllocationItem = {
  name: string
  percent: number
}

type WalletData = {
  wallets: WalletItem[]
  allocation: AllocationItem[]
  total?: string
}

function parseAmount(str: string): number {
  const clean = str.replace(/[$, تومان]/g, '').replace(/٬/g, '')
  return parseFloat(clean) || 0
}

export default function UserInformation() {
  const [activeTab, setActiveTab] = useState<'toman' | 'gold' | 'crypto'>('crypto')

  const walletData: Record<'toman' | 'gold' | 'crypto', WalletData> = {
    toman: {
      allocation: [
        { name: 'واریزی بانک ملت', percent: 0 }, // درصد بعداً محاسبه میشه
        { name: 'واریزی بانک ملی', percent: 0 },
      ],
      wallets: [
        { name: 'بانک ملت', amount: '6,000,000 تومان' },
        { name: 'بانک ملی', amount: '29,000,000 تومان' },
      ],
    },
    gold: {
      allocation: [
        { name: 'طلای آب‌شده', percent: 0 },
        { name: 'سکه', percent: 0 },
      ],
      wallets: [
        { name: 'طلای آب‌شده', amount: '13,000,000 تومان' },
        { name: 'سکه طلا', amount: '10,000,000 تومان' },
      ],
    },
    crypto: {
      allocation: [
        { name: 'BTC', percent: 0 },
        { name: 'STE', percent: 0 },
        { name: 'XRP', percent: 0 },
        { name: 'USDT', percent: 0 },
      ],
      wallets: [
        { name: 'بیت کوین', amount: '$3,256' },
        { name: 'تتر', amount: '$1,123' },
        { name: 'سولانا', amount: '$2,789' },
        { name: 'اتریوم', amount: '$1,523' },
      ],
    },
  }

  const current = useMemo(() => {
    const wallets = walletData[activeTab].wallets
    const allocation = walletData[activeTab].allocation

    // محاسبه مجموع دارایی
    const total = wallets.reduce((sum, w) => sum + parseAmount(w.amount), 0)

    // محاسبه درصدها
    const allocationWithPercent = wallets.map((wallet) => ({
      name: wallet.name,
      percent: Math.round((parseAmount(wallet.amount) / total) * 100),
    }))

    return {
      wallets,
      total,
      chartPercent: allocationWithPercent[0]?.percent ?? 0,
      allocation: allocationWithPercent,
    }
  }, [activeTab])

  return (
    <div className="p-6 bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen space-y-8 font-sans">

      {/* ✅ تب‌بندی */}
      <div className="flex justify-center gap-4">
        {['تومان', 'طلا', 'ارزدیجیتال'].map((tab, i) => {
          const keys: ('toman' | 'gold' | 'crypto')[] = ['toman', 'gold', 'crypto']
          return (
            <button
              key={i}
              onClick={() => setActiveTab(keys[i])}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
                activeTab === keys[i]
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 shadow-sm'
              }`}
            >
              {tab}
            </button>
          )
        })}
      </div>

      {/* ✅ باکس اطلاعات اصلی */}
      <div className="bg-white rounded-2xl shadow-md p-6 grid md:grid-cols-3 gap-6 items-center">
        {/* ترکیب دارایی */}
        <div className="text-center md:text-right">
          <h3 className="text-sm text-gray-600 mb-2">ترکیب دارایی</h3>
          <ul className="text-xs text-gray-700 space-y-1">
            {current.allocation.map((item, index) => (
              <li key={index}>{item.name} - {item.percent}%</li>
            ))}
          </ul>
        </div>

        {/* چارت درصدی */}
        <div className="col-span-1 flex justify-center">
          <div className="relative w-[100px] h-[100px]">
            <svg viewBox="0 0 36 36" className="w-full h-full">
              <path className="text-gray-200 stroke-current" strokeWidth="3" fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-yellow-400 stroke-current" strokeWidth="3" fill="none"
                strokeDasharray={`${current.chartPercent}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-semibold text-gray-800">{current.chartPercent}%</span>
            </div>
          </div>
        </div>

        {/* موجودی کل */}
        <div className="text-center md:text-left">
          <h2 className="text-sm font-bold text-gray-700">موجودی کل</h2>
          <p className="text-3xl font-mono text-gray-900 mt-1">
            {activeTab === 'crypto'
              ? `$${current.total.toLocaleString()}`
              : `${current.total.toLocaleString()} تومان`}
          </p>
          <div className="flex justify-center md:justify-start gap-2 mt-4">
            <button className="bg-sky-500 text-white px-4 py-2 rounded-xl text-sm">خرید</button>
            <button className="bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm">فروش</button>
          </div>
        </div>
      </div>

      {/* ✅ کارت‌های کیف پول */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {current.wallets.map((wallet, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 shadow bg-white p-4 text-center"
          >
            <p className="text-sm font-bold text-gray-600">{wallet.name}</p>
            <p className="mt-2 text-lg font-mono text-indigo-700">{wallet.amount}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
