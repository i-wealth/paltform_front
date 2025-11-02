'use client'

import { useEffect, useState } from 'react'
import { getFinBertPrediction } from '@/lib/finbert'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

const inflationRates = {
  'خوراک': 0.4,
  'پوشاک': 0.2,
  'تعمیرات (ماشین و خانه)': 0.15,
  'سرمایه گذاری': 0.1,
  'مسافرت': 0.3,
  'اجاره خانه': 0.12,
  'پول توجیبی': 0.35
}

const previousMonthData = {
  income: 15000000,
  expenses: {
    'خوراک': 5000000,
    'پوشاک': 2000000,
    'تعمیرات (ماشین و خانه)': 1000000,
    'سرمایه گذاری': 3000000,
    'مسافرت': 1500000,
    'اجاره خانه': 4000000,
    'پول توجیبی': 500000
  }
}

type Prediction = {
  category: string
  lastMonth: number
  inflation: number
  predicted: number
}

export default function Budgeting() {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [isSaved, setIsSaved] = useState(false)
  const [finbertPrediction, setFinbertPrediction] = useState<any>(null)
  const [summaryText, setSummaryText] = useState<string>('')

  useEffect(() => {
    const result: Prediction[] = Object.keys(previousMonthData.expenses).map(category => {
      const last = previousMonthData.expenses[category]
      const rate = inflationRates[category] || 0
      const predicted = Math.round(last * (1 + rate))
      return { category, lastMonth: last, inflation: rate, predicted }
    })

    setPredictions(result)

    const topCategory = result.reduce((prev, curr) =>
      curr.lastMonth > prev.lastMonth ? curr : prev
    )

    // ساخت متن تحلیلی خودکار
    const summary = `کاربر در ماه قبل با درآمد ${previousMonthData.income.toLocaleString()} تومان، بیشترین هزینه خود را در دسته '${topCategory.category}' با ${topCategory.lastMonth.toLocaleString()} تومان داشته است. با توجه به تورم ${(topCategory.inflation * 100).toFixed(0)} درصدی در این دسته، احتمال افزایش هزینه در ماه آینده وجود دارد.`
    
    setSummaryText(summary)

    // ارسال متن تحلیلی به FinBERT
    getFinBertPrediction(summary).then(setFinbertPrediction)
  }, [])

  // تحلیل FinBERT
  const handleFinBertAnalysis = (prediction: any, topCategory: Prediction) => {
    if (!prediction) return '';

    // بررسی نتیجه تحلیل
    const sentiment = prediction[0].label; // مثلا "LABEL_0" برای منفی، "LABEL_2" برای مثبت

    let message = '';
    
    if (sentiment === 'LABEL_0') {
      // تحلیل منفی
      message = `❗ وضعیت مالی شما نگران‌کننده‌ست. توصیه می‌شود هزینه در دسته ${topCategory.category} کاهش یابد.`;
    } else if (sentiment === 'LABEL_1') {
      // تحلیل خنثی
      message = `💡 وضعیت مالی شما نرمال است. پیشنهاد می‌کنیم برای بهبود وضعیت، نگاهی به هزینه‌ها و درآمدها بیاندازید.`;
    } else if (sentiment === 'LABEL_2') {
      // تحلیل مثبت
      message = `✅ وضعیت مالی شما مطلوب است. می‌توانید برای سرمایه‌گذاری برنامه‌ریزی کنید.`;
    }

    return message;
  }

  const pieChartData = {
    labels: predictions.map(p => p.category),
    datasets: [
      {
        data: predictions.map(p => p.predicted),
        backgroundColor: [
          '#60a5fa', '#f472b6', '#facc15', '#34d399', '#fb923c', '#a78bfa', '#f87171'
        ]
      }
    ]
  }

  const barChartData = {
    labels: predictions.map(p => p.category),
    datasets: [
      {
        label: 'هزینه قبلی',
        data: predictions.map(p => p.lastMonth),
        backgroundColor: '#93c5fd'
      },
      {
        label: 'پیش‌بینی جدید',
        data: predictions.map(p => p.predicted),
        backgroundColor: '#3b82f6'
      }
    ]
  }

  const handleSave = () => setIsSaved(true)

  return (
    <div className="p-6 bg-white rounded-xl shadow-md space-y-10" dir="rtl">
      <h2 className="text-2xl font-bold text-right">بودجه بندی هوشمند - پیش‌بینی هزینه ماه آینده</h2>

      {/* جدول */}
      <div className="overflow-x-auto">
        <table className="w-full text-right border text-sm">
          <thead className="bg-gray-100 font-bold">
            <tr>
              <th className="p-2">دسته‌بندی</th>
              <th className="p-2">هزینه ماه قبل</th>
              <th className="p-2">تورم (%)</th>
              <th className="p-2">هزینه ماه آینده</th>
              <th className="p-2">افزایش</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map((p, i) => (
              <tr key={i} className="border-b">
                <td className="p-2">{p.category}</td>
                <td className="p-2">{p.lastMonth.toLocaleString()} تومان</td>
                <td className="p-2">{Math.round(p.inflation * 100)}%</td>
                <td className="p-2 font-semibold text-blue-700">{p.predicted.toLocaleString()} تومان</td>
                <td className="p-2 text-green-600">
                  {p.predicted - p.lastMonth > 0
                    ? `${(p.predicted - p.lastMonth).toLocaleString()} تومان`
                    : 'بدون تغییر'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* کارت‌های خلاصه */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {predictions.map((p, i) => (
          <div key={i} className="border rounded-xl p-4 shadow-sm bg-gray-50 hover:shadow-lg transition-all">
            <h3 className="font-bold mb-2 text-blue-700">{p.category}</h3>
            <p>ماه قبل: {p.lastMonth.toLocaleString()} تومان</p>
            <p>تورم: {Math.round(p.inflation * 100)}%</p>
            <p className="text-green-700 mt-2 font-semibold">
              پیشنهاد: {p.predicted.toLocaleString()} تومان
            </p>
          </div>
        ))}
      </div>

      {/* نمودارها */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div>
          <h3 className="font-bold text-right mb-2">سهم هزینه‌ها در ماه آینده</h3>
          <Pie data={pieChartData} />
        </div>
        <div>
          <h3 className="font-bold text-right mb-2">مقایسه هزینه قبل و پیش‌بینی</h3>
          <Bar data={barChartData} />
        </div>
      </div>

      {/* دکمه ذخیره */}
      <div className="mt-10 text-center">
        {!isSaved ? (
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md shadow-md transition"
          >
            ذخیره بودجه پیشنهادی
          </button>
        ) : (
          <p className="text-green-700 font-semibold text-lg">✅ بودجه با موفقیت ذخیره شد.</p>
        )}
      </div>

      {/* تحلیل FinBERT */}
      <div className="mt-10 bg-white p-5 rounded-xl border border-green-200 shadow-md space-y-3">
        <h3 className="text-right text-xl font-bold text-green-800">تحلیل هوش مصنوعی FinBERT</h3>
        <p className="text-sm text-gray-700 text-right leading-7">
          <span className="font-semibold text-black">متن ارسال‌شده برای تحلیل:</span><br />
          {summaryText}
        </p>
        {finbertPrediction ? (
          <div className="bg-green-50 border border-green-300 rounded-lg p-4 mt-2 text-right">
            <p className="text-sm text-green-800 font-semibold">نتیجه تحلیل:</p>
            <code className="text-xs">{JSON.stringify(finbertPrediction, null, 2)}</code>

            {/* پیام مدیریتی بر اساس نتیجه تحلیل */}
            <div className="mt-4">
              <p className="font-semibold text-lg text-blue-700">
                پیام پیشنهادی بر اساس تحلیل:
              </p>
              <p className="text-sm text-gray-800">
                {handleFinBertAnalysis(finbertPrediction, predictions[0])}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-right text-gray-400">در حال تحلیل با FinBERT...</p>
        )}
      </div>

    </div>
  )
}
