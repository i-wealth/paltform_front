'use client'

export default function FinancialSummary() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[260px] p-4">
      {/* بخش کارت‌های اصلی (پورتفولیو، درآمد، هزینه) */}
      <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        
        {/* پورتفولیو */}
        <div className="rounded-xl p-4 h-full flex flex-col justify-between bg-white/30 backdrop-blur-xl border border-white/20 shadow-lg">
          <div>
            <p className="text-sm text-gray-600">درآمد از پورتفولیو</p>
            <h2 className="text-2xl font-bold text-gray-900 mt-2">120,456.50</h2>
            <p className="text-xs text-gray-500 mt-1">+2,456 نسبت به ماه گذشته</p>
          </div>
          <div className="mt-3 flex gap-2">
            <button className="bg-black text-white text-xs px-3 py-1 rounded-md font-medium">خرید</button>
            <button className="bg-white text-black text-xs px-3 py-1 rounded-md font-medium border border-gray-300">فروش</button>
          </div>
        </div>

        {/* درآمد این ماه */}
        <div className="rounded-xl p-4 h-full flex flex-col justify-between bg-white/30 backdrop-blur-xl border border-white/20 shadow-lg">
          <div>
            <p className="text-sm text-gray-600">درآمد این ماه</p>
            <h2 className="text-xl font-semibold mt-2 text-gray-800">17 میلیون</h2>
          </div>
          <span className="text-green-600 text-sm mt-1 block">+3 میلیون</span>
        </div>

        {/* هزینه ماه قبل */}
        <div className="rounded-xl p-4 h-full flex flex-col justify-between bg-white/30 backdrop-blur-xl border border-white/20 shadow-lg">
          <div>
            <p className="text-sm text-gray-600">هزینه ماه قبل</p>
            <h2 className="text-xl font-semibold mt-2 text-gray-800">8 میلیون</h2>
          </div>
          <span className="text-red-600 text-sm mt-1 block">-10 میلیون</span>
        </div>
      </div>

      {/* حسابداری + معادل‌سازی */}
      <div className="flex flex-col gap-6">
        <div className="rounded-xl p-4 h-full flex flex-col justify-between bg-white/30 backdrop-blur-xl border border-white/20 shadow-lg">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">حسابداری</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex justify-between border-b border-white/20 pb-2">
              <span>درآمد</span>
              <span className="text-gray-900">27 میلیون</span>
            </li>
            <li className="flex justify-between border-b border-white/20 pb-2">
              <span>مخارج</span>
              <span className="text-gray-900">9 میلیون 361</span>
            </li>
            <li className="flex justify-between">
              <span>هشدار هزینه‌ای</span>
              <span className="text-gray-900">13 میلیون</span>
            </li>
          </ul>
        </div>

        
      </div>
    </div>
  )
}
