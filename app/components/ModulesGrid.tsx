'use client'

import Image from 'next/image'
import clsx from 'clsx'
import { useState } from 'react'

type Props = {
  type?: 'liquidity' | 'asset' | 'wallet'
}

type Feature = {
  key: 'liquidity' | 'asset' | 'wallet'
  title: string
}

const features: Feature[] = [
  { key: 'liquidity', title: 'مدیریت دارایی' },
  { key: 'asset', title: 'مدیریت نقدینگی' },
  { key: 'wallet', title: ' پورتفولیو هوشمند' },
]

const moduleData: Record<string, { key: string; icon: string; label: string; bgColor: string }[]> = {
  liquidity: [
    { key: 'igold1', label: 'آی گلد', icon: '/images/cccc.png', bgColor: 'from-yellow-300/40 to-yellow-500/40' },
    { key: 'icoin1', label: 'آی کوین', icon: '/images/ccccc.png', bgColor: 'from-blue-300/40 to-blue-500/40' },
    { key: 'ifund1', label: 'آی فاند', icon: '/images/cc.png', bgColor: 'from-green-300/40 to-emerald-500/40' },
    { key: 'ibourse1', label: 'آی بورس', icon: '/images/c.png', bgColor: 'from-indigo-300/40 to-purple-500/40' },
    { key: 'imond1', label: 'آی موند', icon: '/images/zz.png', bgColor: 'from-orange-300/40 to-red-400/40' },
    { key: 'imelk1', label: 'آی ملک', icon: '/images/ccc.png', bgColor: 'from-red-300/40 to-rose-400/40' },
    { key: 'ipool1', label: 'آی آرت', icon: '/images/zzz.png', bgColor: 'from-sky-300/40 to-blue-500/40' },
    { key: 'ibot1', label: ' آی من', icon: '/images/z.png', bgColor: 'from-purple-300/40 to-pink-400/40' },
  ],
  asset: [
    { key: 'imond2', label: 'استخر نقدینگی', icon: '/images/poolmoney1.png', bgColor: 'from-indigo-300/40 to-violet-500/40' },
    { key: 'imelk2', label: 'بودجه بندی هوشمند', icon: '/images/ai-budge1.png', bgColor: 'from-emerald-300/40 to-green-400/40' },
    { key: 'ibourse2', label: 'پرداخت خودکار اقساط', icon: '/images/autopayment2.png', bgColor: 'from-yellow-300/40 to-orange-400/40' },
    { key: 'ibot2', label: 'مبدل درآمد به تتر یا طلا', icon: '/images/exchange.png', bgColor: 'from-pink-300/40 to-fuchsia-400/40' },
  ],
  wallet: [
    { key: 'wallet1', label: '  پورتفولیو هوشمند', icon: '/images/ai-icon.png', bgColor: 'from-blue-300/40 to-cyan-400/40' },
    { key: 'wallet2', label: ' پورتفولیو طلا', icon: '/images/poolmoney.png', bgColor: 'from-yellow-300/40 to-amber-400/40' },
    { key: 'wallet3', label: ' پورتفولیو ارزدیجیتال', icon: '/images/ai-investment-removebg-preview.png', bgColor: 'from-lime-300/40 to-green-400/40' },
    { key: 'wallet4', label: 'پورتفولیو ترکیبی ', icon: '/images/goldcoin.png', bgColor: 'from-purple-300/40 to-pink-400/40' },
  ],
}

export default function ModulesGrid({ type }: Props) {
  const [activeTab, setActiveTab] = useState<Feature['key']>('liquidity')

  // اگر prop.type داده شده، همان را نمایش بده؛ وگرنه از activeTab استفاده کن
  const currentKey: Feature['key'] = (type as Feature['key']) ?? activeTab
  const modules = moduleData[currentKey] || []

  return (
    <section className="py-16 px-4 md:px-20 bg-white min-h-screen" dir="rtl">
      {/* تب‌ها فقط وقتی type پاس داده نشده نمایش داده شوند */}
      {!type && (
        <div className="mb-12 flex justify-center">
          <div className="flex flex-wrap justify-center gap-4 bg-white/80 backdrop-blur-md rounded-full px-4 py-3 shadow-lg">
            {features.map((feature) => (
              <button
                key={feature.key}
                onClick={() => setActiveTab(feature.key)}
                className={clsx(
                  'flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  currentKey === feature.key
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                )}
              >
                {feature.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* گرید ماژول‌ها */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
        {modules.map((mod) => (
          <div
            key={mod.key}
            className="group flex flex-col items-center gap-3 transition-transform duration-300 hover:scale-105"
          >
            <div
              className={clsx(
                'w-24 h-24 sm:w-28 sm:h-28 rounded-[30%] border border-white/30 relative flex items-center justify-center overflow-hidden shadow-[inset_8px_8px_20px_rgba(255,255,255,0.4),inset_-4px_-4px_12px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:scale-105',
                'bg-gradient-to-br',
                mod.bgColor
              )}
            >
              <div className="relative w-16 h-16 z-10 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={mod.icon}
                  alt={mod.label}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="text-sm font-medium text-gray-700">{mod.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
