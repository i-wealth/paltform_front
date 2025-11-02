'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

const funds = [
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

export default function AutoInvestment() {
  const [step, setStep] = useState(1)
  const [bank, setBank] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [investmentPeriod, setInvestmentPeriod] = useState('')
  const [portfolio, setPortfolio] = useState('')
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null)
  const [selectedFund, setSelectedFund] = useState<any>(null)
  const [showFunds, setShowFunds] = useState(false)
  const [purchaseConfirmed, setPurchaseConfirmed] = useState(false)

  const totalSteps = 5

  const handleNextStep = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const isSelected = (value: string, current: string) => value === current

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-purple-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        {/* Stepper */}
        <div className="flex justify-between items-center mb-8">
          {[1, 2, 3, 4].map((s, index) => (
            <div key={s} className="flex flex-col items-center flex-1">
              <div
                className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                  step >= s ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}
              >
                {step > s ? <CheckCircleIcon className="w-5 h-5 text-white" /> : s}
              </div>
              <span
                className={`text-sm mt-2 ${
                  step >= s ? 'text-purple-700 font-semibold' : 'text-gray-500'
                }`}
              >
                مرحله {s}
              </span>
              {index < 3 && <div className="w-full h-px bg-gray-300 mt-2" />}
            </div>
          ))}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">سرمایه گذاری خودکار</h2>

        {/* Step Content */}
        <div className="space-y-6 text-center">
          {step === 1 && (
            <>
              <p className="text-lg text-gray-700 font-bold">
                با فعال‌سازی خرید خودکار بدون فراموشی و در بازه‌های زمانی دلخواه وجه از حساب بانکی شما کسر می‌گردد و دارایی مورد نظر برای شما خریداری می‌شود!
              </p>
              <button
                onClick={handleNextStep}
                className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700"
              >
                شروع
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-lg text-gray-700 font-bold">
                در این مرحله بانکی را که می‌خواهید به صورت مستمر، وجه موردنظر برای خرید دارایی از آن برداشت شود را انتخاب نمایید.
              </p>
              <div className="grid grid-cols-1 gap-4 text-right">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">انتخاب حساب بانکی</label>
                  <select
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="">انتخاب کنید...</option>
                    <option value="حساب3278***3221">حساب3278***3221</option>
                    <option value="حساب3496***8008">حساب3496***8008</option>
                  </select>
                </div>

                <div className="mt-4">
                  <label className="block text-sm text-gray-700 mb-2">شماره موبایل</label>
                  <input
                    type="tel"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="مثال: 09123456789"
                  />
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <p className="text-lg text-gray-700 font-bold">در این بخش بازه زمانی تکرار تراکنش خرید دارایی و مدت قرارداد را انتخاب نمایید.</p>
              <p className="text-sm text-gray-700 mb-4 text-right">بازه سرمایه‌گذاری را انتخاب کن:</p>
              <div className="grid grid-cols-3 gap-4">
                {['ماهانه', 'سه‌ماهه', 'سالانه'].map((period) => (
                  <div
                    key={period}
                    onClick={() => setInvestmentPeriod(period)}
                    className={`border rounded-xl px-4 py-3 text-center cursor-pointer transition ${
                      isSelected(period, investmentPeriod)
                        ? 'bg-purple-100 border-purple-600 text-purple-800 font-semibold'
                        : 'hover:border-purple-400'
                    }`}
                  >
                    {period}
                  </div>
                ))}
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <p className="text-lg text-gray-700 font-bold mb-4">لطفاً شخصیت سرمایه‌گذاری خود را انتخاب کنید تا ترکیب مناسب پیشنهاد داده شود.</p>
              <div className="flex flex-wrap justify-center font-bold gap-4 mb-6">
                {['کم ریسک', 'معتدل', 'جسور'].map((risk) => (
                  <button
                    key={risk}
                    onClick={() => {
                      let mappedRisk: string
                      if (risk === 'کم ریسک') mappedRisk = 'کم'
                      if (risk === 'معتدل') mappedRisk = 'متوسط'
                      if (risk === 'جسور') mappedRisk = 'بالا'

                      setSelectedProfile(mappedRisk)
                      setShowFunds(false)
                      setSelectedFund(null)
                      setPurchaseConfirmed(false)
                    }}
                    className={`px-6 py-2 rounded-full border text-sm transition ${
                      selectedProfile === (risk === 'کم ریسک' ? 'کم' : risk === 'معتدل' ? 'متوسط' : 'بالا')
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    شخصیت {risk}
                  </button>
                ))}
              </div>

              {selectedProfile && (
                <div className="text-center">
                  <button
                    onClick={() => setShowFunds(true)} // فعال کردن نمایش صندوق‌ها
                    className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md text-sm font-bold"
                  >
                    مشاهده ترکیب پیشنهادی
                  </button>
                </div>
              )}

              {showFunds && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                  {funds
                    .filter((fund) => fund.risk === selectedProfile) // فیلتر بر اساس ریسک
                    .map((fund, index) => (
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
                        onClick={() => {
                          setPurchaseConfirmed(true)
                          setPortfolio(selectedFund.name)
                        }}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold text-sm"
                      >
                        انتخاب این صندوق
                      </button>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {step === 5 && (
            <>
              <h4 className="text-lg font-bold text-gray-700">خلاصه اطلاعات</h4>
              <ul className="text-right font-bold mt-4 space-y-2 text-sm text-gray-700">
                <li>بانک انتخابی: {bank}</li>
                <li>شماره موبایل: {phoneNumber}</li>
                <li>بازه سرمایه‌گذاری: {investmentPeriod}</li>
                <li>پورتفولیو: {portfolio}</li>
              </ul>
              <button
                onClick={() => alert(' خرید انجام شد')}
                className="mt-6 px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600"
              >
                تایید و خرید
              </button>
            </>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-10 flex justify-between items-center">
          {step > 1 && (
            <button
              onClick={handlePrevStep}
              className="px-4 py-2 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-100"
            >
              قبلی
            </button>
          )}

          {step < totalSteps && (
            <button
              onClick={handleNextStep}
              className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700"
            >
              ادامه
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
