'use client'

import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import GoldExchange from '../components/GoldExchange'
import { useState } from 'react'

// کامپوننت نمودارهای ارز
const CurrencyCharts = () => {
  const [activeChart, setActiveChart] = useState('price')

  const charts = [
    { id: 'price', label: 'نمودار قیمت', color: 'bg-blue-500' },
    { id: 'volume', label: 'حجم معاملات', color: 'bg-green-500' },
    { id: 'trend', label: 'روند بازار', color: 'bg-purple-500' },
    { id: 'comparison', label: 'مقایسه‌ای', color: 'bg-orange-500' }
  ]

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">نمودارهای تحلیلی طلا</h3>
        <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
          {charts.map((chart) => (
            <button
              key={chart.id}
              onClick={() => setActiveChart(chart.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeChart === chart.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {chart.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-8 h-80 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            {charts.find(chart => chart.id === activeChart)?.label}
          </h4>
          <p className="text-gray-600 text-sm max-w-md">
            نمایش نمودار {charts.find(chart => chart.id === activeChart)?.label.toLowerCase()} طلا در 24 ساعت گذشته
          </p>
          
          {/* نمودار شبیه‌سازی شده */}
          <div className="mt-6 w-full max-w-2xl mx-auto">
            <div className="flex items-end justify-between h-32 gap-1">
              {[40, 65, 80, 45, 70, 90, 60, 75, 50, 85, 65, 55].map((height, index) => (
                <div
                  key={index}
                  className={`flex-1 rounded-t transition-all duration-500 ${
                    activeChart === 'price' ? 'bg-blue-500' :
                    activeChart === 'volume' ? 'bg-green-500' :
                    activeChart === 'trend' ? 'bg-purple-500' : 'bg-orange-500'
                  }`}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>23:59</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <div className="text-sm text-gray-600">بالاترین قیمت</div>
              <div className="font-semibold text-gray-900">۲,۱۵۰,۰۰۰ تومان</div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </div>
            <div>
              <div className="text-sm text-gray-600">پایین‌ترین قیمت</div>
              <div className="font-semibold text-gray-900">۲,۰۸۰,۰۰۰ تومان</div>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <div className="text-sm text-gray-600">حجم معاملات</div>
              <div className="font-semibold text-gray-900">۱۲.۵ میلیارد</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// کامپوننت گزارشات هوش مصنوعی
const AIReports = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [report, setReport] = useState(null)

  const generateReport = () => {
    setIsAnalyzing(true)
    // شبیه‌سازی تحلیل هوش مصنوعی
    setTimeout(() => {
      setReport({
        sentiment: 'مثبت',
        confidence: 85,
        summary: 'طلا در موقعیت خرید قوی قرار دارد. شاخص‌های فنی نشان‌دهنده روند صعودی در کوتاه‌مدت هستند.',
        recommendations: [
          'خرید در محدوده ۲,۱۰۰,۰۰۰ تومان توصیه می‌شود',
          'هدف قیمتی کوتاه‌مدت: ۲,۲۰۰,۰۰۰ تومان',
          'حد ضرر: ۲,۰۵۰,۰۰۰ تومان'
        ],
        risks: [
          'نوسانات بازار جهانی طلا',
          'تغییرات نرخ بهره',
          'تحریم‌های اقتصادی'
        ]
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">گزارش هوش مصنوعی</h3>
          <p className="text-gray-600 text-sm">تحلیل پیشرفته بازار با هوش مصنوعی</p>
        </div>
      </div>

      {!report ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">تحلیل بازار طلا</h4>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            هوش مصنوعی ما با بررسی داده‌های بازار، تحلیل جامعی از وضعیت طلا ارائه می‌دهد
          </p>
          <button
            onClick={generateReport}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50"
          >
            {isAnalyzing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                در حال تحلیل...
              </div>
            ) : (
              'دریافت گزارش هوش مصنوعی'
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">احساس بازار</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  report.sentiment === 'مثبت' ? 'bg-green-100 text-green-600' :
                  report.sentiment === 'منفی' ? 'bg-red-100 text-red-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  {report.sentiment}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{report.confidence}%</div>
              <div className="text-xs text-gray-500">میزان اطمینان تحلیل</div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4">
              <div className="text-sm text-gray-600 mb-2">خلاصه تحلیل</div>
              <div className="text-gray-900 font-medium">{report.summary}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                توصیه‌ها
              </h5>
              <ul className="space-y-2">
                {report.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                ریسک‌ها
              </h5>
              <ul className="space-y-2">
                {report.risks.map((risk, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            onClick={() => setReport(null)}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            تحلیل مجدد
          </button>
        </div>
      )}
    </div>
  )
}

// کامپوننت مقایسه قیمت با پلتفرم‌های دیگر
const PriceComparison = () => {
  const platforms = [
    {
      name: 'طلاسی',
      price: '۲,۱۲۰,۰۰۰',
      change: '+۱.۲%',
      status: 'up',
      logo: '🟡'
    },
    {
      name: 'میلی',
      price: '۲,۱۱۵,۰۰۰',
      change: '+۰.۸%',
      status: 'up',
      logo: '🔵'
    },
    {
      name: 'بیت‌برگ',
      price: '۲,۱۲۵,۰۰۰',
      change: '+۱.۵%',
      status: 'up',
      logo: '🟢'
    },
    {
      name: 'نوبیتکس',
      price: '۲,۱۱۰,۰۰۰',
      change: '+۰.۵%',
      status: 'up',
      logo: '🟠'
    },
    {
      name: 'اکسیر',
      price: '۲,۱۱۸,۰۰۰',
      change: '+۱.۰%',
      status: 'up',
      logo: '🟣'
    }
  ]

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">مقایسه قیمت</h3>
          <p className="text-gray-600 text-sm">قیمت طلا در پلتفرم‌های مختلف</p>
        </div>
      </div>

      <div className="space-y-4">
        {platforms.map((platform, index) => (
          <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                {platform.logo}
              </div>
              <div>
                <div className="font-semibold text-gray-900">{platform.name}</div>
                <div className="text-sm text-gray-500">آخرین قیمت</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-bold text-gray-900 text-lg">{platform.price} تومان</div>
              <div className={`text-sm font-medium ${
                platform.status === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {platform.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-sm text-amber-800">
            <strong>نکته:</strong> اختلاف قیمت بین پلتفرم‌ها معمولاً ناشی از کارمزد و نوسانات لحظه‌ای بازار است
          </div>
        </div>
      </div>
    </div>
  )
}

export default function GoldPage() {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-white min-h-screen px-4 sm:px-6">
      {/* بخش header */}
      <Header />
      
      {/* بخش Hero */}
      <HeroSection />
      
      {/* بخش Gold Exchange */}
      <div className="mt-8 sm:mt-12">
        <GoldExchange />
      </div>

      {/* بخش‌های جذاب اضافی */}
      <div className="mt-8 sm:mt-12 space-y-8 sm:space-y-12">
        {/* نمودارهای ارز */}
        <CurrencyCharts />
        
        {/* گزارشات هوش مصنوعی */}
        <AIReports />
        
        {/* مقایسه قیمت */}
        <PriceComparison />
      </div>
    </div>
  )
}