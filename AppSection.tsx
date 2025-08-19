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
    title: 'TOBANK، یک شعبه مجازی همراه شماست!',
    subtitle: 'روی گوشی‌ت حساب باز کن! از احراز هویت آنلاین و افتتاح سپرده آتی گرفته تا صندوق سرمایه‌گذاری و ثبت‌نام وام ازدواج.',
    button1: 'دانلود اپلیکیشن',
    button2: '',
    footer: '',
    image: '/images/phone1.png',
  },
  {
    title: 'TOBANK، یک شعبه مجازی همراه شماست!',
    subtitle: 'روی گوشی‌ت حساب باز کن! از احراز هویت آنلاین و افتتاح سپرده آتی گرفته تا صندوق سرمایه‌گذاری و ثبت‌نام وام ازدواج.',
    button1: 'دانلود اپلیکیشن',
    button2: '',
    footer: '',
    image: '/images/phone2.png',
  },
  {
    title: 'TOBANK، یک شعبه مجازی همراه شماست!',
    subtitle: 'روی گوشی‌ت حساب باز کن! از احراز هویت آنلاین و افتتاح سپرده آتی گرفته تا صندوق سرمایه‌گذاری و ثبت‌نام وام ازدواج.',
    button1: 'دانلود اپلیکیشن',
    button2: '',
    footer: '',
    image: '/images/phone3.png',
  }
]

export default function AppSection() {
  const [current, setCurrent] = useState(0)

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const slide = slides[current]

  return (
    <section className="py-12 px-6 md:px-20 relative overflow-hidden text-center md:text-right">
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
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
        <div className="space-y-6 md:order-1 order-2">
          <h2 className="text-4xl font-bold text-red-600">{slide.title}</h2>
          <p className="text-lg text-gray-600">{slide.subtitle}</p>
          <div className="flex flex-col md:flex-row justify-center md:justify-end gap-4 mt-6">
            <a
              href="#"
              className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300"
            >
              {slide.button1}
            </a>
          </div>
        </div>

        {/* بخش تصاویر گوشی موبایل */}
        <div className="md:order-2 order-1 flex justify-center gap-6">
          <div className="relative w-48 h-80 bg-white rounded-xl shadow-lg">
            <img
              src={slide.image}
              alt="App on phone"
              className="w-full h-full object-contain rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* نقاط دایره‌ای برای اسلاید */}
      <div className="flex justify-center mt-8 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === current ? 'bg-red-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
