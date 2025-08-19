'use client'

export default function PackageSection() {
  return (
    <section className="package-section py-20 px-6 bg-[#2d3748] text-white">
      <div className="container mx-auto text-center space-y-12">
        <h2 className="text-3xl font-bold mb-6">پکیج‌های سبد هوشمند</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="package-item bg-[#4A5568] p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">پکیج VIP</h3>
            <p>توضیحات پکیج VIP</p>
          </div>
          <div className="package-item bg-[#4A5568] p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">پکیج استاندارد</h3>
            <p>توضیحات پکیج استاندارد</p>
          </div>
          <div className="package-item bg-[#4A5568] p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">پکیج اقتصادی</h3>
            <p>توضیحات پکیج اقتصادی</p>
          </div>
        </div>
      </div>
    </section>
  )
}
