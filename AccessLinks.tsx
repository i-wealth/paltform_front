// app/components/AccessLinks.tsx

'use client'

import { useRouter } from 'next/navigation'

export default function AccessLinks() {
  const router = useRouter()

  const handleRedirect = (path: string) => {
    // ذخیره کردن مسیر مقصد در localStorage
    //localStorage.setItem('redirectAfterLogin', path)
    router.push('/login')  // هدایت به صفحه ورود
  }

  return (
    <div className="space-y-4 p-6">
      <button onClick={() => handleRedirect('/gold-purchase')} className="text-blue-600 underline">
        خرید طلای آبشده
      </button>
      <button onClick={() => handleRedirect('/liquidity-management')} className="text-blue-600 underline">
        مدیریت نقدینگی
      </button>
      <button onClick={() => handleRedirect('/asset-management')} className="text-blue-600 underline">
        مدیریت دارایی
      </button>
      <button onClick={() => handleRedirect('/wallet')} className="text-blue-600 underline">
        کیف پول
      </button>
      <button onClick={() => handleRedirect('/login')} className="text-blue-600 underline">
        ورود به حساب
      </button>
    </div>
  )
}
