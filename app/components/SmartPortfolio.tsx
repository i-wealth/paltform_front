'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Pie, Bar } from 'react-chartjs-2'
import StepNavigation from './StepNavigation'

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

type RiskProfile = 'کم' | 'متوسط' | 'بالا'

type Fund = {
  name: string
  slug: string
  type: string
  risk: RiskProfile
  image: string
  minInvestment: string
  assetDistribution: string
  roi: string
}

type Prediction = {
  category: string
  lastMonth: number
  inflation: number
  predicted: number
}

const funds: Fund[] = [
  {
    name: 'درآمد ثابت "ایران ولث"',
    slug: 'iranwealth-fixed',
    type: 'ETF',
    risk: 'کم',
    image: '/images/sandogh.png',
    minInvestment: '۵۰,۰۰۰ تومان',
    assetDistribution: 'اوراق بدهی ۸۰٪، سپرده بانکی ۲۰٪',
    roi: '۱۸٪ سالانه',
  },
  {
    name: 'درآمد ثابت "ایران ولث"',
    slug: 'iranwealth-fixed',
    type: 'ETF',
    risk: 'کم',
    image: '/images/sandogh.png',
    minInvestment: '۵۰,۰۰۰ تومان',
    assetDistribution: 'اوراق بدهی ۸۰٪، سپرده بانکی ۲۰٪',
    roi: '۱۸٪ سالانه',
  },
  {
    name: 'درآمد ثابت "ایران ولث"',
    slug: 'iranwealth-fixed',
    type: 'ETF',
    risk: 'کم',
    image: '/images/sandogh.png',
    minInvestment: '۵۰,۰۰۰ تومان',
    assetDistribution: 'اوراق بدهی ۸۰٪، سپرده بانکی ۲۰٪',
    roi: '۱۸٪ سالانه',
  },
  {
    name: 'درآمد ثابت "ایران ولث"',
    slug: 'iranwealth-fixed',
    type: 'ETF',
    risk: 'کم',
    image: '/images/sandogh.png',
    minInvestment: '۵۰,۰۰۰ تومان',
    assetDistribution: 'اوراق بدهی ۸۰٪، سپرده بانکی ۲۰٪',
    roi: '۱۸٪ سالانه',
  },
  {
    name: 'پورتفولیو طلا',
    slug: 'gold-portfolio',
    type: 'ETF',
    risk: 'متوسط',
    image: '/images/sadogh.png',
    minInvestment: '۵۰,۰۰۰ تومان',
    assetDistribution: 'طلای فیزیکی ۹۰٪، سپرده ۱۰٪',
    roi: '۲۲٪ سالانه',
  },
  {
    name: 'پورتفولیو طلا',
    slug: 'gold-portfolio',
    type: 'ETF',
    risk: 'متوسط',
    image: '/images/sadosgh.png',
    minInvestment: '۵۰,۰۰۰ تومان',
    assetDistribution: 'طلای فیزیکی ۹۰٪، سپرده ۱۰٪',
    roi: '۲۲٪ سالانه',
  },
  {
    name: 'پورتفولیو طلا',
    slug: 'gold-portfolio',
    type: 'ETF',
    risk: 'متوسط',
    image: '/images/sadosgh.png',
    minInvestment: '۵۰,۰۰۰ تومان',
    assetDistribution: 'طلای فیزیکی ۹۰٪، سپرده ۱۰٪',
    roi: '۲۲٪ سالانه',
  },
  {
    name: 'پورتفولیو ارز دیجیتال',
    slug: 'crypto-portfolio',
    type: 'ETF',
    risk: 'بالا',
    image: '/images/sandogh.png',
    minInvestment: '۵۰,۰۰۰ تومان',
    assetDistribution: 'بیت‌کوین ۶۰٪، اتریوم ۳۰٪، استیبل‌کوین ۱۰٪',
    roi: '۴۵٪ سالانه',
  },
  {
    name: 'پورتفولیو ارز دیجیتال',
    slug: 'crypto-portfolio',
    type: 'ETF',
    risk: 'بالا',
    image: '/images/sandogh.png',
    minInvestment: '۵۰,۰۰۰ تومان',
    assetDistribution: 'بیت‌کوین ۶۰٪، اتریوم ۳۰٪، استیبل‌کوین ۱۰٪',
    roi: '۴۵٪ سالانه',
  },
]

const riskColor = {
  کم: 'bg-green-200 text-green-800',
  متوسط: 'bg-yellow-200 text-yellow-800',
  بالا: 'bg-red-200 text-red-800',
}

const incomeRanges = [
  '۵ تا ۱۰ میلیون تومان',
  '۱۰ تا ۱۵ میلیون تومان',
  '۱۵ تا ۲۰ میلیون تومان',
  'بیشتر از ۲۰ میلیون تومان',
]

const categories = [
  'خوراک',
  'پوشاک',
  'تعمیرات (ماشین و خانه)',
  'سرمایه گذاری',
  'مسافرت',
  'اجاره خانه',
  'پول توجیبی',
]

const expenseRanges = [
  '۲۰۰ تا ۵۰۰ هزار تومان',
  '۵۰۰ تا ۱ میلیون تومان',
  '۱ تا ۲ میلیون تومان',
  '۲ تا ۳ میلیون تومان',
  '۳ تا ۴ میلیون تومان',
  '۴ تا ۵ میلیون تومان',
  'بیش از ۵ میلیون تومان',
]

const inflationRates = {
  'خوراک': 0.4,
  'پوشاک': 0.2,
  'تعمیرات (ماشین و خانه)': 0.15,
  'سرمایه گذاری': 0.1,
  'مسافرت': 0.3,
  'اجاره خانه': 0.12,
  'پول توجیبی': 0.35,
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
    'پول توجیبی': 500000,
  },
}

export default function SmartPortfolio() {
  const [step, setStep] = useState(1)
  const [selectedIncome, setSelectedIncome] = useState<string | null>(null)
  const [selectedExpenses, setSelectedExpenses] = useState<Record<string, string>>({})
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [summaryText, setSummaryText] = useState<string>('')

  const [selectedProfile, setSelectedProfile] = useState<RiskProfile | null>(null)
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null)
  const [showFunds, setShowFunds] = useState(false)
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null)
  const [purchaseConfirmed, setPurchaseConfirmed] = useState(false)

  const handleExpenseChange = (category: string, value: string) => {
    setSelectedExpenses((prev) => ({
      ...prev,
      [category]: value,
    }))
  }

  const handleIncomeSubmit = () => {
    if (selectedIncome) setStep(2)
  }

  const handleFinalSubmit = () => {
    setStep(3)
  }

  const handlePurchase = () => {
    setPurchaseConfirmed(true)
    setTimeout(() => {
      setSelectedFund(null)
      setPurchaseConfirmed(false)
    }, 2000)
  }

  const filteredFunds = funds.filter((f) => f.risk === selectedProfile)

  useEffect(() => {
    if (step === 3) {
      const result: Prediction[] = Object.keys(previousMonthData.expenses).map((category) => {
        const last = previousMonthData.expenses[category]
        const rate = inflationRates[category] || 0
        const predicted = Math.round(last * (1 + rate))
        return { category, lastMonth: last, inflation: rate, predicted }
      })
      setPredictions(result)

      const topCategory = result.reduce((prev, curr) =>
        curr.lastMonth > prev.lastMonth ? curr : prev
      )

      const summary = `کاربر در ماه قبل با درآمد ${previousMonthData.income.toLocaleString()} تومان، بیشترین هزینه خود را در دسته '${topCategory.category}' با ${topCategory.lastMonth.toLocaleString()} تومان داشته است. با توجه به تورم ${(topCategory.inflation * 100).toFixed(0)}٪ در این دسته، احتمال افزایش هزینه در ماه آینده وجود دارد.`
      setSummaryText(summary)
    }
  }, [step])

  const pieChartData = {
    labels: predictions.map((p) => p.category),
    datasets: [
      {
        data: predictions.map((p) => p.predicted),
        backgroundColor: ['#60a5fa', '#f472b6', '#facc15', '#34d399', '#fb923c', '#a78bfa', '#f87171'],
      },
    ],
  }

  const barChartData = {
    labels: predictions.map((p) => p.category),
    datasets: [
      {
        label: 'هزینه قبلی',
        data: predictions.map((p) => p.lastMonth),
        backgroundColor: '#93c5fd',
      },
      {
        label: 'پیش‌بینی جدید',
        data: predictions.map((p) => p.predicted),
        backgroundColor: '#3b82f6',
      },
    ],
  }

  const renderExpenseTracking = () => (
    <div className="p-6 rounded-xl shadow-md bg-white">
      <StepNavigation currentStep={step} onStepChange={setStep} />

      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">ثبت درآمد و هزینه‌ها</h2>

      {step === 1 && (
        <>
          <p className="mb-4 font-semibold text-right">بازه درآمد ماهیانه را انتخاب کنید:</p>
          <div className="space-y-3 mb-6">
            {incomeRanges.map((range, index) => (
              <label key={index} className="flex items-center flex-row-reverse space-x-reverse space-x-3 cursor-pointer">
                <input type="radio" name="incomeRange" value={range} checked={selectedIncome === range} onChange={() => setSelectedIncome(range)} className="accent-blue-600" />
                <span className="text-gray-700">{range}</span>
              </label>
            ))}
          </div>
          <button onClick={handleIncomeSubmit} disabled={!selectedIncome} className={`w-full p-3 rounded-md text-white ${selectedIncome ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}>
            ادامه به مرحله هزینه‌ها
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <p className="mb-4 font-semibold text-right text-blue-700">
            بازه درآمدی انتخاب‌شده: <strong>{selectedIncome}</strong>
          </p>
          <div className="space-y-4">
            {categories.map((category, index) => (
              <div key={index} className="border rounded-lg p-4 bg-white">
                <div onClick={() => setOpenCategory(openCategory === category ? null : category)} className="flex justify-between items-center cursor-pointer select-none">
                  <span className="font-semibold">{category}</span>
                  <span>{openCategory === category ? '▲' : '▼'}</span>
                </div>
                {openCategory === category && (
                  <div className="mt-4 space-y-2 pr-2">
                    {expenseRanges.map((range, i) => (
                      <label key={i} className="flex items-center flex-row-reverse space-x-reverse space-x-3 cursor-pointer">
                        <input type="radio" name={`expense-${category}`} value={range} checked={selectedExpenses[category] === range} onChange={() => handleExpenseChange(category, range)} className="accent-green-600" />
                        <span className="text-gray-700">{range}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <button onClick={handleFinalSubmit} className="mt-6 w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-md">
            ثبت هزینه‌ها
          </button>
        </>
      )}
    </div>
  )

  const renderBudgetingPage = () => (
    <div className="p-6 bg-white rounded-xl shadow-md space-y-10">
      <StepNavigation currentStep={step} onStepChange={setStep} />

      <h2 className="text-2xl font-bold text-right">📊 بودجه‌بندی هوشمند - پیش‌بینی هزینه ماه آینده</h2>

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
                  {p.predicted - p.lastMonth > 0 ? `${(p.predicted - p.lastMonth).toLocaleString()} تومان` : 'بدون تغییر'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold text-right mb-2">سهم هزینه‌ها در ماه آینده</h3>
          <Pie data={pieChartData} />
        </div>
        <div>
          <h3 className="font-bold text-right mb-2">مقایسه هزینه قبل و پیش‌بینی</h3>
          <Bar data={barChartData} />
        </div>
      </div>

      <div className="text-right text-sm bg-blue-50 border border-blue-200 p-4 rounded-md text-blue-700">
        {summaryText}
      </div>

      <div className="mt-6">
        <button onClick={() => setStep(4)} className="w-full p-3 bg-blue-700 text-white rounded-md">
          ادامه به تعیین شخصیت سرمایه‌گذاری
        </button>
      </div>
    </div>
  )


  const renderInvestPage = () => (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-10">
      <StepNavigation currentStep={step} onStepChange={setStep} />

      <h2 className="text-2xl font-bold text-center text-gray-800">مرحله ۴: تعیین شخصیت سرمایه‌گذاری</h2>

      {/* انتخاب ریسک */}
      <div className="flex flex-wrap justify-center gap-4">
        {(['کم', 'متوسط', 'بالا'] as RiskProfile[]).map((risk) => (
          <button
            key={risk}
            onClick={() => {
              setSelectedProfile(risk)
              setSelectedDuration(null)
              setShowFunds(false)
            }}
            className={`px-6 py-2 rounded-full border text-sm transition ${
              selectedProfile === risk
                ? 'bg-blue-700 text-white border-blue-700'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-200'
            }`}
          >
            ریسک {risk}
          </button>
        ))}
      </div>

      {/* انتخاب مدت‌زمان */}
      {selectedProfile && (
        <div className="mt-6 text-center space-y-3">
          <p className="font-semibold text-gray-700">مدت زمان سرمایه‌گذاری را انتخاب کنید:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['۳ ماهه', '۶ ماهه', '۱ ساله', '۱ تا ۳ سال'].map((duration) => (
              <button
                key={duration}
                onClick={() => setSelectedDuration(duration)}
                className={`px-5 py-2 rounded-full border text-sm transition ${
                  selectedDuration === duration
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {duration}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* دکمه نمایش ترکیب پیشنهاد شده */}
      {selectedProfile && selectedDuration && (
        <div className="text-center">
          <button
            onClick={() => setShowFunds(true)}
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md text-sm font-bold"
          >
            مشاهده ترکیب پیشنهادی
          </button>
        </div>
      )}

      {/* نمایش صندوق‌ها */}
      {showFunds && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
          {filteredFunds.map((fund, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg p-5 text-center flex flex-col items-center transition"
            >
              <div className={`px-3 py-1 rounded-full text-sm font-bold mb-4 self-start ${riskColor[fund.risk]}`}>
                ریسک {fund.risk}
              </div>

              <div className="mb-4">
                <Image src={fund.image} alt={fund.name} width={90} height={90} />
              </div>

              <h3 className="text-md font-semibold text-gray-800 mb-1">{fund.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{fund.type}</p>

              <p className="text-sm text-gray-600 mb-6">
                حداقل سرمایه‌گذاری: <span className="font-bold">{fund.minInvestment}</span>
              </p>

              <button
                onClick={() => {
                  setSelectedFund(fund)
                  setPurchaseConfirmed(false)
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 text-sm font-medium transition"
              >
                جزئیات صندوق
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal جزئیات صندوق */}
      {selectedFund && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative text-right">
            <button
              onClick={() => setSelectedFund(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-gray-800 mb-4">{selectedFund.name}</h3>
            <p className="mb-2 text-sm text-gray-600">نوع: {selectedFund.type}</p>
            <p className="mb-2 text-sm text-gray-600">ریسک: {selectedFund.risk}</p>
            <p className="mb-2 text-sm text-gray-600">ترکیب دارایی‌ها: {selectedFund.assetDistribution}</p>
            <p className="mb-4 text-sm text-gray-600">بازدهی: {selectedFund.roi}</p>

            {purchaseConfirmed ? (
              <p className="text-green-600 font-semibold text-sm text-center">✅ خرید با موفقیت انجام شد</p>
            ) : (
              <button
                onClick={handlePurchase}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold text-sm"
              >
                خرید این صندوق
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {step === 1 || step === 2
        ? renderExpenseTracking()
        : step === 3
        ? renderBudgetingPage()
        : renderInvestPage()}
    </div>
  )
}
