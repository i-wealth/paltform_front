'use client'

import Image from 'next/image'

type Props = {
  amount: number
  onClose: () => void
}

export default function ThankYouModal({ amount, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center shadow-2xl">
        <Image
          src="/images/thankyou.jpg"
          alt="تشکر"
          width={300}
          height={200}
          className="rounded mx-auto"
        />
        <h3 className="mt-4 text-2xl font-bold text-green-700">متشکریم 🌟</h3>
        <p className="mt-2 text-gray-600">
          کمک شما به مبلغ <span className="font-semibold">{amount.toLocaleString()} تومان</span> با موفقیت دریافت شد.
        </p>
        <button
          onClick={onClose}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          بازگشت به صفحهٔ اصلی
        </button>
      </div>
    </div>
  )
}
