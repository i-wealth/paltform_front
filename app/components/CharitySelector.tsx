'use client'

import Image from 'next/image'

type Props = {
  onSelect: (key: string) => void
}

const charities = [
  { key: 'mahak', label: 'کودکان سرطانی (مؤسسه محک)', image: '/images/003e5f05f9ee15dc5b198961b9a9364b.jpg' },
  { key: 'khanom', label: 'زنان بدسرپرست (مؤسسه خانوم)', image: '/images/351d8d40094056a4fd20a0d16f4e4caf.jpg' },
  { key: 'rahdoobare', label: 'زندانیان (مؤسسه راه دوباره)', image: '/images/c14da8e16fe4593b466c18f783e54245.jpg' },
  { key: 'kehrizak', label: 'کودکان بی‌سرپرست (مؤسسه کهریزک)', image: '/images/089d2f787cddad6424df6efbf1faf84d.jpg' },
]

export default function CharitySelector({ onSelect }: Props) {
  return (
    <section className="relative py-20 px-6 bg-gradient-to-br from-indigo-50 to-white text-gray-900">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-16 text-indigo-800">
          انتخاب مؤسسه برای کمک
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {charities.map((charity) => (
            <div
              key={charity.key}
              onClick={() => onSelect(charity.key)}
              className="group cursor-pointer bg-white p-6 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 border border-gray-100 flex flex-col items-center"
            >
              <div className="mb-4 transition-transform group-hover:scale-105">
                <Image
                  src={charity.image}
                  alt={charity.label}
                  width={120}
                  height={120}
                  className="object-cover rounded-xl shadow-sm"
                />
              </div>
              <p className="text-sm sm:text-base font-medium text-gray-700 group-hover:text-gray-900 transition text-center leading-relaxed">
                {charity.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
