'use client'

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import {
  HiOutlineCalculator,
  HiOutlineChartBar,
  HiOutlineWrenchScrewdriver,
  HiOutlineCpuChip,
} from 'react-icons/hi2'

// لیست ماژول‌ها
const modules = [
  {
    id: 'estimate',
    title: 'برآورد هزینه و زمان ساخت',
    icon: <HiOutlineCalculator className="w-8 h-8 text-white" />,
    description: 'پیش‌بینی دقیق هزینه ساخت و مدت پروژه',
    bg: 'bg-gradient-to-br from-yellow-300 via-orange-100 to-white text-black',
  },
  {
    id: 'control',
    title: 'کنترل پروژه',
    icon: <HiOutlineChartBar className="w-8 h-8 text-white" />,
    description: 'مدیریت و نظارت هوشمند بر روند ساخت‌وساز',
    bg: 'bg-gradient-to-br from-violet-600 via-indigo-500 to-purple-400 text-white',
  },
  {
    id: 'services',
    title: 'درخواست خدمات ساختمانی',
    icon: <HiOutlineWrenchScrewdriver className="w-8 h-8 text-white" />,
    description: 'ثبت درخواست برای خدمات اجرایی و فنی',
    bg: 'bg-gradient-to-br from-amber-500 to-orange-400 text-white',
  },
  {
    id: 'ai',
    title: 'تحلیلگر هوشمند ساخت‌وساز',
    icon: <HiOutlineCpuChip className="w-8 h-8 text-white" />,
    description: 'تحلیل اقتصادی و مشاوره هوشمند بازار ساخت',
    bg: 'bg-[#121212] text-white border border-white/10',
  },
]

// دسته‌های خدمات
const serviceCategories = [
  { id: 'demolition', title: 'تخریب و خاک‌برداری', description: 'تخریب سازه، خاک‌برداری، حمل نخاله' },
  { id: 'structure', title: 'اجرای سازه', description: 'فونداسیون، اسکلت فلزی یا بتنی، بتن‌ریزی' },
  { id: 'mechanical', title: 'تأسیسات', description: 'برق‌کشی، لوله‌کشی، تهویه، تابلو برق' },
  { id: 'finishing', title: 'امور ساختمانی', description: 'نازک‌کاری، گچ‌کاری، کف‌سازی، نما' },
  { id: 'maintenance', title: 'تعمیر و نگهداری', description: 'بررسی و تعمیر تأسیسات، درزگیری، رنگ‌آمیزی' },
  { id: 'renovation', title: 'بازسازی', description: 'نوسازی کامل ساختمان‌های قدیمی' },
]

export default function ConstructionToolsGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const [aiBudget, setAiBudget] = useState(1500)
  const [aiDuration, setAiDuration] = useState(12)
  const [aiType, setAiType] = useState('معمولی')
  const [aiArea, setAiArea] = useState(200)

  const selected = modules.find((m) => m.id === selectedId)
  const activeService = serviceCategories.find((s) => s.id === selectedService)

  const calculateCost = () =>
    aiType === 'لوکس' ? aiArea * 12 : aiType === 'معمولی' ? aiArea * 8 : aiArea * 6

  const calculateTime = () => Math.ceil(aiArea / 35)

  return (
    <section className="py-16 px-4 md:px-12 bg-[#0F0F0F] text-white" dir="rtl">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">ابزارهای هوشمند ساخت‌وساز</h2>
        <p className="text-gray-400 text-sm md:text-base">از طریق ابزارهای زیر پروژه خود را به‌صورت حرفه‌ای مدیریت کنید</p>
      </div>

      {/* گرید ماژول‌ها */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {modules.map((mod) => (
          <div
            key={mod.id}
            onClick={() => {
              setSelectedId(mod.id)
              setSelectedService(null)
            }}
            className={`cursor-pointer rounded-2xl p-6 transition-all shadow-xl hover:scale-[1.02] ${mod.bg}`}
          >
            <div className="mb-4">{mod.icon}</div>
            <h3 className="text-lg font-bold">{mod.title}</h3>
            <p className="text-sm opacity-80 mt-1">{mod.description}</p>
          </div>
        ))}
      </div>

      {/* پاپ‌آپ تمام صفحه */}
      <Dialog open={!!selected} onClose={() => setSelectedId(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black/70" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-[#121212] text-white w-full max-w-5xl h-full rounded-xl p-6 md:p-10 overflow-y-auto">
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
              <h2 className="text-xl font-bold">{selected?.title}</h2>
              <button onClick={() => setSelectedId(null)} className="text-sm text-gray-400 hover:text-red-400">بستن ✕</button>
            </div>

            {selected?.id === 'estimate' && (
              <>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="text-sm text-gray-300 mb-1 block">متراژ کل (متر مربع)</label>
                    <input
                      type="number"
                      value={aiArea}
                      onChange={(e) => setAiArea(+e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 mb-1 block">سطح کیفی ساخت</label>
                    <select
                      value={aiType}
                      onChange={(e) => setAiType(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                    >
                      <option value="اقتصادی">اقتصادی</option>
                      <option value="معمولی">معمولی</option>
                      <option value="لوکس">لوکس</option>
                    </select>
                  </div>
                </form>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                  <h3 className="text-lg font-bold">نتایج برآورد</h3>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>💰 هزینه ساخت تقریبی:
                      <span className="text-white font-bold mx-2">{calculateCost()} میلیون تومان</span>
                    </li>
                    <li>🕓 مدت اجرای پروژه:
                      <span className="text-white font-bold mx-2">{calculateTime()} ماه</span>
                    </li>
                    <li>🏗️ سطح کیفی:
                      <span className="text-white font-bold mx-2">{aiType}</span>
                    </li>
                  </ul>
                </div>
              </>
            )}

            {selected?.id === 'control' && <ProjectController />}

            {selected?.id === 'services' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {serviceCategories.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => setSelectedService(cat.id)}
                      className={`rounded-xl p-4 cursor-pointer transition border ${
                        selectedService === cat.id
                          ? 'bg-blue-600 text-white border-blue-500 shadow-lg'
                          : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                      }`}
                    >
                      <h3 className="font-bold text-lg">{cat.title}</h3>
                    </div>
                  ))}
                </div>

                {activeService && (
                  <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                    <h3 className="text-xl font-bold">{activeService.title}</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">{activeService.description}</p>
                    <button
                      onClick={() => alert(`✅ درخواست برای "${activeService.title}" ثبت شد.`)}
                      className="mt-4 px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold"
                    >
                      ثبت درخواست این خدمت
                    </button>
                  </div>
                )}
              </>
            )}

            {selected?.id === 'ai' && (
              <>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">بودجه (میلیون تومان)</label>
                    <input
                      type="number"
                      value={aiBudget}
                      onChange={(e) => setAiBudget(+e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">مدت زمان (ماه)</label>
                    <input
                      type="number"
                      value={aiDuration}
                      onChange={(e) => setAiDuration(+e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                </form>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                  <h3 className="text-lg font-bold">برآورد هوشمند</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>سازه: {Math.round(aiArea * 4.2)} میلیون تومان</li>
                    <li>تأسیسات: {Math.round(aiArea * 2.1)} میلیون تومان</li>
                    <li>نازک‌کاری: {Math.round(aiArea * 1.8)} میلیون تومان</li>
                    <li>محوطه‌سازی: {Math.round(aiArea * 0.5)} میلیون تومان</li>
                  </ul>
                  <p className="text-white mt-2 font-bold">
                    مجموع: <span className="text-emerald-400">{Math.round(aiArea * 8.6)} میلیون تومان</span>
                  </p>
                </div>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </section>
  )
}

function ProjectController() {
  const [projectStage, setProjectStage] = useState('برق‌کاری  ')
  const [progress, setProgress] = useState(45)
  const [fundingAmount, setFundingAmount] = useState(12000)
  const [materialsUsed, setMaterialsUsed] = useState('بتن، میلگرد، سیمان')
  const [currentActivity, setCurrentActivity] = useState('  15 نفر')
  const [activityDuration, setActivityDuration] = useState('2 هفته')
  const [presoldUnits, setPresoldUnits] = useState(14)
  const [licenses, setLicenses] = useState([
    'مجوز شهرداری',
    'تأییدیه نظام مهندسی',
    'مجوز آتش‌نشانی',
  ])

  return (
    <div className="space-y-6">
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4 text-sm md:text-base">
        <h3 className="text-white font-bold text-lg mb-2">وضعیت کنونی پروژه</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-gray-400">   مرحله در حال اجرا:</span>
            <p className="text-white font-semibold mt-1">{projectStage}</p>
          </div>
          <div>
            <span className="text-gray-400">درصد پیشرفت:</span>
            <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-white font-semibold mt-1">{progress}%</p>
          </div>
          <div>
            <span className="text-gray-400">مقدار تأمین سرمایه:</span>
            <p className="text-white font-semibold mt-1">{fundingAmount.toLocaleString()} میلیون تومان</p>
          </div>
          <div>
            <span className="text-gray-400">متریال به‌کاررفته:</span>
            <p className="text-white font-semibold mt-1">{materialsUsed}</p>
          </div>
          <div>
            <span className="text-gray-400">نیروهای درحال کار پروژه:</span>
            <p className="text-white font-semibold mt-1">
              {currentActivity} ({activityDuration})
            </p>
          </div>
          <div>
            <span className="text-gray-400">واحدهای پیش‌فروش شده:</span>
            <p className="text-white font-semibold mt-1">{presoldUnits} واحد</p>
          </div>
          <div className="md:col-span-2">
            <span className="text-gray-400">مجوزهای دریافت‌شده:</span>
            <ul className="list-disc list-inside text-white mt-1 space-y-1">
              {licenses.map((license, idx) => (
                <li key={idx}>{license}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
