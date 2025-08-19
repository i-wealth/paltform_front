'use client'

import { useState } from 'react'
import DistributionChart from '../components/InvestDistributionChart'
import ComparisonList from '../components/InvestComparisonList'

export default function InvestPage() {
  const [step, setStep] = useState(1)
  const [risk, setRisk] = useState<'جسورانه' | 'متعادل' | 'محتاطانه'>('متعادل')
  const [duration, setDuration] = useState<'کوتاه مدت' | 'میان مدت' | 'بلند مدت'>('کوتاه مدت')

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {step === 1 && (
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <h2 className="font-bold text-lg">تعیین ریسک</h2>
          <p>میزان ریسک سرمایه‌گذاری را انتخاب کنید:</p>
          <div className="flex gap-4">
            {['محتاطانه', 'متعادل', 'جسورانه'].map((item) => (
              <button
                key={item}
                onClick={() => setRisk(item as any)}
                className={`flex-1 p-2 rounded border ${risk === item ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
              >
                {item}
              </button>
            ))}
          </div>

          <p className="mt-4">افق سرمایه‌گذاری را انتخاب کنید:</p>
          <div className="flex gap-4">
            {['کوتاه مدت', 'میان مدت', 'بلند مدت'].map((item) => (
              <button
                key={item}
                onClick={() => setDuration(item as any)}
                className={`flex-1 p-2 rounded border ${duration === item ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            onClick={() => setStep(2)}
            className="mt-6 w-full bg-blue-700 text-white py-2 rounded"
          >
            مشاهده ترکیب پیشنهادی
          </button>
        </div>
      )}

      {step === 2 && (
        <>
          <DistributionChart risk={risk} duration={duration} />
          <button
            onClick={() => setStep(3)}
            className="w-full bg-blue-700 text-white py-2 rounded"
          >
            مشاهده مقایسه بازدهی
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <DistributionChart risk={risk} duration={duration} />
          <ComparisonList />
        </>
      )}
    </div>
  )
}
