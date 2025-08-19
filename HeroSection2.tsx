'use client'
import React from 'react';

export default function HeroSection2() {
  return (
    <section className="bg-white py-16 px-6 md:px-20" dir="rtl">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12 text-center md:text-right">
        
        {/* متن سمت راست */}
        <div className="md:order-1 order-2 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold leading-loose text-black">
            خرید و فروش <span className="text-yellow-600"> طلای آبشده</span><br />
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            خرید انواع طلا به صورت رسمی و تضمین‌شده با هر میزان سرمایه دلخواه در هر لحظه
            شبانه‌روز در آی گلد 
          </p>

          <div className="flex flex-col md:flex-row justify-center md:justify-end gap-4 mt-6">
            <button className="bg-blue-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition">
              خرید طلا
            </button>
            <button className="border border-gray-400 px-6 py-3 rounded-lg font-semibold text-gray-300 hover:bg-gray-700 transition">
              قابلیت تبدیل با ارزهای دیجیتال
            </button>
          </div>

          <button className="text-xs text-white pt-2 bg-blue-600 pr-3 pl-3 pb-3" >    مجوزهای ایران ولث   </button>
        </div>

        {/* گیف سمت چپ */}
        <div className="relative w-full h-80 md:h-96 md:order-2 order-1">
          <img
            src="/images/goldgift1.gif"
            alt="GIF Animation"
            className="w-full h-full object-contain mx-auto"
          />
        </div>
      </div>
    </section>
  )
}
