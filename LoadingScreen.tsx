'use client'

import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div style={styles.container}>
      <img
        src="/images/unicorn-logo.png" // مطمئن شو که فایل unicorn-logo.png در public/images هست
        alt="لوگوی لودینگ"
        style={styles.logo}
      />
      <div style={styles.barContainer}>
        <div style={styles.bar}></div>
      </div>
      <p style={styles.text}>در حال بارگذاری...</p>
    </div>
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
    width: '120px',
    height: '120px',
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

// قرار دادن keyframes درون <style> تگ به صورت global
if (typeof window !== 'undefined') {
  const styleTag = document.createElement('style')
  styleTag.innerHTML = `
    @keyframes loaderBar {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(250%); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `
  document.head.appendChild(styleTag)
}
