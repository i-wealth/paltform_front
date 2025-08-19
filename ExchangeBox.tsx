'use client'

import { useState, useEffect } from 'react'
import { FaExchangeAlt, FaCheckCircle, FaTimes, FaSpinner } from 'react-icons/fa'
import clsx from 'clsx'
import { 
  convertGoldToUsdt, 
  convertUsdtToGold, 
  getConversionRates, 
  calculateGoldToUsdtRate, 
  calculateUsdtToGoldRate,
  type ConversionResponse,
  type ConversionRateResponse,
  type MarketRatesResponse
} from '../lib/api/conversion'

const currencies = ['تتر', 'طلا']

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
  const [isLoading, setIsLoading] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)
  const [marketRates, setMarketRates] = useState<MarketRatesResponse | null>(null)

  // Load market rates on component mount
  useEffect(() => {
    const loadMarketRates = async () => {
      try {
        const rates = await getConversionRates()
        setMarketRates(rates)
      } catch (error) {
        console.error('Failed to load market rates:', error)
      }
    }
    loadMarketRates()
  }, [])

  // Calculate conversion rates when input changes
  useEffect(() => {
    const calculateConversion = async () => {
      const amount = parseFloat(payAmount)
      if (!isNaN(amount) && amount > 0 && !isCalculating) {
        setIsCalculating(true)
        try {
          let conversionResult: ConversionRateResponse

          if (fromCurrency === 'تتر' && toCurrency === 'طلا') {
            conversionResult = await calculateUsdtToGoldRate(amount)
          } else if (fromCurrency === 'طلا' && toCurrency === 'تتر') {
            conversionResult = await calculateGoldToUsdtRate(amount)
          } else {
            // For other combinations, we'll use market rates if available
            if (marketRates) {
              let tomanAmount = 0
              let finalReceive = 0
              
              if (fromCurrency === 'تتر' && toCurrency === 'تومان') {
                tomanAmount = amount * marketRates.usdtToGold.usdtPrice
                finalReceive = tomanAmount
              } else if (fromCurrency === 'طلا' && toCurrency === 'تومان') {
                tomanAmount = amount * marketRates.goldToUsdt.goldPrice
                finalReceive = tomanAmount
              } else if (fromCurrency === 'تومان' && toCurrency === 'تتر') {
                tomanAmount = amount
                finalReceive = tomanAmount / marketRates.usdtToGold.usdtPrice
              } else if (fromCurrency === 'تومان' && toCurrency === 'طلا') {
                tomanAmount = amount
                finalReceive = tomanAmount / marketRates.goldToUsdt.goldPrice
              }

              setReceiveAmount(finalReceive.toFixed(4))
              setCommission(tomanAmount * 0.01) // 1% commission
              setApproximateTomanValue(tomanAmount)
              setIsCalculating(false)
              return
            } else {
              setReceiveAmount('')
              setCommission(0)
              setApproximateTomanValue(0)
              setIsCalculating(false)
              return
            }
          }

          setReceiveAmount(conversionResult.output.amount.toFixed(4))
          setCommission(conversionResult.input.totalToman * 0.01) // 1% commission
          setApproximateTomanValue(conversionResult.input.totalToman)
        } catch (error) {
          console.error('Failed to calculate conversion:', error)
          setReceiveAmount('')
          setCommission(0)
          setApproximateTomanValue(0)
        } finally {
          setIsCalculating(false)
        }
      } else {
        setReceiveAmount('')
        setCommission(0)
        setApproximateTomanValue(0)
      }
    }

    
    calculateConversion()
  }, [payAmount, fromCurrency, toCurrency, marketRates])

  const handleConvertClick = () => {
    if (!payAmount || parseFloat(payAmount) <= 0) return
    setIsConfirmModalOpen(true)
    setIsConfirmed(false)
  }

  const handleFinalConfirm = async () => {
    if (!isConfirmed) return
    
    setIsLoading(true)
    try {
      const amount = parseFloat(payAmount)
      if (typeof window !== 'undefined') {
              const raw = localStorage.getItem('userProfile');
              if (raw !== null) {
                try {
                  console.log("IIIIIIIIIIIITTTTTTTTTTTTTEEEEEEEEERRRRRRRRRRRR");
                  const prof = JSON.parse(raw);
                  const userId = prof["userId"];
                  let conversionResult: ConversionResponse
                  if (fromCurrency === 'تتر' && toCurrency === 'طلا') {
                    conversionResult = await convertUsdtToGold(userId, amount)
                  } else if (fromCurrency === 'طلا' && toCurrency === 'تتر') {
                    conversionResult = await convertGoldToUsdt(userId, amount)
                  } else {
                    throw new Error('تبدیل بین این ارزها پشتیبانی نمی‌شود')
                  }
                }
                catch{}
              }
            }
       // TODO: Get from authentication context
      
         
      
      setIsConfirmModalOpen(false)
      setNotification('تبدیل با موفقیت انجام شد.')
      setTimeout(() => setNotification(null), 4000)
      setPayAmount('')
      setReceiveAmount('')
      setCommission(0)
      setApproximateTomanValue(0)
    } catch (error) {
      console.error('Conversion failed:', error)
      setNotification(error instanceof Error ? error.message : 'خطا در انجام تبدیل')
      setTimeout(() => setNotification(null), 4000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* ✅ Notification */}
      {notification && (
        <div className={clsx(
          "fixed top-4 right-4 px-4 py-3 rounded-lg flex items-center gap-3 shadow-lg z-[9999]",
          notification.includes('خطا') ? "bg-red-600 text-white" : "bg-green-600 text-white"
        )}>
          {notification.includes('خطا') ? <FaTimes /> : <FaCheckCircle />}
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
              disabled={!isConfirmed || isLoading}
              className={clsx(
                "w-full py-2 rounded-md mt-4 font-semibold transition flex items-center justify-center gap-2",
                isConfirmed && !isLoading ? "bg-green-600 hover:bg-green-700" : "bg-gray-500 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  در حال انجام...
                </>
              ) : (
                'تأیید و انجام تبدیل'
              )}
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
            <div className="flex items-center w-full">
              <input
                type="text"
                value={isCalculating ? '...' : receiveAmount}
                readOnly
                className="bg-transparent text-xl font-semibold outline-none w-full text-gray-900 placeholder-gray-400"
                placeholder={isCalculating ? "در حال محاسبه..." : "0.00"}
              />
              {isCalculating && (
                <FaSpinner className="animate-spin text-blue-500 ml-2" />
              )}
            </div>
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
          disabled={!payAmount || parseFloat(payAmount) <= 0 || isCalculating}
          className={clsx(
            "w-full mt-4 text-white py-2 rounded-xl font-semibold shadow-xl transition-all duration-200 flex items-center justify-center gap-2",
            (!payAmount || parseFloat(payAmount) <= 0 || isCalculating) 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 hover:scale-[1.02]"
          )}
        >
          {isCalculating ? (
            <>
              <FaSpinner className="animate-spin" />
              در حال محاسبه...
            </>
          ) : (
            `تبدیل ${fromCurrency} به ${toCurrency}`
          )}
        </button>
      </div>
    </>
  )
}
