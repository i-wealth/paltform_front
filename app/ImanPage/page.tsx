'use client'

import Image from 'next/image'
import { useState } from 'react'
import CharitySelector from '../components/CharitySelector'
import DonationForm from '../components/DonationForm'
import ThankYouModal from '../components/ThankYouModal'

export default function ImanPage() {
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [donationAmount, setDonationAmount] = useState<number>(0)

  const handleDonate = (amount: number) => {
    setDonationAmount(amount)
    setShowModal(true)
  }

  return (
    <main className="min-h-screen bg-[#d6e7f2] flex flex-col items-center py-10">
      {/* Container */}
      <div className="bg-white rounded-[40px] w-full max-w-6xl shadow-xl px-8 py-10 space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-semibold text-sky-800">
            <span>🌱</span>
            <span>آی من</span>
          </div>
          <nav className="flex gap-6 text-gray-600 text-sm font-medium">
            <a href="#" className="hover:text-sky-800"> درباره موسسات</a>
            <a href="#" className="hover:text-sky-800">انواع کمک رسانی</a>
            <a href="#" className="hover:text-sky-800">تراکنش های ثبت شده</a>
          </nav>
        </div>

  

        <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-800">
          وَأَحْسِنْ كَمَا أَحْسَنَ اللَّهُ إِلَيْكَ
        
          / نیکی کن همان‌گونه که خدا به تو نیکی کرده است
        </h1>

        {/* Donation Flow */}
        <div className="max-w-3xl mx-auto">
          {!selectedOrg ? (
            <CharitySelector onSelect={setSelectedOrg} />
          ) : (
            <DonationForm
              orgKey={selectedOrg}
              onBack={() => setSelectedOrg(null)}
              onDonate={handleDonate}
            />
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-center">
          <div className="bg-sky-50 rounded-xl p-6">
            <p className="text-3xl font-bold text-sky-700"> هفت میلیارد تومان</p>
            <p className="text-sm text-gray-600 mt-2">کمک های جمع شده تا همین الان</p>
          </div>
          <div className="bg-sky-50 rounded-xl p-6">
            <p className="text-3xl font-bold text-sky-700">+20,000</p>
            <p className="text-sm text-gray-600 mt-2">جمعیت تحت حمایت</p>
          </div>
          <div className="bg-sky-50 rounded-xl p-6">
            <p className="text-3xl font-bold text-sky-700">4</p>
            <p className="text-sm text-gray-600 mt-2">موسسه های تحت حمایت</p>
          </div>
          <div className="bg-sky-50 rounded-xl p-6">
            <p className="text-3xl font-bold text-sky-700"> هفتاد و چهارمیلیون تومان</p>
            <p className="text-sm text-gray-600 mt-2">کمک های روزانه</p>
          </div>
        </div>

        {/* Thank you modal */}
        {showModal && (
          <ThankYouModal
            amount={donationAmount}
            onClose={() => {
              setShowModal(false)
              setSelectedOrg(null)
            }}
          />
        )}
      </div>
    </main>
  )
}
