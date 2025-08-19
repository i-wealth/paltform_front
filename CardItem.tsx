'use client'

import { useState } from 'react'
import Image from 'next/image'

type WalletType = 'gold' | 'crypto' | 'tether' | 'etherium'

const walletData: Record<WalletType, any> = {
  gold: {
    title: 'کیف پول تتر',
    cardNumber: '4589',
    logo: '/images/tether.png',
    color: 'bg-blue-600',
    balance: '94,000,000',
    exp: '12/26',
  },
  crypto: {
    title: 'کیف پول بیت کوین',
    cardNumber: '7851',
    logo: '/images/bitcoin.png',
    color: 'bg-purple-600',
    balance: '12,000,000',
    exp: '11/25',
  },
  etherium: {
    title: 'کیف پول اتریوم',
    cardNumber: '2987',
    logo: '/images/ethereum.png',
    color: 'bg-green-600',
    balance: '8,500,000',
    exp: '10/27',
  },
  tether: {
    title: 'کیف پول سولانا',
    cardNumber: '2987',
    logo: '/images/solana.png',
    color: 'bg-yellow-500',
    balance: '000,000',
    exp: '09/30',
  },
}

export default function WalletBalance() {
  const [selectedWallet, setSelectedWallet] = useState<WalletType>('gold')
  const wallet = walletData[selectedWallet]

  return (
    <div className="w-full space-y-6">
      {/* Wallet Selector */}
      <div className="flex flex-wrap gap-3">
        {Object.keys(walletData).map((key) => {
          const isSelected = selectedWallet === key
          return (
            <button
              key={key}
              onClick={() => setSelectedWallet(key as WalletType)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm ${
                isSelected
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/60 text-gray-700 backdrop-blur-md hover:bg-blue-100'
              }`}
            >
              {walletData[key as WalletType].title}
            </button>
          )
        })}
      </div>

      {/* Wallet Card */}
      <div className="rounded-3xl p-6 bg-white/70 backdrop-blur-md shadow-xl transition hover:shadow-2xl border border-white/30">
        <div className="flex justify-between items-center mb-5">
          <div>
            <p className="text-sm text-gray-500 mb-1">نوع کیف پول</p>
            <h3 className="text-xl font-bold text-gray-800">{wallet.title}</h3>
          </div>
          <div className="h-12 w-12 relative rounded-full bg-white shadow-inner p-1">
            <Image src={wallet.logo} alt="Card Logo" fill className="object-contain" />
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 shadow-inner border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">شماره کارت</p>
          <p className="text-lg tracking-widest font-semibold text-gray-800">
            **** **** **** {wallet.cardNumber}
          </p>
        </div>

        <div className="flex justify-between items-center mt-6 text-sm">
          <div>
            <p className="text-gray-500">موجودی</p>
            <p className="text-lg font-bold text-gray-800">{wallet.balance} تومان</p>
          </div>
          <div>
            <p className="text-gray-500">انقضا</p>
            <p className="text-lg font-bold text-gray-800">{wallet.exp}</p>
          </div>
        </div>

        {/* اختیاری: نوار نمایش درصد موجودی یا هدف مالی */}
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-1">درصد استفاده از کیف پول</p>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                wallet.color
              }`}
              style={{ width: `${Math.floor(Math.random() * 50) + 50}%` }} // فقط برای نمایشی
            />
          </div>
        </div>
      </div>
    </div>
  )
}
