'use client'

import { useState } from 'react'

export default function VerifyPage() {
  const [step, setStep] = useState(1)  // متغیر برای مدیریت مراحل
  const [basicInfo, setBasicInfo] = useState({
    firstName: '',
    lastName: '',
    nationalId: '',
    dob: '',
    gender: '',
    phoneNumber: '',
    idCardImage: null,
  })
  const [advancedInfo, setAdvancedInfo] = useState({
    address: '',
    postalCode: '',
    landline: '',
    identityImage: null,
  })
  const [isBasicStepValid, setIsBasicStepValid] = useState(false) // اعتبار سنجی مرحله اول

  // تابع تایید مرحله اول
  const handleBasicSubmit = () => {
    if (
      basicInfo.firstName &&
      basicInfo.lastName &&
      basicInfo.nationalId &&
      basicInfo.dob &&
      basicInfo.gender &&
      basicInfo.phoneNumber &&
      basicInfo.idCardImage
    ) {
      setIsBasicStepValid(true)
      setStep(2)  // انتقال به مرحله دوم
    } else {
      alert('لطفاً تمام فیلدهای مرحله اول را پر کنید.')
    }
  }

  // تابع تایید مرحله دوم
  const handleAdvancedSubmit = () => {
    if (
      advancedInfo.address &&
      advancedInfo.postalCode &&
      advancedInfo.landline &&
      advancedInfo.identityImage
    ) {
      alert('احراز هویت با موفقیت انجام شد.')
      // اینجا باید اطلاعات به سرور ارسال شود
    } else {
      alert('لطفاً تمام فیلدهای مرحله دوم را پر کنید.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* مرحله اول احراز هویت */}
      {step === 1 && (
        <div className="bg-white p-6 rounded-xl shadow text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">احراز هویت سطح یک</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="نام"
              value={basicInfo.firstName}
              onChange={(e) => setBasicInfo({ ...basicInfo, firstName: e.target.value })}
              className="p-2 w-full border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="نام خانوادگی"
              value={basicInfo.lastName}
              onChange={(e) => setBasicInfo({ ...basicInfo, lastName: e.target.value })}
              className="p-2 w-full border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="کد ملی"
              value={basicInfo.nationalId}
              onChange={(e) => setBasicInfo({ ...basicInfo, nationalId: e.target.value })}
              className="p-2 w-full border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="date"
              value={basicInfo.dob}
              onChange={(e) => setBasicInfo({ ...basicInfo, dob: e.target.value })}
              className="p-2 w-full border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <select
              value={basicInfo.gender}
              onChange={(e) => setBasicInfo({ ...basicInfo, gender: e.target.value })}
              className="p-2 w-full border border-gray-300 rounded"
            >
              <option value="">جنسیت</option>
              <option value="male">مرد</option>
              <option value="female">زن</option>
            </select>
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="شماره همراه"
              value={basicInfo.phoneNumber}
              onChange={(e) => setBasicInfo({ ...basicInfo, phoneNumber: e.target.value })}
              className="p-2 w-full border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="file"             
             placeholder=" عکس کارت ملی"
              onChange={(e) =>
                setBasicInfo({ ...basicInfo, idCardImage: e.target.files ? e.target.files[0] : null })
              }
              className="p-2 w-full border border-gray-300 rounded"
            />
          </div>
          <button onClick={handleBasicSubmit} className="bg-blue-600 text-white py-2 px-6 rounded-xl font-semibold">
            مرحله بعد
          </button>
        </div>
      )}

      {/* مرحله دوم احراز هویت */}
      {step === 2 && (
        <div className="bg-white p-6 rounded-xl shadow text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">احراز هویت سطح دو</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="آدرس محل سکونت"
              value={advancedInfo.address}
              onChange={(e) => setAdvancedInfo({ ...advancedInfo, address: e.target.value })}
              className="p-2 w-full border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="کد پستی"
              value={advancedInfo.postalCode}
              onChange={(e) => setAdvancedInfo({ ...advancedInfo, postalCode: e.target.value })}
              className="p-2 w-full border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="شماره تلفن ثابت"
              value={advancedInfo.landline}
              onChange={(e) => setAdvancedInfo({ ...advancedInfo, landline: e.target.value })}
              className="p-2 w-full border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="file"
               placeholder=" واردکردن شماره کارت"
              onChange={(e) =>
                setAdvancedInfo({ ...advancedInfo, identityImage: e.target.files ? e.target.files[0] : null })
              }
              className="p-2 w-full border border-gray-300 rounded"
            />
          </div>
          <button onClick={handleAdvancedSubmit} className="bg-green-600 text-white py-2 px-6 rounded-xl font-semibold">
            تایید و ارسال
          </button>
        </div>
      )}
    </div>
  )
}
