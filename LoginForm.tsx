'use client'

import { useRouter } from 'next/navigation'
import { useState, FormEvent } from 'react'
import { loginUser, LoginRequest } from '../lib/api/auth'
import { fetchUserProfileLevel1 } from '../lib/api/userProfile'
import React from 'react';

export default function LoginForm() {

  const router = useRouter()
  const handleClick = (route: string): void => {
    router.push(route);
  };

  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await loginUser({ mobile, password } as LoginRequest)
      setToken(res.accessToken)
      fetchUserProfileLevel1(res.accessToken)
        .then((data) => {
          if (data !== null) {
            if (typeof window !== 'undefined') {
              localStorage.removeItem('userProfile');
              localStorage.setItem('userProfile', JSON.stringify(data));
              const timer = setTimeout(() => {
                // کدی که می‌خواهید بعد از 5 ثانیه اجرا شود
                router.push("/dashboard");
              }, 2000);
            }
          } else {
            if (typeof window !== 'undefined') {
              const raw = localStorage.getItem('userProfile')
              if (!raw) {
                router.push("/VerifyPage");
              }
            }
          }
        })
        .catch((e: Error) => {
          setError(e.message)
        })

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

      <div className="flex justify-between items-center text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="form-checkbox" />
          <span className="text-gray-600">مرا به خاطر بسپار</span>
        </label>
        <a href="#" className="text-blue-500 hover:underline">
          فراموشی رمز عبور؟
        </a>
      </div>

      <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        {loading ? 'در حال ارسال...' : 'ورود'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {token && <p> ورود موفقیت آمیز بود </p>}

      <p className="text-center text-sm text-gray-500 mt-4">
        حساب کاربری ندارید؟{' '}
        <a href="#" className="text-blue-600 hover:underline font-medium" onClick={() => handleClick("/register")}>
          ثبت‌نام کنید
        </a>
      </p>
    </form>
  )
}
