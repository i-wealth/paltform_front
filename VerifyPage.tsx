'use client'

import { useState } from 'react'
import { createUserProfile } from '../lib/api/userProfile'
import { useRouter } from 'next/navigation'

export default function VerifyPage() {
  const [step, setStep] = useState(1)
  const [basicInfo, setBasicInfo] = useState({
    firstName: '',
    lastName: '',
    nationalId: '',
    dob: '',
    gender: '' as '' | 'male' | 'female',
    phoneNumber: '',
  })
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  // از .env.local بخوانید
  const BEARER_TOKEN = typeof window !== 'undefined'
      ? localStorage.getItem('accessToken') || ''
      : ''

  const handleBasicSubmit = async () => {
    const { firstName, lastName, nationalId, dob, gender, phoneNumber } = basicInfo

    if (!firstName || !lastName || !nationalId || !dob || !gender || !phoneNumber) {
      return alert('لطفاً تمام فیلدهای مرحله اول را پر کنید.')
    }

    setLoading(true)
    try {
      const profile = await createUserProfile(
        {
          firstName,
          lastName,
          nationalCode: nationalId,
          birthDate: dob,
          gender,
          email: phoneNumber,
          isReal: false,
          nationalCardUrl:"aaaaa"
        },
        BEARER_TOKEN
      )

      setStep(2)
    } catch (e: any) {
      console.error(e)
      alert('ارسال اطلاعات با خطا مواجه شد: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAdvancedSubmit = () => {
    // ... (فعلاً بدون تغییر)
    alert('احراز هویت سطح دو با موفقیت انجام شد.')
    const timer = setTimeout(() => {
      // کدی که می‌خواهید بعد از 5 ثانیه اجرا شود
      router.push("/");
    }, 2000); // 5000 میلی‌ثانیه برابر 5 ثانیه است

    // این تابع برای پاکسازی تایمر وقتی کامپوننت unmount می‌شود، استفاده می‌شود
    return () => clearTimeout(timer);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {step === 1 && (
        <div className="bg-white p-6 rounded-xl shadow max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4">احراز هویت سطح یک</h2>

          <input
            type="text"
            placeholder="نام"
            value={basicInfo.firstName}
            onChange={e =>
              setBasicInfo({ ...basicInfo, firstName: e.target.value })
            }
            className="p-2 w-full mb-3 border rounded"
          />

          <input
            type="text"
            placeholder="نام خانوادگی"
            value={basicInfo.lastName}
            onChange={e =>
              setBasicInfo({ ...basicInfo, lastName: e.target.value })
            }
            className="p-2 w-full mb-3 border rounded"
          />

          <input
            type="text"
            placeholder="کد ملی"
            value={basicInfo.nationalId}
            onChange={e =>
              setBasicInfo({ ...basicInfo, nationalId: e.target.value })
            }
            className="p-2 w-full mb-3 border rounded"
          />

          <input
            type="date"
            value={basicInfo.dob}
            onChange={e => setBasicInfo({ ...basicInfo, dob: e.target.value })}
            className="p-2 w-full mb-3 border rounded"
          />

          <select
            value={basicInfo.gender}
            onChange={e =>
              setBasicInfo({ ...basicInfo, gender: e.target.value as any })
            }
            className="p-2 w-full mb-3 border rounded"
          >
            <option value="">جنسیت</option>
            <option value="male">مرد</option>
            <option value="female">زن</option>
          </select>

          <input
            type="email"
            placeholder="ایمیل"
            value={basicInfo.phoneNumber}
            onChange={e =>
              setBasicInfo({ ...basicInfo, phoneNumber: e.target.value })
            }
            className="p-2 w-full mb-5 border rounded"
          />

          <button
            onClick={handleBasicSubmit}
            disabled={loading}
            className="bg-blue-600 text-white py-2 px-8 rounded font-semibold"
          >
            {loading ? 'در حال ارسال...' : 'مرحله بعد'}
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white p-6 rounded-xl shadow max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4">احراز هویت سطح دو</h2>
          {/* ... فیلدهای مرحله دوم */}
          <button
            onClick={handleAdvancedSubmit}
            className="bg-green-600 text-white py-2 px-8 rounded font-semibold"
          >
            تایید و ارسال
          </button>
        </div>
      )}
    </div>
  )
}
