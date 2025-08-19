'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

type Slide = {
  src: string
  alt?: string
  href?: string
}

type ServicesCarouselProps = {
  slides?: Slide[]
  height?: number // default 400
  gap?: number // px between slides
  autoplayIntervalMs?: number
}

const defaultSlides: Slide[] = [
  {
    src: '/images/cc.png',
    alt: 'تصویر نام‌گذاری نشده',
    href: '#',
  },
  {
    src: '/images/cc.png',
    alt: 'تصویر نام‌گذاری نشده',
    href: '#',
  },
  {
    src: '/images/cc.png',
    alt: 'تصویر نام‌گذاری نشده',
    href: '#',
  },
]

export default function ServicesCarousel({
  slides = defaultSlides,
  height = 400,
  gap = 24,
  autoplayIntervalMs = 4000,
}: ServicesCarouselProps) {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<number | null>(null)
  const total = slides.length

  useEffect(() => {
    startAutoplay()
    return () => stopAutoplay()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current])

  const startAutoplay = () => {
    stopAutoplay()
    timerRef.current = window.setTimeout(() => {
      setCurrent((prev) => (prev + 1) % total)
    }, autoplayIntervalMs)
  }

  const stopAutoplay = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  const goTo = (index: number) => {
    setCurrent(index % total)
  }

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ marginTop: 16, marginBottom: 16, height }}
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      {/* slides wrapper */}
      <div
        className="flex transition-all duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * (100 / total)}%)`,
          gap: gap,
          height,
          width: `${total * 100}%`,
          direction: 'ltr',
        }}
      >
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 flex items-center justify-center"
            style={{
              width: `${100 / total}%`,
              padding: 8,
              boxSizing: 'border-box',
              height,
            }}
          >
            <a
              href={slide.href || '#'}
              className="block relative w-full h-full overflow-hidden"
              aria-label={slide.alt || `slide-${idx}`}
              style={{ borderRadius: 16 }}
            >
              {/* wrapper skew to give اوریب effect */}
              <div
                className="w-full h-full overflow-hidden"
                style={{
                  transform: 'skewY(-3deg)',
                  height: '100%',
                  width: '100%',
                  position: 'relative',
                  borderRadius: 16,
                  boxShadow: '0 15px 40px rgba(0,0,0,0.08)',
                }}
              >
                <div
                  style={{
                    transform: 'skewY(3deg)',
                    height: '100%',
                    width: '100%',
                    position: 'relative',
                  }}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt || ''}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 1084px) 100vw, 748px"
                    priority={idx === current}
                    className="radius-plus"
                  />
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* pagination dots */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? 'scale-110' : 'opacity-50'
            }`}
            style={{
              background: i === current ? '#111' : '#ccc',
              border: 'none',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* arrows */}
      <button
        aria-label="prev"
        onClick={() => goTo((current - 1 + total) % total)}
        className="absolute top-1/2 -translate-y-1/2 left-2 p-2 bg-white/90 rounded-full shadow"
        style={{ transform: 'scale(1)', direction: 'ltr' }}
      >
        ‹
      </button>
      <button
        aria-label="next"
        onClick={() => goTo((current + 1) % total)}
        className="absolute top-1/2 -translate-y-1/2 right-2 p-2 bg-white/90 rounded-full shadow"
        style={{ transform: 'scale(1)', direction: 'ltr' }}
      >
        ›
      </button>
    </div>
  )
}
