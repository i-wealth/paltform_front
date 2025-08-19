'use client'

import { useState } from 'react'

export default function RealStateInvestmentCalculator() {
  
  const [amount, setAmount] = useState(29) // میلیون تومان
  const [duration, setDuration] = useState(1) // ماه

  const monthlyProfitRate = 0.03 // سود ماهانه معادل حدود 30٪ سالانه
  const estimatedReturn = Math.round(amount * 1_000_000 * Math.pow(1 + monthlyProfitRate, duration))

  return (
    <section className="bg-[#0A004B] min-h-screen py-12 px-4 text-white" dir="rtl">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Result Section */}
        <div className="bg-[#18025A] rounded-2xl p-8 flex flex-col items-center justify-center space-y-6 shadow-lg">
          <h2 className="text-xl font-bold">نتیجه سرمایه‌گذاری</h2>
          <div className="bg-white text-[#0A004B] text-3xl font-extrabold rounded-xl py-4 px-6 shadow">
            {estimatedReturn.toLocaleString('fa-IR')} تومان
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-xl text-lg font-semibold transition">
            دریافت مشاوره رایگان
          </button>
        </div>

        {/* Calculator Form */}
        <div className="space-y-10">
          {/* Title */}
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-extrabold text-orange-400 mb-2">در ایران ولث  چقدر سود می‌کنید؟</h3>
            <p className="text-sm text-white/80">از طریق ماشین حساب زیر می‌توانید ببینید با چقدر سرمایه‌گذاری، در چه مدت، چقدر سود بدست می‌آورید!</p>
          </div>

          {/* Investment Amount */}
          <div className="bg-white text-[#0A004B] p-6 rounded-xl space-y-3">
            <label className="block font-bold text-sm">مبلغ سرمایه‌گذاری</label>
            <input
              type="range"
              min={1}
              max={100}
              value={amount}
              onChange={(e) => setAmount(+e.target.value)}
              className="w-full"
            />
            <p className="text-lg font-bold">{amount} میلیون تومان</p>
          </div>

          {/* Duration */}
          <div className="bg-white text-[#0A004B] p-6 rounded-xl space-y-3">
            <label className="block font-bold text-sm">مدت سرمایه‌گذاری</label>
            <input
              type="range"
              min={1}
              max={24}
              value={duration}
              onChange={(e) => setDuration(+e.target.value)}
              className="w-full"
            />
            <p className="text-lg font-bold">{duration} ماه</p>
          </div>
        </div>
      </div>
    </section>
  )
}
