'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  RadialBarChart, RadialBar
} from 'recharts'

// ترکیب دارایی‌ها (Pie Chart)
const pieData = [
  { name: 'طلای آب‌شده', value: 40, color: '#facc15' },
  { name: 'تتر (USDT)', value: 20, color: '#3b82f6' },
  { name: 'صندوق درآمد ثابت', value: 30, color: '#22c55e' },
  { name: 'توکن مسکن', value: 10, color: '#ef4444' },
]

// امتیاز پورتفویو (Gauge Chart)
const gaugeData = [{ name: 'Score', value: 760, fill: '#4ade80' }]

// جزئیات کلی پورتفویو
const details = {
  profitSinceBuy: '+28,800,000 تومان',
  portfolioType: 'پیشنهادی (کاربر خرید کرده)',
  holdingPeriod: {
    expected: '۱ سال و ۷ ماه',
    passed: '۳ ماه',
    invested: 600_000_000,
    monthlyReturn: 0.16,
    expectedFinal: 711_000_000,
  },
  analyses: ['تکنیکال', 'فاندامنتال'],
}

// چارت رشد سرمایه
const growthData = [
  { month: 'ماه ۱', value: 609_600_000 },
  { month: 'ماه ۲', value: 619_200_000 },
  { month: 'ماه ۳', value: 628_800_000 },
  { month: 'ماه ۴', value: 638_400_000 },
  { month: 'ماه ۵', value: 648_000_000 },
  { month: 'ماه ۶', value: 657_600_000 },
  { month: 'ماه ۷', value: 667_200_000 },
  { month: 'ماه ۸', value: 676_800_000 },
  { month: 'ماه ۹', value: 686_400_000 },
  { month: 'ماه ۱۰', value: 696_000_000 },
  { month: 'ماه ۱۱', value: 705_600_000 },
  { month: 'ماه ۱۲', value: 715_200_000 },
]

// تراکنش‌های خرید و فروش
const transactions = [
  { asset: 'طلای آب‌شده', buyDate: '2024-05-20', sellDate: '2024-08-20', buyPrice: 150000000, sellPrice: 175000000 },
  { asset: 'تتر (USDT)', buyDate: '2024-04-10', sellDate: '2024-07-01', buyPrice: 100000000, sellPrice: 97000000 },
  { asset: 'صندوق درآمد ثابت', buyDate: '2024-03-01', sellDate: null, buyPrice: 200000000, sellPrice: null },
]


// تراکنش‌های خرید و فروش
const transactions1 = [
  { asset: 'پورتفولیو 1((شامل طلای ابشده/تتر/صندوق درآمد ثابت)) ', buyDate: '1404-02-20', sellDate: '1404-06-20', buyPrice: 150000000, sellPrice: null },
  { asset: 'پورتفولیو 2((شامل طلای ابشده/تتر/سوالانا/  اتریوم)) ', buyDate: '1402-04-10', sellDate: '1402-11-01', buyPrice: 350000000, sellPrice: 510000000 },
  { asset: 'پورتفولیو شماره 3((شامل توکن ملک/طلای آبشده/تتر))    ', buyDate: '1403-09-01', sellDate: '1403-12-01', buyPrice: 200000000, sellPrice: 79650000000 },
]

// ابزارهای کمکی
function formatCurrency(value: number) {
  return value.toLocaleString('fa-IR') + ' تومان'
}

function getHoldingDays(start: string, end?: string | null) {
  const d1 = new Date(start)
  const d2 = end ? new Date(end) : new Date()
  const diff = Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24))
  return `${diff} روز`
}

// محاسبه میانگین سود و بهترین دارایی
function getPortfolioStats() {
  let profits: number[] = []
  let best = { asset: '', profit: -Infinity }

  transactions.forEach((t) => {
    if (t.sellPrice && t.buyPrice) {
      const p = t.sellPrice - t.buyPrice
      profits.push(p)
      if (p > best.profit) best = { asset: t.asset, profit: p }
    }
  })

  const avgProfit = profits.length > 0 ? profits.reduce((a, b) => a + b, 0) / profits.length : 0
  return { avgProfit, best }
}

export default function UserAsset() {
  const [openRebalance, setOpenRebalance] = useState(false)
  const [openAnalysis, setOpenAnalysis] = useState(false)
  const [openHolding, setOpenHolding] = useState(false)

  const { avgProfit, best } = getPortfolioStats()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* ✅ Pie Chart ترکیب پورتفویو */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
      >
        <h3 className="text-lg font-bold mb-4 dark:text-gray-100">ترکیب پورتفولیو</h3>
        <div className="w-56 h-56 mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-1 text-sm">
          {pieData.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-gray-700 dark:text-gray-300">{item.name}: {item.value}%</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ✅ Gauge Chart + توصیه ری‌بالانس */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-6"
      >
        <h2 className="text-2xl font-bold dark:text-gray-100">گزارش پورتفولیو</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex flex-col items-center">
            <div className="w-56 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%" cy="50%"
                  innerRadius="70%" outerRadius="100%" barSize={15}
                  data={gaugeData} startAngle={180} endAngle={0}
                >
                  <RadialBar minAngle={15} clockWise dataKey="value" />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center -mt-2">
              <p className="text-2xl font-bold text-green-600">32 درصد</p>
              <p className="text-gray-500 dark:text-gray-400">سود</p>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-100/80 border border-yellow-300 rounded-xl p-4 shadow-sm">
            <div className="flex items-start gap-2">
              <span>💡</span>
              <div>
                <p className="text-sm font-semibold text-yellow-800">یادآوری</p>
                <p className="text-sm text-yellow-900 mt-1">
                  با توجه به تغییر میزان سرمایه‌گذاری، پیشنهاد ری‌بالانسینگ داریم.
                </p>
                <button
                  onClick={() => setOpenRebalance(true)}
                  className="text-indigo-600 hover:underline text-sm mt-2 font-medium"
                >
                  دیدن پیشنهاد →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ جزئیات سرمایه‌گذاری */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-6">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300">📊 سود تا الان</span>
            <span className="font-bold text-green-600">{details.profitSinceBuy}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300">🎯 نوع پورتفولیو</span>
            <span className="font-semibold text-indigo-600">{details.portfolioType}</span>
          </div>

          {/* ⏳ مدت نگه‌داری */}
          <div
            onClick={() => setOpenHolding(true)}
            className="cursor-pointer md:col-span-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/20 rounded-xl p-5 shadow hover:shadow-lg transition"
          >
            <p className="text-gray-600 dark:text-gray-300">⏳ مدت زمان نگه‌داری صندوق</p>
            <p className="font-semibold text-lg text-indigo-700 dark:text-indigo-300">
              {details.holdingPeriod.expected}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">(برای جزئیات کلیک کنید)</p>
          </div>

          {/* 🔍 تحلیل مورد استفاده */}
          <div className="md:col-span-2 flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300">🔍 تحلیل مورد استفاده</span>
            <button
              onClick={() => setOpenAnalysis(true)}
              className="font-semibold text-blue-600 hover:underline"
            >
              💡 تکنیکال/فاندامنتال
            </button>
          </div>
        </div>

        {/* 📈 نمودار رشد سرمایه */}
        <div className="mt-6">
          <h3 className="text-lg font-bold dark:text-gray-100 mb-3">نمودار رشد سرمایه</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} dot />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
            نمودار تقریبی رشد سرمایه طی دوره نگه‌داری
          </p>
        </div>
      </motion.div>

      {/* ✅ کارت جدید: میانگین سود/زیان و بهترین دارایی */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
      >
        <h3 className="text-lg font-bold dark:text-gray-100 mb-3">تحلیل سریع عملکرد</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg shadow-sm flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">📈 میانگین سود/زیان این  ماه</span>
            <span className={`font-bold ${avgProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(avgProfit)}
            </span>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg shadow-sm flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">🏆 بهترین دارایی</span>
            <span className="font-bold text-indigo-600">
              {best.asset || '—'} {best.profit !== -Infinity ? `(${formatCurrency(best.profit)})` : ''}
            </span>
          </div>
        </div>
      </motion.div>

      📋 جدول خرید و فروش‌ها
<motion.div
  initial={{ opacity: 0, y: 18 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.2 }}
  className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
>
  <h3 className="text-xl font-bold mb-4 dark:text-gray-100">گزارش خرید و فروش‌ با هوش مصنوعی ایران ولث</h3>
  <div className="overflow-x-auto">
    <table className="min-w-full text-sm">
      <thead>
        <tr className="bg-gray-100 dark:bg-gray-700 text-right">
          <th className="px-4 py-2">دارایی</th>
          <th className="px-4 py-2">تاریخ خرید</th>
          <th className="px-4 py-2">تاریخ فروش</th>
          <th className="px-4 py-2">حجم خریداری‌شده</th>
          <th className="px-4 py-2">سود/زیان</th>
          <th className="px-4 py-2">مدت نگه‌داری</th>
        </tr>
      </thead>
      <tbody>
        {transactions1.map((t, i) => {
          const profit = t.sellPrice && t.buyPrice ? t.sellPrice - t.buyPrice : null
          const color =
            profit > 0 ? 'text-green-600' : profit < 0 ? 'text-red-600' : 'text-gray-600'
          return (
            <tr key={i} className="border-b dark:border-gray-700">
              <td className="px-4 py-2 font-medium dark:text-gray-100">{t.asset}</td>
              <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{t.buyDate}</td>
              <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                {t.sellDate || 'نگه‌داری شده'}
              </td>
              <td className="px-4 py-2 font-semibold text-indigo-600">
                {formatCurrency(t.buyPrice)}
              </td>
              <td className={`px-4 py-2 font-bold ${color}`}>
                {profit !== null ? formatCurrency(profit) : '-'}
              </td>
              <td className="px-4 py-2 text-gray-600 dark:text-gray-300">
                {getHoldingDays(t.buyDate, t.sellDate)}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
</motion.div>

       📋 جدول خرید و فروش‌ها
<motion.div
  initial={{ opacity: 0, y: 18 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.2 }}
  className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
>
  <h3 className="text-xl font-bold mb-4 dark:text-gray-100">گزارش خرید و فروش‌ با تحلیل شخصی  شما</h3>
  <div className="overflow-x-auto">
    <table className="min-w-full text-sm">
      <thead>
        <tr className="bg-gray-100 dark:bg-gray-700 text-right">
          <th className="px-4 py-2">دارایی</th>
          <th className="px-4 py-2">تاریخ خرید</th>
          <th className="px-4 py-2">تاریخ فروش</th>
          <th className="px-4 py-2">حجم خریداری‌شده</th>
          <th className="px-4 py-2">سود/زیان</th>
          <th className="px-4 py-2">مدت نگه‌داری</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t, i) => {
          const profit = t.sellPrice && t.buyPrice ? t.sellPrice - t.buyPrice : null
          const color =
            profit > 0 ? 'text-green-600' : profit < 0 ? 'text-red-600' : 'text-gray-600'
          return (
            <tr key={i} className="border-b dark:border-gray-700">
              <td className="px-4 py-2 font-medium dark:text-gray-100">{t.asset}</td>
              <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{t.buyDate}</td>
              <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                {t.sellDate || 'نگه‌داری شده'}
              </td>
              <td className="px-4 py-2 font-semibold text-indigo-600">
                {formatCurrency(t.buyPrice)}
              </td>
              <td className={`px-4 py-2 font-bold ${color}`}>
                {profit !== null ? formatCurrency(profit) : '-'}
              </td>
              <td className="px-4 py-2 text-gray-600 dark:text-gray-300">
                {getHoldingDays(t.buyDate, t.sellDate)}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
</motion.div>

      {/* ✅ Modal تحلیل‌ها */}
      {openAnalysis && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-[560px] max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-3 dark:text-gray-100">💡 مشاوره هوشمند</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              چرا این پورتفولیو برای شما انتخاب شده است:
            </p>

            <div className="space-y-4">
              {[
                {
                  title: 'بازده موردانتظار',
                  text: 'می‌تونی سالانه حدود ۱۶٪ سود بگیری، اگر کل دوره رو نگه داری.',
                },
                {
                  title: 'ریسک',
                  text: 'وجود صندوق درآمد ثابت ریسک رو کم می‌کنه ولی طلا کمی نوسان داره.',
                },
                {
                  title: 'نقدشوندگی',
                  text: 'تتر و صندوق‌ها سریع فروخته می‌شن، یعنی راحت نقد می‌شن.',
                },
                {
                  title: 'تنوع',
                  text: 'ترکیب طلا، صندوق و تتر باعث میشه همه سرمایه‌ات در یک سبد نباشه.',
                },
              ].map((c, i) => (
                <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <p className="font-semibold dark:text-gray-100">{c.title}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{c.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setOpenAnalysis(false)} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm">بستن</button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Modal ری‌بالانسینگ */}
      {openRebalance && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-[440px]">
            <h3 className="text-lg font-bold mb-2 dark:text-gray-100">پیشنهاد ری‌بالانسینگ</h3>
            <ul className="mt-3 list-disc pr-5 space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>۳۰٪ طلا</li>
              <li>۴۰٪ صندوق درآمد ثابت</li>
              <li>۲۰٪ تتر</li>
              <li>۱۰٪ سهام/ETF</li>
            </ul>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setOpenRebalance(false)} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm">بستن</button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">تایید</button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Modal مدت نگه‌داری */}
      {openHolding && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-[560px] max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-3 dark:text-gray-100">⏳ گزارش مدت نگه‌داری صندوق</h3>

            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              تا الان <b>{details.holdingPeriod.passed}</b> نگه داشتی و حدود{' '}
              <b className="text-green-600">{details.profitSinceBuy}</b> سود گرفتی.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              اگر کل دوره را نگه داری، سرمایه اولیه <b>{details.holdingPeriod.invested.toLocaleString()} تومان</b>{' '}
              با بازده ماهیانه ۱۶٪ به حدود{' '}
              <b className="text-green-600">{details.holdingPeriod.expectedFinal.toLocaleString()} تومان</b> می‌رسد.
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer>
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} dot />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
              نمودار تقریبی رشد سرمایه طی دوره نگه‌داری
            </p>

            <div className="mt-4 flex justify-end">
              <button onClick={() => setOpenHolding(false)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
