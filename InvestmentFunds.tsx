'use client'

import Image from 'next/image'
import { useState } from 'react'

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
  {
    name: 'پورتفولیو توکن ملک',
    slug: 'property-token-portfolio',
    type: 'ETF',
    risk: 'بالا',
    image: '/images/sandogh.png',
    minInvestment: '۵۰,۰۰۰ تومان',
    assetDistribution: 'توکن املاک مسکونی ۷۰٪، تجاری ۳۰٪',
    roi: '۳۰٪ سالانه',
  },
  {
    name: 'پورتفولیو ترکیبی',
    slug: 'mixed-portfolio',
    type: 'ETF',
    risk: 'بالا',
    image: '/images/sandogh.png',
    minInvestment: '۵۰,۰۰۰ تومان',
    assetDistribution: 'سهام ۴۰٪، طلا ۳۰٪، رمز ارز ۳۰٪',
    roi: '۳۵٪ سالانه',
  },
]

const riskColor = {
  کم: 'bg-green-200 text-green-800',
  متوسط: 'bg-yellow-200 text-yellow-800',
  بالا: 'bg-red-200 text-red-800',
}

export default function InvestmentSelector() {
  const [selectedProfile, setSelectedProfile] = useState<RiskProfile | null>(null)
  const [showFunds, setShowFunds] = useState(false)
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null)
  const [purchaseConfirmed, setPurchaseConfirmed] = useState(false)

  const filteredFunds = funds.filter((f) => f.risk === selectedProfile)

  const handlePurchase = () => {
    setPurchaseConfirmed(true)
    setTimeout(() => {
      setSelectedFund(null)
      setPurchaseConfirmed(false)
    }, 2000)
  }

  return (
    <section className="py-20 px-6 bg-[#f5faff]">
      <div className="max-w-6xl mx-auto text-center space-y-10">
        <h2 className="text-3xl font-extrabold text-gray-800">تعیین شخصیت سرمایه‌گذاری</h2>

        {/* انتخاب ریسک */}
        <div className="flex flex-wrap justify-center gap-4">
          {(['کم', 'متوسط', 'بالا'] as RiskProfile[]).map((risk) => (
            <button
              key={risk}
              onClick={() => {
                setSelectedProfile(risk)
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

        {/* دکمه نمایش صندوق‌ها */}
        {selectedProfile && (
          <button
            onClick={() => setShowFunds(true)}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 py-2 text-sm font-semibold transition"
          >
            مشاهده ترکیب پیشنهادی
          </button>
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
      </div>

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
              <p className="text-green-600 font-semibold text-sm text-center">✅ خرید شما با موفقیت ثبت شد</p>
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
    </section>
  )
}
