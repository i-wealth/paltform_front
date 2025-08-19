'use client'

export default function AppOverviewSection() {
  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* عنوان بخش */}
        <h2 className="text-4xl font-extrabold text-center mb-8">Sparkle</h2>
        <p className="text-center text-lg max-w-2xl mx-auto mb-12">
          Sparkle is a crypto wallet that allows users to comfortably enter the world of cryptocurrencies and invest their finances.
        </p>

        {/* بخش اصلی - هدف اصلی، رنگ‌ها و فونت‌ها */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* هدف اصلی */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Main goal</h3>
            <p className="text-gray-400">
              To provide new users with all the investment tools, as well as create a convenient interface for advanced investors.
            </p>
          </div>

          {/* رنگ‌ها */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Colors</h3>
            <div className="flex space-x-4">
              <div className="w-8 h-8 rounded-full bg-gray-600"></div>
              <div className="w-8 h-8 rounded-full bg-green-500"></div>
              <div className="w-8 h-8 rounded-full bg-red-600"></div>
            </div>
          </div>

          {/* فونت‌ها */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Fonts</h3>
            <p className="text-gray-400">Stolzl, Gilroy</p>
          </div>
        </div>
      </div>
    </section>
  )
}
