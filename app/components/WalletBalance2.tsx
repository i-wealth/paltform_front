'use client'

import { useState } from 'react'
import Image from 'next/image'

type WalletType = 'gold' | 'crypto' | 'tether' | 'etherium'

const walletData: Record<WalletType, any> = {
  gold: {
    title: 'کیف پول طلای آبشده',
    cardNumber: '1122',
    logo: '/images/goldbar.png',
    color: 'bg-yellow-400',
    balance: '70,000,000',
    exp: '01/28',
  },
  crypto: {
    title: 'کیف پول سکه',
    cardNumber: '7851',
    logo: '/images/goldbar.png',
    color: 'bg-pink-400',
    balance: '12,000,000',
    exp: '11/25',
  },
  etherium: {
    title: 'کیف پول صندوق طلا',
    cardNumber: '2987',
    logo: '/images/goldbar.png',
    color: 'bg-green-400',
    balance: '8,500,000',
    exp: '10/27',
  },
  tether: {
    title: 'کیف پول کل مقدار طلا',
    cardNumber: '4589',
    logo: '/images/goldbar.png',
    color: 'bg-sky-400',
    balance: '94,000,000',
    exp: '12/26',
  },
}

export default function WalletBalance2() {
  const [selectedWallet, setSelectedWallet] = useState<WalletType>('gold')
  const wallet = walletData[selectedWallet]

  return (
    <div className="w-full space-y-8">
      {/* Selector */}
      <div className="flex flex-wrap gap-3">
        {Object.keys(walletData).map((key) => {
          const typedKey = key as WalletType
          const isSelected = selectedWallet === typedKey
          return (
            <button
              key={key}
              onClick={() => setSelectedWallet(typedKey)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow ${
                isSelected
                  ? 'bg-gradient-to-r from-indigo-400 via-violet-500 to-fuchsia-500 text-white ring-2 ring-offset-2 ring-indigo-300 scale-105 shadow-lg'
                  : 'bg-white/30 text-gray-700 hover:bg-white/50 backdrop-blur-md hover:scale-105'
              }`}
            >
              {walletData[typedKey].title}
            </button>
          )
        })}
      </div>

      {/* Wallet Card */}
      <div className="rounded-3xl p-6 bg-white/40 backdrop-blur-2xl border border-white/30 text-gray-800 shadow-2xl hover:shadow-3xl transition-all duration-300 space-y-6 relative overflow-hidden group">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-purple-300 via-white to-transparent opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition"></div>

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 mb-1">نوع کیف پول</p>
            <h3 className="text-2xl font-bold text-indigo-700">{wallet.title}</h3>
          </div>
          <div className="h-14 w-14 relative rounded-full bg-white/70 p-1 shadow-md ring-1 ring-white">
            <Image src={wallet.logo} alt="Card Logo" fill className="object-contain" />
          </div>
        </div>

        {/* Card Number */}
        <div className="bg-white/70 rounded-xl p-4 shadow-inner border border-white/30">
          <p className="text-sm text-gray-500 mb-1">شماره کارت</p>
          <p className="text-lg tracking-widest font-semibold text-gray-900">
            **** **** **** {wallet.cardNumber}
          </p>
        </div>

        {/* Balance & Expiry */}
        <div className="flex justify-between items-center mt-2 text-sm">
          <div>
            <p className="text-gray-500">موجودی</p>
            <p className="text-lg font-bold text-emerald-600">{wallet.balance} تومان</p>
          </div>
          <div>
            <p className="text-gray-500">انقضا</p>
            <p className="text-lg font-bold text-blue-500">{wallet.exp}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-1">درصد رشد دارایی‌ها نسبت به میانگین خرید</p>
          <div className="w-full bg-white/50 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full rounded-full ${wallet.color} transition-all duration-700`}
              style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
