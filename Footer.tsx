'use client'

import Image from 'next/image'
import {
  FaInstagram,
  FaTelegramPlane,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
} from 'react-icons/fa'


export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 text-center py-10 px-4 space-y-8">
      {/* لوگو */}
      <div className="flex justify-center">
        <Image
          src="/images/login-illustration.svg.jpg" // لوگوی اصلی
          alt="Algorock Logo"
          width={300}
          height={220}
        />
      </div>

      {/* متن توضیحی */}
      <p className="max-w-3xl mx-auto text-gray-700 leading-7 text-sm md:text-base px-2">
        در دنیای پیچیده‌ی بازارهای مالی، سرمایه‌گذاری هوشمندانه و موفق نیازمند اتکا به ابزارها و استراتژی‌های به‌روز است. شما با ایران ولث سرمایه‌گذاری هوشمندانه و متفاوت در بازارهای مالی را به نوین‌ترین روش تجربه خواهید کرد. ما با تعهد به ارائه خدمات با کیفیت و پشتیبانی همیشگی، در کنار شما خواهیم بود تا به اهداف مالی خود دست پیدا کنید.
      </p>

      {/* شبکه‌های اجتماعی */}
      <div className="flex justify-center gap-5 text-purple-600 text-xl">
        <FaTwitter className="hover:scale-110 transition" />
        <FaTelegramPlane className="hover:scale-110 transition" />
        <FaInstagram className="hover:scale-110 transition" />
        <FaLinkedin className="hover:scale-110 transition" />
        <FaYoutube className="hover:scale-110 transition" />
      </div>

      {/* دکمه زبان‌ها */}
      <div className="flex justify-center gap-4 text-sm font-semibold text-gray-600">
        <button className="hover:text-purple-600">FA</button>
        <button className="hover:text-purple-600">AR</button>
        <button className="hover:text-purple-600">EN</button>
      </div>

      {/* لوگوهای همکاران */}
      <div className="flex flex-wrap justify-center items-center gap-6 mt-6">
        <Image src="/images/TechPark.avif" alt="partner1" width={60} height={60} />
        <Image src="/images/daneshbonyan-logo.avif" alt="partner2" width={60} height={60} />
        <Image src="/images/fintech.avif" alt="partner3" width={60} height={60} />
        <Image src="/images/nezam-senfi.avif" alt="partner4" width={60} height={60} />
        <a rel="noopener noreferrer" referrerPolicy="no-referrer" target='_blank' href='https://trustseal.enamad.ir/?id=600263&Code=QQoGLt1QQniXCvuYqBgmy27rNkHBZHMn'>
            <Image src="/images/enamad.png" alt="enamad" width={60} height={60} />
        </a>
      </div>

      {/* متن نهایی حقوقی */}
      <p className="text-xs text-gray-400 mt-6">
        کلیه حقوق این وبسایت محفوظ و متعلق به شرکت اکسیرپایا می‌باشد
      </p>
      <p className="text-xs text-gray-400">نسخه ۱.۰.۰</p>
    </footer>
  )
}
