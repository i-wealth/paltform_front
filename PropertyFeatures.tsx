'use client'

const stats = [
  {
    label: 'خرید تا امروز',
    value: '۱۰۰',
    unit: 'میلیارد',
  },
  {
    label: 'باشگاه مشتریان آکومتر',
    value: '۵,۲۶۷',
    unit: 'نفر',
  },
  {
    label: 'پروژه‌های تعریف شده',
    value: '۲,۷۷۰',
    unit: 'متر مربع',
  },
  {
    label: 'پروژه‌های آتی',
    value: '۲۲',
    unit: 'پروژه',
  },
]

export default function PropertyFeatures() {
  return (
    <section className="py-8 px-4 md:px-16 bg-[#0C005B]">
      <div className="bg-white shadow-md rounded-[50px] overflow-hidden py-6 px-4 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 text-center rtl">
        {stats.map((item, index) => (
          <div key={index} className="flex-1">
            <p className="text-gray-800 text-sm md:text-base">{item.label}</p>
            <p className="text-orange-500 font-extrabold text-xl md:text-2xl mt-1">
              {item.value}{' '}
              <span className="text-sm font-medium align-middle">{item.unit}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
