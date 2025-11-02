'use client'

import { useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import dynamic from 'next/dynamic'

const Budgeting = dynamic(() => import('./Budgeting'), { ssr: false })

type Fund = {
  name: string
  slug: string
  type: string
  risk: 'کم' | 'متوسط' | 'بالا'
  image: string
  minInvestment: string
  assetDistribution: string
  roi: string
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
]

const modules = [
  {
    id: 'budget',
    title: 'پیش‌بینی بودجه',
    description: 'پیش‌بینی هزینه‌ ماهانه بر اساس درآمد و تورم',
    color: 'from-purple-500 to-purple-300',
    waveColor: 'fill-purple-200',
    icon: '/icons/budget.svg',
  },
  {
    id: 'portfolio',
    title: 'پورتفولیو هوشمند',
    description: 'پیشنهاد سرمایه‌گذاری مناسب شخصیت مالی شما',
    color: 'from-orange-500 to-orange-300',
    waveColor: 'fill-orange-200',
    icon: '/icons/portfolio.svg',
  },
  {
    id: 'advice',
    title: 'توصیه‌ مالی هوشمند',
    description: 'پیشنهادات برای کاهش هزینه و رسیدن سریع‌تر به هدف',
    color: 'from-teal-500 to-cyan-300',
    waveColor: 'fill-cyan-200',
    icon: '/icons/advice.svg',
  },
]

const expenseCategories = [
  'پوشاک',
  'سرمایه‌گذاری',
  'اجاره خانه',
  'تعمیرات',
  'پول توجیبی',
]

const priceRanges = [
  '۵۰۰ هزار تا ۱ میلیون تومان',
  '۱ تا ۲ میلیون تومان',
  '۲ تا ۵ میلیون تومان',
  '۵ تا ۱۰ میلیون تومان',
  'بیشتر از ۱۰ میلیون تومان',
]

export default function RiskAssessment() {
  const [activeModule, setActiveModule] = useState<string | null>(null)
  const [budgetStep, setBudgetStep] = useState(1)
  const [monthlyIncome, setMonthlyIncome] = useState<number | ''>('')
  const [expenses, setExpenses] = useState<Record<string, string>>({})

  const [portfolioStep, setPortfolioStep] = useState(1)
  const [goal, setGoal] = useState('')
  const [riskProfile, setRiskProfile] = useState<'کم' | 'متوسط' | 'بالا' | ''>('')
  const [duration, setDuration] = useState('')
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null)
  const [confirmed, setConfirmed] = useState(false)

  const handleExpenseSelect = (category: string, range: string) => {
    setExpenses(prev => ({
      ...prev,
      [category]: range,
    }))
  }

  const renderWaveCard = (mod: typeof modules[0]) => (
    <div
      key={mod.id}
      onClick={() => {
        setActiveModule(mod.id)
        setBudgetStep(1)
        setPortfolioStep(1)
      }}
      className={classNames(
        'rounded-2xl shadow-lg cursor-pointer overflow-hidden transition hover:scale-105 flex flex-col justify-between',
        'bg-gradient-to-tr text-white p-6',
        mod.color
      )}
    >
      <div className="flex justify-center mb-4">
        <Image src={mod.icon} alt={mod.title} width={48} height={48} />
      </div>
      <h3 className="text-lg font-bold text-center mb-2">{mod.title}</h3>
      <p className="text-sm text-center mb-4">{mod.description}</p>
      <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-12">
        <path d="M0.00,49.98 C150.00,150.00 350.00,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" className={mod.waveColor} />
      </svg>
    </div>
  )

  const renderBudgetStepContent = () => {
    if (budgetStep === 1) {
      return (
        <div className="text-right space-y-4">
          <label className="block">
            <span className="block text-sm font-medium text-gray-700">درآمد ماهانه (تومان):</span>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 text-right"
              placeholder="مثلاً ۱۰٬۰۰۰٬۰۰۰"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
            />
          </label>
        </div>
      )
    }

    if (budgetStep === 2) {
      return (
        <div className="space-y-8 text-right">
          {expenseCategories.map((category) => (
            <div key={category}>
              <p className="font-semibold mb-3">{category}:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {priceRanges.map((range) => (
                  <div
                    key={range}
                    onClick={() => handleExpenseSelect(category, range)}
                    className={classNames(
                      'cursor-pointer p-4 rounded-lg border text-sm shadow-sm transition text-right',
                      expenses[category] === range
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-purple-400'
                    )}
                  >
                    {range}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )
    }

    if (budgetStep === 3) {
      return <Budgeting />
    }

    return null
  }

  const renderPortfolioWizard = () => {
    const filteredFunds = funds.filter(f => f.risk === riskProfile)

    if (portfolioStep === 1) {
      return (
        <div className="space-y-4 text-right">
          <label>
            🎯 هدف مالی شما چیست؟
            <input
              type="text"
              placeholder="مثلاً خرید خانه"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-right"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </label>
        </div>
      )
    }

    if (portfolioStep === 2) {
      return (
        <div className="space-y-4 text-right">
          <p className="font-semibold mb-2">📌 سطح ریسک‌پذیری شما چقدر است؟</p>
          <div className="flex gap-3 flex-wrap justify-end">
            {['کم', 'متوسط', 'بالا'].map((level) => (
              <button
                key={level}
                className={classNames(
                  'px-4 py-2 rounded-md border text-sm',
                  riskProfile === level ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-gray-300 hover:border-blue-400'
                )}
                onClick={() => setRiskProfile(level as 'کم' | 'متوسط' | 'بالا')}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      )
    }

    if (portfolioStep === 3) {
      return (
        <div className="space-y-4 text-right">
          <label>
            ⏳ چه مدت می‌خواهید سرمایه‌گذاری کنید؟
            <input
              type="text"
              placeholder="مثلاً ۲ سال"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-right"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </label>
        </div>
      )
    }

    if (portfolioStep === 4) {
      return (
        <div className="space-y-4 text-right">
          <p className="font-semibold mb-4">📋 پورتفولیوهای پیشنهادی برای شما:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredFunds.map((fund) => (
              <div
                key={fund.slug}
                onClick={() => setSelectedFund(fund)}
                className={classNames(
                  'cursor-pointer p-4 border rounded-xl shadow-sm transition text-right',
                  selectedFund?.slug === fund.slug
                    ? 'border-green-600 bg-green-50'
                    : 'hover:border-blue-400'
                )}
              >
                <Image src={fund.image} alt={fund.name} width={64} height={64} />
                <h3 className="font-bold mt-2">{fund.name}</h3>
                <p className="text-sm text-gray-600">نوع: {fund.type}</p>
                <p className="text-sm text-gray-600">ریسک: {fund.risk}</p>
                <p className="text-sm text-gray-600">حداقل سرمایه‌گذاری: {fund.minInvestment}</p>
                <p className="text-sm text-gray-600">ترکیب دارایی: {fund.assetDistribution}</p>
                <p className="text-sm text-gray-600">بازدهی: {fund.roi}</p>
              </div>
            ))}
          </div>
        </div>
      )
    }

    if (portfolioStep === 5 && selectedFund && confirmed) {
      return (
        <div className="text-right space-y-4">
          <h3 className="text-xl font-bold text-green-600">✅ خرید با موفقیت انجام شد</h3>
          <ul className="text-sm text-gray-700 list-disc pr-4 space-y-1">
            <li>نام پورتفولیو: {selectedFund.name}</li>
            <li>هدف مالی: {goal}</li>
            <li>ریسک‌پذیری: {riskProfile}</li>
            <li>مدت سرمایه‌گذاری: {duration}</li>
            <li>مقدار سرمایه‌گذاری: {selectedFund.minInvestment}</li>
          </ul>
        </div>
      )
    }

    return null
  }

    const renderAdviceContent = () => {
    if (!monthlyIncome || Object.keys(expenses).length === 0) {
      return (
        <p className="text-right text-sm text-gray-500">
          لطفاً ابتدا درآمد و هزینه‌های خود را در ماژول بودجه وارد کنید.
        </p>
      )
    }

    const totalExpenseRange = Object.values(expenses)
    const tooManyExpensive = totalExpenseRange.filter(range =>
      ['۲ تا ۵ میلیون تومان', '۵ تا ۱۰ میلیون تومان', 'بیشتر از ۱۰ میلیون تومان'].includes(range)
    ).length

    const suggestions: string[] = []

    if (monthlyIncome < 5_000_000) {
      suggestions.push('درآمد شما پایین است. سعی کنید منابع درآمدی جدید ایجاد کرده یا هزینه‌ها را کاهش دهید.')
    }

    if (tooManyExpensive >= 3) {
      suggestions.push('هزینه‌های شما در بازه‌های بالا زیاد است. تلاش کنید هزینه‌های ثابت خود را کاهش دهید.')
    }

    if (riskProfile === 'بالا') {
      suggestions.push('شما ریسک‌پذیری بالایی دارید. بهتر است بخشی از سرمایه را در صندوق‌های کم‌ریسک نگه دارید.')
    }

    if (duration.includes('کمتر از ۱ سال')) {
      suggestions.push('برای سرمایه‌گذاری‌های کوتاه‌مدت، پورتفولیوهای درآمد ثابت گزینه مناسب‌تری هستند.')
    }

    if (suggestions.length === 0) {
      suggestions.push('وضعیت مالی شما متعادل است. به همین روال ادامه دهید و روی اهداف مالی خود تمرکز کنید.')
    }

    return (
      <div className="text-right space-y-4">
        <h3 className="font-bold text-lg text-green-700">📌 توصیه‌های مالی هوشمند برای شما:</h3>
        <ul className="list-disc pr-5 space-y-2 text-sm text-gray-700">
          {suggestions.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    )
  }

  const renderModal = () => {
    if (!activeModule) return null

    return (
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
        <div dir="rtl" className="bg-white rounded-xl w-full max-w-3xl h-[90vh] overflow-y-auto p-6 relative">
          <button className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl" onClick={() => setActiveModule(null)}>✕</button>

          {activeModule === 'budget' && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-right">📊 پیش‌بینی هوشمند بودجه</h2>
              {renderBudgetStepContent()}
              <div className="flex justify-between mt-6 flex-row-reverse">
                <button
                  onClick={() => setBudgetStep(budgetStep - 1)}
                  disabled={budgetStep === 1}
                  className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                >
                  مرحله قبل
                </button>
                {budgetStep < 3 ? (
                  <button
                    onClick={() => setBudgetStep(budgetStep + 1)}
                    disabled={
                      (budgetStep === 1 && !monthlyIncome) ||
                      (budgetStep === 2 && Object.keys(expenses).length < expenseCategories.length)
                    }
                    className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700"
                  >
                    مرحله بعد
                  </button>
                ) : (
                  <button
                    onClick={() => alert('اطلاعات ذخیره شد')}
                    className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
                  >
                    ذخیره اطلاعات
                  </button>
                )}
              </div>
            </div>
          )}

          {activeModule === 'portfolio' && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-right">📈 پورتفولیو هوشمند</h2>
              {renderPortfolioWizard()}
              <div className="flex justify-between mt-6 flex-row-reverse">
                <button
                  onClick={() => setPortfolioStep(portfolioStep - 1)}
                  disabled={portfolioStep === 1}
                  className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                >
                  مرحله قبل
                </button>
                {portfolioStep < 4 ? (
                  <button
                    onClick={() => setPortfolioStep(portfolioStep + 1)}
                    disabled={
                      (portfolioStep === 1 && !goal) ||
                      (portfolioStep === 2 && !riskProfile) ||
                      (portfolioStep === 3 && !duration)
                    }
                    className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                  >
                    مرحله بعد
                  </button>
                ) : portfolioStep === 4 && selectedFund ? (
                  <button
                    onClick={() => {
                      setConfirmed(true)
                      setPortfolioStep(5)
                    }}
                    className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
                  >
                    تایید و خرید
                  </button>
                ) : null}
              </div>
            </div>
          )}
                    {activeModule === 'advice' && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-right">🤖 توصیه‌های مالی هوشمند</h2>
              {renderAdviceContent()}
            </div>
          )}

        </div>
      </div>
    )
  }

  return (
    <div dir="rtl" className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">ماژول‌های هوشمند مالی</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {modules.map(renderWaveCard)}
      </div>
      {renderModal()}
    </div>
  )
}
