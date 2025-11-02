'use client'

import Image from 'next/image'

export default function AboutMeSection() {
  return (
    <section className="about-me-section bg-gradient-to-r from-[#1a202c] to-[#2d3748] text-white py-20 px-6">
      <div className="container mx-auto text-center space-y-12">
        
        {/* مقدمه */}
        <div className="intro">
          <h1 className="text-4xl font-bold mb-4">سبد هولد هوشمند ایران ولث</h1>
          <p className="text-lg max-w-xl mx-auto">
            رویکرد سرمایه‌گذاران حرفه‌ای در بازارهای مالی مبتنی بر سرمایه‌گذاری بلندمدت است که مستلزم داشتن یک سبد هولد، به معنای شناسایی و انتخاب دقیق دارایی‌ها برای خرید و نگهداری است. این محصول با استفاده از الگوریتم‌های هوش مصنوعی، به‌منظور مدیریت ریسک، بهینه‌ترین ترکیب دارایی‌های دیجیتال را برای خرید به شما پیشنهاد می‌کند
          </p>
        </div>

        {/* تصویر */}
        <div className="flex justify-center mt-4 mb-8">
          <Image
            src="/images/goldbar1.png"
            alt="Investment"
            width={300}
            height={200}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* پشتیبانی */}
        <div className="current-work bg-[#4A5568] p-6 rounded-xl shadow-lg space-y-4 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold">پشتیبانی تخصصی 24 ساعته</h2>
          <p>
            ما تلاش کردیم با ایجاد یک تیم پشتیبانی تخصصی و 24 ساعته، همیشه در کنار شما باشیم. هر زمان که به کمک نیاز داشته باشید، متخصصان ما آماده پاسخگویی و راهنمایی شما هستند. با پشتیبانی حرفه‌ای و دائمی ما، می‌توانید با آرامش خاطر روی سرمایه‌گذاری‌های خود تمرکز کنید
          </p>
          <a href="https://iranwealth.ir" className="text-blue-400 hover:underline block">
            ارتباط با پشتیبانی
          </a>
        </div>

        {/* تکنولوژی‌ها */}
        <div className="technologies space-y-4">
          <h2 className="text-2xl font-semibold">دانلود اپلیکیشن موبایل ایران ولث</h2>

          {/* تصاویر */}
          <div className="flex justify-center space-x-4 mt-4">
            <div className="w-32 h-32 relative">
              <Image
                src="/images/bazar.jpg"  // مسیر تصویر اول
                alt="App 1"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="w-32 h-32 relative">
              <Image
                src="/images/mayket.png"  // مسیر تصویر دوم
                alt="App 2"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="w-32 h-32 relative">
              <Image
                src="/images/anardoni.png"  // مسیر تصویر سوم
                alt="App 3"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>

        {/* تماس */}
        <div className="contact-me bg-[#FF6600] text-white p-6 rounded-xl shadow-lg space-y-2 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold">درباره ما</h2>
          <p>ما در ایران ولث به عنوان معتبرترین هج فاند تخصصی و دانش‌بنیان کشور، به ارائه خدمات نوآورانه در زمینه مدیریت سرمایه و ریسک می‌پردازیم. تیم ما متشکل از تحلیلگران مجرب با رکورد موفقیت تقریبی ۷۰٪ در معاملات میباشد که در مقایسه با استانداردهای بین‌المللی، سودآوری قابل توجهی دارد.
ایران ولث با اتکا به دانش متخصصان در حوزه های مالی و ریاضی، هوش مصنوعی و الگوریتم، که از اصلی‌ترین دارایی‌های علمی و انسانی کشور محسوب می‌شوند، به صورت شبانه‌روزی در پارک فناوری دانشگاه تربیت مدرس خدمت‌رسانی می‌کند.

فعالیت‌های ما از سال 1401 با هدف ارائه راهکارهای نوین در بازارهای مالی آغاز شد. با بهره‌گیری از بهترین تجربیات تحلیلگران داخلی و خارجی، ما محصولات تخصصی خود را نه تنها در ایران بلکه در کشورهای همسایه به بازار عرضه کردیم و در کشور عزیزمان ایران نیز به بانک ها و موسسات معتبر خدمات رسانی میکنیم. ایران ولث با تکیه بر دانش فنی و اصول اخلاقی، در کنترل دقیق ریسک و مدیریت سرمایه پیشرو است. ما با دقت ریسک  بازارها را می‌سنجیم و امکان سرمایه‌گذاری در گنجینه‌ها و سبدهای هولد هوشمند را فراهم می‌آوریم تا از ارزش دارایی‌های شما محافظت کنیم.

ما پذیرفته ایم تنها راه موفقیت  در ایران ولث در موفقیت مالی خانواده سرمایه گذاران ما می باشد.</p>
          <a href="mailto:email@example.com" className="hover:underline block">
            
          </a>
        </div>

      </div> {/* ✅ این div بسته مربوط به container هست و باید اینجا باشه */}
    </section>
  )
}
