'use client'

import { useState } from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

// DistributionChart Component
const DistributionChart = () => {
  const data = {
    labels: ['طلای آبشده', 'ارزدیجیتال', 'توکن ملک'],
    datasets: [
      {
        label: 'درصد دارایی',
        data: [45, 30, 25],
        backgroundColor: ['#3B82F6', '#8B5CF6', '#10B981'], // آبی، بنفش، سبز
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 w-full max-w-md mx-auto">
      <h3 className="font-semibold text-gray-800 mb-4 text-center">
        دارایی به تفکیک
      </h3>
      <div className="w-60 h-60 mx-auto">
        <Pie data={data} options={options} />
      </div>
    </div>
  )
}

// InvestComparisonList Component
const InvestComparisonList = () => {
  const data = [
    { label: 'سکه', percent: '+113.7%' },
    { label: 'طلا', percent: '+101.5%' },
    { label: 'دلار', percent: '+69.0%' },
    { label: 'بورس', percent: '+39.9%' },
    { label: 'سبد پیشنهادی', percent: '+59.1%' },
  ]

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-6">
      <h3 className="font-bold mb-4 text-center">مقایسه بازدهی</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {data.map((item) => (
          <div
            key={item.label}
            className="bg-gray-50 border rounded p-3 text-center"
          >
            <div className="text-green-600 font-bold text-lg">
              {item.percent}
            </div>
            <div className="text-sm text-gray-700 mt-1">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Main InvestPage Component
export default function InvestPage() {
  const [step, setStep] = useState(1)
  const [risk, setRisk] = useState<'جسورانه' | 'متعادل' | 'محتاطانه'>('متعادل')
  const [duration, setDuration] = useState<'کوتاه مدت' | 'میان مدت' | 'بلند مدت'>('کوتاه مدت')

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Step 1: Select Risk and Duration */}
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

      {/* Step 2: Display Distribution Chart */}
      {step === 2 && (
        <>
          <DistributionChart />
          <button
            onClick={() => setStep(3)}
            className="w-full bg-blue-700 text-white py-2 rounded mt-4"
          >
            مشاهده مقایسه بازدهی
          </button>
        </>
      )}

      {/* Step 3: Display Distribution Chart and Comparison List */}
      {step === 3 && (
        <>
          <DistributionChart />
          <InvestComparisonList />
        </>
      )}
    </div>
  )
}
