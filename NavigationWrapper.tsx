'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import LoadingSpinner from './LoadingSpinner'

interface NavigationWrapperProps {
  children: React.ReactNode
}

export default function NavigationWrapper({ children }: NavigationWrapperProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('در حال بارگذاری...')
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Show loading when pathname changes (page navigation)
    if (pathname) {
      setIsLoading(true)
      setLoadingMessage('در حال بارگذاری صفحه...')
      
      // Hide loading after a short delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [pathname])

  // Override router.push to show loading
  useEffect(() => {
    const originalPush = router.push
    router.push = (href: string) => {
      setIsLoading(true)
      setLoadingMessage('در حال انتقال...')
      return originalPush(href)
    }

    return () => {
      router.push = originalPush
    }
  }, [router])

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