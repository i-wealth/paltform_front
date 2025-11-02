'use client'

import { FaHandsHelping, FaShieldAlt, FaUsers } from 'react-icons/fa'

const features = [
  {
    icon: <FaHandsHelping size={28} className="text-blue-600" />,
    title: 'مدیریت نقدینگی',
    description: 'تسهیل مدیریت نقدینگی و جریان‌های مالی به صورت آنی.',
  },
  {
    icon: <FaShieldAlt size={28} className="text-blue-600" />,
    title: 'مدیریت دارایی',
    description: 'حفاظت از دارایی‌ها با استراتژی‌های امن و قابل اعتماد.',
  },
  {
    icon: <FaUsers size={28} className="text-blue-600" />,
    title: 'کیف‌ پول',
    description: 'مدیریت و ذخیره‌سازی امن ارزهای دیجیتال و توکن‌ها.',
  },
]

export default function FeaturesSection1() {
  return (
    <section className="py-12 px-4 md:px-16 bg-white">
      <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center space-y-4">
              <div className="bg-blue-100 p-4 rounded-full">{feature.icon}</div>
              <h4 className="text-lg font-semibold">{feature.title}</h4>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
