 'use client'

import React, { useState } from 'react'
import Image from 'next/image'

export default function CryptoHeader() {
  const [activeDropdown, setActiveDropdown] = useState<'invest' | 'smart' | null>(null)

  const toggleDropdown = (type: 'invest' | 'smart') => {
    setActiveDropdown(prev => (prev === type ? null : type))
  }

  return (
    <header className="bg-black text-white z-50 relative" dir="rtl">
    {/* Top Bar */}
<div className="flex items-center justify-between py-4 px-6" dir="rtl">
  {/* Right side: لوگو + متن */}
  <div className="flex items-center gap-4">
    <Image
      src="/images/logo1.png"
      alt="Iranwealth Logo"
      width={40}
      height={40}
    />
    <a href="/" className="text-2xl font-semibold text-white">ایران ولث</a>
  </div>

  {/* Left side: دکمه‌ها */}
  <div className="flex items-center gap-4">
    <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
      دانلود اپلیکیشن
    </button>
    <button className="bg-white text-black py-2 px-4 rounded-md hover:bg-gray-100 transition">
      ورود به حساب
    </button>
  </div>
</div>


      {/* Nav Bar - تب‌ها */}
      <div className="flex items-center justify-start gap-8 py-2 px-6 border-t border-gray-700">
        <button
          onClick={() => toggleDropdown('invest')}
          className="text-white hover:text-blue-500 font-semibold transition"
        >
          سرمایه‌گذاری
        </button>

        <button
          onClick={() => toggleDropdown('smart')}
          className="text-white hover:text-blue-500 font-semibold transition"
        >
          سرمایه‌گذاری هوشمند
        </button>

        <a href="#" className="text-white hover:text-blue-500 font-semibold transition">
          داشبورد
        </a>
      </div>

      {/* Mega Menu: سرمایه‌گذاری */}
      {activeDropdown === 'invest' && (
        <div className="absolute top-full right-0 w-full py-6 px-10 border-t border-gray-700 shadow-2xl backdrop-blur-md bg-black/80 text-white z-40">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-right">
            {[
              { label: 'iGold', href: '#' },
              { label: 'iCoin', href: '#' },
              { label: 'iMelk', href: '#' },
              { label: 'کیف پول', href: '#' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-blue-400 transition font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Mega Menu: سرمایه‌گذاری هوشمند */}
      {activeDropdown === 'smart' && (
        <div className="absolute top-full right-0 w-full py-6 px-10 border-t border-gray-700 shadow-2xl backdrop-blur-md bg-black/80 text-white z-40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right">
            {[
              { label: 'پورتفولیوی هوشمند', href: '#' },
              { label: 'بودجه‌بندی هوشمند', href: '#' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-blue-400 transition font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
