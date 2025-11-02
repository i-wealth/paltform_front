'use client'

import { motion } from 'framer-motion'
import { FaCoins, FaBitcoin, FaHome } from 'react-icons/fa'

type AssetItemProps = {
  title: string
  value: string
  percent: number
  icon: React.ReactNode
  bgColor: string
  ringColor: string
}

function AssetItem({ title, value, percent, icon, bgColor, ringColor }: AssetItemProps) {
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  return (
    <div className="relative flex flex-col items-center justify-between rounded-2xl p-4 sm:p-5 lg:p-6 text-center bg-white/30 backdrop-blur-xl border border-white/30 shadow-3xl transition-all duration-300 group overflow-hidden h-full">
      {/* Glow */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-white via-blue-100 to-transparent opacity-20 blur-2xl rounded-full group-hover:opacity-30 transition-all" />

      {/* Icon (responsive) */}
      <div className={`w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center ${bgColor} text-white text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-5 shadow-lg`}>
        {icon}
      </div>

      {/* Animated Progress Circle (responsive) */}
      <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 mb-4 md:mb-6">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 96 96" aria-hidden="true">
          <circle
            className="text-gray-300"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="48"
            cy="48"
          />
          <motion.circle
            className={ringColor}
            strokeWidth="10"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="48"
            cy="48"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-base md:text-lg lg:text-xl font-bold text-gray-800 drop-shadow-sm">
          {percent}%
        </div>
      </div>

      {/* Title & Value (responsive) */}
      <div className="flex flex-col gap-1 mt-auto">
        <h4 className="text-gray-800 font-semibold text-base md:text-lg">{title}</h4>
        <p className="text-emerald-600 text-sm md:text-base font-medium">{value}</p>
      </div>
    </div>
  )
}

export default function DistributionChart() {
  return (
    // اگر RTL لازم دارید، dir="rtl" را فعال کنید
    <div dir="rtl" className="relative w-full max-w-7xl mx-auto rounded-3xl px-4 sm:px-6 lg:px-8 py-8 lg:py-10 bg-white/30 backdrop-blur-2xl border border-white/30 shadow-3xl ring-1 ring-white/20 overflow-hidden group">
      {/* Glow background */}
      <div className="absolute -top-16 -left-12 w-52 h-52 bg-gradient-to-br from-lime-200 via-white to-transparent opacity-20 rounded-full blur-2xl group-hover:opacity-30 transition-all pointer-events-none" />

      <div className="text-center mb-6 md:mb-8">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 drop-shadow">میزان دارایی‌ها به تفکیک</h3>
      </div>

      {/* Grid: 1 → 2 → 3 → 4 ستون (بدون حذف آیتم‌ها) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8 items-stretch">
        <AssetItem
          title="طلای آبشده"
          value="94,000,000 تومان"
          percent={79}
          icon={<FaCoins />}
          bgColor="bg-cyan-500"
          ringColor="text-cyan-400"
        />
        <AssetItem
          title="ارز دیجیتال"
          value="45,000,000 تومان"
          percent={30}
          icon={<FaBitcoin />}
          bgColor="bg-purple-500"
          ringColor="text-purple-400"
        />
        <AssetItem
          title="توکن ملک"
          value="22,000,000 تومان"
          percent={25}
          icon={<FaHome />}
          bgColor="bg-green-500"
          ringColor="text-green-400"
        />
        {/* اسلات خالی برای آینده یا پرکردن گرید 4 ستونه روی دسکتاپ (بدون حذف بخش‌ها) */}
        <div className="hidden xl:block">
          <div className="h-full rounded-2xl border border-dashed border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center text-sm text-gray-500">
            اسلات دارایی بعدی
          </div>
        </div>
      </div>

      {/* فاصله پایین برای موبایل کمتر، دسکتاپ بیشتر */}
      <div className="mt-6 lg:mt-10" />
    </div>
  )
}
