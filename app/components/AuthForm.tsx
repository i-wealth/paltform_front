'use client'

import { useState } from 'react'

export default function AuthForm({ onNext }: { onNext: () => void }) {
  const [step, setStep] = useState<1 | 2>(1)
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState('')

  const sendOtp = () => {
    if (mobile.length !== 11 || !mobile.startsWith('09')) {
      alert('شماره موبایل معتبر نیست')
      return
    }

    setStep(2)
    alert('کد ارسال شد: 1234 (تست)')
  }

  const verifyOtp = () => {
    if (otp === '1234') {
      onNext()
    } else {
      alert('کد اشتباه است!')
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-md w-full space-y-4">
      <h2 className="text-xl font-bold text-center text-blue-700">ورود / ثبت‌نام</h2>

      {step === 1 && (
        <>
          <label className="block font-medium">شماره موبایل</label>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="مثال: 09123456789"
            className="w-full border px-4 py-2 rounded"
          />
          <button
            onClick={sendOtp}
            className="w-full bg-blue-600 text-white py-2 rounded mt-4"
          >
            ارسال کد تأیید
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <label className="block font-medium">کد تأیید</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={4}
            className="w-full border px-4 py-2 rounded text-center"
          />
          <button
            onClick={verifyOtp}
            className="w-full bg-green-600 text-white py-2 rounded mt-4"
          >
            تأیید و ادامه
          </button>
        </>
      )}
    </div>
  )
}
