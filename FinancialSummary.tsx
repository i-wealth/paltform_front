'use client'

export default function FinancialSummary() {
  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-4
        min-h-[260px]
        max-w-[1200px]
        mx-auto
        px-3
        sm:px-4
      "
      dir="rtl"
    >
      <div
        className="
          xl:col-span-3
          grid
          grid-cols-1
          sm:grid-cols-3
          gap-4
        "
      >
        
        {/* پورتفولیو */}
        <div
          className="
            rounded-lg
            p-4
            h-full
            flex
            flex-col
            justify-between
            bg-white/30
            backdrop-blur-xl
            border
            border-white/20
            shadow-md
            transition
            hover:shadow-lg
          "
        >
          <div>
            <p className="text-sm text-gray-600">درآمد از پورتفولیو</p>
            <h2 className="text-xl font-semibold text-gray-900 mt-2">120,456.50</h2>
            <p className="text-xs text-gray-500 mt-1">+2,456 نسبت به ماه گذشته</p>
          </div>
          <div
            className="
              mt-3
              flex
              gap-2
              flex-wrap
            "
          >
            <button
              className="
                bg-black
                text-white
                text-xs
                px-3
                py-1
                rounded-md
                font-medium
                hover:opacity-90
                active:opacity-80
              "
            >
              خرید
            </button>
            <button
              className="
                bg-white
                text-black
                text-xs
                px-3
                py-1
                rounded-md
                font-medium
                border
                border-gray-300
                hover:bg-gray-50
                active:bg-gray-100
              "
            >
              فروش
            </button>
          </div>
        </div>

        {/* درآمد این ماه */}
        <div
          className="
            rounded-lg
            p-4
            h-full
            flex
            flex-col
            justify-between
            bg-white/30
            backdrop-blur-xl
            border
            border-white/20
            shadow-md
            transition
            hover:shadow-lg
          "
        >
          <div>
            <p className="text-sm text-gray-600">درآمد این ماه</p>
            <h2 className="text-lg font-semibold mt-2 text-gray-800">17میلیون</h2>
          </div>
          <span className="text-green-500 text-sm mt-1 block">+3میلیون</span>
        </div>

        {/* هزینه ماه قبل */}
        <div
          className="
            rounded-lg
            p-4
            h-full
            flex
            flex-col
            justify-between
            bg-white/30
            backdrop-blur-xl
            border
            border-white/20
            shadow-md
            transition
            hover:shadow-lg
          "
        >
          <div>
            <p className="text-sm text-gray-600">هزینه ماه قبل</p>
            <h2 className="text-lg font-semibold mt-2 text-gray-800">8 میلیون</h2>
          </div>
          <span className="text-red-500 text-sm mt-1 block">-10 میلیون</span>
        </div>
      </div>

      {/* حسابداری */}
      <div
        className="
          h-full
          flex
          flex-col
          gap-4
        "
      >
        <div
          className="
            rounded-lg
            p-4
            h-full
            flex
            flex-col
            justify-between
            bg-white/30
            backdrop-blur-xl
            border
            border-white/20
            shadow-md
            transition
            hover:shadow-lg
            min-h-[200px]
          "
        >
          <h3 className="text-sm font-semibold text-gray-700 mb-3">حسابداری</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li className="flex justify-between border-b border-white/20 pb-2">
              <span>درآمد</span>
              <span className="text-gray-900">27میلیون</span>
            </li>
            <li className="flex justify-between border-b border-white/20 pb-2">
              <span>مخارج</span>
              <span className="text-gray-900">9 میلیون 361</span>
            </li>
            <li className="flex justify-between">
              <span>هشدارهزینه‌ای</span>
              <span className="text-gray-900">13 میلیون</span>
            </li>
          </ul>
        </div>

         {/* معادل‌سازی دارایی‌ها */}
              <div
                className="
                  asset-equivalence
                  rounded-lg
                  p-4
                  bg-white/30
                  backdrop-blur-xl
                  border
                  border-white/20
                  shadow-md
                  transition
                  hover:shadow-lg
                "
              >
                
              </div>
      </div>
    </div>
  )
}
