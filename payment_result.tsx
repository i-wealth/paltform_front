'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import { zarinpalValidation, ZarinpalValidationResponse, ZarinpalValidationParams } from "../lib/api/zarinpal";


interface Props {
  searchParams: {
    Authority: string
    Status: string
  }
}

export default function PaymentReceiptPage({ searchParams }: Props) {
  const router = useRouter()
  const [countdown, setCountdown] = useState(10)
  const { Authority, Status } = searchParams
  const [amnt, setAmnt] = useState<number>(0);
  const [source, setSource] = useState<string>("");
  const [validationResp, setValidationResp] = useState<ZarinpalValidationResponse>({
    data:
    {
      "code": 0,
      "message": "",
      "card_hash": "",
      "card_pan": "",
      "ref_id": 0,
      "fee_type": "",
      "fee": 0,
      "shaparak_fee": 0,
      "order_id": 0
    }
  })


  async function handlePayment(amnt: number, auth: string, usrID: string) {
    try {
      const payload: ZarinpalValidationParams = {
        userId: usrID,
        amount: amnt,
        authority: auth
      }
      const res = await zarinpalValidation(payload)
      return res;

    } catch (e: any) {
      return e;
    }
  }

  useEffect(() => {
    (async () => {
      if (typeof window !== 'undefined') {
        let Amnt = localStorage.getItem("amnt");
        let SP = localStorage.getItem("souercePage");
        if (SP) {
          setSource(SP);
        }
        if (Amnt) {
          setAmnt(Number(Amnt));
          let usrProf = localStorage.getItem("userProfile");
          if (usrProf) {
            let resp = await handlePayment(Number(Amnt), Authority, JSON.parse(usrProf)["userId"]);
            console.log(resp);
            setValidationResp(resp);
          }
        }

      }

      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer)

            router.push("/"+source);

          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    })();
  }, []);



  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md space-y-4 border border-green-200 relative">
        <h2 className="text-xl font-bold flex items-center gap-2 justify-center">
          {Status === "NOK" ? < FaTimesCircle className="text-xl text-red-600" /> : <FaCheckCircle className="text-xl text-green-600" />}
          {Status === "NOK" ? "پرداخت ناموفق" : "پرداخت موفق"}
        </h2>

        {
          Status === "NOK" ?
            <p className="text-3xl font-bold text-center text-red-700">{amnt + "تومان"} </p>
            :
            <p className="text-3xl font-bold text-center text-green-700">{amnt + "تومان"}</p>
        }

        <div className="border-t pt-4 text-sm text-gray-700 space-y-2">
          <div className="flex justify-between">
            <span>شماره تراکنش</span>
            <span>10000333</span>
          </div>
          <div className="flex justify-between">
            <span>شناسه مرجع</span>
            <span>BANK-20393</span>
          </div>
          <div className="flex justify-between">
            <span>تاریخ پرداخت</span>
            <span>1403/03/10 - 13:45</span>
          </div>
          <div className="flex justify-between">
            <span>وضعیت</span>
            {
              Status === "NOK" ?
                <span className="text-red-600 font-bold">پرداخت موفق</span>
                :
                <span className="text-green-600 font-bold">پرداخت موفق</span>
            }
          </div>
          <div className="flex justify-between">
            <span>شماره سفارش</span>
            <span>1280</span>
          </div>
          <div className="flex justify-between">
            <span>شماره کارت</span>
            <span>6037 **** **** 6708</span>
          </div>
          <div className="flex justify-between">
            <span>تاریخ ایجاد</span>
            <span>1403/03/10 - 13:44</span>
          </div>
          <div className="flex justify-between">
            <span>شماره موبایل</span>
            <span>0912 *** 1234</span>
          </div>
          <div className="flex justify-between">
            <span>PSP</span>
            <span>پرداخت الکترونیک سداد</span>
          </div>
          <div className="flex justify-between">
            <span>در حال بازگشت...</span>
            <span className="text-blue-500 font-bold">{countdown} ثانیه</span>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => {
              router.push("/"+source);

            }}
            className="text-sm text-gray-500 underline hover:text-blue-600"
          >
            بازگشت به صفحه اصلی
          </button>
        </div>
      </div>
    </div>
  )
}
