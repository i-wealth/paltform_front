'use client'

import Image from 'next/image'
import clsx from 'clsx'

export type Tab = {
  id: string
  label: string
  icon?: string
}

type Props = {
  tabs: Tab[]
  activeTab: string
  onTabChange: (id: string) => void
}

export default function MenuTabs({ tabs, activeTab, onTabChange }: Props) {
  return (
    <div className="w-full flex justify-center" style={{fontFamily:"Sans"}}>
      <div
        className="
          relative
          flex
          justify-center
          items-center
          w-full
          max-w-[1269px]
          h-[112px]
          px-8
          mt-8
          lg:px-2
          lg:mt-4
          bg-[var(--bg-color)]
          rounded-[8px]
          shadow-[0_0_5px_0_#EDECE9]
          overflow-hidden
        "

      >
        {/* روی موبایل: اسکرول افقی + مخفی کردن اسکرول‌بار */}
        <div
          id="tabs-scroll"
          className="
            flex items-center gap-3
            w-full
            overflow-x-auto md:overflow-visible
            whitespace-nowrap
            px-1
          "
          style={{fontFamily:"Sans"}}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={clsx(
                  'relative flex flex-col items-center justify-center px-5 py-2 min-w-[120px] sm:min-w-[140px] rounded-full transition select-none',
                  isActive
                    ? 'bg-white font-semibold text-black'
                    : 'text-gray-600 hover:bg-white/60'
                )}

              >
                {tab.icon && (
                  <div className="relative w-[32px] h-[32px] mb-1">
                    <Image
                      src={tab.icon}
                      alt={tab.label}
                      width={32}
                      height={32}
                      className="object-contain mx-auto"
                    />
                  </div>
                )}
                <span className="text-center">{tab.label}</span>
                {isActive && (
                  <span className="absolute -bottom-[4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full" />
                )}
              </button>
            )
          })}
        </div>

        {/* استایل اسکرول‌بار: فقط موبایل مخفی شود */}
        <style jsx>{`
          @media (max-width: 768px) {
            #tabs-scroll {
              -ms-overflow-style: none; /* IE/Edge */
              scrollbar-width: none;    /* Firefox */
            }
            #tabs-scroll::-webkit-scrollbar {
              display: none;            /* Chrome/Safari */
            }
          }
        `}</style>
      </div>
    </div>
  )
}
