'use client'

import { useState } from 'react'
import DashboardHeader from '../components/DashboardHeader'
import MenuTabs, { Tab } from '../components/MenuTabs'
import DashboardActions from '../components/DashboardActions'
import UserManagementDashboard from '../components/UserManagementDashboard'
import LogManagement from '../components/LogManagement'
import SystemConfiguration from '../components/SystemConfiguration'
import SystemHealthDashboard from '../components/SystemHealthDashboard'
import UserFinancialPath from '../components/UserFinancialPath'

const tabs: Tab[] = [
  { id: 'asset', label: '   مدیریت کاربر', icon: '/images/portfolio.jpg' },
  { id: 'liquidity', label: '    مشاهده لاگ رخدادها', icon: '/images/3333.jpg' },
  { id: 'portfolio', label: '  پیکربندی', icon: '/images/2222.jpg' },
  { id: 'deposit', label: ' سلامت سیستم   ', icon: '/images/wallett.jpg' },
  { id: 'trade', label: '   دسترسی ', icon: '/images/111.jpg' },
]

export default function PlatformDashboard() {
  const [activeTab, setActiveTab] = useState('asset')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'asset':
        return (
          <div className="max-w-[1084px] w-full mx-auto bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <UserManagementDashboard />
          </div>
        )
      case 'liquidity':
        return (
          <div className="max-w-[1084px] w-full mx-auto bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <LogManagement />
          </div>
        )
      case 'portfolio':
        return (
          <div className="max-w-[1260px] w-full mx-auto bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <SystemConfiguration />
          </div>
        )
      case 'deposit':
        return (
          <div className="max-w-[1084px] w-full mx-auto bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <SystemHealthDashboard />
          </div>
        )
      case 'trade':
        return (
          <div className="max-w-[1084px] w-full mx-auto bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <UserFinancialPath activeTab={activeTab} />
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
          <div className="mt-6">{renderTabContent()}</div>
        </div>
      </main>
    </div>
  )
}
