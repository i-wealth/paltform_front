'use client'

import { useState } from 'react'

const bankAccounts = ['کارت ملت 6037', 'کارت سامان 6219']

const assets = {
  طلا: ['طلای آبشده', 'سکه', 'صندوق طلا'],
  ارزدیجیتال: ['تتر', 'بیت کوین', 'سولانو', 'اتریوم', 'ریپل'],
  مسکن: ['توکن اجاره', 'توکن خرید', 'توکن هتل'],
}

function formatAmount(input: string) {
  const parts = input.replace(/[^0-9٫.]/g, '').replace(/٫/g, '.').split('.')
  const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const decimalPart = parts[1] ? '.' + parts[1].slice(0, 2) : ''
  return intPart + decimalPart
}

export default function DepositWithdraw() {
  const [mode, setMode] = useState<'خرید' | 'فروش'>('خرید')
  const [method, setMethod] = useState<' ' | 'خرید دارایی '>('درگاه پرداخت')
  const [amount, setAmount] = useState('')
  const [selectedCard, setSelectedCard] = useState(bankAccounts[0])
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof assets | ''>('')
  const [selectedAsset, setSelectedAsset] = useState('')
  const [useFullBalance, setUseFullBalance] = useState(false)
  const [assetAmount, setAssetAmount] = useState('')

  return (
    <div className="p-6 space-y-6" dir="rtl">
      {/* اطلاعات موجودی */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow">
        <div className="text-center">
          <div className="text-sm text-gray-500">قیمت کل پورتفولیو</div>
          <div className="text-xl font-bold">7,460,000 تومان</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">موجودی ارزدیجیتال</div>
          <div className="text-xl font-bold">4/360/000 تومان</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">موجودی طلا</div>
          <div className="text-xl font-bold">3/100/000 گرم</div>
        </div>
      </div>

      {/* تب‌بندی خرید/فروش */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <div className="flex border-b flex-wrap sm:flex-nowrap">
          {['فروش', 'خرید'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setMode(tab as any)
                setMethod('درگاه پرداخت')
              }}
              className={`px-4 py-2 font-semibold w-full sm:w-auto ${
                mode === tab ? 'border-b-2 border-yellow-400 text-black' : 'text-gray-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* روش پرداخت (فقط در حالت واریز) */}
        {mode === 'مبلغ ' && (
          <div className="flex gap-2 bg-gray-100 rounded-md p-1 w-full sm:w-[432px]">
            {[' خرید', 'فروش '].map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m as any)}
                className={`flex-1 text-sm py-2 rounded-md ${
                  method === m ? 'bg-white text-black shadow' : 'text-gray-500'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        )}

        {/* انتخاب کارت بانکی */}
        {(mode === 'فروش دارایی' || method === 'فروش دارایی ') && (
          <div className="space-y-2 w-full sm:w-[432px]">
            <label className="block text-sm font-medium">انتخاب کارت بانکی</label>
            <select
              className="w-full border rounded-[6px] p-2 focus:outline-none"
              value={selectedCard}
              onChange={(e) => setSelectedCard(e.target.value)}
            >
              {bankAccounts.map((card) => (
                <option key={card} value={card}>
                  {card}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* فرم مبلغ */}
        <div className="space-y-2 w-full sm:w-[432px]">
          <label className="block text-sm font-medium">مبلغ</label>
          <div
            className="relative border rounded-[6px] flex items-center h-14 px-3"
            style={{
              height: 56,
              border: '1px solid #D1D5DB',
              boxSizing: 'border-box',
            }}
          >
            <input
              type="text"
              placeholder="مبلغ"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-transparent text-right text-base font-semibold text-gray-800 outline-none"
              style={{
                fontFamily: 'modam, modam Fallback',
                fontSize: 18,
                lineHeight: '24px',
              }}
            />
            <div
              style={{
                width: 2,
                height: 32,
                backgroundColor: '#D1D5DB',
                borderRadius: 999,
                marginInline: 8,
              }}
            />
            <span
              className="text-gray-800 font-bold text-sm"
              style={{ whiteSpace: 'nowrap' }}
            >
              تومان
            </span>
          </div>
          <div className="text-gray-600 text-sm mt-1">مقدار وارد شده: {formatAmount(amount)} تومان</div>
        </div>

        {/* مگا منوی انتخاب دارایی */}
        <div className="w-full sm:w-[432px] space-y-3">
          <label className="block text-sm font-semibold">انتخاب دارایی</label>
          <div className="flex gap-2 flex-wrap">
            {Object.keys(assets).map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category as keyof typeof assets)
                  setSelectedAsset('')
                }}
                className={`px-3 py-1 rounded-full border text-sm transition ${
                  selectedCategory === category ? 'bg-yellow-400 text-white font-bold' : ''
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {selectedCategory && (
            <div className="flex gap-2 flex-wrap">
              {assets[selectedCategory].map((item) => (
                <button
                  key={item}
                  onClick={() => setSelectedAsset(item)}
                  className={`px-3 py-1 rounded-full border text-sm transition ${
                    selectedAsset === item ? 'bg-gray-800 text-white font-bold' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {selectedAsset && (
          <div className="w-full sm:w-[432px] mt-4 space-y-2">
            <label className="block text-sm font-medium">مقدار {selectedAsset}</label>
            <div className="flex items-center gap-4">
              <label className="text-sm flex items-center gap-2">
                <input
                  type="radio"
                  checked={useFullBalance}
                  onChange={() => setUseFullBalance(true)}
                />
                تمام موجودی
              </label>
              <label className="text-sm flex items-center gap-2">
                <input
                  type="radio"
                  checked={!useFullBalance}
                  onChange={() => setUseFullBalance(false)}
                />
                مقدار سفارشی (به تومان)
              </label>
            </div>

            {!useFullBalance && (
              <input
                type="text"
                value={assetAmount}
                onChange={(e) => setAssetAmount(formatAmount(e.target.value))}
                placeholder="مثلاً ۱,۰۰۰,۰۰۰"
                className="w-full p-3 border rounded-lg text-right font-semibold text-gray-700"
              />
            )}
          </div>
        )}

        {/* دکمه نهایی */}
        {(method === 'درگاه پرداخت' || mode === 'انجام عملیات') && (
          <div className="w-full sm:w-[432px] h-[48px] mt-2">
            <button
              className="w-full h-full bg-yellow-400 text-white font-bold rounded-[6px] flex items-center justify-center hover:opacity-90 transition-opacity"
              style={{
                fontFamily: 'modam, modam Fallback',
                fontSize: 16,
                lineHeight: '24px',
              }}
            >
              {mode === 'خرید' ? 'خرید' : 'فروش'}
            </button>
          </div>
        )}
      </div>

      {/* هشدار */}
      <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md text-sm leading-6">
        <strong>توجه:</strong> واریز ریال فقط از حساب بانکی به نام خودتان امکان‌پذیر است...
      </div>

      {/* لیست تراکنش‌ها */}
      <div className="mt-6">
        <h3 className="font-bold mb-2">لیست تراکنش‌های اخیر</h3>
        <div className="flex gap-2 flex-wrap mb-4">
          {['واریز', 'واریز مستقیم', 'برداشت', 'تبدیل به دارایی دیگر'].map((f) => (
            <button
              key={f}
              className="px-3 py-1 rounded-full border text-sm hover:bg-yellow-100"
            >
              {f}
            </button>
          ))}
        </div>
        <div className="text-center text-gray-400 mt-12">
          <img src="/images/empty-box.png" alt="empty" className="mx-auto w-20 mb-4" />
          <p>تراکنشی یافت نشد</p>
        </div>
      </div>
    </div>
  )
}
