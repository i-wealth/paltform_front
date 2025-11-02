'use client'

import { useState } from 'react'

type CryptoOption = {
  name: string
  value: string
  rate: number // تومان به ازای یک واحد
}

const cryptoOptions: CryptoOption[] = [
  { name: 'تتر (USDT)', value: 'usdt', rate: 90000 },
  { name: 'بیت‌کوین (BTC)', value: 'btc', rate: 3600000000 },
  { name: 'اتریوم (ETH)', value: 'eth', rate: 145000000 },
  { name: 'سولانا (SOL)', value: 'sol', rate: 3600000 },
  { name: 'ریپل (XRP)', value: 'xrp', rate: 16000 },
]

import ExchangeBox from './ExchangeBox'

export default function HeroSection() {
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false)
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false)

  const [selectedCoin, setSelectedCoin] = useState('usdt')
  const [amount, setAmount] = useState<number>(0)

  const selectedCrypto = cryptoOptions.find((c) => c.value === selectedCoin) || cryptoOptions[0]
  const totalPrice = amount * selectedCrypto.rate

  return (
    <section className="bg-black py-16 px-6 md:px-20 relative z-10" dir="rtl">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12 text-center md:text-right">
        {/* متن سمت راست */}
        <div className="md:order-1 order-2 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold leading-loose text-white">
            خرید و فروش <span className="text-blue-600">ارزدیجیتال</span><br />
          </h1>
          <p className="text-gray-300 text-base md:text-lg">
            خرید ارزدیجیتال به صورت رسمی و تضمین‌شده با هر میزان سرمایه دلخواه در هر لحظه
            شبانه‌روز در آی کوین 
          </p>

          <div className="flex flex-col md:flex-row justify-center md:justify-end gap-4 mt-6">
            <button
              onClick={() => setIsBuyModalOpen(true)}
              className="bg-blue-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              خرید ارزدیجیتال
            </button>
            <button
              onClick={() => setIsConvertModalOpen(true)}
              className="border border-gray-400 px-6 py-3 rounded-lg font-semibold text-gray-300 hover:bg-gray-700 transition"
            >
              قابلیت تبدیل با طلا
            </button>
          </div>

          <p className="text-xs text-gray-500 pt-2">مجوزهای ایران ولث </p>
        </div>

        {/* گیف سمت چپ */}
        <div className="relative w-full h-80 md:h-96 md:order-2 order-1">
          <img
            src="/images/11.gif"
            alt="GIF Animation"
            className="w-full h-full object-contain mx-auto"
          />
        </div>
      </div>

      {/* ✅ مودال خرید ارز دیجیتال */}
      {isBuyModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-10"
          onClick={() => setIsBuyModalOpen(false)}
        >
          <div
            className="bg-white max-w-md w-full rounded-2xl p-6 space-y-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-bold text-gray-800">خرید ارز دیجیتال</h2>
              <button
                onClick={() => setIsBuyModalOpen(false)}
                className="text-gray-500 text-2xl hover:text-red-500"
              >
                ×
              </button>
            </div>

            {/* فرم خرید */}
            <div className="space-y-4 text-right">
              {/* لیست ارزها */}
              <label className="block text-sm text-gray-600 font-medium">انتخاب ارز</label>
              <select
                value={selectedCoin}
                onChange={(e) => setSelectedCoin(e.target.value)}
                className="border border-gray-300 rounded-lg w-full px-4 py-2 text-sm text-gray-700"
              >
                {cryptoOptions.map((coin) => (
                  <option key={coin.value} value={coin.value}>
                    {coin.name}
                  </option>
                ))}
              </select>

              {/* مقدار به تومان */}
              <label className="block text-sm text-gray-600 font-medium">مقدار (به تومان)</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-right text-sm text-gray-800"
                placeholder="مثلاً ۵۰۰۰۰۰"
                value={amount || ''}
                onChange={(e) => setAmount(+e.target.value)}
              />

              {/* نمایش معادل */}
              {amount > 0 && (
                <div className="text-sm text-gray-600 mt-1">
                  معادل:{' '}
                  <span className="text-green-600 font-semibold">
                    {(amount / selectedCrypto.rate).toFixed(6)} {selectedCoin.toUpperCase()}
                  </span>
                </div>
              )}

              {/* دکمه ادامه */}
              <button
                onClick={() => {
                  alert(`خرید ${amount} تومان برای ${selectedCoin.toUpperCase()} انجام شد!`)
                  setIsBuyModalOpen(false)
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-3 rounded-xl text-sm font-bold transition-all"
              >
                ادامه خرید
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ مودال تبدیل ارز به طلا */}
      {isConvertModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-10"
          onClick={() => setIsConvertModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-4 rounded-2xl w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-lg font-bold text-gray-800">تبدیل ارز به طلا</h2>
              <button
                onClick={() => setIsConvertModalOpen(false)}
                className="text-gray-500 text-xl hover:text-red-500"
              >
                ×
              </button>
            </div>
            <ExchangeBox />
          </div>
        </div>
      )}
    </section>
  )
}
