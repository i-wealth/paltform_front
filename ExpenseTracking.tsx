'use client'

import { useState } from 'react'
import Link from 'next/link'

const incomeRanges = [
  '۵ تا ۱۰ میلیون تومان',
  '۱۰ تا ۱۵ میلیون تومان',
  '۱۵ تا ۲۰ میلیون تومان',
  'بیشتر از ۲۰ میلیون تومان'
]

const categories = [
  'خوراک',
  'پوشاک',
  'تعمیرات (ماشین و خانه)',
  'سرمایه گذاری',
  'مسافرت',
  'اجاره خانه',
  'پول توجیبی'
]

const expenseRanges = [
  '۲۰۰ تا ۵۰۰ هزار تومان',
  '۵۰۰ تا ۱ میلیون تومان',
  '۱ تا ۲ میلیون تومان',
  '۲ تا ۳ میلیون تومان',
  '۳ تا ۴ میلیون تومان',
  '۴ تا ۵ میلیون تومان',
  'بیش از ۵ میلیون تومان'
]

export default function ExpenseTracking() {
  const [step, setStep] = useState<1 | 2>(1)
  const [selectedIncome, setSelectedIncome] = useState<string | null>(null)
  const [selectedExpenses, setSelectedExpenses] = useState<Record<string, string>>({})
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState<boolean>(false)

  const toggleCategory = (category: string) => {
    setOpenCategory(prev => (prev === category ? null : category))
  }

  const handleExpenseChange = (category: string, value: string) => {
    setSelectedExpenses(prev => ({
      ...prev,
      [category]: value
    }))
  }

  const handleIncomeSubmit = () => {
    if (selectedIncome) {
      setStep(2)
    }
  }

  const handleFinalSubmit = () => {
    // در اینجا می‌تونی ذخیره به localStorage یا API هم انجام بدی
    setSubmitted(true)
  }

  return (
    <div className={`p-6 rounded-xl shadow-md transition-all ${submitted ? 'bg-green-50 border border-green-500' : 'bg-white'}`} dir="rtl">
      <h2 className="text-2xl font-bold mb-6 text-center text-right">ثبت درآمد و هزینه‌ها</h2>

      {/* مرحله ۱: انتخاب درآمد */}
      {step === 1 && (
        <>
          <p className="mb-4 font-semibold text-right">بازه درآمد ماهیانه را انتخاب کنید:</p>
          <div className="space-y-3 mb-6">
            {incomeRanges.map((range, index) => (
              <label
                key={index}
                className="flex items-center flex-row-reverse space-x-reverse space-x-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="incomeRange"
                  value={range}
                  checked={selectedIncome === range}
                  onChange={() => setSelectedIncome(range)}
                  className="accent-blue-600"
                />
                <span className="text-gray-700">{range}</span>
              </label>
            ))}
          </div>

          <button
            onClick={handleIncomeSubmit}
            disabled={!selectedIncome}
            className={`w-full p-3 rounded-md text-white ${
              selectedIncome ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            ادامه به مرحله هزینه‌ها
          </button>
        </>
      )}

      {/* مرحله ۲: انتخاب هزینه‌ها */}
      {step === 2 && (
        <>
          <p className="mb-4 font-semibold text-right text-blue-700">
            بازه درآمدی انتخاب‌شده: <strong>{selectedIncome}</strong>
          </p>

          <div className="space-y-4">
            {categories.map((category, index) => (
              <div key={index} className="border rounded-lg p-4 bg-white">
                <div
                  onClick={() => toggleCategory(category)}
                  className="flex justify-between items-center cursor-pointer select-none"
                >
                  <span className="font-semibold">{category}</span>
                  <span>{openCategory === category ? '▲' : '▼'}</span>
                </div>

                {openCategory === category && (
                  <div className="mt-4 space-y-2 pr-2">
                    {expenseRanges.map((range, i) => (
                      <label
                        key={i}
                        className="flex items-center flex-row-reverse space-x-reverse space-x-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={`expense-${category}`}
                          value={range}
                          checked={selectedExpenses[category] === range}
                          onChange={() => handleExpenseChange(category, range)}
                          className="accent-green-600"
                        />
                        <span className="text-gray-700">{range}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* دکمه ثبت هزینه‌ها */}
          {!submitted && (
            <button
              onClick={handleFinalSubmit}
              className="mt-6 w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-md"
            >
              ثبت هزینه‌ها
            </button>
          )}

          {/* بعد از ثبت: نمایش دکمه رفتن به مرحله بعد */}
          {submitted && (
            <div className="mt-6 text-center">
              <p className="text-green-700 font-semibold mb-4">
                ✅ اطلاعات درآمد و هزینه‌ها با موفقیت ثبت شد.
              </p>
              <Link
                href="/ai/budgeting"
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                ادامه به بودجه‌بندی هوشمند
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  )
}
