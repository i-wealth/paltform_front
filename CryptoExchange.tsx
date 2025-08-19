'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import {
  FaArrowUp,
  FaArrowDown,
  FaCheckCircle,
  FaExclamationCircle,
} from 'react-icons/fa'
import { formatWithCommas } from "../utils/string";
import {
  sellGoldBar,
  SellGoldBarRequest,
  SellGoldBarResponse,
  buyGoldBar,
  BuyGoldBarRequest,
  BuyGoldBarResponse,
} from '../lib/api/crypto'
import { getLatestPricings, returnDataItem } from '../lib/api/pricing';

import { zarinpalReq, ZarinpalResponse, ZarinpalReqParams } from "../lib/api/zarinpal";
import { json } from 'stream/consumers'




type CryptoItem = {
  name: string
  symbol: string
  price: number
  icon: string
  description: string
}

type BankCard = {
  bank: string
  number: string
}


export default function CryptoExchange() {
  const [amount, setAmount] = useState<number | ''>('')
  const [resp, setResp] = useState<SellGoldBarResponse | null>(null)
  const [buyResp, setBuyResp] = useState<BuyGoldBarResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [amn, setAmn] = useState(10)
  const [error, setError] = useState<string | null>(null)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [bankCards, setBankCards] = useState<BankCard[]>([])
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(0)
  const [data, setData] = useState<CryptoItem[]>([
    {
      name: 'بیت‌کوین',
      symbol: "btc",
      price: 8096000,
      icon: '/images/bitcoin.png',
      description: 'ارز دیجیتال پیشرو و با ارزش‌ترین',
    }]);
  const [active, setActive] = useState<CryptoItem>(data[0])

  const walletInputRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    (async () => {
      try {
        const prices = await getLatestPricings();



        const cryptoList: CryptoItem[] = [
          {
            name: 'بیت‌کوین',
            symbol: "btc",
            price: Math.round(returnDataItem(prices, "btc").value),
            icon: '/images/bitcoin.png',
            description: 'ارز دیجیتال پیشرو و با ارزش‌ترین',
          },
          {
            name: 'اتریوم',
            symbol: "eth",
            price: Math.round(returnDataItem(prices, "eth").value),
            icon: '/images/ethereum.png',
            description: 'پلتفرم قراردادهای هوشمند',
          },
          {
            name: 'سولانا',
            symbol: "sol",
            price: Math.round(returnDataItem(prices, "sol").value),
            icon: '/images/solana.png',
            description: 'شبکه سریع با کارمزد پایین',
          },
          {
            name: 'تتر',
            symbol: "usdt",
            price: Math.round(returnDataItem(prices, "usdt").value),
            icon: '/images/tether.png',
            description: 'استیبل‌کوین متصل به دلار',
          },
        ]
        setData(cryptoList);
        setActive(cryptoList[0]);
        const stored = localStorage.getItem('cards')
        if (!stored) {
          const defaultCards = [
            { bank: 'ملی', number: '603799******6708' },
            { bank: 'ملت', number: '610433******1234' },
          ]
          localStorage.setItem('cards', JSON.stringify(defaultCards))
          setBankCards(defaultCards)
        } else {
          setBankCards(JSON.parse(stored))
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'خطا در دریافت داده');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleCharge(amnt: number) {
    try {
      const payload: ZarinpalReqParams = {
        amount: amnt
      }
      const res = await zarinpalReq(payload)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('amnt');
        localStorage.removeItem('souercePage');

        localStorage.setItem("amnt", String(amnt));
        localStorage.setItem('souercePage', "crypto");

        let loc = "https://sandbox.zarinpal.com/pg/StartPay/" + res.data.authority;

        window.location.assign(loc);
      }
    } catch (e: any) {

    } finally {

    }
  }


  async function handleSell(amnt: number, tkn: string) {
    setLoading(true)
    setError(null)
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('userProfile');
      if (raw !== null) {
        try {
          const prof = JSON.parse(raw);
          const payload: SellGoldBarRequest = {
            userId: prof.userId,
            amount: amnt,
          }
          const res = await sellGoldBar(payload, tkn)
          setResp(res)
          window.location.reload()
        } catch (e: any) {
          setError(e.message)
        } finally {
          setLoading(false)
          setBuyResp(null)
        }
      }
    }
  }

  const handleBuy = async (amnt: number, tkn: string) => {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('userProfile');
      if (raw !== null) {
        try {
          const prof = JSON.parse(raw);
          const payload: BuyGoldBarRequest = {
            userId: prof.userId,
            amount: amnt,
          }
          const res = await buyGoldBar(payload, tkn)

          setBuyResp(res)
          window.location.reload()
        } catch (e: any) {
          setError(e.message)
        } finally {
          setLoading(false)
          setResp(null)
        }

      }
    }
  }


  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 4000)
  }

  const handleBuySell = (type: 'buy' | 'sell') => {
    const numericAmount = typeof amount === 'number' ? amount : parseFloat(amount)
    if (!numericAmount || numericAmount <= 0) {
      showNotification('error', 'مقدار وارد شده معتبر نیست.')
      return
    }
    const cryptoQty = numericAmount / active.price
    showNotification('success', `عملیات ${type === 'buy' ? 'خرید' : 'فروش'} ${cryptoQty.toFixed(6)} ${active.name} انجام شد.`)
    setAmount('')
    if (inputRef.current) inputRef.current.value = ''
  }

  const handleWalletCharge = (toman: number) => {

    if (selectedCardIndex === null) {
      showNotification('error', 'لطفاً یک کارت بانکی را انتخاب کنید.')
      return
    }
    const selectedCard = bankCards[selectedCardIndex]
    showNotification('success', `در حال انتقال ${toman.toLocaleString()} تومان از کارت ${selectedCard.number} به درگاه...`)
    setIsWalletModalOpen(false)
    walletInputRef.current!.value = ''
  }

  return (
    <section className="grid md:grid-cols-2 gap-8 relative" dir="rtl">
      {notification && (
        <div className={clsx(
          'fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg z-[9999] flex items-center gap-3 text-sm font-medium transition-all duration-300',
          notification.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        )}>
          {notification.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* لیست ارزها */}
      <div className="order-1 space-y-4">
        {data.map((item) => (
          <div
            key={item.name}
            onClick={() => {
              setActive(item)
              setAmount('')
              if (inputRef.current) inputRef.current.value = ''
            }}
            className={`flex items-center justify-between px-5 py-4 rounded-2xl transition cursor-pointer shadow-md bg-white/70 backdrop-blur-md hover:scale-[1.02] ${active.name === item.name ? 'ring-2 ring-blue-500' : ''
              }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Image src={item.icon} alt={item.name} width={20} height={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
            </div>
            <div className="text-sm font-bold text-gray-700 whitespace-nowrap">
              {formatWithCommas(String(item.price)) + " تومان"}
            </div>
          </div>
        ))}
      </div>

      {/* خرید و فروش */}
      <div className="order-2 bg-white/70 rounded-2xl shadow-xl p-6 space-y-6 border border-white/30">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white shadow-inner relative">
            <Image src={active.icon} alt={active.name} fill className="object-contain p-1" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{active.name}</h2>
            <p className="text-sm text-gray-500">{active.description}</p>
          </div>
        </div>

        <p className="text-lg font-bold text-blue-600">{active.price.toLocaleString()} تومان</p>

        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {[500000, 1000000, 2000000].map(preset => (
              <button
                key={preset}
                onClick={() => {
                  setAmount(preset)
                  if (inputRef.current) inputRef.current.value = preset.toString()
                }}
                className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-md hover:bg-blue-200 text-sm"
              >
                {preset.toLocaleString()} تومان
              </button>
            ))}
          </div>

          <input
            ref={inputRef}
            type="number"
            onChange={(e) => setAmount(+e.target.value)}
            placeholder="مقدار تومان"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 text-right placeholder:text-sm text-gray-800"
          />

          {amount && (
            <p className="text-sm text-gray-600 text-right">
              معادل: <span className="font-bold text-green-600">{(amount / active.price).toFixed(6)}</span> {active.name}
            </p>
          )}

          <div className="flex gap-2">
            <button onClick={() => { void handleBuy(Number(amount), active.symbol) }} className="flex-1 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700">خرید</button>
            <button onClick={() => { void handleSell(Number(amount) / active.price, active.symbol) }} className="flex-1 bg-red-600 text-white py-2 rounded-xl hover:bg-red-700">فروش</button>
          </div>
          <div>
            {error && (
              <p className="mt-4 text-red-600">
                خطا: {error}
              </p>
            )}

            {buyResp && (
              <div className="mt-4 p-4 border rounded bg-gray-50">
                <p>تراکنش موفق! شناسه: {buyResp.id}</p>
                <p>کاربر: {buyResp.userId}</p>
                <p>دسته: {buyResp.category}</p>
                <p>نام دارایی: {buyResp.assetName}</p>
                <p>مقدار دریافتی: {buyResp.amount}</p>
                <p>قیمت کل: {buyResp.price * buyResp.amount}</p>
                <p>تاریخ: {new Date(buyResp.createdAt).toLocaleString()}</p>
              </div>
            )}

            {resp && (
              <div className="mt-4 p-4 border rounded bg-gray-50">
                <p>تراکنش موفق! شناسه: {resp.id}</p>
                <p>کاربر: {resp.userId}</p>
                <p>دسته: {resp.category}</p>
                <p>نام دارایی: {resp.assetName}</p>
                <p>مقدار فروخته شده: {resp.amount}</p>
                <p>قیمت کل: {resp.price * resp.amount}</p>
                <p>تاریخ: {new Date(resp.createdAt).toLocaleString()}</p>
              </div>
            )}

          </div>

          <div className="flex gap-4 pt-2">
            <button className="flex-1 border-2 border-blue-600 text-blue-600 py-2 rounded-xl hover:bg-blue-600 hover:text-white">واریز</button>
            <button className="flex-1 border-2 border-blue-600 text-blue-600 py-2 rounded-xl hover:bg-blue-600 hover:text-white">برداشت</button>
            <button onClick={() => setIsWalletModalOpen(true)} className="flex-1 border-2 border-blue-600 text-blue-600 py-2 rounded-xl hover:bg-blue-600 hover:text-white">شارژ کیف پول</button>
          </div>
        </div>
      </div>

      {/* مودال شارژ کیف پول */}
      {isWalletModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4 relative text-right">
            <h2 className="text-lg font-bold text-gray-800">شارژ کیف پول</h2>
            <button onClick={() => setIsWalletModalOpen(false)} className="absolute top-4 left-4 text-gray-400 hover:text-red-500 text-xl">×</button>

            <div className="grid grid-cols-3 gap-2">
              {[500000, 1000000, 2000000].map((preset) => (
                <button
                  key={preset}
                  onClick={() => {
                    if (walletInputRef.current) walletInputRef.current.value = preset.toString()
                  }}
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 text-sm"
                >
                  {preset.toLocaleString()} تومان
                </button>
              ))}
            </div>

            <form onSubmit={(e) => {
              e.preventDefault()
              const val = walletInputRef.current?.value || ''
              const parsed = parseInt(val)
              if (!isNaN(parsed) && parsed > 0) {
                handleCharge(parsed)
              } else {
                showNotification('error', 'مقدار وارد شده نامعتبر است.')
              }
            }}>
              <input ref={walletInputRef} type="number" placeholder="مبلغ دلخواه به تومان" className="w-full mt-4 p-2 border border-gray-300 rounded-md text-sm text-gray-800" />

              <div className="mt-4 space-y-2">
                {bankCards.length === 0 ? (
                  <p className="text-sm text-gray-500">هیچ کارت بانکی‌ای ثبت نشده است.</p>
                ) : (
                  bankCards.map((card, index) => (
                    <label key={index} className="flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-blue-50">
                      <input
                        type="radio"
                        name="bankCard"
                        checked={selectedCardIndex === index}
                        onChange={() => setSelectedCardIndex(index)}
                      />
                      <div>
                        <p className="font-semibold">{card.bank}</p>
                        <p className="text-xs text-gray-600">{card.number}</p>
                      </div>
                    </label>
                  ))
                )}
              </div>

              <button type="submit" className="w-full mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 font-semibold">
                ادامه و پرداخت
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
