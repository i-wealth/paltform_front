'use client'

import { useRouter } from 'next/navigation'
import { useState, FormEvent } from 'react'
import { registerUser, RegisterRequest } from '../lib/api/auth'
import React from 'react';
import { emptyWallet } from '../lib/api/wallet';
import { TimeScale } from 'chart.js';

export default function LoginForm() {

  const router = useRouter()
  const handleClick = (route: string): void => {
    router.push(route);
  };

  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)



  const handleSubmit = async (e: FormEvent) => {

    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)


    const payload: RegisterRequest = { mobile, password }

    try {
      const res= await registerUser(payload);

      try {
        const usrID = res ? res.id : "0";
        [
          { cat: "crypto", name: 'btc' }, { cat: "crypto", name: 'eth' }, { cat: "crypto", name: 'sol' }, { cat: "crypto", name: 'usdt' },
          { cat: "gold", name: 'abshodeh' }, { cat: "gold", name: 'sekke' }, { cat: "gold", name: 'kian' }, { cat: "fiat", name: 'toman' }
        ].map(async (itm) => {
          await emptyWallet({
            userId: usrID,
            category: itm.cat,
            assetName: itm.name,
          });
        })
      } catch (error) {
        console.error('خطا در ایجاد کردن کیف‌پول:', error);
      }
      if (typeof window !== 'undefined') {
      localStorage.removeItem('userProfile');
      }
      setSuccess("ثبت نام موفقیت آمیز بود")
      const timer = setTimeout(() => {
        // کدی که می‌خواهید بعد از 5 ثانیه اجرا شود
        router.push("login");
      }, 2000); // 5000 میلی‌ثانیه برابر 5 ثانیه است
  
      // این تابع برای پاکسازی تایمر وقتی کامپوننت unmount می‌شود، استفاده می‌شود
      return () => clearTimeout(timer);
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }


  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
          شماره موبایل
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
          placeholder="09128039280"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
          رمز عبور
        </label>
        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>


      <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
        {loading ? 'در حال ارسال...' : 'ثبت‌نام'}
      </button>
      {error && <p style={{ color: 'red' }}>خطا: {error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <p className="text-center text-sm text-gray-500 mt-4">
        حساب کاربری دارید؟{' '}
        <a href="#" className="text-blue-600 hover:underline font-medium" onClick={() => handleClick("/login")}>
          وارد شوید
        </a>
      </p>
    </form>
  )
}
