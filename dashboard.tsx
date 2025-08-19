'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import MenuTabs, { Tab } from '../components/MenuTabs'
import DashboardHeader from '../components/DashboardHeader'
import LivePricesBar from '../components/LivePricesBar'
import WalletBalance from '../components/WalletBalance'
import WalletBalance2 from '../components/WalletBalance2'
import DashboardActions from '../components/DashboardActions'
import AssetManagement from '../components/AssetManagement'
import LiquidityManagement from '../components/LiquidityManagement'
import DepositWithdraw from '../components/DepositWithdraw'
import DistributionChart from '../components/DistributionChart'
import TransactionsList from '../components/TransactionsList'
import TradePanel from '../components/TradePanel'
import Footer from '../components/Footer'
import HeroSection1 from '../components/HeroSection1'
import SmartPortfolioBoxes from '../components/SmartPortfolioBoxes'



const tabs: Tab[] = [
  { id: 'dashboard', label: 'داشبورد', icon: '/images/c.png' },
  { id: 'asset', label: 'مدیریت دارایی', icon: '/images/poolmoney.png' },
  { id: 'liquidity', label: 'مدیریت نقدینگی', icon: '/images/poolmoney1.png' },
  { id: 'portfolio', label: 'پورتفولیو هوشمند', icon: '/images/cccc.png' },
  { id: 'deposit', label: 'واریز و برداشت', icon: '/images/exchange.png' },
  { id: 'trade', label: 'خرید و فروش', icon: '/images/goldcoin.png' },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [username, setUsername] = useState<string>('ورود/ ثبت نام')

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const raw = localStorage.getItem('userProfile')
      if (!raw) return
      const profile = JSON.parse(raw)
      if (profile?.firstName) {
        setUsername(`سلام ${profile.firstName}`)
      }
    } catch {
      // ignore parse errors
    }
  }, [])

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div style={{fontFamily:"Sans"}}>
            <div className="max-w-[1084px] w-full mx-auto">
              <HeroSection1 />
            </div>

            <div className="max-w-[1084px] w-full mx-auto space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <DashboardActions />
              </div>
              {/* LivePricesBar already renders a styled container; avoid double-wrapping */}


              {/* سایر بخش‌های داشبورد */}
              <section className="w-full mt-8">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                  <TransactionsList />
                  <Footer />
                </div>
              </section>
            </div>
          </div>
        )
      case 'asset':
        return (
          <div style={{fontFamily:"Sans"}} className="max-w-[1084px] w-full mx-auto bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <AssetManagement />
          </div>
        )
      case 'liquidity':
        return (
          <div style={{fontFamily:"Sans"}} className="max-w-[1084px] w-full mx-auto bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <LiquidityManagement />
          </div>
        )
      case 'portfolio':
        return (
          <div style={{fontFamily:"Sans"}} className="max-w-[1260px] w-full mx-auto bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <SmartPortfolioBoxes />
          </div>
        )
      case 'deposit':
        return (
          <div style={{fontFamily:"Sans"}} className="max-w-[1084px] w-full mx-auto bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <DepositWithdraw />
          </div>
        )
      case 'trade':
        return (
          <div style={{fontFamily:"Sans"}} className="max-w-[1084px] w-full mx-auto bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <TradePanel />
          </div>
        )
      default:
        return (
          <div style={{fontFamily:"Sans"}} className="p-6">
            <p className="font-semibold">محتوای این بخش در حال توسعه است...</p>
          </div>
        )
    }
  }

  return (
    <div  className="min-h-screen bg-white text-gray-800" dir="rtl" style={{fontFamily:"Sans"}}>
      <main className="pt-6 pb-12 space-y-8">
        <DashboardHeader
          logoSrc="/images/logo1.png"
          logoAlt="ایران ولث"
          username={username}
          avatarSrc="/images/avatar.jpg"
          onLoginClick={() => console.log('ورود کلیک شد')}
          menuItems={['سرمایه گذاری', 'مشاوره مالی', 'درباره ما', 'ارتباط با ما']}
        />

        <div className="max-w-[1084px] w-full mx-auto">
          <MenuTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
          {renderTabContent()}
        </div>
      </main>
    </div>
  )
}
