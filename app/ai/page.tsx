'use client'

import { useState } from 'react'
import ModuleCard from '../components/ModuleCard'
import LoanPayment from '../components/LoanPayment'
import CurrencyConverter from '../components/CurrencyConverter'
import { FaChartLine, FaRegCalendarAlt, FaWallet, FaCreditCard, FaExchangeAlt } from 'react-icons/fa'
import SmartPortfolio from '../components/SmartPortfolio'
import InvestmentPersonality from '../components/InvestmentPersonality'
import Budgeting from '../components/Budgeting'

const modules = [
  {
    key: 'smart-portfolio',
    title: 'پورتفولیو هوشمند',
    description: 'ترکیبی از بودجه بندی، شخصیت سرمایه گذاری و ثبت درآمد و هزینه‌ها.',
    icon: <FaChartLine />,
  },
  {
    key: 'loan-payment',
    title: 'پرداخت خودکار اقساط',
    description: 'پرداخت اقساط خودکار برای راحتی بیشتر.',
    icon: <FaCreditCard />,
  },
  {
    key: 'currency-converter',
    title: 'مبدل درآمد به تتر یا طلا',
    description: 'تبدیل درآمد به ارزهای دیجیتال مانند تتر یا طلا.',
    icon: <FaExchangeAlt />,
  },
]

export default function Page() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [step, setStep] = useState<number>(1)  // Tracking the step of the process

  const renderModule = () => {
    switch (selectedModule) {
      case 'smart-portfolio':
        return renderSmartPortfolioSteps()
      case 'loan-payment':
        return <LoanPayment />
      case 'currency-converter':
        return <CurrencyConverter />
      default:
        return null
    }
  }

  // Render the different steps for Smart Portfolio
  const renderSmartPortfolioSteps = () => {
    switch (step) {
      case 1:
        return <SmartPortfolio onNext={() => handleNextStep()} />
      case 2:
        return <InvestmentPersonality onNext={() => handleNextStep()} />
      case 3:
        return <Budgeting onNext={() => handleNextStep()} />
      case 4:
        return <div>پورتفولیو پیشنهادی</div> // Pseudo content for the portfolio
      default:
        return null
    }
  }

  // Handle step progression and logic for moving to the next step
  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1a202c] to-[#2d3748] p-6 md:p-10">
      {!selectedModule ? (
        <>
          <h1 className="text-3xl font-bold mb-8 text-center text-white">ماژول‌های هوش مصنوعی مالی</h1>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {modules.map((module) => (
              <div
                key={module.key}
                onClick={() => setSelectedModule(module.key)}
                className="cursor-pointer hover:scale-105 transform transition-all ease-in-out duration-300"
              >
                <ModuleCard
                  title={module.title}
                  description={module.description}
                  icon={module.icon}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedModule(null)}
            className="text-blue-400 hover:underline mb-6 flex items-center gap-2"
          >
            ← بازگشت به لیست ماژول‌ها
          </button>
          {renderModule()}
        </div>
      )}
    </div>
  )
}
