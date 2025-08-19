'use client'

import { useState } from 'react'

const colors = [
  { name: 'آبی', class: 'bg-blue-500' },
  { name: 'قرمز', class: 'bg-red-500' },
  { name: 'مشکی', class: 'bg-black' },
]

export default function CardSection() {
  const [selectedColor, setSelectedColor] = useState(0)

  return (
    <section className="py-8 px-6 md:px-20 relative overflow-hidden text-center md:text-right">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
        {/* بخش کارت‌ها */}
        <div className="md:order-1 order-2">
          <div className="flex justify-center gap-4 mb-6">
            <div className={`w-20 h-32 rounded-lg ${colors[selectedColor].class}`} />
            <div className="w-20 h-32 rounded-lg bg-red-400" />
            <div className="w-20 h-32 rounded-lg bg-black" />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold leading-loose">
              تنوع رنگ کارت‌های توبانکی
            </h2>
            <p className="text-lg text-gray-600">
              با عضویت در توبانک علاوه بر تنوع خدمات، رنگ کارت توبانکی خودتون رو انتخاب کنید.
            </p>
          </div>
        </div>

        {/* بخش انتخاب رنگ */}
        <div className="md:order-2 order-1 flex justify-center">
          <div className="flex gap-4">
            {colors.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(index)}
                className={`w-10 h-10 rounded-full ${color.class} transition-all duration-300`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
