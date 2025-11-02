'use client'

import { FaCheck } from 'react-icons/fa'

const steps = [
  'ثبت درآمد',
  'ثبت هزینه‌ها',
  'پیش‌بینی بودجه',
  'تعیین شخصیت سرمایه‌گذاری',
  'صندوق‌های پیشنهادی'
]

type Props = {
  currentStep: number
  onStepChange: (step: number) => void
}

export default function StepNavigation({ currentStep, onStepChange }: Props) {
  return (
    <section className="w-full py-10 px-4 bg-gradient-to-br from-[#0b1f4a] via-[#0d2a66] to-[#0f3a87] rounded-2xl shadow-lg text-white" dir="rtl">
      
      {/* عنوان اصلی بالای مراحل */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          سرمایه‌گذاری هوشمند با <span className="text-cyan-300">ایران‌ولث</span>
        </h2>
      </div>

      {/* مراحل گرافیکی */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8 items-center">
        {steps.map((label, index) => {
          const isCompleted = index < currentStep - 1
          const isActive = index === currentStep - 1

          return (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer group transition-all"
              onClick={() => onStepChange(index + 1)}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full mb-2 font-bold text-sm border-2 transition
                  ${
                    isCompleted
                      ? 'bg-green-500 text-white border-green-500'
                      : isActive
                      ? 'bg-white text-blue-700 border-blue-400'
                      : 'bg-gray-200 text-gray-500 border-gray-400'
                  }
                `}
              >
                {isCompleted ? <FaCheck size={14} /> : index + 1}
              </div>
              <span className="text-xs font-medium text-white group-hover:underline text-center">
                {label}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
