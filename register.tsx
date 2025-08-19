'use client'
import RegisterForm from '../components/RegisterForm'
import Image from 'next/image'



export default function LoginPage() {


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4" style={{fontFamily:"Sans"}}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row w-full max-w-4xl">
        {/* تصویر سمت چپ */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto">
        <Image
          src="/images/login-illustration.svg.jpg" // چون فایل داخل public هست
          alt="Login Illustration"
          width={400}
          height={300}
         />

        </div>

        {/* فرم ورود */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex items-center justify-center">
          <div className="w-full">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
ثبت نام            </h2>
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  )
}

 
