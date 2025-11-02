'use client'

import Image from 'next/image'
import { useMemo, useState, useEffect } from 'react'
import clsx from 'clsx'

// ایمپورت کامپوننت‌های واقعی
import ExchangeBox from '../components/ExchangeBox'
import CardItem from '../components/CardItem'
import TransactionsHistory from '../components/TransactionsHistory'
import CryptoAssetsDistribution from '../components/CryptoAssetsDistribution'

// کامپوننت پاپ‌آپ برای منو
const MenuPopup = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null

  const renderContent = () => {
    switch (type) {
      case 'تبدیل':
        return <ExchangeBox />
      case 'توزیع دارایی ها':
        return <CryptoAssetsDistribution />
      case 'تراکنش ها':
        return <TransactionsHistory />
      case 'کیف پول':
        return <CardItem />
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute left-4 top-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {renderContent()}
      </div>
    </div>
  )
}

// کامپوننت منوی موبایل
const MobileMenu = ({ isOpen, onClose, onMenuClick }) => {
  if (!isOpen) return null

  const menuItems = [
    { label: 'تبدیل', type: 'تبدیل' },
    { label: 'توزیع دارایی ها', type: 'توزیع دارایی ها' },
    { label: 'تراکنش ها', type: 'تراکنش ها' },
    { label: 'کیف پول', type: 'کیف پول' }
  ]

  const handleMenuClick = (type) => {
    onMenuClick(type)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={onClose}>
      <div 
        className="absolute left-0 top-0 h-full w-64 bg-white shadow-2xl transform transition-transform"
        onClick={(e) => e.stopPropagation()}
      >
        {/* هدر منوی موبایل */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">منو</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* آیتم‌های منو */}
        <div className="py-4">
          {menuItems.map((item) => (
            <button
              key={item.type}
              onClick={() => handleMenuClick(item.type)}
              className="w-full text-right px-6 py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-between border-b border-gray-100"
            >
              <span className="font-medium">{item.label}</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>

        {/* بخش پایینی */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
              ورود
            </button>
            <button className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition">
              ثبت‌نام
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// انواع داده‌ها
type CryptoItem = {
  id: string
  name: string
  symbol: string
  icon: string
  price: number
  change: number
}

type ExchangeModalProps = {
  isOpen: boolean
  onClose: () => void
  crypto: CryptoItem | null
  userBalanceToman?: number
}

// تابع کمکی برای فرمت اعداد
const fmtFA = (n: number, opts: Intl.NumberFormatOptions = {}) =>
  Number.isFinite(n) ? n.toLocaleString('fa-IR', { maximumFractionDigits: 8, ...opts }) : '—'

// تبدیل ارقام فارسی/عربی به انگلیسی
const toEnglishDigits = (s: string) =>
  s.replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))).replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))

// فقط رقم (پس از نرمال‌سازی)
const onlyDigits = (s: string) => toEnglishDigits(s).replace(/\D+/g, '')

// کامپوننت مدال خرید و فروش
const ExchangeModal = ({ isOpen, onClose, crypto, userBalanceToman = 0 }: ExchangeModalProps) => {
  const [transactionType, setTransactionType] = useState<'buy' | 'sell'>('buy')
  const [fillAll, setFillAll] = useState(false)
  const [amountStr, setAmountStr] = useState('')
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  const { amountToman, cryptoUnits, fee, total } = useMemo(() => {
    const clean = Number(onlyDigits(amountStr))
    const amountToman = fillAll ? userBalanceToman : clean
    const tomanPerUnit = crypto?.price ? crypto.price * 1000 : 0 // تبدیل به تومان
    const cryptoUnits = tomanPerUnit ? amountToman / tomanPerUnit : 0
    const fee = amountToman * 0.005
    const total = amountToman + fee
    return { amountToman, cryptoUnits, fee, total }
  }, [amountStr, fillAll, userBalanceToman, crypto])

  useEffect(() => {
    if (isOpen) setSuccessMsg(null)
  }, [isOpen])

  if (!isOpen || !crypto) return null

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = onlyDigits(e.target.value)
    setFillAll(false)
    setAmountStr(raw ? Number(raw).toLocaleString('fa-IR') : '')
  }

  const handleFillAllToggle = (checked: boolean) => {
    setFillAll(checked)
    if (checked) setAmountStr(userBalanceToman.toLocaleString('fa-IR'))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSuccessMsg('تراکنش با موفقیت ثبت شد')
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-gray-200 shadow-xl" dir="rtl">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {transactionType === 'buy' ? `خرید ${crypto.name}` : `فروش ${crypto.name}`}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-600 mb-2">نوع تراکنش</label>
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value as 'buy' | 'sell')}
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            >
              <option value="buy">خرید</option>
              <option value="sell">فروش</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">مبلغ (تومان)</label>
            <input
              type="text"
              inputMode="numeric"
              value={amountStr}
              onChange={handleAmountChange}
              placeholder="مثلاً ١٠٠٬٠٠٠٬٠٠٠"
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              disabled={fillAll}
            />
            <div className="mt-3 flex items-center gap-2">
              <input
                id="fillAll"
                type="checkbox"
                className="w-4 h-4"
                checked={fillAll}
                onChange={(e) => handleFillAllToggle(e.target.checked)}
              />
              <label htmlFor="fillAll" className="text-sm text-gray-700">
                خرید با تمام موجودی ({fmtFA(userBalanceToman)} تومان)
              </label>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
            <div className="flex justify-between">
              <span>مقدار:</span>
              <span>{fmtFA(cryptoUnits)} {crypto.name}</span>
            </div>
            <div className="flex justify-between">
              <span>قیمت واحد:</span>
              <span>{fmtFA(crypto.price * 1000)} تومان</span>
            </div>
            <div className="flex justify-between">
              <span>جمع کل:</span>
              <span>{fmtFA(amountToman)} تومان</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>کارمزد (۰.۵٪):</span>
              <span>{fmtFA(fee)} تومان</span>
            </div>
            <div className="flex justify-between font-bold text-orange-600 border-t pt-3 text-lg">
              <span>مبلغ نهایی:</span>
              <span>{fmtFA(total)} تومان</span>
            </div>
          </div>

          {successMsg && (
            <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 text-green-800 px-4 py-3">
              <span className="text-sm font-medium">{successMsg}</span>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-400 transition"
            >
              لغو
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              تایید خرید
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// داده‌های نمونه - 4 ارز اول دقیقاً مطابق عکس
const cryptoList: CryptoItem[] = [
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: '/images/bitcoin.png',
    price: 98090,
    change: -0.91
  },
  {
    id: 'xrp',
    name: 'Ripple',
    symbol: 'XRP',
    icon: '/images/ripple.png',
    price: 2.26,
    change: 0.69
  },
  {
    id: 'aave',
    name: 'Aave',
    symbol: 'AAVE',
    icon: '/images/aave.png',
    price: 200,
    change: -2.08
  },
  {
    id: 'crv',
    name: 'Curve',
    symbol: 'CRV',
    icon: '/images/curve.png',
    price: 0.48,
    change: -1.95
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    icon: '/images/ethereum.png',
    price: 3124,
    change: 0.65
  },
  {
    id: 'sol',
    name: 'Solana',
    symbol: 'SOL',
    icon: '/images/solana.png',
    price: 200,
    change: 0.65
  },
  {
    id: 'tao',
    name: 'Bittensor',
    symbol: 'TAO',
    icon: '/images/bittensor.png',
    price: 4124,
    change: 0.92
  },
  {
    id: 'dot',
    name: 'Polkadot',
    symbol: 'DOT',
    icon: '/images/polkadot.png',
    price: 3.14,
    change: -0.20
  },
  {
    id: 'matic',
    name: 'Polygon',
    symbol: 'MATIC',
    icon: '/images/polygon.png',
    price: 0.20,
    change: 0.89
  },
  {
    id: 'avax',
    name: 'Avalanche',
    symbol: 'AVAX',
    icon: '/images/avalanche.png',
    price: 4.12,
    change: -0.72
  },
  {
    id: 'link',
    name: 'Chainlink',
    symbol: 'LINK',
    icon: '/images/chainlink.png',
    price: 5.60,
    change: 0.54
  },
  {
    id: 'ada',
    name: 'Cardano',
    symbol: 'ADA',
    icon: '/images/cardano.png',
    price: 0.66,
    change: -1.32
  }
]

// کامپوننت اصلی
export default function CryptoExchange() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoItem | null>(null)
  const [menuPopupOpen, setMenuPopupOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState('')
  const [activeTab, setActiveTab] = useState('همه')
  const userBalanceToman = 125_000_000

  const openModal = (crypto: CryptoItem) => {
    setSelectedCrypto(crypto)
    setModalOpen(true)
  }

  const handleMenuClick = (menuType: string) => {
    setActiveMenu(menuType)
    setMenuPopupOpen(true)
  }

  const closeMenuPopup = () => {
    setMenuPopupOpen(false)
    setActiveMenu('')
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  // 4 ارز اول برای طراحی ویژه
  const featuredCrypto = cryptoList.slice(0, 4)
  // بقیه ارزها برای بخش سایر ارزها
  const otherCrypto = cryptoList.slice(4)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100" dir="rtl">
      {/* هدر */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 md:gap-8">
              {/* دکمه منوی موبایل */}
              <button 
                onClick={toggleMobileMenu}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">آی کوین</h1>
              
              {/* منوی دسکتاپ */}
              <nav className="hidden md:flex gap-6">
                <button 
                  onClick={() => handleMenuClick('تبدیل')}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  تبدیل
                </button>
                <button 
                  onClick={() => handleMenuClick('توزیع دارایی ها')}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  توزیع دارایی ها
                </button>
                <button 
                  onClick={() => handleMenuClick('تراکنش ها')}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  تراکنش ها
                </button>
                <button 
                  onClick={() => handleMenuClick('کیف پول')}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  کیف پول
                </button>
              </nav>
            </div>
            
            
          </div>
        </div>
      </header>

      {/* محتوای اصلی */}
      <main className="container mx-auto px-4 py-8">
        {/* هدینگ و تب‌ها */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">ارزهای دیجیتال</h2>
          <div className="flex gap-2 md:gap-4 bg-white rounded-xl md:rounded-2xl p-2 border border-gray-200 w-full md:w-auto overflow-x-auto">
            {['همه', 'پرمعامله ترین', 'جدید'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 md:px-6 py-2 rounded-lg md:rounded-xl font-medium transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 4 ارز اول با طراحی ویژه */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {featuredCrypto.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 border border-gray-200 hover:shadow-lg md:hover:shadow-xl transition-all duration-300"
              >
                {/* هدر کارت */}
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl md:rounded-2xl flex items-center justify-center">
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg md:rounded-xl flex items-center justify-center text-white text-xs font-bold">
                        {item.symbol.substring(0, 3)}
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-base md:text-lg">{item.name}</div>
                      <div className="text-gray-500 text-xs md:text-sm">{item.symbol}</div>
                    </div>
                  </div>
                </div>
                
                {/* قیمت و تغییرات */}
                <div className="space-y-3 md:space-y-4">
                  <div className="text-xl md:text-2xl font-bold text-gray-900">
                    ${item.price.toLocaleString('en-US')}
                  </div>
                  <div className={clsx(
                    'inline-flex items-center px-3 py-1 md:px-4 md:py-2 rounded-xl md:rounded-2xl text-xs md:text-sm font-semibold',
                    item.change >= 0 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  )}>
                    {item.change >= 0 ? '↑ +' : '↓ '}{Math.abs(item.change)}%
                  </div>
                </div>
                
                {/* دکمه‌های اقدام */}
                <div className="flex gap-2 md:gap-3 mt-6 md:mt-8">
                  <button
                    onClick={() => openModal(item)}
                    className="flex-1 bg-green-500 text-white hover:bg-green-600 py-2 md:py-3 rounded-xl md:rounded-2xl font-semibold text-xs md:text-sm transition-all duration-200 text-center shadow-sm hover:shadow-md"
                  >
                    خرید
                  </button>
                  <button
                    onClick={() => openModal(item)}
                    className="flex-1 bg-red-500 text-white hover:bg-red-600 py-2 md:py-3 rounded-xl md:rounded-2xl font-semibold text-xs md:text-sm transition-all duration-200 text-center shadow-sm hover:shadow-md"
                  >
                    فروش
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* بخش سایر ارزها */}
          <div className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">سایر ارزها</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {otherCrypto.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between p-3 md:p-4 border border-gray-100 rounded-lg md:rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => openModal(item)}
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 md:w-6 md:h-6 bg-blue-500 rounded-md flex items-center justify-center text-white text-xs font-bold">
                        {item.symbol.substring(0, 2)}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm md:text-base">{item.name}</div>
                      <div className="text-gray-500 text-xs">{item.symbol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900 text-sm md:text-base">${item.price}</div>
                    <div className={clsx(
                      'text-xs font-medium',
                      item.change >= 0 ? 'text-green-600' : 'text-red-600'
                    )}>
                      {item.change >= 0 ? '+' : ''}{item.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* اطلاعات پایین صفحه */}
        <footer className="border-t border-gray-200 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm md:text-base text-gray-600">
            <div className="flex items-center gap-4">
              <span>آخرین بروزرسانی:</span>
              <span className="font-medium">۱۴۰۲/۱۲/۱۵ - ۱۴:۳۰</span>
            </div>
            <div className="flex gap-4 md:gap-6">
              <button className="text-blue-600 hover:text-blue-800 transition text-sm md:text-base">راهنمای معاملات</button>
              <button className="text-blue-600 hover:text-blue-800 transition text-sm md:text-base">قوانین و مقررات</button>
              <button className="text-blue-600 hover:text-blue-800 transition text-sm md:text-base">پشتیبانی</button>
            </div>
          </div>
        </footer>
      </main>

      {/* پاپ‌آپ منو */}
      <MenuPopup 
        isOpen={menuPopupOpen} 
        onClose={closeMenuPopup} 
        type={activeMenu} 
      />

      {/* منوی موبایل */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={closeMobileMenu}
        onMenuClick={handleMenuClick}
      />

      {/* مدال خرید/فروش */}
      <ExchangeModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        crypto={selectedCrypto} 
        userBalanceToman={userBalanceToman} 
      />
    </div>
  )
}