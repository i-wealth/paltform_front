'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import {
  FaChartPie,
  FaCreditCard,
  FaExchangeAlt,
  FaCog,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
  FaTrash,
  FaCheckCircle,
  FaExclamationCircle,
} from 'react-icons/fa'
import clsx from 'clsx'

type BankCard = {
  cardNumber: string
  cardHolder: string
  expiry: string
  bankName: string
}

const bankBinMap: Record<string, string> = {
  '603799': 'بانک ملی ایران',
  '589210': 'بانک سپه',
  '627648': 'بانک توسعه صادرات',
  '627961': 'بانک صنعت و معدن',
  '603770': 'بانک کشاورزی',
  '628023': 'بانک مسکن',
  '627760': 'پست بانک ایران',
  '502908': 'بانک توسعه تعاون',
  '627412': 'بانک اقتصاد نوین',
  '622106': 'بانک پارسیان',
  '502229': 'بانک پاسارگاد',
  '627488': 'بانک کارآفرین',
  '621986': 'بانک سامان',
  '639346': 'بانک سینا',
  '639607': 'بانک سرمایه',
  '636214': 'بانک آینده',
  '502806': 'بانک شهر',
  '502938': 'بانک دی',
  '603769': 'بانک صادرات',
  '610433': 'بانک ملت',
  '627353': 'بانک تجارت',
  '585983': 'بانک رفاه کارگران',
}

const maskCardNumber = (cardNumber: string): string => {
  const cleaned = cardNumber.replace(/\s/g, '')
  if (cleaned.length !== 16) return cardNumber
  const first4 = cleaned.slice(0, 4)
  const last4 = cleaned.slice(-4)
  return `${first4} **** **** ${last4}`
}

export default function Sidebar() {
  const [isTradeOpen, setIsTradeOpen] = useState(false)
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)

  const [cardNumber, setCardNumber] = useState('')
  const [cardHolder, setCardHolder] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [detectedBank, setDetectedBank] = useState('')
  const [bankCards, setBankCards] = useState<BankCard[]>([])

  const [wallet, setWallet] = useState({ toman: 1000000, gold: 2.5, tether: 150 })
  const [fromCurrency, setFromCurrency] = useState('toman')
  const [toCurrency, setToCurrency] = useState('gold')
  const [amountToConvert, setAmountToConvert] = useState('')
  const [conversionFee, setConversionFee] = useState(0)

  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  const customInputRef = useRef<HTMLInputElement>(null)
  const convertInputRef = useRef<HTMLInputElement>(null)
  const walletModalRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const bin = cardNumber.replace(/\s/g, '').substring(0, 6)
    setDetectedBank(bankBinMap[bin] || '')
  }, [cardNumber])

  useEffect(() => {
    const stored = localStorage.getItem('bankCards')
    if (stored) {
      setBankCards(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsCardModalOpen(false)
      }
    }
    if (isCardModalOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isCardModalOpen])

  useEffect(() => {
    const handleClickOutsideWallet = (event: MouseEvent) => {
      if (walletModalRef.current && !walletModalRef.current.contains(event.target as Node)) {
        setIsWalletModalOpen(false)
      }
    }
    if (isWalletModalOpen) {
      document.addEventListener('mousedown', handleClickOutsideWallet)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideWallet)
    }
  }, [isWalletModalOpen])

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 4000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newCard: BankCard = {
      cardNumber: cardNumber.replace(/\s/g, ''),
      cardHolder,
      expiry,
      bankName: detectedBank || 'نامشخص',
    }
    const updatedCards = [...bankCards, newCard]
    setBankCards(updatedCards)
    localStorage.setItem('bankCards', JSON.stringify(updatedCards))
    setCardNumber('')
    setCardHolder('')
    setExpiry('')
    setCvv('')
    setDetectedBank('')
    showNotification('success', 'کارت با موفقیت ذخیره شد.')
  }

  const handleDelete = (index: number) => {
    const updatedCards = [...bankCards]
    updatedCards.splice(index, 1)
    setBankCards(updatedCards)
    localStorage.setItem('bankCards', JSON.stringify(updatedCards))
    showNotification('success', 'کارت حذف شد.')
  }

  const conversionRates = {
    toman: { gold: 0.0005, tether: 0.0003 },
    gold: { toman: 2000000, tether: 60 },
    tether: { toman: 33000, gold: 0.016 },
  }

  const handleConversion = () => {
    const amount = parseFloat(amountToConvert)
    if (!amount || amount <= 0 || fromCurrency === toCurrency) {
      showNotification('error', 'مقدار وارد شده نامعتبر است.')
      return
    }

    const rate = conversionRates[fromCurrency][toCurrency]
    const fee = amount * 0.01
    const converted = (amount - fee) * rate
    if (wallet[fromCurrency] < amount) {
      showNotification('error', 'موجودی کافی نیست.')
      return
    }
    setWallet((prev) => ({
      ...prev,
      [fromCurrency]: prev[fromCurrency] - amount,
      [toCurrency]: prev[toCurrency] + converted,
    }))
    setConversionFee(fee)
    setAmountToConvert('')
    showNotification('success', `تبدیل با موفقیت انجام شد. کارمزد ${fee.toFixed(2)} ${fromCurrency}`)
  }
  return (
    <>
      {notification && (
        <div
          className={clsx(
            'fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg z-[9999] flex items-center gap-3 text-sm font-medium transition-all duration-300',
            notification.type === 'success'
              ? 'bg-green-600 text-white'
              : 'bg-red-600 text-white'
          )}
        >
          {notification.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
          <span>{notification.message}</span>
        </div>
      )}

      <aside className="w-64 min-h-screen bg-white/40 backdrop-blur-2xl border-r border-white/30 p-6 text-gray-800 shadow-3xl rounded-tr-3xl rounded-br-3xl">
        <h2 className="text-3xl font-bold text-blue-600 mb-10 tracking-widest uppercase">ایران ولث</h2>
        <nav className="space-y-6 text-sm font-medium">
          <Link href="#" className="flex items-center gap-3 hover:text-blue-600 text-base font-semibold">
            <FaChartPie /> داشبورد
          </Link>
          <button onClick={() => setIsCardModalOpen(true)} className="flex items-center gap-3 hover:text-blue-600 text-base font-semibold w-full text-left">
            <FaCreditCard /> کارت بانکی
          </button>
          <button
            onClick={() => setIsTradeOpen(!isTradeOpen)}
            className="flex items-center justify-between w-full text-left gap-3 hover:text-blue-600 text-base font-semibold"
          >
            <span className="flex items-center gap-3">
              <FaExchangeAlt /> معامله
            </span>
            {isTradeOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isTradeOpen && (
            <div className="ml-6 space-y-3 text-sm mt-2">
              <Link href="#" className="block hover:text-blue-600">i-Gold</Link>
              <Link href="#" className="block hover:text-blue-600">i-Coin</Link>
              <Link href="#" className="block hover:text-blue-600">i-Melk</Link>
              <Link href="#" className="block hover:text-blue-600">i-Fund</Link>
              <Link href="#" className="block hover:text-blue-600">i-Mond</Link>
              <Link href="#" onClick={() => setIsWalletModalOpen(true)} className="block hover:text-blue-600">i-pool شارژ کیف پول</Link>
            </div>
          )}
          <Link href="#" className="flex items-center gap-3 hover:text-blue-600 text-base font-semibold">
            <FaCog /> تنظیمات
          </Link>
          <Link href="#" className="flex items-center gap-3 hover:text-blue-600 text-base font-semibold">
            <FaChartPie /> احراز هویت
          </Link>
          <Link href="#" className="flex items-center gap-3 hover:text-blue-600 text-base font-semibold">
            <FaChartPie /> هوش مصنوعی
          </Link>
          <Link href="#" className="flex items-center gap-3 hover:text-blue-600 text-base font-semibold">
            <FaChartPie /> مبدل درآمد به طلا و تتر
          </Link>
          <Link href="#" className="flex items-center gap-3 hover:text-blue-600 text-base font-semibold">
            <FaChartPie /> سرویس پرداخت خودکار اقساط
          </Link>
        </nav>
      </aside>
      {/* ✅ Modal کارت بانکی */}
      {isCardModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 text-white">
          <div ref={modalRef} className="bg-[#1e293b]/90 border border-white/20 rounded-2xl shadow-2xl p-6 w-full max-w-3xl space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">کارت‌های بانکی</h3>
              <button onClick={() => setIsCardModalOpen(false)} className="hover:text-red-400"><FaTimes /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bankCards.map((card, index) => (
                <div key={index} className="relative p-4 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl">
                  <button onClick={() => handleDelete(index)} className="absolute top-2 right-2 text-red-300 hover:text-red-500"><FaTrash /></button>
                  <div className="text-sm mb-2">{card.bankName}</div>
                  <div className="text-lg font-mono tracking-wider mb-2">{maskCardNumber(card.cardNumber)}</div>
                  <div className="flex justify-between text-sm">
                    <div><div className="text-xs">دارنده</div><div>{card.cardHolder}</div></div>
                    <div><div className="text-xs">انقضا</div><div>{card.expiry}</div></div>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 border-t border-white/20 pt-4">
              <h4 className="text-base font-semibold">افزودن کارت جدید</h4>
              <input type="text" placeholder="**** **** **** ****" maxLength={19} value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="w-full p-2 bg-white/10 border border-white/20 rounded-md text-white" />
              {detectedBank && <p className="text-sm text-green-300">بانک: {detectedBank}</p>}
              <input type="text" placeholder="نام دارنده" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} className="w-full p-2 bg-white/10 border border-white/20 rounded-md text-white" />
              <div className="flex gap-2">
                <input type="text" placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} className="w-1/2 p-2 bg-white/10 border border-white/20 rounded-md text-white" />
                <input type="text" placeholder="CVV2" value={cvv} onChange={(e) => setCvv(e.target.value)} className="w-1/2 p-2 bg-white/10 border border-white/20 rounded-md text-white" />
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-md">ذخیره کارت</button>
            </form>
          </div>
        </div>
      )}

      {/* ✅ Modal کیف پول */}
      {isWalletModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 text-white">
          <div ref={walletModalRef} className="bg-[#1e293b]/90 border border-white/20 rounded-2xl shadow-2xl p-6 w-full max-w-2xl space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">شارژ کیف پول</h3>
              <button onClick={() => setIsWalletModalOpen(false)} className="hover:text-red-400"><FaTimes /></button>
            </div>

            <div className="border-b border-white/20 pb-4 space-y-2">
              <h4 className="text-base font-semibold">مبالغ پیشنهادی</h4>
              <div className="grid grid-cols-3 gap-2">
                {[500000, 1000000, 5000000].map(amount => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => {
                      setWallet(p => ({ ...p, toman: p.toman + amount }))
                      if (customInputRef.current) {
                        customInputRef.current.value = amount.toString()
                      }
                      if (convertInputRef.current) {
                        convertInputRef.current.value = amount.toString()
                        setAmountToConvert(amount.toString())
                      }
                      showNotification('success', `مبلغ ${amount.toLocaleString()} تومان به کیف پول افزوده شد.`)
                    }}
                    className="bg-blue-600 py-2 rounded-md hover:bg-blue-700"
                  >
                    {amount.toLocaleString()} تومان
                  </button>
                ))}
              </div>

              <form onSubmit={(e) => {
                e.preventDefault()
                const customAmount = parseInt((customInputRef.current?.value || '0'))
                if (!isNaN(customAmount) && customAmount > 0) {
                  setWallet(p => ({ ...p, toman: p.toman + customAmount }))
                  showNotification('success', `مبلغ ${customAmount.toLocaleString()} تومان با موفقیت افزوده شد.`)
                  if (convertInputRef.current) {
                    convertInputRef.current.value = customAmount.toString()
                    setAmountToConvert(customAmount.toString())
                  }
                  customInputRef.current!.value = ''
                } else {
                  showNotification('error', 'مقدار وارد شده معتبر نیست.')
                }
              }}>
                <div className="flex gap-2 mt-2">
                  <input ref={customInputRef} name="custom" type="number" placeholder="مبلغ دلخواه" className="flex-1 bg-white/10 border border-white/20 rounded-md p-2 text-white" />
                  <button type="submit" className="bg-green-600 hover:bg-green-700 px-4 rounded-md">شارژ</button>
                </div>
              </form>
            </div>

            {/* مدیریت موجودی */}
            <div className="pt-4 border-t border-white/20">
              <h4 className="text-base font-semibold mb-2">مدیریت موجودی</h4>
              <div className="grid grid-cols-3 gap-4 text-center text-sm font-semibold">
                <div className="bg-white/10 p-4 rounded-xl border border-white/20 shadow"><p>تومان</p><p className="text-lg text-green-300">{wallet.toman.toLocaleString()}</p></div>
                <div className="bg-white/10 p-4 rounded-xl border border-white/20 shadow"><p>طلا</p><p className="text-lg text-yellow-300">{wallet.gold} گرم</p></div>
                <div className="bg-white/10 p-4 rounded-xl border border-white/20 shadow"><p>تتر</p><p className="text-lg text-blue-300">{wallet.tether} USDT</p></div>
              </div>
            </div>

            {/* تبدیل ارز */}
            <form onSubmit={(e) => { e.preventDefault(); handleConversion() }} className="space-y-4 pt-4">
              <h4 className="text-base font-semibold">تبدیل موجودی</h4>
              <div className="flex gap-4">
                <select className="w-1/3 p-2 bg-white/10 border border-white/20 rounded-md text-white" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                  <option value="toman">تومان</option>
                  <option value="gold">طلا</option>
                  <option value="tether">تتر</option>
                </select>
                <span className="flex items-center justify-center">→</span>
                <select className="w-1/3 p-2 bg-white/10 border border-white/20 rounded-md text-white" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                  <option value="toman">تومان</option>
                  <option value="gold">طلا</option>
                  <option value="tether">تتر</option>
                </select>
                <input
                  ref={convertInputRef}
                  type="number"
                  value={amountToConvert}
                  onChange={(e) => setAmountToConvert(e.target.value)}
                  className="w-1/3 p-2 bg-white/10 border border-white/20 rounded-md text-white"
                  placeholder="مبلغ"
                />
              </div>
              {conversionFee > 0 && <p className="text-sm text-yellow-300">کارمزد: {conversionFee.toFixed(2)} {fromCurrency}</p>}
              <button type="submit" className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-md">انجام تبدیل</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
