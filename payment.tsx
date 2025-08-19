'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaCheckCircle } from 'react-icons/fa'

export default function PaymentReceiptPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          router.back()
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md space-y-4 border border-green-200 relative">
        <h2 className="text-xl font-bold text-green-600 flex items-center gap-2 justify-center">
          <FaCheckCircle className="text-xl" />
          پرداخت موفق
        </h2>

        <p className="text-3xl font-bold text-center text-green-700">۱۰,۸۳۳,۰۰۰ ریال</p>

        <div className="border-t pt-4 text-sm text-gray-700 space-y-2">
          <div className="flex justify-between">
            <span>شماره تراکنش</span>
            <span>856923740</span>
          </div>
          <div className="flex justify-between">
            <span>شناسه مرجع</span>
            <span>BANK-20393</span>
          </div>
          <div className="flex justify-between">
            <span>تاریخ پرداخت</span>
            <span>1403/03/10 - 13:45</span>
          </div>
          <div className="flex justify-between">
            <span>وضعیت</span>
            <span className="text-green-600 font-bold">پرداخت موفق</span>
          </div>
          <div className="flex justify-between">
            <span>شماره سفارش</span>
            <span>1280</span>
          </div>
          <div className="flex justify-between">
            <span>شماره کارت</span>
            <span>6037 **** **** 6708</span>
          </div>
          <div className="flex justify-between">
            <span>تاریخ ایجاد</span>
            <span>1403/03/10 - 13:44</span>
          </div>
          <div className="flex justify-between">
            <span>شماره موبایل</span>
            <span>0912 *** 1234</span>
          </div>
          <div className="flex justify-between">
            <span>PSP</span>
            <span>پرداخت الکترونیک سداد</span>
          </div>
          <div className="flex justify-between">
            <span>در حال بازگشت...</span>
            <span className="text-blue-500 font-bold">{countdown} ثانیه</span>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-500 underline hover:text-blue-600"
          >
            بازگشت به صفحه اصلی
          </button>
        </div>
      </div>
    </div>
  )
}
