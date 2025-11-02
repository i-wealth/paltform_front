'use client'

import { useState } from 'react'
import Image from 'next/image'
import SmartPortfolio from './SmartPortfolio'
import CurrencyConverter from './CurrencyConverter'
import LoanPayment from './LoanPayment'

export default function DescriptionSection() {
  const [selected, setSelected] = useState<'wealth' | 'payment' | 'convert' | null>(null)

  const closeModal = () => setSelected(null)

  const Card = ({
    img,
    title,
    subtitle,
    value,
  }: {
    img: string
    title: string
    subtitle: string
    value: 'wealth' | 'payment' | 'convert'
  }) => (
    <div
      onClick={() => setSelected(value)}
      className={`flex flex-col justify-between p-6 rounded-3xl shadow-md border transition cursor-pointer bg-white hover:shadow-lg ${
        selected === value ? 'ring-2 ring-blue-500' : ''
      }`}
    >
      <div className="mb-4">
        <div className="w-14 h-14 mb-3">
          <Image src={img} alt="icon" width={56} height={56} className="rounded-xl object-cover" />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      <div className="text-right text-blue-500 font-semibold text-sm">مشاهده</div>
    </div>
  )

  return (
    <section className="py-20 px-6 bg-[#f8f9fc]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-12 text-center">خدمات هوشمند ایران‌ولث</h2>

        {/* کارت‌ها */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          <Card
            img="/images/ai-budge1.png"
            title="مدیریت ثروت شخصی"
            subtitle="پیشنهاد سبد سرمایه‌گذاری هوشمند"
            value="wealth"
          />
          <Card
            img="/images/19d062abbb4559326ad7c50c45a59eda.jpg"
            title="پرداخت خودکار "
            subtitle="پرداخت‌های برنامه‌ریزی‌شده "
            value="payment"
          />
          <Card
            img="/images/004e87b7f6875a38796f361066748964.jpg"
            title="مبدل تتر به طلا"
            subtitle="تبدیل لحظه‌ای درآمد دیجیتال به دارایی امن"
            value="convert"
          />
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl relative p-6 overflow-y-auto max-h-[90vh] animate-fade-in">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>

            {/* محتوا بر اساس انتخاب */}
            {selected === 'wealth' && <SmartPortfolio />}
            {selected === 'payment' && <LoanPayment />}
            {selected === 'convert' && <CurrencyConverter />}
          </div>
        </div>
      )}
    </section>
  )
}
