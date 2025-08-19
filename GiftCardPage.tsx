'use client'

import { useState } from 'react'
import { buyGiftCard, BuyGiftCardPayload, GiftCardResponse } from '../lib/api/giftcard'

interface PriceMap {
  [key: number]: number;
}

export default function GiftCardPage() {
  const [selectedGold, setSelectedGold] = useState<number | null>(null)
  const [selectedTether, setSelectedTether] = useState<number | null>(null)
  const [isPaying, setIsPaying] = useState(false)
  const [serialNumber, setSerialNumber] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<'gold' | 'usdt' | 'activation' | 'giftCard' | null>(null) // افزودن حالت 'giftCard'
  const [serialActivationNumber, setSerialActivationNumber] = useState('') // شماره سریال فعال سازی
  const [result, setResult] = useState<GiftCardResponse | null>(null)
  const [error, setError] = useState<string | null>(null)


  const handleBuy = async (amnt: number, type: string) => {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('userProfile');
      if (raw !== null) {
        const prof = JSON.parse(raw);
        const payload: BuyGiftCardPayload = {
          userId: prof.userId,
          amount: amnt,
          type: type,
        }

        try {
          const res = await buyGiftCard(payload)
          setResult(res)
          setError(null)
        } catch (err: any) {
          setError(err.response?.data?.message || err.message)
        }
        finally {
          closeModal()
        }
      }
    }
  }


  // فرم اطلاعات برای خرید کارت هدیه
  const [phoneNumber, setPhoneNumber] = useState('')
  const [nationalId, setNationalId] = useState('')
  const [giftCardAmount, setGiftCardAmount] = useState('')
  const [formError, setFormError] = useState('')

  // قیمت‌های طلا (بر اساس هر واحد)
  const goldPrices: PriceMap = {
    250: 1975000,   // 250 سوت
    500: 3750000,   // 500 سوت
    1000: 7500000,     // 1 گرم
    2000: 15000000,    // 2 گرم
    5000: 37500000,    // 5 گرم
  }

  // قیمت‌های تتر (بر اساس هر واحد)
  const tetherPrices: PriceMap = {
    30: 2520000,    // 30 تتر
    50: 4200000,    // 50 تتر
    100: 8400000,   // 100 تتر
    200: 17800000,  // 200 تتر
  }

  // محاسبه قیمت بر اساس انتخاب کاربر
  const calculatePrice = (selected: number | null, type: 'gold' | 'usdt') => {
    if (selected === null) return 0
    return type === 'gold' ? goldPrices[selected] : tetherPrices[selected]
  }

  // مرحله پرداخت
  const handlePayment = () => {
    if (!phoneNumber || !nationalId || !giftCardAmount) {
      setFormError('لطفاً تمامی فیلدها را پر کنید')
      return
    }

    setIsPaying(true)
    setTimeout(() => {
      // ایجاد یک سریال نامبر تصادفی برای کاربر پس از پرداخت
      const randomSerial = Math.random().toString(36).substring(2, 10).toUpperCase()
      setSerialNumber(randomSerial)
    }, 2000) // مدت زمان شبیه‌سازی پرداخت (مثلاً 2 ثانیه)
  }

  // باز کردن مودال برای انتخاب مقدار یا فعال‌سازی
  const openModal = (product: 'gold' | 'usdt' | 'activation' | 'giftCard') => {
    setCurrentProduct(product)
    setIsModalOpen(true)
  }

  // بستن مودال
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedGold(null)
    setSelectedTether(null)
    setSerialActivationNumber('') // پاک کردن شماره سریال
    setPhoneNumber('')
    setNationalId('')
    setGiftCardAmount('')
    setFormError('')
  }

  // ثبت خرید کارت هدیه
  const handleGiftCardPurchase = () => {
    if (!phoneNumber || !nationalId || !giftCardAmount) {
      setFormError('لطفاً شماره تلفن، کد ملی و مبلغ کارت هدیه را وارد کنید.')
      return
    }

    // شبیه‌سازی خرید کارت هدیه
    setTimeout(() => {
      const successMessage = `کارت هدیه به مبلغ ${giftCardAmount} تومان برای شما با موفقیت خریداری شد.`
      alert(successMessage)
      closeModal() // بستن مودال پس از خرید
    }, 2000)
  }

  // فعال‌سازی کارت هدیه
  const handleActivateCard = () => {
    if (!serialActivationNumber || !phoneNumber || !nationalId) {
      setFormError('لطفاً شماره سریال، شماره تلفن و کد ملی خود را وارد کنید.')
      return
    }

    // شبیه‌سازی فعال‌سازی کارت
    setTimeout(() => {
      const activationSuccessMessage = `کارت با شماره سریال ${serialActivationNumber} با موفقیت فعال شد.`
      alert(activationSuccessMessage)
      closeModal() // بستن مودال پس از فعال‌سازی
    }, 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200" style={{ fontFamily: "Sans" }}>
      <div className="container mx-auto p-4 flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0">

        {/* بخش کارت هدیه طلا */}
        <div className="w-full lg:w-1/2 p-6 bg-white bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg text-white">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative w-full h-64">
              <img
                src="/images/goldgift1.gif"
                alt="کارت هدیه طلا"
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-800">کارت هدیه طلا</h3>
            <p className="text-right text-sm text-gray-700">
              خرید و استفاده آسان با طلا، سریع و امن.
            </p>

            {/* انتخاب مبلغ برای کارت هدیه طلا */}
            <div className="flex gap-4">
              {Object.keys(goldPrices).map((key) => (
                <button
                  key={key}
                  onClick={() => setGiftCardAmount(goldPrices[parseInt(key)] + ' تومان')}
                  className="bg-white text-blue-600 py-2 px-4 rounded-lg border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition"
                >
                  {key} سوت
                </button>
              ))}
            </div>

            <button
              onClick={() => openModal('giftCard')}
              className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition"
            >
              خرید کارت هدیه
            </button>
            <button
              onClick={() => openModal('activation')}
              className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition"
            >
              فعال سازی کارت هدیه
            </button>
          </div>
        </div>

        {/* بخش کارت هدیه تتر */}
        <div className="w-full lg:w-1/2 p-6 bg-white bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg text-white">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative w-full h-64">
              <img
                src="/images/coingift1.jpg"
                alt="کارت هدیه تتر"
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-800">کارت هدیه تتر</h3>
            <p className="text-right text-sm text-gray-700">
              تجربه خرید با تتر سریع و مطمئن.
            </p>

            {/* انتخاب مبلغ برای کارت هدیه تتر */}
            <div className="flex gap-4">
              {Object.keys(tetherPrices).map((key) => (
                <button
                  key={key}
                  onClick={() => setGiftCardAmount(tetherPrices[parseInt(key)] + ' تومان')}
                  className="bg-white text-blue-600 py-2 px-4 rounded-lg border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition"
                >
                  {key} تتر
                </button>
              ))}
            </div>

            <button
              onClick={() => openModal('giftCard')}
              className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition"
            >
              خرید کارت هدیه
            </button>
            <button
              onClick={() => openModal('activation')}
              className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition"
            >
              فعال سازی کارت هدیه
            </button>
          </div>
        </div>
      </div>

      {/* مودال خرید یا فعال‌سازی کارت هدیه */}
      {isModalOpen && (currentProduct === 'giftCard' || currentProduct === 'activation') && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center w-96">
            {currentProduct === 'giftCard' ? (
              <>
                <h3 className="text-xl font-bold text-gray-800 mb-4">خرید کارت هدیه</h3>

                <input
                  type="text"
                  placeholder="شماره تلفن"
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="کد ملی"
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="مبلغ کارت هدیه"
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  value={giftCardAmount}
                  onChange={(e) => setGiftCardAmount(e.target.value)}
                />


                {formError && <p className="text-red-500 text-sm">{formError}</p>}

                <button
                  onClick={() => { void handleBuy(Number(giftCardAmount), currentProduct) }}
                  className={"bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition mt-4"}
                >
                  ثبت خرید
                </button>
                {result && (
                  <pre>{JSON.stringify(result, null, 2)}</pre>
                )}

                {error && (
                  <p style={{ color: 'red' }}>{error}</p>
                )}
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold text-gray-800 mb-4">فعال سازی کارت هدیه</h3>

                <input
                  type="text"
                  placeholder="شماره سریال کارت"
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  value={serialActivationNumber}
                  onChange={(e) => setSerialActivationNumber(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="شماره تلفن"
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="کد ملی"
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                />
                {formError && <p className="text-red-500 text-sm">{formError}</p>}

                <button
                  onClick={handleActivateCard}
                  disabled={!serialActivationNumber || !phoneNumber || !nationalId}
                  className={`bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition mt-4 ${!serialActivationNumber || !phoneNumber || !nationalId ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                  فعال سازی کارت
                </button>
              </>
            )}

            <button
              onClick={closeModal}
              className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 transition mt-4"
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
