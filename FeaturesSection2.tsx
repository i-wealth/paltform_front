'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function FeaturesSection2() {
  const router = useRouter()
    const handleClick = (route: string):void => {
      router.push(route);
    };
  return (
    <section className="bg-white py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto text-center">
        {/* عنوان اصلی */}
        <h2 className="text-4xl font-semibold text-gray-900 mb-4">
          گنجینه سرمایه‌گذاری
        </h2>
        <p className="text-lg text-gray-600 mb-10">
          سرمایه‌گذاری به سبک ایران ولث با پشتیبانی از هوش مصنوعی پیشرفته
        </p>

        {/* کارت‌های سرمایه‌گذاری */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* کارت اول */}
          <div className="bg-black hover:shadow-lg transition-all duration-300 rounded-xl p-6 flex flex-col items-center text-center border border-gray-800">
            <div className="w-20 h-20 mb-4 relative">
              <Image
                src="/images/1-unscreen.gif"
                alt="AI Investment"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">سرمایه‌گذاری هوشمند</h3>
            <p className="text-sm text-gray-300">
              با استفاده از سیستم‌های تحلیل مالی مبتنی بر هوش مصنوعی، فرصت‌های سودآور را سریع‌تر شناسایی کنید.
            </p>
          </div>

          {/* کارت دوم */}
          <div className="bg-black hover:shadow-lg transition-all duration-300 rounded-xl p-6 flex flex-col items-center text-center border border-gray-800">
            <div className="w-20 h-20 mb-4 relative">
              <Image
                src="/images/bitcoingif.gif"
                alt="Risk Analysis"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">تحلیل ریسک</h3>
            <p className="text-sm text-gray-300">
              بررسی کامل ریسک‌های سرمایه‌گذاری قبل از تصمیم‌گیری با داده‌های به‌روز و دقیق.
            </p>
          </div>

          {/* کارت سوم */}
          <div className="bg-black hover:shadow-lg transition-all duration-300 rounded-xl p-6 flex flex-col items-center text-center border border-gray-800">
            <div className="w-20 h-20 mb-4 relative">
              <Image
                src="/images/aigif.gif"
                alt="Smart Portfolio"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">پورتفولیوی هوشمند</h3>
            <p className="text-sm text-gray-300">
              ساخت و مدیریت پورتفولیو به صورت خودکار بر اساس اهداف مالی شخصی‌سازی‌شده شما.
            </p>
          </div>
        </div>

        {/* دکمه‌ها */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <button onClick={() => handleClick("/HomePage")} className="bg-yellow-400 text-white px-6 py-2 rounded-full text-lg shadow-md hover:shadow-lg transition-all duration-300">
            جستجوگر و آگاهانه برای درآمد حداکثری
          </button>
          <button onClick={() => handleClick("/HomePage")} className="bg-purple-600 text-white px-6 py-2 rounded-full text-lg shadow-md hover:shadow-lg transition-all duration-300">
            شروع سرمایه‌گذاری
          </button>
        </div>

        {/* تصویر */}
        <div className="flex justify-center">
          <div className="relative w-64 h-48">
            <Image
              src="/images/goldcoin.png"
              alt="Investment"
              fill
              className="rounded-lg object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

