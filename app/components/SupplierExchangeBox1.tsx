'use client'

import { useState, useEffect } from 'react'
import { FaExchangeAlt } from 'react-icons/fa'

const currencies = ['تتر', 'طلا', 'تومان']

const exchangeRates: Record<string, Record<string, number>> = {
  'تتر': { 'طلا': 0.00045, 'تومان': 51000 },
  'طلا': { 'تتر': 2222, 'تومان': 114000000 },
  'تومان': { 'تتر': 0.000019, 'طلا': 0.00000087 },
}
export default function SupplierExchangeBox1() {

  const [fromCurrency, setFromCurrency] = useState('تتر')
  const [toCurrency, setToCurrency] = useState('طلا')
  const [payAmount, setPayAmount] = useState('')
  const [receiveAmount, setReceiveAmount] = useState('')

  useEffect(() => {
    if (payAmount && exchangeRates[fromCurrency]?.[toCurrency]) {
      const rate = exchangeRates[fromCurrency][toCurrency]
      const converted = parseFloat(payAmount) * rate
      setReceiveAmount(converted.toFixed(4))
    } else {
      setReceiveAmount('')
    }
  }, [payAmount, fromCurrency, toCurrency])

  return (
    <div className="relative w-full rounded-3xl p-6 bg-white/30 backdrop-blur-2xl border border-white/30 shadow-3xl ring-1 ring-white/20 overflow-hidden group h-full max-w-md mx-auto transition-all duration-300">
      {/* Glow Effects */}
      <div className="absolute -top-12 -left-12 w-40 h-40 bg-gradient-to-br from-sky-200 via-white to-transparent opacity-20 rounded-full blur-2xl group-hover:opacity-30 transition-all" />
      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-gradient-to-tr from-purple-200 via-white to-transparent opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-all" />

      {/* عنوان */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center drop-shadow-sm">
        تبدیل دارایی
      </h2>

      {/* پرداخت */}
      <div className="bg-white/60 backdrop-blur-md rounded-xl p-4 mb-4 border border-white/30 shadow-inner">
        <div className="text-sm text-gray-600">مقدار پرداخت</div>
        <div className="flex items-center justify-between mt-2">
          <input
            type="number"
            value={payAmount}
            onChange={(e) => setPayAmount(e.target.value)}
            className="bg-transparent text-xl font-semibold outline-none w-full text-gray-900 placeholder-gray-400"
            placeholder="0.00"
          />
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="ml-4 bg-white/40 text-sm text-gray-800 px-3 py-1 rounded-lg shadow backdrop-blur-md outline-none cursor-pointer"
          >
            {currencies.map(cur => (
              <option key={cur} value={cur}>{cur}</option>
            ))}
          </select>
        </div>
      </div>

      {/* آیکون تبدیل */}
      <div className="flex justify-center my-3">
        <FaExchangeAlt className="text-blue-500 text-xl drop-shadow-sm" />
      </div>

      {/* دریافتی */}
      <div className="bg-white/60 backdrop-blur-md rounded-xl p-4 mb-4 border border-white/30 shadow-inner">
        <div className="text-sm text-gray-600">مقدار دریافتی</div>
        <div className="flex items-center justify-between mt-2">
          <input
            type="text"
            value={receiveAmount}
            readOnly
            className="bg-transparent text-xl font-semibold outline-none w-full text-gray-900 placeholder-gray-400"
            placeholder="0.00"
          />
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="ml-4 bg-white/40 text-sm text-gray-800 px-3 py-1 rounded-lg shadow backdrop-blur-md outline-none cursor-pointer"
          >
            {currencies.map(cur => (
              <option key={cur} value={cur}>{cur}</option>
            ))}
          </select>
        </div>
      </div>

      {/* دکمه تبدیل */}
      <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-xl font-semibold shadow-xl hover:opacity-90 hover:scale-[1.02] transition-all duration-200">
        تبدیل {fromCurrency} به {toCurrency}
      </button>
    </div>
  )
}
