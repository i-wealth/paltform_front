'use client'

import Image from 'next/image'

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
  return (
    <header
      id="header"
      className="w-full bg-white rounded-xl shadow-md"
      style={{
        direction: 'rtl',
        fontFamily: 'yekan-bakh',
        fontSize: 16,
        lineHeight: 'normal',
        color: '#000',
      }}
    >
      <div
        className="max-w-[1084px] w-full mx-auto flex items-center justify-between px-4 sm:px-2"
        style={{ height: 68 }}
      >
        {/* لوگو */}
        <div className="flex items-center flex-shrink-0">
          <a href="/" className="inline-block">
            <Image src={logoSrc} alt={logoAlt} width={78} height={25} priority />
          </a>
        </div>

        {/* منو */}
        <nav className="flex-1 flex justify-center">
          <ul className="flex gap-8 list-none p-0 m-0 items-center text-sm sm:text-xs">
            {menuItems?.map((item, idx) => (
              <li
                key={idx}
                className="cursor-pointer whitespace-nowrap font-bold text-black"
                style={{ fontSize: 16 }}
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>

        {/* ورود / کاربر */}
        <div className="auth flex items-center gap-3 flex-shrink-0">
          {username ? (
            <div className="flex items-center gap-2">
              {avatarSrc && (
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={avatarSrc} alt="آواتار" width={32} height={32} />
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

      {/* منو کشویی برای گوشی‌های موبایل */}
      <div className="sm:hidden flex justify-between px-4 py-2">
        <button onClick={onLoginClick} className="font-bold text-black">
          ورود / ثبت‌نام
        </button>
      </div>
    </header>
  )
}
