'use client'

import Image from 'next/image'
import { useState } from 'react' // افزوده برای کنترل منوی موبایل

type DashboardHeaderProps = {
  username?: string
  avatarSrc?: string
  logoSrc: string
  logoAlt?: string
  onLoginClick?: () => void
  menuItems: string[]
}

export default function DashboardHeader({
  username,
  avatarSrc,
  logoSrc,
  logoAlt = 'لوگو',
  onLoginClick,
  menuItems,
}: DashboardHeaderProps) {
  // --- افزوده: وضعیت باز/بسته بودن منوی موبایل
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header 
      id="header"
      className="w-full bg-white rounded-xl shadow-md"
      style={{
        direction: 'rtl',
        fontFamily:"Sans",
        fontSize: 16,
        lineHeight: 'normal',
        color: '#000',
      }}
    >
      <div
        className="max-w-[1084px] w-full mx-auto flex items-center justify-between px-3 md:px-4"
        style={{ height: 68 }}
      >
        {/* لوگو */}
        <div className="flex items-center flex-shrink-0">
          <a href="/" className="inline-block">
            <Image src={logoSrc} alt={logoAlt} width={78} height={25} priority />
          </a>
        </div>

        {/* دکمه منوی موبایل (افزوده) */}
        <button
          type="button"
          aria-label={mobileOpen ? 'بستن منو' : 'باز کردن منو'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-lg border border-gray-200"
        >
          <span className="sr-only">Toggle menu</span>
          <span
            className={`block h-0.5 w-6 transition-all ${mobileOpen ? 'rotate-45 translate-y-[3px]' : ''}`}
            style={{ backgroundColor: '#000' }}
          />
          <span
            className={`block h-0.5 w-6 my-1 transition-opacity ${mobileOpen ? 'opacity-0' : 'opacity-100'}`}
            style={{ backgroundColor: '#000' }}
          />
          <span
            className={`block h-0.5 w-6 transition-all ${mobileOpen ? '-rotate-45 -translate-y-[3px]' : ''}`}
            style={{ backgroundColor: '#000' }}
          />
        </button>

        {/* منو */}
        <nav className="flex-1 md:flex md:justify-center hidden md:block">
          <ul className="flex gap-6 lg:gap-8 list-none p-0 m-0 items-center">
            {menuItems?.map((item, idx) => (
              <li
                key={idx}
                className="cursor-pointer whitespace-nowrap font-bold text-black hover:text-gray-700 transition-colors"
                style={{ fontSize: 16 }}
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>

        {/* ورود / کاربر */}
        <div className="auth hidden md:flex items-center gap-3 flex-shrink-0">
          {username ? (
            <div className="flex items-center gap-2">
              {avatarSrc && (
                <div className=" rounded-full overflow-hidden flex-shrink-0">
                  <Image src={avatarSrc} alt="آواتار" width={64} height={32} />
                </div>
              )}
              <div
                className="truncate font-bold text-black"
                style={{
                  maxWidth: 100,
                  fontSize: 12,
                  lineHeight: '19.92px',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {username}
              </div>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="cursor-pointer font-bold text-black"
              style={{
                fontSize: 12,
                lineHeight: '19.92px',
                background: 'none',
                border: 'none',
                padding: '0 8px',
              }}
            >
              نام کاربر
            </button>
          )}
        </div>
      </div>

      {/* پنل منوی موبایل (افزوده) */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${mobileOpen ? 'max-h-[480px]' : 'max-h-0'}`}
      >
        <div className="px-3 pb-3">
          {/* منو در موبایل */}
          <nav>
            <ul className="flex flex-col gap-2 list-none p-0 m-0">
              {menuItems?.map((item, idx) => (
                <li
                  key={`m-${idx}`}
                  className="cursor-pointer font-bold text-black border-b border-gray-100 py-2"
                  style={{ fontSize: 15 }}
                  onClick={() => setMobileOpen(false)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </nav>

          {/* بخش ورود / کاربر در موبایل (از کد اصلی استفاده شده، فقط کلاس‌های نمایش تغییر کرده) */}
          <div className="mt-3 flex items-center justify-between">
            {username ? (
              <div className="flex items-center gap-2">
                {avatarSrc && (
                  <div className="rounded-full overflow-hidden flex-shrink-0">
                    <Image src={avatarSrc} alt="آواتار" width={40} height={40} />
                  </div>
                )}
                <div
                  className="truncate font-bold text-black"
                  style={{
                    maxWidth: 160,
                    fontSize: 13,
                    lineHeight: '20px',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  {username}
                </div>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="cursor-pointer font-bold text-black rounded-lg border border-gray-200 px-3 py-2"
                style={{
                  fontSize: 13,
                  lineHeight: '20px',
                  background: 'none',
                }}
              >
                نام کاربر
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
