'use client'

import { useState, useEffect } from 'react'
import { FaExchangeAlt, FaCheckCircle, FaTimes } from 'react-icons/fa'
import clsx from 'clsx'

const currencies = ['تتر', 'طلا']
const TETHER_PRICE = 82600
const GOLD_PRICE = 6467000

export default function ExchangeBox() {
  const [fromCurrency, setFromCurrency] = useState('تتر')
  const [toCurrency, setToCurrency] = useState('طلا')
  const [payAmount, setPayAmount] = useState('')
  const [receiveAmount, setReceiveAmount] = useState('')
  const [commission, setCommission] = useState(0)
  const [approximateTomanValue, setApproximateTomanValue] = useState(0)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)
  const [isConfirmed, setIsConfirmed] = useState(false)

  useEffect(() => {
    const amount = parseFloat(payAmount)
    if (!isNaN(amount) && amount > 0) {
      let tomanAmount = 0
      let fee = 0
      let finalReceive = 0

      if (fromCurrency === 'تتر' && toCurrency === 'طلا') {
        tomanAmount = amount * TETHER_PRICE
        fee = tomanAmount * 0.01
        finalReceive = (tomanAmount - fee) / GOLD_PRICE
      } else if (fromCurrency === 'طلا' && toCurrency === 'تتر') {
        tomanAmount = amount * GOLD_PRICE
        fee = tomanAmount * 0.01
        finalReceive = (tomanAmount - fee) / TETHER_PRICE
      } else if (fromCurrency === 'تتر' && toCurrency === 'تومان') {
        tomanAmount = amount * TETHER_PRICE
        fee = tomanAmount * 0.01
        finalReceive = tomanAmount - fee
      } else if (fromCurrency === 'طلا' && toCurrency === 'تومان') {
        tomanAmount = amount * GOLD_PRICE
        fee = tomanAmount * 0.01
        finalReceive = tomanAmount - fee
      } else if (fromCurrency === 'تومان' && toCurrency === 'تتر') {
        tomanAmount = amount
        fee = tomanAmount * 0.01
        finalReceive = (tomanAmount - fee) / TETHER_PRICE
      } else if (fromCurrency === 'تومان' && toCurrency === 'طلا') {
        tomanAmount = amount
        fee = tomanAmount * 0.01
        finalReceive = (tomanAmount - fee) / GOLD_PRICE
      }

      setReceiveAmount(finalReceive.toFixed(4))
      setCommission(fee)
      setApproximateTomanValue(tomanAmount)
    } else {
      setReceiveAmount('')
      setCommission(0)
      setApproximateTomanValue(0)
    }
  }, [payAmount, fromCurrency, toCurrency])

  const handleConvertClick = () => {
    if (!payAmount || parseFloat(payAmount) <= 0) return
    setIsConfirmModalOpen(true)
    setIsConfirmed(false)
  }

  const handleFinalConfirm = () => {
    setIsConfirmModalOpen(false)
    setNotification('تبدیل با موفقیت انجام شد.')
    setTimeout(() => setNotification(null), 4000)
    setPayAmount('')
  }

  return (
    <>
      {/* ✅ Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg flex items-center gap-3 shadow-lg z-[9999]">
          <FaCheckCircle />
          <span>{notification}</span>
        </div>
      )}

      {/* ✅ Confirm Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 text-white">
          <div className="bg-[#1e293b] border border-white/20 rounded-xl shadow-2xl p-6 w-full max-w-md space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">تأیید تبدیل</h3>
              <button onClick={() => setIsConfirmModalOpen(false)} className="hover:text-red-400">
                <FaTimes />
              </button>
            </div>

            <ul className="text-sm space-y-2">
              <li>نوع تبدیل: <strong>{fromCurrency} → {toCurrency}</strong></li>
              <li>مقدار پرداخت: <strong>{payAmount} {fromCurrency}</strong></li>
              <li>ارزش تومانی: <strong>{approximateTomanValue.toLocaleString()} تومان</strong></li>
              <li>کمیسیون (1٪): <strong>{commission.toLocaleString()} تومان</strong></li>
              <li>مقدار دریافتی: <strong>{receiveAmount} {toCurrency}</strong></li>
            </ul>

            <label className="flex items-center gap-2 text-sm mt-4">
              <input
                type="checkbox"
                checked={isConfirmed}
                onChange={(e) => setIsConfirmed(e.target.checked)}
                className="w-4 h-4 text-blue-500"
              />
              <span>من از صحت اطلاعات وارد شده مطمئن هستم.</span>
            </label>

            <button
              onClick={handleFinalConfirm}
              disabled={!isConfirmed}
              className={clsx(
                "w-full py-2 rounded-md mt-4 font-semibold transition",
                isConfirmed ? "bg-green-600 hover:bg-green-700" : "bg-gray-500 cursor-not-allowed"
              )}
            >
              تأیید و انجام تبدیل
            </button>
          </div>
        </div>
      )}

      {/* ✅ Exchange UI */}
      <div className="relative w-full rounded-3xl p-6 bg-white/30 backdrop-blur-2xl border border-white/30 shadow-3xl ring-1 ring-white/20 overflow-hidden group h-full max-w-md mx-auto transition-all duration-300">
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-gradient-to-br from-sky-200 via-white to-transparent opacity-20 rounded-full blur-2xl group-hover:opacity-30 transition-all" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-gradient-to-tr from-purple-200 via-white to-transparent opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-all" />

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

        {/* آیکون */}
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

          {(commission > 0 || approximateTomanValue > 0) && (
            <div className="mt-4 space-y-1 text-xs text-gray-700">
              <p>ارزش تقریبی به تومان: <span className="text-green-600 font-semibold">{approximateTomanValue.toLocaleString()} تومان</span></p>
              <p>کمیسیون (1٪): <span className="text-red-500 font-semibold">{commission.toLocaleString()} تومان</span></p>
            </div>
          )}
        </div>

        {/* دکمه تبدیل */}
        <button
          onClick={handleConvertClick}
          className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-xl font-semibold shadow-xl hover:opacity-90 hover:scale-[1.02] transition-all duration-200"
        >
          تبدیل {fromCurrency} به {toCurrency}
        </button>
      </div>
    </>
  )
}
