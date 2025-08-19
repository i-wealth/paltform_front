'use client'

import { useState } from 'react'

type PortfolioType = 'combined' | 'gold' | 'crypto'

const portfolios = {
  combined: {
    title: 'پورتفولیو ترکیبی',
    assets: [
      { name: 'طلا', percentage: 40 },
      { name: 'استیبل‌کوین', percentage: 40 },
      { name: 'رمزارز پربازده', percentage: 20 },
    ],
    description: 'مناسب برای سرمایه‌گذاری متعادل با ریسک کنترل‌شده.',
  },
  gold: {
    title: 'پورتفولیو طلا',
    assets: [
      { name: 'طلای آبشده', percentage: 50 },
      { name: 'سکه', percentage: 30 },
      { name: 'صندوق طلا', percentage: 20 },
    ],
    description: 'برای افراد علاقه‌مند به دارایی فیزیکی با ثبات.',
  },
  crypto: {
    title: 'پورتفولیو ارز دیجیتال',
    assets: [
      { name: 'تتر', percentage: 40 },
      { name: 'پکس گلد', percentage: 30 },
      { name: 'ارزهای پربازده', percentage: 30 },
    ],
    description: 'برای سرمایه‌گذاران ریسک‌پذیر با انتظار بازده بالا.',
  },
}

const returnsMap = {
  combined: 12, // درصد سالانه
  gold: 10,
  crypto: 15,
}

const financialGoals = [
  { label: 'جهیزیه', value: 'جهیزیه', estimate: 500_000_000 },
  { label: 'ماشین', value: 'ماشین', estimate: 1_500_000_000 },
  { label: 'بازنشستگی', value: 'بازنشستگی', estimate: 500_000_000 },
  { label: 'خانه', value: 'خانه', estimate: 6_000_000_000 },
]

export default function RiskAssessment() {
  const [portfolio, setPortfolio] = useState<PortfolioType>('combined')
  const [amount, setAmount] = useState(100_000_000)
  const [monthlyIncome, setMonthlyIncome] = useState(50_000_000)
  const [goal, setGoal] = useState('خانه')
  const [goalAmount, setGoalAmount] = useState(3_000_000_000)

  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedSuggestion, setSelectedSuggestion] = useState<PortfolioType | null>(null)

  const inflationScenarios = [10, 20, 30, 40, 50]

  const calculateMonthsToReachGoal = (annualReturn: number, inflation: number): number => {
    const monthlyReturnRate = ((annualReturn - inflation) / 12) / 100
    let total = amount
    let months = 0
    while (total < goalAmount && months < 600) {
      total += total * monthlyReturnRate + monthlyIncome
      months++
    }
    return months
  }

  const handleRequestSuggestion = () => {
    setShowSuggestions(true)
  }

  const handlePurchase = () => {
    alert(`✅ شما پورتفولیو "${portfolios[selectedSuggestion!].title}" را با موفقیت انتخاب کردید.`)
  }

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-10 text-right">

        {/* عنوان اصلی */}
        <h2 className="text-4xl font-extrabold text-center text-blue-800">شبیه‌ساز هوشمند سرمایه‌گذاری</h2>

        {/* انتخاب پورتفولیو */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(Object.keys(portfolios) as PortfolioType[]).map((type) => (
            <button
              key={type}
              onClick={() => setPortfolio(type)}
              className={`p-5 rounded-xl border-2 transition text-center ${
                portfolio === type
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
              }`}
            >
              <h4 className="font-bold text-lg">{portfolios[type].title}</h4>
              <p className="text-sm mt-1">{portfolios[type].description}</p>
            </button>
          ))}
        </div>

        {/* اطلاعات سرمایه‌گذاری */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-xl p-6 shadow">
          <div>
            <label className="block text-sm mb-2">💰 مبلغ سرمایه اولیه (تومان)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(+e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">👨‍💼 درآمد ماهانه قابل سرمایه‌گذاری (تومان)</label>
            <input
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(+e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* هدف مالی */}
        <div className="bg-white rounded-xl p-6 shadow space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">🎯 هدف مالی</h3>
          <select
            className="w-full p-2 border rounded"
            value={goal}
            onChange={(e) => {
              const selected = financialGoals.find((g) => g.value === e.target.value)
              setGoal(selected!.value)
              setGoalAmount(selected!.estimate)
            }}
          >
            {financialGoals.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>

          <label className="text-sm text-gray-600">💸 مبلغ هدف (تومان)</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={goalAmount}
            onChange={(e) => setGoalAmount(+e.target.value)}
          />
        </div>

        {/* جدول مقایسه سناریوهای تورمی */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-lg font-bold text-gray-800 mb-4">⏳ مدت زمان رسیدن به هدف در سناریوهای تورمی مختلف</h3>
          <table className="w-full text-sm text-center border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4">تورم سالانه</th>
                <th className="py-2 px-4">مدت زمان (ماه)</th>
              </tr>
            </thead>
            <tbody>
              {inflationScenarios.map((inf, i) => {
                const months = calculateMonthsToReachGoal(returnsMap[portfolio], inf)
                return (
                  <tr key={i} className="border-t">
                    <td className="py-2 px-4">{inf}%</td>
                    <td className="py-2 px-4 font-semibold text-blue-700">{months}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* دکمه درخواست پیشنهاد پورتفولیو */}
        {!showSuggestions && (
          <div className="text-center">
            <button
              onClick={handleRequestSuggestion}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg"
            >
              📤 درخواست پیشنهاد پورتفولیو از ایران‌ولث
            </button>
          </div>
        )}

        {/* نمایش پیشنهادات ایران‌ولث */}
        {showSuggestions && (
          <div className="bg-white rounded-xl p-6 shadow space-y-6">
            <h3 className="text-lg font-bold text-gray-800 text-center">📦 پیشنهادات سرمایه‌گذاری هوشمند برای شما</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(Object.keys(portfolios) as PortfolioType[]).map((type) => (
                <div
                  key={type}
                  className={`border rounded-xl p-4 cursor-pointer transition hover:shadow ${
                    selectedSuggestion === type ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                  }`}
                  onClick={() => setSelectedSuggestion(type)}
                >
                  <h4 className="font-semibold text-lg mb-2">{portfolios[type].title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{portfolios[type].description}</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    {portfolios[type].assets.map((a, i) => (
                      <li key={i} className="flex justify-between">
                        <span>{a.name}</span>
                        <span>{a.percentage}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {selectedSuggestion && (
              <div className="text-center">
                <button
                  onClick={handlePurchase}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg"
                >
                  ✅ خرید این پورتفولیو
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
