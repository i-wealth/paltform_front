'use client'
import React from 'react';


export default function HeroSection() {
  return (
    <section className="bg-black py-16 px-6 md:px-20" dir="rtl">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12 text-center md:text-right">
        
        {/* متن سمت راست */}
        <div className="md:order-1 order-2 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold leading-loose text-white">
            خرید و فروش <span className="text-blue-600">ارزدیجیتال</span><br />
          </h1>
          <p className="text-gray-300 text-base md:text-lg">
            خرید ارزدیجیتال به صورت رسمی و تضمین‌شده با هر میزان سرمایه دلخواه در هر لحظه
            شبانه‌روز در آی کوین 
          </p>

          <div className="flex flex-col md:flex-row justify-center md:justify-end gap-4 mt-6">
            <button className="bg-blue-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition">
              خرید ارزدیجیتال
            </button>
            <button className="border border-gray-400 px-6 py-3 rounded-lg font-semibold text-gray-300 hover:bg-gray-700 transition">
              قابلیت تبدیل با طلا
            </button>
          </div>

          <p className="text-xs text-gray-500 pt-2">مجوزهای ایران ولث </p>
        </div>

        {/* گیف سمت چپ */}
        <div className="relative w-full h-80 md:h-96 md:order-2 order-1">
          <img
            src="/images/11.gif"
            alt="GIF Animation"
            className="w-full h-full object-contain mx-auto"
          />
        </div>
      </div>
    </section>
  )
}
