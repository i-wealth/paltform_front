'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

type CategoryType = 'gold' | 'currency' | 'crypto' | 'realstate' | 'sand'

type PriceItem = {
  id: string
  category: CategoryType
  label: string
  value: string
  unit: string
  change: string
  time: string
  icon: string
  marketCap?: string
  volume24h?: string
  weeklyChange?: string
  chartData?: number[]
}

const categories = [
  { key: 'gold', label: 'طلا' },
  { key: 'currency', label: 'ارز' },
  { key: 'crypto', label: 'رمزارز' },
  { key: 'realstate', label: 'ملک' },
  { key: 'sand', label: 'صندوق سرمایه‌گذاری' },
] as const

export default function CustomStyledPricesSlider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('gold')
  const [selectedItem, setSelectedItem] = useState<PriceItem | null>(null)

  const prices: PriceItem[] = [
    // --- GOLD ---
    {
      id: 'gold1',
      category: 'gold',
      label: 'طلای ۱۸ عیار',
      value: '6,268,000',
      unit: 'تومان',
      change: '-0.67%',
      time: '13:49:40',
      icon: '/images/goldbar.png',
      
    },
    {
      id: 'gold2',
      category: 'gold',
      label: 'اونس جهانی',
      value: '92,500',
      unit: 'تومان',
      change: '+0.24%',
      time: '13:49:42',
      icon: '/images/goldbar.png',
    },
    {
      id: 'gold3',
      category: 'gold',
      label: 'سکه امامی',
      value: '70,500,000',
      unit: 'تومان',
      change: '-1.20%',
      time: '13:50:00',
      icon: '/images/seke.png',
    },
    {
      id: 'gold4',
      category: 'gold',
      label: 'نیم سکه',
      value: '38,000,000',
      unit: 'تومان',
      change: '-0.85%',
      time: '13:50:10',
      icon: '/images/seke.png',
    },
    {
      id: 'gold5',
      category: 'gold',
      label: 'ربع سکه',
      value: '25,100,000',
      unit: 'تومان',
      change: '-0.42%',
      time: '13:50:21',
      icon: '/images/seke.png',
    },
    {
      id: 'gold6',
      category: 'gold',
      label: 'سکه گرمی',
      value: '14,600,000',
      unit: 'تومان',
      change: '-0.15%',
      time: '13:50:30',
      icon: '/images/seke.png',
    },

    // --- CURRENCY ---
    {
      id: 'cur1',
      category: 'currency',
      label: 'دلار',
      value: '82,050',
      unit: 'تومان',
      change: '-0.12%',
      time: '13:49:08',
      icon: '/icons/ae5a6b4237c293d7d2954f68f1200216.jpg',
    },
    {
      id: 'cur2',
      category: 'currency',
      label: 'یورو',
      value: '91,300',
      unit: 'تومان',
      change: '-0.55%',
      time: '13:47:33',
      icon: '/icons/8ce027aabfc660d613bc1fe17b00fa67.jpg',
    },
    {
      id: 'cur3',
      category: 'currency',
      label: 'درهم',
      value: '22,100',
      unit: 'تومان',
      change: '+0.10%',
      time: '13:48:00',
      icon: '/images/079c709428f26e51687d6053e3856912.jpg',
    },
    {
      id: 'cur4',
      category: 'currency',
      label: 'تتر',
      value: '82,600',
      unit: 'تومان',
      change: '-1.29%',
      time: '13:50:27',
      icon: '/icons/ccccc.png',
    },

    // --- CRYPTO ---
    {
      id: 'btc',
      category: 'crypto',
      label: 'بیت کوین',
      value: '2,150,000,000',
      unit: 'تومان',
      change: '+3.67%',
      time: '13:51:22',
      icon: '/icons/bitcoin.png',
      marketCap: '1.2T',
      volume24h: '35B',
      weeklyChange: '+5.3%',
    },
    {
      id: 'eth',
      category: 'crypto',
      label: 'اتریوم',
      value: '1,250,000,000',
      unit: 'تومان',
      change: '+2.15%',
      time: '13:48:12',
      icon: '/icons/ethereum.png',
      marketCap: '560B',
      volume24h: '18B',
      weeklyChange: '+4.7%',
    },
    {
      id: 'sol',
      category: 'crypto',
      label: 'سولانا',
      value: '1,130,000',
      unit: 'تومان',
      change: '+1.25%',
      time: '13:50:01',
      icon: '/icons/bitcoin.png',
    },
    {
      id: 'ada',
      category: 'crypto',
      label: 'کاردانو',
      value: '17,500',
      unit: 'تومان',
      change: '-0.85%',
      time: '13:49:20',
      icon: '/icons/bitcoin.png',
    },

    // --- REALSTATE ---
    {
      id: 'rs1',
      category: 'realstate',
      label: 'قیمت مسکن تهران منطقه 5',
      value: '130,000,000',
      unit: 'تومان',
      change: '+0.42%',
      time: '13:45:40',
      icon: '/images/9b0a9c1c9f8cfc6d77a31fea93d4bc2a.gif',
    },
    {
      id: 'rs2',
      category: 'realstate',
      label: 'قیمت مسکن تهران منطقه 10',
      value: '95,000,000',
      unit: 'تومان',
      change: '+0.15%',
      time: '13:46:10',
      icon: '/images/9b0a9c1c9f8cfc6d77a31fea93d4bc2a.gif',
    },
    {
      id: 'rs3',
      category: 'realstate',
      label: 'قیمت مسکن تهران منطقه 18',
      value: '78,000,000',
      unit: 'تومان',
      change: '-0.20%',
      time: '13:46:20',
      icon: '/images/9b0a9c1c9f8cfc6d77a31fea93d4bc2a.gif',
    },
    {
      id: 'rs4',
      category: 'realstate',
      label: 'قیمت مسکن کرج',
      value: '65,000,000',
      unit: 'تومان',
      change: '+0.80%',
      time: '13:46:40',
      icon: '/images/9b0a9c1c9f8cfc6d77a31fea93d4bc2a.gif',
    },
    {
      id: 'rs5',
      category: 'realstate',
      label: 'قیمت مسکن تبریز',
      value: '58,000,000',
      unit: 'تومان',
      change: '+0.55%',
      time: '13:47:10',
      icon: '/images/9b0a9c1c9f8cfc6d77a31fea93d4bc2a.gif',
    },
    {
      id: 'rs6',
      category: 'realstate',
      label: 'قیمت مسکن مازندران',
      value: '47,500,000',
      unit: 'تومان',
      change: '-0.35%',
      time: '13:47:45',
      icon: '/images/9b0a9c1c9f8cfc6d77a31fea93d4bc2a.gif',
    },
    // --- sand ---
    {
      id: 'sand1',
      category: 'sand',
      label:"صندوق طلا",
      value: '130,000,000',
      unit: 'تومان',
      change: '+0.42%',
      time: '13:45:40',
      icon: '/images/sandogh.png',
    },
    {
      id: 'sand2',
      category: 'sand',
      label:"صندوق ارزدیجیتال",
      value: '130,000,000',
      unit: 'تومان',
      change: '+0.42%',
      time: '13:45:40',
      icon: '/images/sandogh.png',
    },
    {
      id: 'sand3',
      category: 'sand',
      label:"صندوق ملک",
      value: '130,000,000',
      unit: 'تومان',
      change: '+0.42%',
      time: '13:45:40',
      icon: '/images/sandogh.png',
    },
    {
      id: 'sand4',
      category: 'sand',
      label:"صندوق ترکیبی",
      value: '130,000,000',
      unit: 'تومان',
      change: '+0.42%',
      time: '13:45:40',
      icon: '/images/sandogh.png',
    },
  ]

  const filteredPrices = prices.filter((p) => p.category === selectedCategory)

  const scroll = (dir: 'left' | 'right') => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: dir === 'left' ? -200 : 200,
        behavior: 'smooth',
      })
    }
  }

  const renderChange = (change: string) => {
    const isPositive = change.startsWith('+')
    const color = isPositive ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
    return (
      <div className={`text-[11px] font-bold px-2 py-[2px] rounded-full ${color}`}>
        {change}
      </div>
    )
  }

  return (
    <section dir="rtl" className="relative bg-[#f9f9f9] py-5 px-4 rounded-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="text-right">
          <h2 className="text-lg font-bold text-gray-800">قیمت لحظه‌ای</h2>
          <p className="text-sm text-gray-400">یکشنبه ۲۸ اردیبهشت ۱۴۰۴</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-4 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key as CategoryType)}
            className={`text-sm px-4 py-1 rounded-full border whitespace-nowrap ${
              selectedCategory === cat.key
                ? 'bg-blue-100 text-blue-700 border-blue-400'
                : 'bg-white text-gray-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Scroll Buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-[60%] -translate-y-1/2 z-10 bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center text-gray-600 hover:text-blue-600"
      >
        <FaArrowRight size={14} />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-[60%] -translate-y-1/2 z-10 bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center text-gray-600 hover:text-blue-600"
      >
        <FaArrowLeft size={14} />
      </button>

      {/* Price Items */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto gap-4 no-scrollbar px-10 scroll-smooth"
      >
        {filteredPrices.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="cursor-pointer flex flex-col justify-between bg-white rounded-xl border border-gray-200 shadow-sm min-w-[180px] max-w-[180px] h-[140px] p-3 text-right hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-1">
              {renderChange(item.change)}
              <Image src={item.icon} alt={item.label} width={24} height={24} />
            </div>
            <div className="text-[13px] font-semibold text-gray-800 truncate">{item.label}</div>
            <div className="text-[15px] font-extrabold text-gray-900 mt-1 leading-tight">
              {item.value}
              <span className="text-[11px] text-gray-500 ms-1">{item.unit}</span>
            </div>
            <div className="text-[10px] text-gray-400">{item.time}</div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg p-5 relative text-right">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-2 left-2 text-gray-500 hover:text-red-500 text-lg"
            >
              ✕
            </button>
            <div className="flex items-center gap-3 mb-4">
              <Image src={selectedItem.icon} alt={selectedItem.label} width={32} height={32} />
              <h3 className="text-xl font-bold text-blue-900">{selectedItem.label}</h3>
            </div>
            <div className="mb-3 text-sm text-gray-700">
              <p><strong>قیمت:</strong> {selectedItem.value} {selectedItem.unit}</p>
              <p><strong>ارزش بازار:</strong> {selectedItem.marketCap ?? 'نامشخص'}</p>
              <p><strong>حجم معاملات ۲۴ ساعت:</strong> {selectedItem.volume24h ?? 'نامشخص'}</p>
              <p><strong>تغییرات هفتگی:</strong> {selectedItem.weeklyChange ?? 'نامشخص'}</p>
            </div>
            <div className="bg-gray-100 h-[100px] rounded flex items-center justify-center text-gray-500 text-sm">
              📊 نمودار قیمت — به‌زودی
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
