'use client'

import { useState } from 'react'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

type Slide = {
  title: string
  subtitle: string
  button1: string
  button2: string
  footer: string
  image: string
}

const slides: Slide[] = [
  {
    title: 'خرید و فروش <span class="text-yellow-600">طلای آبشده</span>',
    subtitle: 'خرید طلای آبشده به صورت رسمی و تضمین‌شده با هر میزان سرمایه دلخواه در هر لحظه شبانه‌روز در آی گلد',
    button1: 'خرید طلای آّبشده',
    button2: 'قابلیت تبدیل به تتر',
    footer: 'تحت نظارت بانک مرکزی',
    image: '/images/gold1.MOV',
  },
  {
    title: 'خرید و فروش   <span class="text-blue-400">ارز دیجیتال</span>',
    subtitle: 'خرید ارزدیجیتال به صورت رسمی و تضمین‌شده با هر میزان سرمایه دلخواه در هر لحظه شبانه‌روز در آی کوین',
    button1: 'خرید  ارزدیجیتال',
    button2: ' قابلیت تبدیل به طلا',
    footer: ' مجوزهای ایران ولث',
    image: '/images/bitcoingif.MOV',
  },
  {
    title: '  خرید و فروش   <span class="text-blue-600">توکن ملک  </span>',
    subtitle: 'خرید توکن ملک به صورت رسمی و تضمین‌شده با هر میزان سرمایه دلخواه در هر لحظه شبانه‌روز در آی ملک',
    button1: 'ساخت کیف پول',
    button2: 'پشتیبانی ۲۴/۷',
    footer: 'تضمین امنیت دارایی',
    image: '/images/IMG_6308.gif',
  }
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const slide = slides[current]

  // تعیین رنگ بک‌گراند بر اساس شماره اسلاید
  const bgColor = current === 1 ? 'bg-black text-white' : 'bg-white text-gray-900'

  return (
    <section className={`${bgColor} py-0 px-6 md:px-20 relative overflow-hidden transition-colors duration-500`} dir="rtl">
      {/* فلش‌ها */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 right-4 md:right-12 transform -translate-y-1/2 z-10 bg-white text-black shadow-md p-2 rounded-full hover:bg-gray-100 transition"
      >
        <FaArrowRight size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 left-4 md:left-12 transform -translate-y-1/2 z-10 bg-white text-black shadow-md p-2 rounded-full hover:bg-gray-100 transition"
      >
        <FaArrowLeft size={20} />
      </button>

      {/* محتوا */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12 text-center md:text-right transition-all duration-500 ease-in-out">
        <div className="md:order-1 order-2 space-y-6">
          <h1
            className="text-3xl md:text-4xl font-bold leading-loose"
            dangerouslySetInnerHTML={{ __html: slide.title }}
          />
          <p className={`text-base md:text-lg ${current === 1 ? 'text-gray-300' : 'text-gray-600'}`}>
            {slide.subtitle}
          </p>

          <div className="flex flex-col md:flex-row justify-center md:justify-end gap-4 mt-6">
            <button className="bg-blue-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition">
              {slide.button1}
            </button>
            <button className="border border-gray-400 px-6 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition bg-white">
              {slide.button2}
            </button>
          </div>

          <p className="text-xs text-gray-400 pt-2">{slide.footer}</p>
        </div>

        <div className="relative w-full h-80 md:h-96 md:order-2 order-1">
          <video
            src={slide.image}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain mx-auto"
          />
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-8 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === current ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
