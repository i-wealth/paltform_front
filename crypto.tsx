'use client'

import CryptoHeader from '../components/CryptoHeader'
import HeroSection from '../components/HeroSection'
import Features from '../components/Features'
import ExchangeBox from '../components/ExchangeBox'
import WalletBalance from '../components/WalletBalance'
import TransactionsHistory from '../components/TransactionsHistory'
import CryptoAssetsDistribution from '../components/CryptoAssetsDistribution'
import CryptoExchange from '../components/CryptoExchange'



export default function CryptoPage() {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-white min-h-screen px-6 " style={{fontFamily:"Sans"}}>
      {/* بخش header */}
      <CryptoHeader />
      
      {/* بخش Hero */}
      <HeroSection />
      
      {/* بخش ویژگی‌ها */}
      <div className="mt-12">
        <Features />
      </div>

      {/* بخش Crypto Exchange */}
      <div className="mt-12">
        <CryptoExchange />
      </div>

      {/* گرید داشبورد */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-12">
        {/* بخش WalletBalance - سمت راست (بزرگ) */}
        <div className="md:col-span-5">
          <div className="h-full bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl">
            <WalletBalance />
          </div>
        </div>

        {/* بخش Transactions - وسط */}
        <div className="md:col-span-4">
          <div className="h-full bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl">
            <TransactionsHistory />
          </div>
        </div>

        {/* بخش ExchangeBox - سمت چپ */}
        <div className="md:col-span-3">
          <div className="h-full bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl">
            <ExchangeBox />
          </div>
        </div>
      </div>

      {/* نمودار پای دارایی‌ها */}
      <div className="mt-12 bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl">
        <CryptoAssetsDistribution />
      </div>
    </div>
  )
}
