'use client'

import { useState } from 'react'
import Image from 'next/image'

const actions = [
  { label: 'سرویس BNPL', icon: '/images/56b836f5a5ad4ec9cb4622b24da7eb28-removebg-preview.png' },
  { label: 'رمی تنس', icon: '/images/2ddaeaa0b096bff82ef50dd231fab917-removebg-preview.png' },
  { label: 'سرمایه گذاری خودکار ', icon: '/images/c6efdf66306dee02724baf2d262ecc4a-removebg-preview.png' },
  { label: 'پرداخت امن', icon: '/images/c.png' },
  { label: 'مشاهده همه حساب ها  ', icon: '/images/aa55daee1ce15478cf6abd1473133b3f-removebg-preview.png' },
  { label: 'هشدارهزینه ای ', icon: '/images/ec91a97e6a12e810f2fda26157f13e47-removebg-preview.png' },
  { label: '  مارکت پلیس', icon: '/images/c3af58d02b715aa21e6fef03765b1729-removebg-preview.png' },
  { label: 'مبدل تبدیل تتر به طلا', icon: '/images/ccccc.png' },
]

type InvestmentData = {
  category: string
  subCategory: string
  phoneNumber: string
  nationalCode: string
  bankCard: string
  amount: number
  dueDate: string
  paymentId: string
  forChild: number
  forSpouse: number
}

export default function LiquidityManagement() {
  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [savedData, setSavedData] = useState<InvestmentData | null>(null)
  const [bankCard, setBankCard] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [isInvestment, setIsInvestment] = useState(true)

  const handleInvestmentClick = () => {
    setIsInvestmentModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsInvestmentModalOpen(false)
  }

  const handleSubmit = () => {
    const data: InvestmentData = {
      category: selectedCategory,
      subCategory,
      phoneNumber: '09123456789',
      nationalCode: '1234567890',
      bankCard,
      amount: 1000000,
      dueDate,
      paymentId: 'PAY123456',
      forChild: 500000,
      forSpouse: 200000,
    }
    setSavedData(data)
    setIsInvestmentModalOpen(false)
  }

  const handleCancel = () => {
    setSavedData(null)
  }

  return (
    <div className="services-container" style={{fontFamily:"Sans"}}>
      {actions.map((action) => (
        <div
          key={action.label}
          className="services-item"
          onClick={action.label === 'سرمایه گذاری خودکار ' ? handleInvestmentClick : undefined}
        >
          <div className="services-icon-wrapper">
            <Image src={action.icon} alt={action.label} width={40} height={40} />
          </div>
          <div className="services-label">{action.label}</div>
        </div>
      ))}

      {/* Full-Screen Modal for Investment */}
      {isInvestmentModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={handleCloseModal} className="close-btn">
              ×
            </button>
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">پرداخت خودکار</h2>

            {/* مرحله ۲: سرمایه گذاری خودکار */}
            {currentStep === 2 && isInvestment && (
              <div className="bg-white p-6 rounded-xl shadow space-y-4">
                <h3 className="text-xl font-semibold text-center">سرمایه گذاری خودکار</h3>
                <p className="text-center text-gray-600 mb-6">
                  با فعال‌سازی این گزینه می‌توانید در انواع سبدهای سرمایه‌گذاری خودکار مانند ارزهای دیجیتال، طلا و درآمد ثابت سرمایه‌گذاری کنید.
                </p>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
                >
                  انتخاب بانک و شماره کارت
                </button>
              </div>
            )}

            {/* مرحله ۳: انتخاب بانک و شماره کارت */}
            {currentStep === 3 && isInvestment && (
              <div className="bg-white p-6 rounded-xl shadow space-y-4">
                <label className="block text-lg font-semibold">انتخاب بانک</label>
                <select className="w-full p-3 border rounded">
                  <option value="">انتخاب بانک</option>
                  <option value="بانک ملی">بانک ملی</option>
                  <option value="بانک صادرات">بانک صادرات</option>
                  <option value="بانک ملت">بانک ملت</option>
                </select>
                <label className="block text-lg font-semibold mt-4">شماره کارت</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded"
                  value={bankCard}
                  onChange={(e) => setBankCard(e.target.value)}
                  placeholder="شماره کارت بانکی خود را وارد کنید"
                />
                <button
                  onClick={() => setCurrentStep(4)}
                  className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 mt-4"
                >
                  ادامه
                </button>
              </div>
            )}

            {/* مرحله ۴: انتخاب مدت زمان سرمایه‌گذاری */}
            {currentStep === 4 && isInvestment && (
              <div className="bg-white p-6 rounded-xl shadow space-y-4">
                <label className="block text-lg font-semibold">مدت زمان سرمایه‌گذاری</label>
                <select
                  className="w-full p-3 border rounded"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                >
                  <option value="">انتخاب کنید</option>
                  <option value="۳ ماهه">۳ ماهه</option>
                  <option value="۶ ماهه">۶ ماهه</option>
                  <option value="۱ ساله">۱ ساله</option>
                </select>
                <button
                  onClick={() => setCurrentStep(5)}
                  className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 mt-4"
                >
                  ادامه
                </button>
              </div>
            )}

            {/* مرحله ۵: انتخاب سبد پورتفولیو */}
            {currentStep === 5 && isInvestment && (
              <div className="bg-white p-6 rounded-xl shadow space-y-4">
                <h3 className="text-xl font-semibold text-center">انتخاب سبد پورتفولیو</h3>
                <div className="space-y-4">
                  {['درآمد ثابت', 'پورتفولیو طلا', 'پورتفولیو ارز دیجیتال'].map((portfolio, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedCategory('سرمایه گذاری خودکار')
                        setSubCategory(portfolio)
                        setCurrentStep(6)
                      }}
                      className="w-full bg-gray-100 p-4 rounded-xl border hover:bg-blue-50"
                    >
                      {portfolio}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* مرحله نهایی: تایید قوانین */}
            {currentStep === 6 && (
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
            {savedData && (
              <div className="bg-green-100 border border-green-500 text-green-800 p-6 rounded-xl mt-6 space-y-4 text-center">
                <p className="text-lg font-semibold">✅ پرداخت ثبت شد.</p>
                <p>نوع: {savedData.category} {savedData.subCategory && ` - ${savedData.subCategory}`}</p>
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
        </div>
      )}

      <style jsx>{`
        .services-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
          padding: 24px;
          direction: rtl;
          font-family: 'yekan-bakh';
          background-color: #fff;
          justify-items: center;
          align-items: center;
        }

        .services-item {
          width: 90px;
          height: 116px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          cursor: pointer;
          overflow: hidden;
        }

        .services-icon-wrapper {
          width: 88px;
          height: 88px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border-radius: 16px;
          background: linear-gradient(135deg, #f4f4f4, #e0e0e0);
          overflow: hidden; 
        }
 

        .services-label {
          font-size: 12px;
          line-height: 19.92px;
          text-align: center;
          font-weight: 500;
          color: #222;
          width: 100%;
        }

        /* Full-Screen Modal Styling */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background: #fff;
          padding: 30px;
          border-radius: 8px;
          width: 90%;
          max-width: 800px;
          position: relative;
          overflow-y: auto;
        }

        .close-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 24px;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .services-container {
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            padding: 16px;
          }

          .services-item {
            width: 80px;
            height: 110px;
          }

          .services-icon-wrapper {
            width: 72px;
            height: 72px;
          }

          .services-label {
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  )
}
