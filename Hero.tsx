// app/components/Hero.tsx
'use client'
export default function Hero() {
    return (
      <section className="h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white text-center pt-20">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Buy crypto in a <span className="text-blue-600">simple</span> and <span className="text-blue-600">secure</span> way
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Luno makes it safe and easy to buy, store and learn about crypto.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded text-lg hover:bg-blue-700">
            Get Started
          </button>
        </div>
      </section>
    );
  }
  