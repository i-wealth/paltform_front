// components/UploadDocs.tsx
'use client'

import { useState } from 'react'

export default function UploadDocs({ onFinish }: { onFinish: () => void }) {
  const [idCard, setIdCard] = useState<File | null>(null)
  const [birthCertificate, setBirthCertificate] = useState<File | null>(null)
  const [paymentDoc, setPaymentDoc] = useState<File | null>(null)
  const [antiMoneyLaunderingChecked, setAntiMoneyLaunderingChecked] = useState(false)

  // Handle file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0] || null
    if (file) {
      switch (type) {
        case 'idCard':
          setIdCard(file)
          break
        case 'birthCertificate':
          setBirthCertificate(file)
          break
        case 'paymentDoc':
          setPaymentDoc(file)
          break
        default:
          break
      }
    }
  }

  const handleSubmit = () => {
    if (!idCard || !birthCertificate || !paymentDoc) {
      alert('لطفاً تمامی مدارک را بارگذاری کنید.')
      return
    }

    if (!antiMoneyLaunderingChecked) {
      alert('لطفاً شرایط مبارزه با پولشویی را تایید کنید.')
      return
    }

    // عملیات ارسال مدارک
    onFinish() // به مرحله بعد برو
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <h3 className="text-xl font-bold text-gray-700 mb-4">آپلود مدارک</h3>

      <div className="mb-4">
        <label htmlFor="idCard" className="block text-sm text-gray-600 mb-2">کارت ملی</label>
        <input
          type="file"
          id="idCard"
          onChange={(e) => handleFileChange(e, 'idCard')}
          className="block w-full text-sm text-gray-700 border border-gray-300 p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="birthCertificate" className="block text-sm text-gray-600 mb-2">شناسنامه</label>
        <input
          type="file"
          id="birthCertificate"
          onChange={(e) => handleFileChange(e, 'birthCertificate')}
          className="block w-full text-sm text-gray-700 border border-gray-300 p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="paymentDoc" className="block text-sm text-gray-600 mb-2">مدرک پرداخت</label>
        <input
          type="file"
          id="paymentDoc"
          onChange={(e) => handleFileChange(e, 'paymentDoc')}
          className="block w-full text-sm text-gray-700 border border-gray-300 p-2 rounded"
        />
      </div>

      {/* چک‌باکس تایید مبارزه با پولشویی */}
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="antiMoneyLaundering"
          checked={antiMoneyLaunderingChecked}
          onChange={() => setAntiMoneyLaunderingChecked(!antiMoneyLaunderingChecked)}
          className="mr-2"
        />
        <label htmlFor="antiMoneyLaundering" className="text-sm text-gray-600">
          من شرایط مبارزه با پولشویی را تایید می‌کنم.
        </label>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-xl font-semibold"
      >
        ارسال مدارک
      </button>
    </div>
  )
}
