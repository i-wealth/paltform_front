'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function HeaderSelfManegment() {
  const [activeDropdown, setActiveDropdown] = useState<'features' | 'portfolios' | null>(null)

  const toggleDropdown = (type: 'features' | 'portfolios') => {
    setActiveDropdown(prev => (prev === type ? null : type))
  }

  return (
    <header className="bg-black text-white z-50 relative" dir="rtl">
      {/* Top Bar */}
      <div className="flex items-center py-4 px-6">
        {/* Right: Logo + Brand */}
        <div className="flex items-center gap-4">
          <Image src="/images/logo1.png" alt="Iranwealth Logo" width={40} height={40} />
          <Link href="/" className="text-2xl font-semibold text-white">ایران ولث</Link>
        </div>

        {/* Left: Action Buttons */}
        <div className="flex items-center gap-4 ms-auto">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
            دانلود اپلیکیشن
          </button>
          <button className="bg-white text-black py-2 px-4 rounded-md hover:bg-gray-100 transition">
            ورود / ثبت‌نام
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-start gap-8 py-2 px-6 border-t border-gray-700">
        <button
          onClick={() => toggleDropdown('features')}
          className="text-white hover:text-blue-500 font-semibold transition"
        >
          امکانات
        </button>

        <button
          onClick={() => toggleDropdown('portfolios')}
          className="text-white hover:text-blue-500 font-semibold transition"
        >
          مشاهده پورتفولیوها
        </button>

        <Link href="#" className="text-white hover:text-blue-500 font-semibold transition">
          داشبورد من
        </Link>
      </div>

      {/* Dropdown: امکانات */}
      {activeDropdown === 'features' && (
        <div className="absolute top-full right-0 w-full py-6 px-10 border-t border-gray-700 shadow-2xl backdrop-blur-md bg-black/80 text-white z-40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right">
            {[
              { label: 'مدیریت ثروت شخصی', href: '#wealth' },
              { label: 'پرداخت خودکار اقساط', href: '#payment' },
              { label: 'مبدل تتر به طلا', href: '#convert' },
            ].map(item => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-blue-400 transition font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Dropdown: پورتفولیوها */}
      {activeDropdown === 'portfolios' && (
        <div className="absolute top-full right-0 w-full py-6 px-10 border-t border-gray-700 shadow-2xl backdrop-blur-md bg-black/80 text-white z-40">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-right">
            {[
              { label: 'پورتفولیو ترکیبی', href: '#mixed' },
              { label: 'پورتفولیو طلا', href: '#gold' },
              { label: 'پورتفولیو ارز دیجیتال', href: '#crypto' },
              { label: 'درآمد ثابت', href: '#fixed' },
            ].map(item => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-blue-400 transition font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
