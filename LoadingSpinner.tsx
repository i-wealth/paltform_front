'use client'

import { useEffect, useState } from 'react'

interface LoadingSpinnerProps {
  isLoading?: boolean
  message?: string
  duration?: number
  showLogo?: boolean
}

export default function LoadingSpinner({ 
  isLoading = true, 
  message = "در حال بارگذاری...",
  duration,
  showLogo = true
}: LoadingSpinnerProps) {
  const [shouldShow, setShouldShow] = useState(isLoading)

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setShouldShow(false)
      }, duration)

      return () => clearTimeout(timer)
    } else {
      setShouldShow(isLoading)
    }
  }, [isLoading, duration])

  if (!shouldShow) return null

  return (
    <div style={styles.container}>
      {showLogo && (
        <img
          src="/images/logo1.png"
          alt="لوگوی لودینگ"
          style={styles.logo}
        />
      )}
      <div style={styles.barContainer}>
        <div style={styles.bar}></div>
      </div>
      <p style={styles.text}>{message}</p>
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
    width: '200px',
    height: '200px',
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

// Add styles to document head
if (typeof window !== 'undefined') {
  const existingStyle = document.getElementById('loading-spinner-styles')
  if (!existingStyle) {
    const styleTag = document.createElement('style')
    styleTag.id = 'loading-spinner-styles'
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
} 