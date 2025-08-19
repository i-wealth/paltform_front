'use client'

import CryptoHeader from '../components/CryptoHeader'
import HeroSection2 from '../components/HeroSection2'
import Features2 from '../components/Features2'
import ExchangeBox from '../components/ExchangeBox'
import WalletBalance2 from '../components/WalletBalance2'
import TransactionsHistory2 from '../components/TransactionsHistory2'
import GoldAssetsDistribution from '../components/GoldAssetsDistribution'
import GoldExchange from '../components/GoldExchange'


export default function CryptoPage() {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-white min-h-screen px-6 " style={{fontFamily:"Sans"}}>
      {/* بخش header */}
      <CryptoHeader />
      
      {/* بخش Hero */}
      <HeroSection2 />
      
      {/* بخش ویژگی‌ها */}
      <div className="mt-12">
        <Features2 />
      </div>

      {/* بخش Crypto Exchange */}
      <div className="mt-12">
        <GoldExchange />
      </div>


      {/* گرید داشبورد */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-12">
        {/* بخش WalletBalance - سمت راست (بزرگ) */}
        <div className="md:col-span-5">
          <div className="h-full bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl">
            <WalletBalance2 />
          </div>
        </div>


        {/* بخش Transactions - وسط */}
        <div className="md:col-span-4">
          <div className="h-full bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl">
            <TransactionsHistory2 />
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
        <GoldAssetsDistribution />
      </div>
    </div>
  )
}
