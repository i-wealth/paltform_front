'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function OtpPage() {
  const router = useRouter()

  const [step, setStep] = useState<'otp' | 'loading'>('otp')
  const [otp, setOtp] = useState('')
  const [timer, setTimer] = useState(60)
  const [phone] = useState('09123456789') // شماره نمونه برای نمایش

  useEffect(() => {
    if (step === 'otp' && timer > 0) {
      const t = setTimeout(() => setTimer((prev) => prev - 1), 1000)
      return () => clearTimeout(t)
    }
  }, [step, timer])

  useEffect(() => {
    if (step === 'loading') {
      const timeout = setTimeout(() => {
        router.push('/dashboard')
      }, 5000)
      return () => clearTimeout(timeout)
    }
  }, [step])

  const handleOtpConfirm = (e: React.FormEvent) => {
    e.preventDefault()
    if (otp === '1234') {
      setStep('loading')
    } else {
      alert('کد وارد شده اشتباه است.')
    }
  }

  return (
    <>
      {step === 'loading' && (
        <div style={styles.container}>
          <img src="/images/logo1.png" alt="لوگو" style={styles.logo} />
          <div style={styles.barContainer}>
            <div style={styles.bar}></div>
          </div>
          <p style={styles.text}>در حال ورود به حساب...</p>
        </div>
      )}

      {step === 'otp' && (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
          <style>{loaderStyles}</style>
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
            <form onSubmit={handleOtpConfirm} className="space-y-4">
              <h3 className="text-center font-semibold">کد ارسال‌شده به شماره:</h3>
              <div className="bg-gray-100 p-3 rounded-md text-center text-gray-700">
                {phone}
              </div>
              <input
                type="text"
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="text-center text-xl tracking-widest w-full border-b-2 border-blue-500 focus:outline-none"
                placeholder="----"
                required
              />
              <p className="text-xs text-gray-500 text-center">
                {timer > 0
                  ? `۰:${timer < 10 ? `0${timer}` : timer} تا ارسال مجدد`
                  : 'ارسال مجدد فعال شد'}
              </p>
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md"
              >
                تأیید کد و ورود
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'fixed',
    inset: 0,
    backgroundColor: '#ffffff',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '180px',
    height: '180px',
    animation: 'pulse 1.5s infinite',
  },
  barContainer: {
    width: '160px',
    height: '6px',
    marginTop: '24px',
    backgroundColor: '#bfdbfe',
    borderRadius: '9999px',
    overflow: 'hidden',
  },
  bar: {
    width: '64px',
    height: '100%',
    backgroundColor: '#2563eb',
    animation: 'loaderBar 1.5s infinite linear',
  },
  text: {
    marginTop: '16px',
    fontSize: '14px',
    color: '#6b7280',
  },
}

const loaderStyles = `
  @keyframes loaderBar {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(250%); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`
