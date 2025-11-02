'use client'

import Image from 'next/image'

export default function Giftgoldcoin() {
  return (
    <section className="bg-[#f7f9fb] py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">

        {/* عکس ۱ */}
        <div className="bg-white rounded-xl flex items-center justify-center p-4">
          <Image
            src="/images/coingift.jpg"
            alt="Asset 1"
            width={200}
            height={200}
            className="rounded-lg"
          />
        </div>

        {/* بلاک هوش مصنوعی */}
        <div className="bg-[#ecf2f7] rounded-xl flex flex-col justify-center items-center text-center p-4">
          <p className="text-sm text-gray-500">سرمایه گذاری هوشمند</p>
          <h3 className="text-lg font-semibold text-gray-700">هوش مصنوعی</h3>
          <Image
            src="/images/ai-icon.png"
            alt="AI Icon"
            width={100}
            height={100}
            className="mt-2"
          />
        </div>

        {/* رنگی ساده */}
        <div className="bg-blue-500 rounded-xl" />

        {/* بلاک آماری */}
        <div className="bg-white rounded-xl flex flex-col justify-center items-center p-4 text-right">
          <p className="text-sm text-gray-500 w-full">قیمت لحظه‌ای تتر</p>
          <h2 className="text-2xl font-bold text-gray-800 w-full text-left">
            82,450 <span className="text-sm text-gray-500">USD</span>
          </h2>
          <span className="text-xs text-blue-500 w-full text-left">+2.6% / 7d</span>
        </div>

        {/* سفارش کارت هدیه */}
        <div className="bg-[#072F69] text-white col-span-2 rounded-xl p-6 flex flex-col justify-between">
          <h2 className="text-3xl font-bold mb-2">سفارش کارت هدیه</h2>
          <p className="text-sm text-gray-300 mb-4">
            سفارش کارت هدیه طلا و کارت هدیه تتر
          </p>
          <button className="bg-white text-black text-sm rounded-lg px-4 py-2 mt-auto w-fit">
            درخواست سفارش
          </button>
        </div>

        {/* عکس ۲ */}
        <div className="bg-white rounded-xl flex items-center justify-center p-4">
          <Image
            src="/images/goldgift.jpg"
            alt="Asset 2"
            width={200}
            height={200}
            className="rounded-lg"
          />
        </div>

        {/* دایره آبی ساده */}
        <div className="bg-[#d4e5f5] rounded-xl flex items-center justify-center">
          <div className="w-20 h-20 bg-blue-700 rounded-full" />
        </div>
      </div>
    </section>
  )
}
