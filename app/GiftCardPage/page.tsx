'use client'

import { useState, useEffect } from 'react'

export default function GiftCardPage() {
  // حالت‌های اصلی
  const [activeTab, setActiveTab] = useState<'gold' | 'tether'>('gold')
  const [actionType, setActionType] = useState<'transfer' | 'receive' | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [verificationCode, setVerificationCode] = useState('')
  const [timer, setTimer] = useState(60)
  const [isTimerActive, setIsTimerActive] = useState(false)

  // اطلاعات کاربر
  const [phoneNumber, setPhoneNumber] = useState('')
  const [nationalId, setNationalId] = useState('')
  const [amount, setAmount] = useState('')
  const [formError, setFormError] = useState('')

  // نرخ تبدیل جدید
  const exchangeRates = {
    gold: 10800000, // هر گرم طلا = 10,800,000 تومان
    tether: 110000  // هر تتر = 110,000 تومان
  }

  // داده‌های نمونه
  const userData = {
    name: "امید ملکی",
    goldBalance: {
      total: "32 گرم",
      totalEquivalent: "345,600,000 تومان",
      available: "17 گرم", 
      availableEquivalent: "183,600,000 تومان"
    },
    tetherBalance: {
      total: "150 تتر",
      totalEquivalent: "16,500,000 تومان",
      available: "85 تتر",
      availableEquivalent: "9,350,000 تومان"
    }
  }

  // تایمر
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    } else if (timer === 0) {
      setIsTimerActive(false)
    }
    return () => clearInterval(interval)
  }, [isTimerActive, timer])

  // باز کردن مودال
  const openModal = (type: 'transfer' | 'receive') => {
    setActionType(type)
    setCurrentStep(1)
    setIsModalOpen(true)
    setVerificationCode('')
    setPhoneNumber('')
    setNationalId('')
    setAmount('')
    setFormError('')
  }

  // بستن مودال
  const closeModal = () => {
    setIsModalOpen(false)
    setActionType(null)
    setCurrentStep(1)
    setIsTimerActive(false)
    setTimer(60)
  }

  // بررسی فرم
  const validateForm = () => {
    if (!phoneNumber || !nationalId || !amount) {
      setFormError('لطفاً تمامی فیلدها را پر کنید')
      return false
    }
    if (phoneNumber.length !== 11) {
      setFormError('شماره تلفن باید 11 رقم باشد')
      return false
    }
    if (nationalId.length !== 10) {
      setFormError('کد ملی باید 10 رقم باشد')
      return false
    }
    return true
  }

  // ارسال کد تایید
  const sendVerificationCode = () => {
    if (!validateForm()) return
    
    setCurrentStep(2)
    setIsTimerActive(true)
    setTimer(60)
  }

  // تایید تراکنش
  const confirmTransaction = () => {
    if (verificationCode.length !== 6) {
      setFormError('کد تایید باید 6 رقم باشد')
      return
    }
    setCurrentStep(3)
  }

  // ارسال مجدد کد
  const resendCode = () => {
    setIsTimerActive(true)
    setTimer(60)
    setVerificationCode('')
  }

  // محاسبه معادل
  const calculateEquivalent = () => {
    if (!amount) return { assetAmount: 0, formatted: '' }
    
    const numericAmount = parseInt(amount.replace(/,/g, '')) || 0
    if (activeTab === 'gold') {
      const goldAmount = (numericAmount / exchangeRates.gold).toFixed(4)
      return {
        assetAmount: parseFloat(goldAmount),
        formatted: `${formatNumber(parseFloat(goldAmount))} گرم طلا`
      }
    } else {
      const tetherAmount = (numericAmount / exchangeRates.tether).toFixed(4)
      return {
        assetAmount: parseFloat(tetherAmount),
        formatted: `${formatNumber(parseFloat(tetherAmount))} تتر`
      }
    }
  }

  // فرمت عدد
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  // دریافت اطلاعات دارایی بر اساس تب فعال
  const getCurrentBalance = () => {
    return activeTab === 'gold' ? userData.goldBalance : userData.tetherBalance
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-4">
      {/* هدر اطلاعات کاربر */}
      <div className="max-w-md mx-auto mb-6">
        <div className="bg-gradient-to-r from-[#1E293B] to-[#334155] rounded-3xl p-6 shadow-2xl border border-gray-700 text-white">
          {/* نام کاربر و وضعیت */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-lg font-semibold text-gray-300">سلام 👋</h1>
              <h2 className="text-xl font-bold mt-1">{userData.name}</h2>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold"></span>
            </div>
          </div>

        {/* موجودی کل */}
<div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-2xl p-4 border border-gray-600 mb-4">
  <div className="text-gray-400 text-sm mb-1">موجودی کل</div>
  <div className="flex items-baseline gap-2">
    <div className="text-2xl font-bold">{getCurrentBalance().total.split(' ')[0]}</div>
    <div className="text-gray-400 text-sm">
      {activeTab === 'gold' ? 'گرم' : 'دلار'}
    </div>
  </div>
  <div className="text-gray-500 text-xs mt-2">{getCurrentBalance().totalEquivalent}</div>
</div>
          {/* موجودی قابل برداشت */}
          <div className="flex justify-between items-center">
            <div>
              <div className="text-gray-400 text-sm">موجودی قابل برداشت</div>
              <div className="text-green-400 font-semibold">{getCurrentBalance().available}</div>
            </div>
            <div className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-full">
              <div className={`w-2 h-2 ${activeTab === 'gold' ? 'bg-yellow-400' : 'bg-green-400'} rounded-full`}></div>
              <span className="text-sm text-gray-300">
                {activeTab === 'gold' ? 'طلا' : 'تتر'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* بخش اصلی انتقال */}
      <div className="max-w-md mx-auto">
        <div className="bg-gradient-to-r from-[#1E293B] to-[#334155] rounded-3xl p-6 shadow-2xl border border-gray-700">
          {/* تب‌های طلا و تتر */}
          <div className="flex gap-3 mb-6 bg-gray-700 p-1 rounded-2xl">
            <button
              onClick={() => setActiveTab('gold')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'gold' 
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              🪙 طلا
            </button>
            <button
              onClick={() => setActiveTab('tether')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'tether' 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              💰 تتر
            </button>
          </div>

          {/* دکمه‌های اقدام */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* دریافت */}
            <button
              onClick={() => openModal('receive')}
              className="bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 rounded-2xl p-4 text-center hover:from-gray-600 hover:to-gray-700 transition-all duration-200 group"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                <span className="text-xl">📥</span>
              </div>
              <h3 className="text-white font-semibold mb-1">دریافت</h3>
              <p className="text-gray-400 text-xs">
                دریافت {activeTab === 'gold' ? 'طلا' : 'تتر'}
              </p>
            </button>

            {/* انتقال */}
            <button
              onClick={() => openModal('transfer')}
              className="bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 rounded-2xl p-4 text-center hover:from-gray-600 hover:to-gray-700 transition-all duration-200 group"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                <span className="text-xl">📤</span>
              </div>
              <h3 className="text-white font-semibold mb-1">انتقال</h3>
              <p className="text-gray-400 text-xs">
                انتقال {activeTab === 'gold' ? 'طلا' : 'تتر'}
              </p>
            </button>
          </div>

          {/* ورود دستی مبلغ */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 border border-gray-600">
            <h4 className="text-white font-medium mb-3 text-center">مبلغ مورد نظر (تومان)</h4>
            <input
              type="text"
              placeholder="مبلغ را وارد کنید"
              className="w-full p-4 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-200 text-center text-lg font-bold"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
            />
            {amount && (
              <div className="text-center p-3 bg-gray-700 rounded-xl mt-3 border border-gray-600">
                <div className="text-white font-medium text-sm">
                  مبلغ {formatNumber(parseInt(amount) || 0)} تومان
                </div>
                <div className="text-green-400 text-xs mt-1">
                  معادل {calculateEquivalent().formatted}
                </div>
              </div>
            )}
            
            {/* نمایش نرخ‌ها */}
            <div className="mt-4 text-center text-xs text-gray-400 space-y-1">
              <div>هر گرم طلا: {formatNumber(exchangeRates.gold)} تومان</div>
              <div>هر تتر: {formatNumber(exchangeRates.tether)} تومان</div>
            </div>
          </div>
        </div>
      </div>

      {/* مودال */}
      {isModalOpen && actionType && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-[#1E293B] to-[#334155] rounded-3xl shadow-2xl w-full max-w-md border border-gray-600">
            <div className="p-6">
              {/* مرحله 1: فرم اطلاعات */}
              {currentStep === 1 && (
                <>
                  <h3 className="text-xl font-bold text-white mb-6 text-center">
                    {actionType === 'receive' ? 'دریافت' : 'انتقال'} {activeTab === 'gold' ? 'طلا' : 'تتر'}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">شماره تلفن</label>
                      <input
                        type="tel"
                        placeholder="09xxxxxxxxx"
                        className="w-full p-4 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-200"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">کد ملی</label>
                      <input
                        type="text"
                        placeholder="کد ملی 10 رقمی"
                        className="w-full p-4 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-200"
                        value={nationalId}
                        onChange={(e) => setNationalId(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">مبلغ (تومان)</label>
                      <input
                        type="text"
                        placeholder="مبلغ را وارد کنید"
                        className="w-full p-4 bg-gray-600 border border-gray-500 rounded-xl text-white placeholder-gray-400 text-center text-lg font-bold"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
                      />
                    </div>
                    {amount && (
                      <div className="text-center p-3 bg-gray-700 rounded-xl border border-gray-600">
                        <div className="text-white font-medium text-sm">
                          مبلغ {formatNumber(parseInt(amount) || 0)} تومان
                        </div>
                        <div className="text-green-400 text-xs mt-1">
                          معادل {calculateEquivalent().formatted}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {formError && (
                    <div className="bg-red-500/20 border border-red-500 rounded-xl p-3 mt-4">
                      <p className="text-red-400 text-sm text-center">{formError}</p>
                    </div>
                  )}

                  <button
                    onClick={sendVerificationCode}
                    className="w-full py-4 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 font-semibold mt-6 shadow-lg"
                  >
                    ارسال کد تایید
                  </button>
                </>
              )}

              {/* مرحله 2: کد تایید */}
              {currentStep === 2 && (
                <>
                  <h3 className="text-xl font-bold text-white mb-6 text-center">تایید تراکنش</h3>
                  
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🔒</span>
                    </div>
                    <div className="text-green-400 text-sm font-semibold mb-2">
                      کد تایید ارسال شد
                    </div>
                    <div className="text-white text-lg font-bold mb-1">
                      {formatNumber(parseInt(amount) || 0)} تومان
                    </div>
                    <div className="text-blue-400 text-xs">
                      معادل {calculateEquivalent().formatted}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="_ _ _ _ _ _"
                      maxLength={6}
                      className="w-full p-4 bg-gray-700 border border-gray-600 rounded-xl text-center text-2xl font-bold tracking-widest text-white focus:outline-none focus:border-blue-500 transition-all duration-200"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                    />
                    
                    <div className="text-center">
                      {isTimerActive ? (
                        <div className="text-orange-400 text-sm">
                          {timer} ثانیه تا ارسال مجدد
                        </div>
                      ) : (
                        <button
                          onClick={resendCode}
                          className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                        >
                          ارسال مجدد کد
                        </button>
                      )}
                    </div>
                  </div>

                  {formError && (
                    <div className="bg-red-500/20 border border-red-500 rounded-xl p-3 mt-4">
                      <p className="text-red-400 text-sm text-center">{formError}</p>
                    </div>
                  )}

                  <button
                    onClick={confirmTransaction}
                    disabled={verificationCode.length !== 6}
                    className={`w-full py-4 px-4 rounded-xl font-semibold mt-6 transition-all duration-200 shadow-lg ${
                      verificationCode.length !== 6
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                    }`}
                  >
                    تایید تراکنش
                  </button>
                </>
              )}

              {/* مرحله 3: رسید نهایی */}
              {currentStep === 3 && (
                <>
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-green-500/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">✅</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">تراکنش موفق</h3>
                    <p className="text-gray-300 text-sm">
                      تراکنش شما با موفقیت انجام شد
                    </p>
                  </div>

                  <div className="bg-gray-700 rounded-2xl p-4 mb-6 border border-gray-600">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-300 text-sm">شماره پیگیری</span>
                      <span className="font-bold text-white text-sm">0120034399434</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-300 text-sm">مقدار</span>
                      <span className="font-bold text-green-400 text-sm">{formatNumber(parseInt(amount) || 0)} تومان</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-300 text-sm">معادل</span>
                      <span className="font-bold text-white text-sm">{calculateEquivalent().formatted}</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-300 text-sm">تاریخ</span>
                      <span className="font-bold text-white text-sm">24 مهر 1404</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">شماره کارت</span>
                      <span className="font-bold text-white text-sm">•••• 8237</span>
                    </div>
                  </div>

                  {actionType === 'transfer' && (
                    <div className="text-center mb-6">
                      <div className="bg-gray-700 border-2 border-dashed border-gray-600 rounded-2xl p-4 inline-block">
                        <div className="w-32 h-32 bg-gray-600 rounded-lg flex items-center justify-center mx-auto">
                          <span className="text-gray-400 text-xs">QR Code</span>
                        </div>
                        <div className="text-xs text-gray-300 mt-2">QR Code برای انتقال</div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={closeModal}
                    className="w-full py-4 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 font-semibold shadow-lg"
                  >
                    بازگشت به صفحه اصلی
                  </button>
                </>
              )}

              {(currentStep === 1 || currentStep === 2) && (
                <button
                  onClick={closeModal}
                  className="w-full py-3 px-4 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all duration-200 font-medium mt-3"
                >
                  انصراف
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}