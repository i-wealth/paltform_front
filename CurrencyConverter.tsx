'use client'

import { useState } from 'react'

export default function CurrencyConverter() {
  const [income, setIncome] = useState<number | ''>('')
  const [mode, setMode] = useState<'gold' | 'tether' | null>(null)
  const [converted, setConverted] = useState<number | null>(null)
  const [approved, setApproved] = useState<boolean>(false)

  const goldPrice = 7400000  // قیمت هر گرم طلا
  const tetherPrice = 99650  // قیمت هر تتر

  const handleConvert = () => {
    if (!income || !mode) return
    const amount = Number(income)
    const result = mode === 'gold' ? amount / goldPrice : amount / tetherPrice
    setConverted(Number(result.toFixed(4)))
    setApproved(false) // ریست مجوز در تبدیل جدید
  }

  const handleApprove = () => {
    // اینجا میشه اتصال به API یا ذخیره مجوز در backend
    setApproved(true)
    alert('✅ مجوز شما با موفقیت ثبت شد. عملیات به‌زودی انجام خواهد شد.')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-blue-700">تبدیل درآمد به طلا یا تتر</h2>

        {/* وارد کردن درآمد */}
        <div>
          <label className="block font-semibold mb-1">درآمد ماهانه (تومان)</label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full border px-4 py-2 rounded"
            placeholder="مثال: 5000000"
          />
        </div>

        {/* انتخاب نوع تبدیل */}
        <div>
          <label className="block font-semibold mb-2">می‌خواهید درآمدتان به چه چیزی تبدیل شود؟</label>
          <div className="flex gap-4">
            <button
              onClick={() => setMode('gold')}
              className={`flex-1 p-2 rounded border ${mode === 'gold' ? 'bg-yellow-400 text-white' : 'bg-gray-100'}`}
            >
              طلا
            </button>
            <button
              onClick={() => setMode('tether')}
              className={`flex-1 p-2 rounded border ${mode === 'tether' ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
            >
              تتر
            </button>
          </div>
        </div>

        <button
          onClick={handleConvert}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={!income || !mode}
        >
          تبدیل کن
        </button>

        {/* نمایش نتیجه */}
        {converted !== null && (
          <div className="bg-gray-50 border rounded p-4 text-center">
            <p className="text-sm text-gray-600">مقدار معادل:</p>
            <p className="text-xl font-bold text-blue-700 mt-1">
              {converted} {mode === 'gold' ? 'گرم طلا' : 'تتر'}
            </p>

            {/* تأیید تبدیل */}
            {!approved ? (
              <div className="mt-6">
                <p className="mb-2 text-sm text-gray-700">
                  آیا مایلید پلتفرم این تبدیل را به صورت خودکار برای شما انجام دهد؟
                </p>
                <button
                  onClick={handleApprove}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  ثبت مجوز تبدیل
                </button>
              </div>
            ) : (
              <p className="mt-4 text-green-700 font-semibold">
                ✅ مجوز ثبت شد. عملیات تبدیل به زودی انجام می‌شود.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
