'use client'

import { useState } from 'react'

type PaymentData = {
  category: string
  subCategory?: string
  phoneNumber?: string
  nationalCode?: string
  bankCard?: string
  amount?: number
  dueDate?: string
  paymentId?: string
  forChild?: number
  forSpouse?: number
  acceptedTerms: boolean
}

export default function LoanPayment() {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [subCategory, setSubCategory] = useState<string>('')

  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [nationalCode, setNationalCode] = useState<string>('')
  const [bankCard, setBankCard] = useState<string>('')

  const [amount, setAmount] = useState<number>(0)
  const [dueDate, setDueDate] = useState<string>('')
  const [paymentId, setPaymentId] = useState<string>('')

  const [forChild, setForChild] = useState<number>(0)
  const [forSpouse, setForSpouse] = useState<number>(0)

  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false)
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false)
  const [savedData, setSavedData] = useState<PaymentData | null>(null)

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setSubCategory('')
    setCurrentStep(2)
  }

  const handleSubCategorySelect = (sub: string) => {
    setSubCategory(sub)
    setCurrentStep(3)
  }

  const handleSubmit = () => {
    if (!acceptedTerms) {
      alert('لطفاً ابتدا قوانین و شرایط را بپذیرید.')
      return
    }

    const data: PaymentData = {
      category: selectedCategory,
      subCategory,
      phoneNumber,
      nationalCode,
      bankCard,
      amount,
      dueDate,
      paymentId,
      forChild,
      forSpouse,
      acceptedTerms,
    }

    setSavedData(data)
    setIsConfirmed(true)
    alert('پرداخت ثبت شد.')
  }

  const handleCancel = () => {
    setSavedData(null)
    setIsConfirmed(false)
    alert('درخواست پرداخت لغو شد.')
  }

  const isMarketplaceInstallment = [
    'قسط ماهانه دیجیکالا',
    'قسط ماهانه اسنپ',
    'قسط ماهانه تپسی',
  ].includes(subCategory)

  const isLoanBank = subCategory === 'وام بانکی'
  const isFilimo = subCategory === 'اشتراک فیلیمو'
  const isMobileBill = subCategory === 'قبض ماهانه موبایل'

  return (
    <div className="min-h-screen p-8 bg-gray-100 space-y-6">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">پرداخت خودکار</h2>

      {/* مرحله ۱: انتخاب دسته‌بندی */}
      {currentStep === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['پرداخت قسط', 'پرداخت قبض و اشتراک', 'پول تو جیبی ماهانه'].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl text-center font-semibold text-lg border hover:bg-blue-50"
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* مرحله ۲: انتخاب زیرمجموعه */}
      {currentStep === 2 && selectedCategory === 'پرداخت قسط' && (
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <label className="block text-lg font-semibold">نوع قسط</label>
          <select
            className="w-full p-3 border rounded"
            value={subCategory}
            onChange={(e) => handleSubCategorySelect(e.target.value)}
          >
            <option value="">انتخاب کنید</option>
            <option value="وام بانکی">وام بانکی</option>
            <option value="قسط ماهانه دیجیکالا">قسط ماهانه دیجیکالا</option>
            <option value="قسط ماهانه اسنپ">قسط ماهانه اسنپ</option>
            <option value="قسط ماهانه تپسی">قسط ماهانه تپسی</option>
          </select>
        </div>
      )}

      {currentStep === 2 && selectedCategory === 'پرداخت قبض و اشتراک' && (
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <label className="block text-lg font-semibold">نوع پرداخت</label>
          <select
            className="w-full p-3 border rounded"
            value={subCategory}
            onChange={(e) => handleSubCategorySelect(e.target.value)}
          >
            <option value="">انتخاب کنید</option>
            <option value="اشتراک فیلیمو">اشتراک فیلیمو</option>
            <option value="قبض ماهانه موبایل">قبض ماهانه موبایل</option>
          </select>
        </div>
      )}

      {/* مرحله ۳: پول تو جیبی */}
      {currentStep === 2 && selectedCategory === 'پول تو جیبی ماهانه' && (
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <label className="block text-lg font-semibold">مبلغ برای فرزند</label>
          <input
            type="number"
            className="w-full p-3 border rounded"
            value={forChild}
            onChange={(e) => setForChild(Number(e.target.value))}
            placeholder="مثلاً 200000"
          />
          <label className="block text-lg font-semibold">مبلغ برای همسر</label>
          <input
            type="number"
            className="w-full p-3 border rounded"
            value={forSpouse}
            onChange={(e) => setForSpouse(Number(e.target.value))}
            placeholder="مثلاً 500000"
          />
          <button
            onClick={() => setCurrentStep(4)}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            ادامه
          </button>
        </div>
      )}

      {/* مرحله ۳: سایر انواع */}
      {currentStep === 3 && (isMarketplaceInstallment || isFilimo) && (
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <label>شماره موبایل ثبت‌نام‌شده</label>
          <input
            type="tel"
            className="w-full p-3 border rounded"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <label>کد ملی</label>
          <input
            type="text"
            className="w-full p-3 border rounded"
            value={nationalCode}
            onChange={(e) => setNationalCode(e.target.value)}
          />
          <label>شماره کارت بانکی</label>
          <input
            type="text"
            className="w-full p-3 border rounded"
            value={bankCard}
            onChange={(e) => setBankCard(e.target.value)}
          />
          <button
            onClick={() => setCurrentStep(4)}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            ادامه
          </button>
        </div>
      )}

      {currentStep === 3 && isMobileBill && (
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <label>شماره موبایل (همراه اول یا ایرانسل)</label>
          <input
            type="tel"
            className="w-full p-3 border rounded"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <label>شماره کارت بانکی</label>
          <input
            type="text"
            className="w-full p-3 border rounded"
            value={bankCard}
            onChange={(e) => setBankCard(e.target.value)}
          />
          <button
            onClick={() => setCurrentStep(4)}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            ادامه
          </button>
        </div>
      )}

      {currentStep === 3 && isLoanBank && (
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <label>مبلغ قسط</label>
          <input
            type="number"
            className="w-full p-3 border rounded"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <label>تاریخ سررسید</label>
          <input
            type="date"
            className="w-full p-3 border rounded"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <label>شناسه واریز</label>
          <input
            type="text"
            className="w-full p-3 border rounded"
            value={paymentId}
            onChange={(e) => setPaymentId(e.target.value)}
          />
          <label>شماره کارت بانکی</label>
          <input
            type="text"
            className="w-full p-3 border rounded"
            value={bankCard}
            onChange={(e) => setBankCard(e.target.value)}
          />
          <button
            onClick={() => setCurrentStep(4)}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            ادامه
          </button>
        </div>
      )}

      {/* مرحله نهایی: تایید قوانین */}
      {currentStep === 4 && (
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="accent-blue-600"
            />
            <span className="text-sm">قوانین و شرایط را خواندم و قبول می‌کنم</span>
          </label>
          <button
            onClick={handleSubmit}
            className={`w-full p-3 rounded ${
              acceptedTerms ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
            disabled={!acceptedTerms}
          >
            تایید و ثبت پرداخت
          </button>
        </div>
      )}

      {/* پیام موفقیت و نمایش اطلاعات */}
      {isConfirmed && savedData && (
        <div className="bg-green-100 border border-green-500 text-green-800 p-6 rounded-xl mt-6 space-y-4 text-center">
          <p className="text-lg font-semibold">✅ پرداخت ثبت شد.</p>
          <p>نوع: {savedData.category}{savedData.subCategory && ` - ${savedData.subCategory}`}</p>
          {savedData.phoneNumber && <p>شماره تلفن: {savedData.phoneNumber}</p>}
          {savedData.nationalCode && <p>کد ملی: {savedData.nationalCode}</p>}
          {savedData.bankCard && <p>کارت بانکی: {savedData.bankCard}</p>}
          {savedData.amount && <p>مبلغ قسط: {savedData.amount.toLocaleString()} تومان</p>}
          {savedData.dueDate && <p>تاریخ سررسید: {savedData.dueDate}</p>}
          {savedData.paymentId && <p>شناسه واریز: {savedData.paymentId}</p>}
          {savedData.forChild && <p>پول تو جیبی فرزند: {savedData.forChild.toLocaleString()} تومان</p>}
          {savedData.forSpouse && <p>پول تو جیبی همسر: {savedData.forSpouse.toLocaleString()} تومان</p>}

          <button
            onClick={handleCancel}
            className="mt-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            لغو درخواست
          </button>
        </div>
      )}
    </div>
  )
}
