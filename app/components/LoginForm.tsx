'use client'

import { useState } from 'react'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
          ایمیل
        </label>
        <input
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        ورود
      </button>

      <p className="text-center text-sm text-gray-500 mt-4">
        حساب کاربری ندارید؟{' '}
        <a href="#" className="text-blue-600 hover:underline font-medium">
          ثبت‌نام کنید
        </a>
      </p>
    </form>
  )
}
