'use client'

import { useState } from 'react'

export default function UserInfoForm({ onNext }: { onNext: () => void }) {
  const [name, setName] = useState('')
  const [nationalId, setNationalId] = useState('')
  const [birthDate, setBirthDate] = useState('')

  const handleNext = () => {
    if (!name.trim() || nationalId.length !== 10 || !birthDate) {
      alert('لطفاً تمام فیلدها را به درستی وارد کنید')
      return
    }
    onNext()
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow w-full max-w-md space-y-4 mx-auto">
      <h2 className="text-xl font-bold text-blue-700 text-center">اطلاعات کاربری</h2>

      <div>
        <label className="block font-medium">نام و نام خانوادگی</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">کد ملی</label>
        <input
          value={nationalId}
          onChange={(e) => setNationalId(e.target.value.replace(/\D/g, ''))}
          maxLength={10}
          className="w-full border px-4 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">تاریخ تولد</label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />
      </div>

      <button
        onClick={handleNext}
        className="w-full bg-green-600 text-white py-2 rounded mt-4"
      >
        ادامه
      </button>
    </div>
  )
}
