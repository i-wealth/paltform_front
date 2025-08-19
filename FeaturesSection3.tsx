'use client'

import Image from 'next/image'

export default function FeaturesSection3() {
  return (
    <section className="bg-white py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto text-center">
        {/* عنوان اصلی */}
        <h2 className="text-4xl font-semibold text-gray-900 mb-4">
          در آکومتر، چقدر سود می‌کنید؟
        </h2>
        <p className="text-lg text-gray-600 mb-10">
          از طریق ماشین حساب زیر می‌تونید ببینید با چقدر سرمایه‌گذاری، در چه مدت، چقدر سود می‌تونید به‌دست بیارید!
        </p>

        {/* کارت‌های ماشین حساب */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* کارت اول */}
          <div className="bg-indigo-900 hover:shadow-lg transition-all duration-300 rounded-xl p-6 flex flex-col items-center text-center border border-indigo-700">
            <div className="w-20 h-20 mb-4 relative">
              <Image
                src="/images/money-icon.gif"
                alt="مبلغ سرمایه‌گذاری"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">مبلغ سرمایه‌گذاری</h3>
            <p className="text-sm text-gray-300">۲۹ میلیون تومان</p>
            <p className="text-xs text-gray-400 mt-2">مثال: ۲۹ میلیون سرمایه اولیه</p>
          </div>

          {/* کارت دوم */}
          <div className="bg-indigo-900 hover:shadow-lg transition-all duration-300 rounded-xl p-6 flex flex-col items-center text-center border border-indigo-700">
            <div className="w-20 h-20 mb-4 relative">
              <Image
                src="/images/clock-icon.gif"
                alt="مدت سرمایه‌گذاری"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">مدت سرمایه‌گذاری</h3>
            <p className="text-sm text-gray-300">۱ ماه</p>
            <p className="text-xs text-gray-400 mt-2">قابل انتخاب توسط کاربر</p>
          </div>

          {/* کارت سوم */}
          <div className="bg-indigo-900 hover:shadow-lg transition-all duration-300 rounded-xl p-6 flex flex-col items-center text-center border border-indigo-700">
            <div className="w-20 h-20 mb-4 relative">
              <Image
                src="/images/calculator-icon.gif"
                alt="نتیجه سرمایه‌گذاری"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">نتیجه سرمایه‌گذاریت</h3>
            <p className="text-sm text-green-400 font-bold text-lg mt-2">
              ۲۹,۹۶۶,۶۶۷ تومان
            </p>
            <p className="text-xs text-gray-400 mt-1">بازده پیش‌بینی شده</p>
          </div>
        </div>

        {/* دکمه‌ها */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <button className="bg-orange-500 text-white px-6 py-2 rounded-full text-lg shadow-md hover:shadow-lg transition-all duration-300">
            دریافت مشاوره رایگان
          </button>
          <button className="bg-purple-700 text-white px-6 py-2 rounded-full text-lg shadow-md hover:shadow-lg transition-all duration-300">
            شروع سرمایه‌گذاری
          </button>
        </div>

        {/* تصویر ماشین حساب */}
        <div className="flex justify-center">
          <div className="relative w-64 h-48">
            <Image
              src="/images/investment-chart.png"
              alt="ماشین حساب سرمایه‌گذاری"
              fill
              className="rounded-lg object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
