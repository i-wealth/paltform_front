'use client'

import { useState } from 'react'
import Image from 'next/image'

type WalletType = 'gold' | 'crypto' | 'tether' | 'etherium'

const walletData: Record<WalletType, any> = {
  gold: {
    title: 'کیف پول سولانا',
    cardNumber: '1122',
    logo: '/images/solana.png',
    color: 'bg-cyan-400',
    balance: '70,000,000',
    exp: '01/28',
  },
  crypto: {
    title: 'کیف پول بیت کوین',
    cardNumber: '7851',
    logo: '/images/bitcoin.png',
    color: 'bg-orange-400',
    balance: '12,000,000',
    exp: '11/25',
  },
  etherium: {
    title: 'کیف پول اتریوم',
    cardNumber: '2987',
    logo: '/images/ethereum.png',
    color: 'bg-indigo-400',
    balance: '8,500,000',
    exp: '10/27',
  },
  tether: {
    title: 'کیف پول تتر',
    cardNumber: '4589',
    logo: '/images/tether.png',
    color: 'bg-emerald-400',
    balance: '94,000,000',
    exp: '12/26',
  },
}

export default function WalletBalance() {
  const [selectedWallet, setSelectedWallet] = useState<WalletType>('gold')
  const wallet = walletData[selectedWallet]

  return (
    <div className="w-full space-y-8 h-full flex flex-col">
      {/* Wallet Selector */}
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
                  ? 'bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 text-white ring-2 ring-offset-2 ring-blue-300 scale-105 shadow-lg'
                  : 'bg-white/40 text-gray-700 hover:bg-white/60 backdrop-blur-md hover:scale-105'
              }`}
            >
              {walletData[typedKey].title}
            </button>
          )
        })}
      </div>

      {/* Wallet Card */}
      <div className="rounded-3xl p-6 bg-white/40 backdrop-blur-2xl border border-white/30 text-gray-900 shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden group flex flex-col justify-between flex-1">
        {/* Background light */}
        <div className="absolute -top-16 -left-10 w-52 h-52 bg-gradient-to-br from-white to-blue-200 opacity-20 rounded-full blur-2xl group-hover:opacity-30 transition"></div>

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">نوع کیف پول</p>
            <h3 className="text-2xl font-bold text-blue-700">{wallet.title}</h3>
          </div>
          <div className="h-14 w-14 relative rounded-full bg-white/60 p-1 shadow ring-1 ring-white/60">
            <Image src={wallet.logo} alt="Card Logo" fill className="object-contain" />
          </div>
        </div>

        {/* Card Number */}
        <div className="bg-white/70 rounded-xl p-4 shadow-inner border border-white/30 mb-4">
          <p className="text-sm text-gray-500 mb-1">شماره کارت</p>
          <p className="text-lg tracking-widest font-semibold text-gray-900">
            **** **** **** {wallet.cardNumber}
          </p>
        </div>

        {/* Balance & Exp */}
        <div className="flex justify-between items-center text-sm mb-4">
          <div>
            <p className="text-gray-500">موجودی</p>
            <p className="text-lg font-bold text-emerald-600">{wallet.balance} تومان</p>
          </div>
          <div>
            <p className="text-gray-500">انقضا</p>
            <p className="text-lg font-bold text-sky-500">{wallet.exp}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-auto">
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
