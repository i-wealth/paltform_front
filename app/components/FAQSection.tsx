'use client'

import { useState } from 'react'

type FAQ = {
  question: string
  answer: string
}

type FAQCategory = {
  key: string
  title: string
  faqs: FAQ[]
}

const categories: FAQCategory[] = [
  {
    key: 'about',
    title: 'هوش مصنوعی ایران ولث',
    faqs: [
      {
        question: 'پورتفولیو هوشمند چیست؟',
        answer:
          'پورتفولیو هوشمند یا Smart Portfolio به نوعی از سبد سرمایه‌گذاری گفته می‌شود که با استفاده از فناوری‌های نوین مانند هوش مصنوعی، الگوریتم‌های یادگیری ماشین، تحلیل داده‌ها و گاهی مدیریت الگوریتمی طراحی و مدیریت می‌شود.',
      },
      {
        question: 'مزایای پورتفولیو هوشمند چیست؟',
        answer:
          'حذف احساسات انسانی در معاملات، صرفه‌جویی در زمان، افزایش دقت تصمیم‌گیری و انعطاف‌پذیری بالا در شرایط نوسانی.',
      },
    ],
  },
  {
    key: 'trading',
    title: 'دارایی‌های پورتفولیو',
    faqs: [
      {
        question: 'ساختار پیشنهادی پورتفولیو ترکیبی چیست؟',
        answer: 'طلا فیزیکی یا دیجیتال مطمئن، استیبل‌کوین با سوددهی خودکار.',
      },
      {
        question: 'ساختار پیشنهادی پورتفولیو طلا چیست؟',
        answer: 'طلای آبشده، سکه، صندوق‌های سرمایه‌گذاری طلا.',
      },
      {
        question: 'ساختار پیشنهادی پورتفولیو ارز دیجیتال چیست؟',
        answer: 'تتر، پکس‌گلد و ۳۰٪ ارزهای دیجیتال پربازده.',
      },
    ],
  },
  {
    key: 'installment',
    title: 'مدیریت انسانی یا هوشمند؟',
    faqs: [
      {
        question: 'آیا سیستم کاملاً هوشمند است؟',
        answer:
          '۸۰٪ توسط هوش مصنوعی و ۲۰٪ تحت نظر کارشناسان مالی خبره انجام می‌شود تا با شخصی‌سازی بازار ایران، ریسک مدیریت شود.',
      },
    ],
  },
  {
    key: 'credit',
    title: 'مناسب چه کسانی است؟',
    faqs: [
      {
        question: 'آیا این پورتفولیو برای من مناسب است؟',
        answer:
          'با تعیین اهداف سرمایه‌گذاری و سطح ریسک‌پذیری، هوش مصنوعی بهترین سبد را پیشنهاد می‌دهد و آن را به‌صورت هوشمند مدیریت می‌کند.',
      },
    ],
  },
]

export default function FAQSection() {
  const [activeTab, setActiveTab] = useState('about')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const currentCategory = categories.find((cat) => cat.key === activeTab)

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 px-4 bg-white text-right">
      <div className="max-w-4xl mx-auto">

        {/* عنوان وسط‌چین */}
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">سوالات متداول</h2>

        {/* تب‌ها راست‌چین */}
        <div className="flex flex-wrap gap-3 mb-10 justify-end">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setActiveTab(cat.key)
                setOpenIndex(null)
              }}
              className={`px-4 py-2 text-sm rounded-full border transition ${
                activeTab === cat.key
                  ? 'bg-gray-800 text-white border-gray-800'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* سوالات راست‌چین */}
        <div className="space-y-4">
          {currentCategory?.faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleAnswer(index)}
                className="w-full flex flex-row-reverse items-center justify-between px-5 py-4 bg-gray-50 hover:bg-gray-100 transition text-gray-800 font-medium text-lg text-right"
              >
                <span>{faq.question}</span>
                <svg
                  className={`w-5 h-5 transform transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              {openIndex === index && (
                <div className="px-5 py-4 bg-white border-t border-gray-200 text-gray-600 text-base leading-relaxed text-right">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
