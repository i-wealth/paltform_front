'use client'

import { useState } from 'react'
import Image from 'next/image'

import MenuTabs, { Tab } from '../components/MenuTabs'
import DashboardHeader from '../components/DashboardHeader'
import LivePricesBar from '../components/LivePricesBar'
import DashboardActions from '../components/DashboardActions'
import PortfolioContent from '../components/PortfolioContent'
import Assetmanagement from '../components/Assetmanagement'
import LiquidityManagement from '../components/LiquidityManagement'
import DepositWithdraw from '../components/DepositWithdraw'
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <div className="max-w-[1084px] w-full mx-auto">
              <HeroSection1
                slides={[
                  {
                    src: '/images/unnamed.png',
                    alt: 'وام فوری',
                    href: '#',
                  },
                  {
                    src: '/images/unnamed.png',
                    alt: 'نمونه دوم',
                    href: '#',
                  },
                  {
                    src: '/images/unnamed.png',
                    alt: 'تصویر نام‌گذاری نشده',
                    href: '#',
                  },
                  {
                    src: '/images/unnamed.png',
                    alt: 'نمای کلی',
                    href: '#',
                  },
                  {
                    src: '/images/unnamed.png',
                    alt: 'تو بانک مجازی',
                    href: '#',
                  },
                ]}
                height={400}
                autoplayIntervalMs={5000}
              />
            </div>

            <div className="max-w-[1084px] w-full mx-auto space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <DashboardActions />
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <LivePricesBar />
              </div>
              {/* سایر بخش‌های داشبورد */}
              <section className="w-full mt-8">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                  <TransactionsList />
                  <Footer />
                </div>
              </section>
            </div>
          </>
        )
      case 'asset':
        return (
          <div className="max-w-[1084px] w-full mx-auto bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <Assetmanagement />
          </div>
        )
      case 'liquidity':
        return (
          <div className="max-w-[1084px] w-full mx-auto bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <LiquidityManagement />
          </div>
        )
      case 'portfolio':
        return (
          <div className="max-w-[1260px] w-full mx-auto bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <SmartPortfolioBoxes />
          </div>
        )
      case 'deposit':
        return (
          <div className="max-w-[1084px] w-full mx-auto bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <DepositWithdraw />
          </div>
        )
      case 'trade':
        return (
          <div className="max-w-[1084px] w-full mx-auto bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <TradePanel activeTab={activeTab} />
          </div>
        )
      default:
        return (
          <div className="p-6">
            <p className="font-semibold">محتوای این بخش در حال توسعه است...</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-800" dir="rtl">
      <main className="pt-6 pb-12 space-y-8">
        <DashboardHeader
          logoSrc="/images/logo1.png"
          logoAlt="ایران ولث"
          username="ورود/ ثبت نام"
          avatarSrc="/images/logo1.jpg"
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
