'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<'invest' | 'smart' | null>(null);
  const router = useRouter()
  const handleClick = (route: string):void => {
    router.push(route);
  };

  const toggleDropdown = (type: 'invest' | 'smart') => {
    setActiveDropdown(prev => (prev === type ? null : type))
  }
  let raw;
  if (typeof window !== 'undefined') {
   raw = localStorage.getItem('userProfile')
  }

  /* --- افزوده: وضعیت باز/بسته بودن منوی موبایل برای الهام از DashboardHeader --- */
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-black text-white z-50 relative w-full" dir="rtl">
      {/* Top Bar */}
      <div
        className="
          flex
          items-center
          max-w-[1084px]
          w-full
          mx-auto
          px-3
          md:px-6
          py-3
        "
      >
        {/* Right: لوگو و برند */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          <Image
            src="/images/logo1.png"
            alt="Iranwealth Logo"
            width={100}
            height={100}
            className="w-12 h-12 md:w-[100px] md:h-[100px]" /* اندازه‌ها شبیه نمونه */
          />
          <a
            href="/"
            className="text-xl md:text-2xl font-semibold text-white"
          >
            ایران ولث
          </a>
        </div>

        {/* دکمهٔ منوی موبایل (الهام از نمونه دوم) */}
        <button
          type="button"
          aria-label={mobileOpen ? 'بستن منو' : 'باز کردن منو'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="
            md:hidden
            inline-flex
            items-center
            justify-center
            p-2
            rounded-lg
            border
            border-white/20
            ms-auto
          "
        >
          <span className="sr-only">Toggle menu</span>
          <span
            className={`block h-0.5 w-6 transition-all ${mobileOpen ? 'rotate-45 translate-y-[3px]' : ''}`}
            style={{ backgroundColor: '#fff' }}
          />
          <span
            className={`block h-0.5 w-6 my-1 transition-opacity ${mobileOpen ? 'opacity-0' : 'opacity-100'}`}
            style={{ backgroundColor: '#fff' }}
          />
          <span
            className={`block h-0.5 w-6 transition-all ${mobileOpen ? '-rotate-45 -translate-y-[3px]' : ''}`}
            style={{ backgroundColor: '#fff' }}
          />
        </button>

        {/* Left: دکمه‌ها */}
        <div
          className="
            hidden
            md:flex
            items-center
            gap-3
            sm:gap-4
            ms-auto
            flex-shrink-0
          "
        >
          <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
            دانلود اپلیکیشن
          </button>
          <button
            className="bg-white text-black py-2 px-4 rounded-md hover:bg-gray-100 transition"
            onClick={() => handleClick('/login')}
            hidden={raw ? true : false}
          >
            ورود به حساب
          </button>
        </div>
      </div>

      {/* Nav Bar - تب‌ها (نمای دسکتاپ) */}
      <div
        className="
          hidden
          md:flex
          items-center
          justify-start
          gap-6
          lg:gap-8
          py-2
          px-3
          md:px-6
          border-t
          border-gray-700
          max-w-[1084px]
          w-full
          mx-auto
        "
      >
        <button
          onClick={() => toggleDropdown('invest')}
          className="text-white hover:text-blue-400 font-semibold transition"
        >
          سرمایه‌گذاری
        </button>

        <button
          onClick={() => toggleDropdown('smart')}
          className="text-white hover:text-blue-400 font-semibold transition"
        >
          سرمایه‌گذاری هوشمند
        </button>

        <a href="/dashboard" className="text-white hover:text-blue-400 font-semibold transition">
          داشبورد
        </a>

        {/* دکمه‌های سمت چپ برای دسکتاپ (همان بالا هست؛ اگر بخواهی اینجا هم تکرار پذیر است) */}
      </div>

      {/* پنل منوی موبایل (بدون حذف کد؛ فقط افزوده) */}
      <div
        className={`
          md:hidden
          overflow-hidden
          transition-[max-height]
          duration-300
          ${mobileOpen ? 'max-h-[600px]' : 'max-h-0'}
          border-t
          border-white/10
          bg-black
        `}
      >
        <div className="max-w-[1084px] w-full mx-auto px-3 pt-3 pb-4">
          {/* تب‌ها در موبایل */}
          <nav>
            <ul className="flex flex-col gap-1 list-none p-0 m-0">
              <li>
                <button
                  onClick={() => {
                    toggleDropdown('invest');
                  }}
                  className="w-full text-right py-2 font-semibold hover:text-blue-400 transition"
                >
                  سرمایه‌گذاری
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    toggleDropdown('smart');
                  }}
                  className="w-full text-right py-2 font-semibold hover:text-blue-400 transition"
                >
                  سرمایه‌گذاری هوشمند
                </button>
              </li>
              <li>
                <a
                  href="/dashboard"
                  className="block w-full text-right py-2 font-semibold hover:text-blue-400 transition"
                  onClick={() => setMobileOpen(false)}
                >
                  داشبورد
                </a>
              </li>
            </ul>
          </nav>

          {/* دکمه‌های ورود/دانلود در موبایل (از کد موجود استفاده شده، فقط نمایش موبایلی) */}
          <div className="mt-3 flex items-center justify-between gap-3">
            <button className="bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 transition w-full">
              دانلود اپلیکیشن
            </button>
            <button
              className="bg-white text-black py-2 px-3 rounded-md hover:bg-gray-100 transition w-full"
              onClick={() => { setMobileOpen(false); handleClick('/login'); }}
              hidden={raw ? true : false}
            >
              ورود به حساب
            </button>
          </div>
        </div>
      </div>

      {/* Mega Menu: سرمایه‌گذاری (نمای دسکتاپ و تبلت) */}
      {activeDropdown === 'invest' && (
        <div
          className="
            absolute
            top-full
            right-0
            w-full
            py-6
            px-4
            md:px-10
            border-t
            border-gray-700
            shadow-2xl
            backdrop-blur-md
            bg-black/80
            text-white
            z-40
            hidden
            md:block
          "
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-right max-w-[1084px] mx-auto">
            {[
              { label: 'iGold', href: '/gold' },
              { label: 'iCoin', href: '/crypto' },
              { label: 'iMelk', href: '/RealEstateLanding' },
              { label: 'کیف پول', href: '/dashboard' },
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

      {/* Mega Menu: سرمایه‌گذاری هوشمند (نمای دسکتاپ و تبلت) */}
      {activeDropdown === 'smart' && (
        <div
          className="
            absolute
            top-full
            right-0
            w-full
            py-6
            px-4
            md:px-10
            border-t
            border-gray-700
            shadow-2xl
            backdrop-blur-md
            bg-black/80
            text-white
            z-40
            hidden
            md:block
          "
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right max-w-[1084px] mx-auto">
            {[
              { label: 'پورتفولیوی هوشمند', href: '/HomePage' },
              { label: 'بودجه‌بندی هوشمند', href: '/HomePage' },
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

      {/* Mega Menu برای موبایل: همان آیتم‌ها، درون پنل موبایل باز/بسته می‌شوند (بدون حذف کد اصلی) */}
      {/* نکته: بالاتر تب‌ها در موبایل گذاشته شد؛ اگر بخواهی می‌توانیم زیر هر تب، آیتم‌های مگا را هم نمایش دهیم */}
    </header>
  )
}
