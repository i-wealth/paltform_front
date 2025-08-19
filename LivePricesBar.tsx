'use client'

import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { useEffect, useState } from 'react';
import { getLatestPricings, returnDataItem } from '../lib/api/pricing';
import { formatWithCommas } from "../utils/string";
import { timestampToJalali } from "../utils/tsToJalali/timestampToJalali";


type PriceItem = {
  label: string
  value: string
  unit: string
  change: string
  time: string
}

export default function LivePricesBar() {

  const [data, setData] = useState<PriceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nowTs, setNowTs] = useState<number | null>(null);


  useEffect(() => {
    // Avoid hydration mismatch by setting dynamic timestamp on client
    setNowTs(Date.now());

    (async () => {
      try {
        const prices = await getLatestPricings();



        const pricesList: PriceItem[] = [
          {
            label: 'طلای ۱۸ عیار (گرم)',
            value: formatWithCommas(String(returnDataItem(prices, "abshodeh").value)),
            unit: 'تومان',
            change: String(returnDataItem(prices, "abshodeh").change),
            time: returnDataItem(prices, "abshodeh").time,
          },
          {
            label: 'تتر',
            value: formatWithCommas(String(returnDataItem(prices, "usdt").value)),
            unit: 'تومان',
            change: String(returnDataItem(prices, "usdt").change),
            time: returnDataItem(prices, "usdt").time,
          },
          {
            label: 'بیت کوین',
            value: formatWithCommas(String(returnDataItem(prices, "btc").value)),
            unit: 'تومان',
            change: String(returnDataItem(prices, "btc").change),
            time: returnDataItem(prices, "btc").time,
          },
          {
            label: 'اتریوم',
            value: formatWithCommas(String(returnDataItem(prices, "eth").value)),
            unit: 'تومان',
            change: String(returnDataItem(prices, "eth").change),
            time: returnDataItem(prices, "eth").time,
          },
          {
            label: 'سولانا',
            value: formatWithCommas(String(returnDataItem(prices, "sol").value)),
            unit: 'تومان',
            change: String(returnDataItem(prices, "sol").change),
            time: returnDataItem(prices, "sol").time,
          },
        ]
        setData(pricesList);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'خطا در دریافت داده');
      } finally {
        setLoading(false);
      }
    })();
  }, []);




  const renderChange = (change: string) => {
    if (change === '-') return null
    const isPositive = change.startsWith('+')
    const colorClass = isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
    const Icon = isPositive ? FaArrowUp : FaArrowDown

    return (
      <div
        className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full w-fit mb-3 ${colorClass}`}
      >
        <Icon className="text-[10px]" />
        {change}
      </div>
    )
  }

  return (
    <div className="relative isolate bg-white border border-gray-200 shadow-md p-6 rounded-2xl">
      {/* هدر */}
      <div className="flex w-[25%] items-center justify-between mb-6 text-sm text-gray-600 font-medium">
        <div>قیمت لحظه‌ای طلا، سکه، دلار و ارز</div>
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs" style={{direction:"rtl"}}>
        {nowTs ? timestampToJalali(nowTs) : ''}
        </div>
      </div>

      {/* لیست قیمت‌ها */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-md p-4 flex flex-col items-start hover:shadow-xl transition"
          >
            {renderChange(item.change)}

            <div className="text-sm font-semibold text-gray-800 mb-1">{item.label}</div>

            <div className="text-lg font-extrabold text-gray-900">{item.value}</div>

            {item.unit && (
              <div className="text-xs text-gray-500 font-medium">{item.unit}</div>
            )}

            <div className="text-[11px] text-gray-400 mt-2">{item.time}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
