'use client'

import { FaCalendarAlt, FaLightbulb, FaChild } from 'react-icons/fa'
import { IoIosArrowBack } from 'react-icons/io'

type Props = {
  onSelect: () => void
}

export default function SmartInvestOptions({ onSelect }: Props) {
  return (
    <div className="max-w-xl mx-auto bg-white shadow rounded-xl p-4 space-y-4">
      <h2 className="text-right text-gray-600 font-semibold text-sm px-2">خدمات پرکاربرد</h2>

      {/* سرمایه‌گذاری مستمر */}
      <div className="flex items-center justify-between rounded-xl border px-4 py-3 bg-gray-50">
        <div className="flex items-center gap-3">
          <FaCalendarAlt className="text-sky-500 text-2xl" />
          <div className="text-right">
            <div className="flex items-center gap-2">
              <h3 className="font-bold">سرمایه‌گذاری مستمر</h3>
              <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                جدید
              </span>
            </div>
            <p className="text-sm text-gray-500">امکان ایجاد زمانبندی برای پس‌اندازهای شما</p>
          </div>
        </div>
        <IoIosArrowBack className="text-gray-400 text-xl" />
      </div>

      {/* سرمایه‌گذاری هوشمند */}
      <button
        onClick={onSelect}
        className="w-full text-right flex items-center justify-between rounded-xl border px-4 py-3 bg-gray-50 hover:bg-gray-100"
      >
        <div className="flex items-center gap-3">
          <FaLightbulb className="text-sky-500 text-2xl" />
          <div className="text-right">
            <h3 className="font-bold">سرمایه‌گذاری هوشمند</h3>
            <p className="text-sm text-gray-500">پیشنهاد سرمایه‌گذاری متناسب با ریسک شما</p>
          </div>
        </div>
        <IoIosArrowBack className="text-gray-400 text-xl" />
      </button>

      {/* سرمایه‌گذاری فرزند */}
      <div className="flex items-center justify-between rounded-xl border px-4 py-3 bg-gray-50">
        <div className="flex items-center gap-3">
          <FaChild className="text-sky-500 text-2xl" />
          <div className="text-right">
            <h3 className="font-bold">سرمایه‌گذاری برای فرزند</h3>
            <p className="text-sm text-gray-500">سرمایه‌گذاری برای آینده فرزندتان</p>
          </div>
        </div>
        <IoIosArrowBack className="text-gray-400 text-xl" />
      </div>
    </div>
  )
}
