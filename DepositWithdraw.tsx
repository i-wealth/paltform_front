'use client'

import { useEffect, useState } from 'react'
import { zarinpalReq, zarinpalValidation } from '../lib/api/zarinpal'
import { getWallets, type Wallet } from '../lib/api/wallet'
import { getLatestPricings, returnDataItem } from '../lib/api/pricing'

const bankAccounts = ['کارت ملت 6037', 'کارت سامان 6219']

function formatAmount(input: string) {
  const parts = input.replace(/[^0-9٫.]/g, '').replace(/٫/g, '.').split('.')
  const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const decimalPart = parts[1] ? '.' + parts[1].slice(0, 2) : ''
  return intPart + decimalPart
}

export default function DepositWithdraw() {
  const [mode, setMode] = useState<'واریز' | 'برداشت'>('واریز')
  const [method, setMethod] = useState<'درگاه پرداخت' | 'واریز مستقیم'>('درگاه پرداخت')
  const [amount, setAmount] = useState('')
  const [selectedCard, setSelectedCard] = useState(bankAccounts[0])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [apiMessage, setApiMessage] = useState<string | null>(null)
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [portfolioValue, setPortfolioValue] = useState<number>(0)
  const [cryptoValue, setCryptoValue] = useState<number>(0)
  const [goldValue, setGoldValue] = useState<number>(0)

  const parseAmountToNumber = (value: string): number => {
    const onlyDigits = value.replace(/[^0-9]/g, '')
    return Number(onlyDigits)
  }

  const handleGatewayDeposit = async () => {
    setApiError(null)
    setApiMessage(null)
    const rialAmount = parseAmountToNumber(amount)
    if (!rialAmount || rialAmount <= 0) {
      setApiError('لطفاً مبلغ معتبر وارد کنید')
      return
    }

    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('amnt');
        localStorage.removeItem('souercePage');
        const res = await zarinpalReq({ amount: rialAmount })

        localStorage.setItem("amnt", String(rialAmount));
        localStorage.setItem('souercePage', "dashboard");
        let loc = "https://sandbox.zarinpal.com/pg/StartPay/" + res.data.authority;
        window.location.assign(loc);
      }
    } catch (err: any) {
      setApiError(err?.message || 'خطا در اتصال به درگاه پرداخت')
      setIsSubmitting(false)
    }
  }

  // Validate payment on redirect back
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const authority = params.get('Authority')
    const status = params.get('Status')
    if (!authority || !status) return

    const storedAmount = Number(localStorage.getItem('zarinpal_amount') || '0')
    const userId = localStorage.getItem('user_id') || 'guest'

    const finalize = () => {
      localStorage.removeItem('zarinpal_amount')
      localStorage.removeItem('user_id')
      // Clean query params
      window.history.replaceState(null, '', window.location.pathname)
    }

    ;(async () => {
      try {
        setIsSubmitting(true)
        if (status === 'OK' && storedAmount > 0) {
          await zarinpalValidation({ amount: storedAmount, authority, userId })
          setApiMessage('پرداخت با موفقیت تایید شد')
        } else {
          setApiError('پرداخت توسط کاربر لغو شد')
        }
      } catch (err: any) {
        setApiError(err?.message || 'خطا در تایید پرداخت')
      } finally {
        setIsSubmitting(false)
        finalize()
      }
    })()
  }, [])

  // Load wallets and compute summary values based on live prices
  useEffect(() => {
    (async () => {
      try {
        if (typeof window === 'undefined') return
        const raw = localStorage.getItem('userProfile')
        const userId = raw ? (() => { try { return JSON.parse(raw)?.userId as string } catch { return '' } })() : ''
        if (!userId) return

        const [userWallets, prices] = await Promise.all([
          getWallets(userId),
          getLatestPricings(),
        ])
        setWallets(userWallets)

        const priceMap: Record<string, number> = {
          abshodeh: Number(returnDataItem(prices, 'abshodeh').value),
          btc: Number(returnDataItem(prices, 'btc').value),
          eth: Number(returnDataItem(prices, 'eth').value),
          sol: Number(returnDataItem(prices, 'sol').value),
          usdt: Number(returnDataItem(prices, 'usdt').value),
        }

        let total = 0
        let cryptoTotal = 0
        let goldTotal = 0

        for (const w of userWallets) {
          const amt = Number(w.amount)
          const unit = priceMap[w.assetName]
          if (!isNaN(amt) && unit) {
            const val = amt * unit
            total += val
            if (w.category === 'crypto') cryptoTotal += val
            if (w.category === 'gold') goldTotal += val
          }
        }
        setPortfolioValue(total)
        setCryptoValue(cryptoTotal)
        setGoldValue(goldTotal)
      } catch {
        // ignore errors; UI falls back to zeros
      }
    })()
  }, [])

  
  return (
    <div className="p-6 space-y-6" dir="rtl">
      {/* اطلاعات موجودی */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow">
        <div className="text-center">
          <div className="text-sm text-gray-500">قیمت کل پورتفولیو</div>
          <div className="text-xl font-bold">{portfolioValue.toLocaleString()} تومان</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">موجودی ارزدیجیتال</div>
          <div className="text-xl font-bold">{cryptoValue.toLocaleString()} تومان</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">موجودی طلا</div>
          <div className="text-xl font-bold">{goldValue.toLocaleString()} تومان</div>
        </div>
      </div>

      {/* تب‌بندی واریز/برداشت */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <div className="flex border-b flex-wrap">
          {['واریز', 'برداشت'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setMode(tab as any)
                setMethod('درگاه پرداخت')
              }}
              className={`px-4 py-2 font-semibold ${
                mode === tab ? 'border-b-2 border-yellow-400 text-black' : 'text-gray-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* روش پرداخت (فقط در حالت واریز) */}
        {mode === 'واریز' && (
          <div className="flex gap-2 bg-gray-100 rounded-md p-1 w-full sm:w-[432px]">
            {['درگاه پرداخت', 'واریز مستقیم'].map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m as any)}
                className={`flex-1 text-sm py-2 rounded-md ${
                  method === m ? 'bg-white text-black shadow' : 'text-gray-500'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        )}

        {/* انتخاب کارت بانکی */}
        {(mode === 'برداشت' || method === 'واریز مستقیم') && (
          <div className="space-y-2 w-full sm:w-[432px]">
            <label className="block text-sm font-medium">انتخاب کارت بانکی</label>
            <select
              className="w-full border rounded-[6px] p-2 focus:outline-none"
              value={selectedCard}
              onChange={(e) => setSelectedCard(e.target.value)}
            >
              {bankAccounts.map((card) => (
                <option key={card} value={card}>
                  {card}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* فرم مبلغ */}
        <div className="space-y-2 w-full sm:w-[432px]">
          <label className="block text-sm font-medium">مبلغ</label>
          <div
            className="relative border rounded-[6px] flex items-center h-14 px-3"
            style={{
              border: '1px solid #D1D5DB',
              boxSizing: 'border-box',
            }}
          >
            <input
              type="text"
              placeholder="مبلغ"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-transparent text-right text-base font-semibold text-gray-800 outline-none"
              style={{
                fontFamily: 'modam, modam Fallback',
                fontSize: 18,
                lineHeight: '24px',
              }}
            />
            <div
              style={{
                width: 2,
                height: 32,
                backgroundColor: '#D1D5DB',
                borderRadius: 999,
                marginInline: 8,
              }}
            />
            <span
              className="text-gray-800 font-bold text-sm"
              style={{ whiteSpace: 'nowrap' }}
            >
              تومان
            </span>
          </div>
          <div className="text-gray-600 text-sm mt-1">مقدار وارد شده: {formatAmount(amount)} تومان</div>
        </div>

        {/* اطلاعات حساب در واریز مستقیم */}
        {mode === 'واریز' && method === 'واریز مستقیم' && (
          <div className="bg-yellow-100 p-4 rounded-lg text-sm text-gray-800 mt-4 w-full sm:w-[432px]">
            <p>شماره شبا مقصد: IRXXXXXXXXXXXXXX</p>
            <p>بانک: ملت</p>
            <p>گیرنده: طلاسی</p>
          </div>
        )}

        {/* دکمه نهایی */}
        {(method === 'درگاه پرداخت' || mode === 'برداشت') && (
          <div className="w-full sm:w-[432px] mt-2 space-y-2">
            <button
              onClick={() => {
                if (mode === 'واریز' && method === 'درگاه پرداخت') {
                  handleGatewayDeposit()
                }
              }}
              disabled={isSubmitting}
              className={`w-full h-[48px] bg-yellow-400 text-white font-bold rounded-[6px] flex items-center justify-center transition-opacity ${
                isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90'
              }`}
              style={{
                fontFamily: 'modam, modam Fallback',
                fontSize: 16,
                lineHeight: '24px',
              }}
            >
              {isSubmitting ? 'در حال انتقال...' : mode === 'واریز' ? 'واریز' : 'برداشت'}
            </button>

            {apiError && (
              <div className="text-red-600 text-sm">{apiError}</div>
            )}
            {apiMessage && (
              <div className="text-green-600 text-sm">{apiMessage}</div>
            )}
          </div>
        )}
      </div>

      {/* هشدار */}
      <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md text-sm leading-6">
        <strong>توجه:</strong> واریز ریال فقط از حساب بانکی به نام خودتان امکان‌پذیر است...
      </div>

      {/* لیست تراکنش‌ها */}
      <div className="mt-6">
        <h3 className="font-bold mb-2">لیست تراکنش‌های اخیر</h3>
        <div className="flex gap-2 flex-wrap mb-4">
          {['واریز', 'واریز مستقیم', 'برداشت', 'تبدیل به دارایی دیگر  '].map((f) => (
            <button
              key={f}
              className="px-3 py-1 rounded-full border text-sm hover:bg-yellow-100"
            >
              {f}
            </button>
          ))}
        </div>
        <div className="text-center text-gray-400 mt-12">
          <img src="/images/empty-box.png" alt="empty" className="mx-auto w-20 mb-4" />
          <p>تراکنشی یافت نشد</p>
        </div>
      </div>
    </div>
  )
}
