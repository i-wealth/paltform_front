'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import LoadingSpinner from './LoadingSpinner'

interface LayoutWrapperProps {
  children: React.ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('در حال بارگذاری...')
  const pathname = usePathname()

  useEffect(() => {
    // Show loading when pathname changes (page navigation)
    if (pathname) {
      setIsLoading(true)
      setLoadingMessage('در حال بارگذاری صفحه...')
      
      // Hide loading after a short delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 800)

      return () => clearTimeout(timer)
    }
  }, [pathname])

  return (
    <>
      <LoadingSpinner 
        isLoading={isLoading} 
        message={loadingMessage}
        showLogo={true}
      />
      {children}
    </>
  )
} 