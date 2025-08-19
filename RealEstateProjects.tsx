'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog } from '@headlessui/react'

type Project = {
  id: number
  title: string
  location: string
  status: 'درحال عرضه' | 'اتمام عرضه'
  image: string
  badgeText: string
  duration: number
  profit: number
  shares: number
  pricePerShare: string
  isAvailable: boolean
}

const projectList: Project[] = [
  {
    id: 1,
    title: 'توکن ملک',
    location: 'استان تهران/ صادقیه',
    status: 'درحال عرضه',
    image: '/images/realstate1.gif',
    badgeText: '۲۸۰ روز تا پایان پروژه',
    duration: 9,
    profit: 30,
    shares: 133,
    pricePerShare: '۲۹ میلیون تومان',
    isAvailable: true,
  },
  {
    id: 2,
    title: 'توکن سرقفلی مغازه',
    location: 'استان تهران/ مرزداران',
    status: 'اتمام عرضه',
    image: '/images/realstate1.gif',
    badgeText: '۶۰ روز تا پایان پروژه',
    duration: 9,
    profit: 30,
    shares: 133,
    pricePerShare: '۳۱.۲۰ میلیون تومان',
    isAvailable: false,
  },
  {
    id: 3,
    title: 'توکن هتل',
    location: 'استان گیلان / رضوانشهر',
    status: 'اتمام عرضه',
    image: '/images/realstate.gif',
    badgeText: '۲ ماه و ۶ روز تا پایان پروژه',
    duration: 9,
    profit: 30,
    shares: 121,
    pricePerShare: '۳۰.۵۰ میلیون تومان',
    isAvailable: false,
  },
]

const tabs = ['گزارش پیشرفت', 'مشخصات', 'مستندات', 'توضیحات'] as const
type TabType = typeof tabs[number]

export default function RealEstateProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>('گزارش پیشرفت')

  return (
    <section className="bg-white py-10 px-4 md:px-12 min-h-screen" dir="rtl">
      {/* تیتر و زیرتیتر */}
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-4">
          فرصت‌های سرمایه‌گذاری در ایران ولث
        </h2>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          پروژه‌های رویال ایران ولث، پروژه‌های ساخت‌وساز است، بنابراین هرچه زودتر برای سرمایه‌گذاری اقدام کنید، سود بیشتری در انتهای پروژه عاید شما می‌شود.
          بنابراین فرصت را از دست نداده و همین حالا اقدام کنید.
        </p>
      </div>

      {/* پاپ‌آپ پروژه */}
      <Dialog
        open={!!selectedProject}
        onClose={() => {
          setSelectedProject(null)
          setActiveTab('گزارش پیشرفت')
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white w-full h-full overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 bg-[#F9F9FB] border-b">
              <h2 className="text-xl font-bold text-blue-800">{selectedProject?.title}</h2>
              <button
                onClick={() => {
                  setSelectedProject(null)
                  setActiveTab('گزارش پیشرفت')
                }}
                className="text-sm text-gray-500 hover:text-red-600"
              >
                بستن ✕
              </button>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left */}
              <div className="p-6 space-y-6">
                {/* تصویر */}
                <Image
                  src={selectedProject?.image || ''}
                  alt={selectedProject?.title || ''}
                  width={1000}
                  height={600}
                  className="rounded-lg w-full object-cover shadow"
                />

                {/* تب‌ها */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                        activeTab === tab
                          ? 'bg-indigo-50 text-indigo-800 border-indigo-300'
                          : 'bg-gray-100 text-gray-700 border-gray-200'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* محتوای تب‌ها */}
                <div className="mt-6">
                  {activeTab === 'گزارش پیشرفت' && (
                    <div className="space-y-4">
                      {[
                        { title: 'آغاز عرضه', date: '۱۴۰۱/۰۷/۲۴' },
                        { title: 'عملیات پی کنی', date: '۱۴۰۱/۰۹/۰۶' },
                        { title: 'بتن‌ریزی فونداسیون', date: '۱۴۰۱/۰۹/۱۶' },
                        { title: 'افزایش قیمت', date: '۱۴۰۱/۱۰/۰۱', highlighted: true },
                      ].map((step, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div
                            className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-bold ${
                              step.highlighted ? 'bg-indigo-600' : 'bg-orange-500'
                            }`}
                          >
                            {i + 1}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-700">{step.title}</p>
                            <p className="text-xs text-gray-500">{step.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'مشخصات' && (
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>متراژ زمین: ۴۵۰ متر</li>
                      <li>متراژ زیربنا: ۲۱۰ متر دوبلکس</li>
                      <li>نوع سند: شش‌دانگ تک برگ</li>
                      <li>نوع ساخت: سازه بتنی</li>
                      <li>کاربری: مسکونی</li>
                    </ul>
                  )}

                  {activeTab === 'مستندات' && (
                    <div className="text-sm text-gray-700 space-y-3">
                      <p>📄 سند رسمی مالکیت</p>
                      <p>📸 تصویر پروانه ساخت</p>
                      <p>🧾 گزارش کارشناسی رسمی دادگستری</p>
                      <p>🧭 استعلام ثبتی و شهرداری</p>
                    </div>
                  )}

                  {activeTab === 'توضیحات' && (
                    <p className="text-sm text-gray-700 leading-relaxed">
                      این پروژه در منطقه خوش‌آب‌وهوای گیلان واقع شده و دسترسی عالی به دریا و جنگل دارد.
                      طراحی مدرن، کیفیت ساخت بالا و سود جذاب از ویژگی‌های اصلی آن است. با مشارکت در این پروژه، شما
                      در ساخت یک ویلای لوکس با زیرساخت حقوقی و مهندسی شفاف سهیم خواهید شد.
                    </p>
                  )}
                </div>
              </div>

              {/* Right - اطلاعات */}
              <div className="bg-gray-50 border-r p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">{selectedProject?.location}</p>

                  <div className="grid grid-cols-3 text-center bg-white rounded-xl shadow divide-x border overflow-hidden">
                    <div className="py-4">
                      <p className="text-lg font-bold text-orange-600">{selectedProject?.profit}%</p>
                      <p className="text-xs text-gray-500 mt-1">سود کل پروژه</p>
                    </div>
                    <div className="py-4">
                      <p className="text-lg font-bold text-orange-600">{selectedProject?.duration}</p>
                      <p className="text-xs text-gray-500 mt-1">مدت زمان</p>
                    </div>
                    <div className="py-4">
                      <p className="text-lg font-bold text-orange-600">{selectedProject?.shares}</p>
                      <p className="text-xs text-gray-500 mt-1">سهام</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm text-gray-600 mb-1">پیش‌بینی پایان پروژه:</p>
                    <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: '78%' }} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">۲ ماه و ۴۶ روز تا پایان</p>
                  </div>

                  <div className="text-sm text-gray-700 mt-6 leading-6">
                    با خرید یک متر از این پروژه، بیش از <span className="text-blue-800 font-bold">۳۰ میلیون تومان</span> سود خواهید داشت. فرصت را از دست ندهید.
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-center text-xl font-bold text-blue-900">
                    {selectedProject?.pricePerShare}{' '}
                    <span className="text-sm font-normal text-gray-500">هر سهم</span>
                  </p>
                  <p className="text-xs text-center mt-1 text-red-500">در حال حاضر سهمی موجود نیست.</p>
                  <button className="mt-4 w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-sm">
                    مشاهده پروژه
                  </button>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* لیست پروژه‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projectList.map((project) => (
          <div
            key={project.id}
            onClick={() => {
              setSelectedProject(project)
              setActiveTab('گزارش پیشرفت')
            }}
            className="cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
          >
            <div className="relative h-48">
              <Image src={project.image} alt={project.title} fill className="object-cover" />
              <div
                className={`absolute top-0 right-0 text-white text-xs px-3 py-1 rounded-bl-lg font-semibold ${
                  project.status === 'درحال عرضه' ? 'bg-green-600' : 'bg-gray-700'
                }`}
              >
                {project.status}
              </div>
              <div className="absolute bottom-0 right-0 bg-[#0C005B] text-white text-xs px-3 py-1 rounded-tl-lg font-medium">
                {project.badgeText}
              </div>
            </div>

            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-bold leading-snug text-gray-900">{project.title}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-0.5 rounded-full">خرید</span>
              </div>
              <p className="text-xs text-gray-500">{project.location}</p>

              <div className="flex justify-between items-center text-center bg-gray-50 rounded-xl mt-4 py-3 text-sm">
                <div>
                  <p className="text-orange-600 font-bold text-lg">{project.profit}</p>
                  <p className="text-gray-500 text-xs mt-1">سود پروژه</p>
                </div>
                <div>
                  <p className="text-orange-600 font-bold text-lg">{project.duration}</p>
                  <p className="text-gray-500 text-xs mt-1">زمان پروژه</p>
                </div>
                <div>
                  <p className="text-orange-600 font-bold text-lg">{project.shares}</p>
                  <p className="text-gray-500 text-xs mt-1">سهام</p>
                </div>
              </div>

              <div className="mt-3 text-center">
                <p className="text-[15px] font-medium text-gray-700">
                  قیمت هر سهم:
                  <span className="text-blue-900 font-bold mx-1">{project.pricePerShare}</span>
                </p>
                <p className={`text-xs mt-1 ${project.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                  {project.isAvailable ? 'تنها چند سهم باقی مانده است' : 'در حال حاضر سهمی موجود نیست.'}
                </p>
              </div>

              <div className="mt-4">
                <button
                  disabled={!project.isAvailable}
                  className={`w-full text-sm font-bold py-2 rounded-xl transition ${
                    project.isAvailable
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-gray-300 text-white cursor-not-allowed'
                  }`}
                >
                  مشاهده پروژه
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
