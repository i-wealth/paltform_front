'use client'

import Image from 'next/image'

export default function HeaderPage() {
  return (
    <section className="relative bg-gradient-to-br from-[#eaf6ff] to-[#f3f9ff] overflow-hidden py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        {/* متن سمت چپ */}
        <div className="text-center md:text-left space-y-6 order-2 md:order-1" style={{direction: "rtl", textAlign: "right", justifyContent: "right"}}>
          <p className="text-sm text-blue-600 font-medium">سرمایه گذاری با توجه به ریسک پذیری شما</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            پورتفولیو هوشمند ایران‌ولث
          </h1>
          <p className="text-gray-600 text-lg max-w-xl">
            با پیچیده‌تر شدن بازارهای مالی، ما با الگوریتم‌ها و هوش مصنوعی به کمک شما می‌آییم. سبد هولد هوشمند ایران‌ولث بهترین ترکیب دارایی‌ها را برای خرید پیشنهاد می‌دهد تا با ریسک کمتر سرمایه‌گذاری کنید.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <a href="#" className="bg-black text-white px-5 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md hover:bg-gray-800 transition">
              
              تعیین ریسک سرمایه‌گذار
            </a>
            <a href="#" className="bg-black text-white px-5 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md hover:bg-gray-800 transition">
              
              پورتفولیو ترکیبی
            </a>
          </div>
        </div>

        {/* تصویر سمت راست */}
        <div className="relative w-full h-[460px] flex items-center justify-center order-1 md:order-2">
          {/* نور پس‌زمینه */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-indigo-200 to-blue-100 rounded-full blur-[120px] opacity-50 scale-[1.6]" />
           {/* تصویر موبایل */}
           <div className="relative z-10">
             <Image
              src="/images/1-unscreen.gif" // 👈 مسیر تصویر موبایل
              alt="Mobile UI"
              width={300}
              height={600}
              className="mx-auto drop-shadow-2xl"
             />
            </div>
          {/* کارت‌های شناور */}
          <div className="relative z-10 grid grid-cols-2 gap-4">
            <div className="bg-white/50 backdrop-blur-lg p-4 rounded-2xl shadow-xl text-sm text-gray-700">
              <p className="mb-1 font-mono text-gray-800">**** 9872</p>
              <p className="text-xs">سود</p>
              <p className="font-semibold text-gray-900">47 میلیون تومان</p>
            </div>

            <div className="bg-white/60 backdrop-blur-md p-4 rounded-2xl shadow-xl text-sm text-gray-700 flex flex-col items-center justify-center">
              <p className="text-xs mb-1">رشد پورتفولیو طلا</p>
              <p className="text-lg font-bold text-indigo-600">43٪ سالانه</p>
            </div>

            <div className="bg-white/40 backdrop-blur-md p-4 rounded-2xl shadow-md text-xs text-gray-600 col-span-2 text-center">
              ریسک پورتفولیو ۱۷٪
            </div>
          </div>
        </div>
      </div>

      {/* نورپردازی پشت زمینه */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 right-40 w-[300px] h-[300px] bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-[120px] opacity-30"></div>
      </div>

      {/* ویژگی‌ها (مطابق پایین صفحه در عکس) */}
      <div className="max-w-7xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 z-10 relative">
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <h3 className="text-2xl font-bold text-blue-700">24K+</h3>
          <p className="text-sm text-gray-500 mt-2">مشتری فعال</p>
        </div>
        <div className="bg-gradient-to-tr from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-md text-center">
          <h3 className="font-bold text-lg">  هوش مصنوعی فوق پیشرفته </h3>
          <p className="text-sm mt-2"> بهمراه نظارت تیم با تجربه مالی</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md text-center text-sm">
          <p className="font-bold text-lg"> پورتفولیو هوشمند </p>
          <p className="text-sm mt-2">  با توجه به ریسک پذیری شما</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md text-center text-sm flex flex-col gap-2">
          <div className="font-bold text-lg">
            <span>حدضرر برای دارایی ها شما</span><span>✅</span>
          </div>
          <div className="font-bold text-lg">
            <span> بدون نیاز به دانش مالی</span><span>✅</span>
          </div>
          <div className="font-bold text-lg">
            <span> کاملا مورداطمینان</span><span>✅</span>
          </div>
        </div>
      </div>
    </section>
  )
}
