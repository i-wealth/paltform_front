'use client'

import Image from 'next/image'

export default function BenefitsSection() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-[#f0f4ff] via-[#e8f0ff] to-[#e4e9ff] overflow-hidden text-gray-900">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h2 className="text-4xl font-extrabold mb-16 text-gray-800">
          مزایای پورتفولیو هوشمند ایران ولث
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            {
              title: 'کنترل ریسک',
              desc: 'مدیریت ریسک بازار با استفاده از توزیع بهینه دارایی‌های دیجیتال',
              img: '/images/e46ddf508ac189648e7743ae61ce7172.jpg',
            },
            {
              title: 'شخصی‌سازی',
              desc: 'سبد اختصاصی بر اساس ریسک‌پذیری و هدف‌های سرمایه‌گذاری شما',
              img: '/images/d9c7b6bd6aca59fa99a6b58772510777.jpg',
            },
            {
              title: 'اتوماتیک‌سازی',
              desc: 'فرآیند انتخاب سبد سرمایه‌گذاری به صورت خودکار با استفاده از الگوریتم‌های هوش مصنوعی',
              img: '/images/19d062abbb4559326ad7c50c45a59eda.jpg',
            },
            {
              title: 'بازبینی ماهانه',
              desc: 'قابلیت بروزرسانی سبد‌ها به همراه پیش‌بینی و مشاوره تخصصی',
              img: '/images/d9c7b6bd6aca59fa99a6b58772510777.jpg',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group flex flex-col items-center text-center bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 border border-gray-100"
            >
              <div className="mb-6 transition-transform group-hover:scale-110">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={110}
                  height={110}
                  className="object-contain rounded-xl shadow-sm"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-base text-gray-600 group-hover:text-gray-800 transition font-medium leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
