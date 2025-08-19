'use client'

import { motion } from 'framer-motion'
import { FaCoins, FaBitcoin, FaHome } from 'react-icons/fa'
import { getWalletByAssetName, getWallets } from "../lib/api/wallet";
import { getLatestPricings, returnDataItem } from "../lib/api/pricing";
import { useState, useEffect } from 'react'
import { formatWithCommas } from "../utils/string";

type AssetItemProps = {
  title: string
  value: string
  percent: number
  icon: React.ReactNode
  bgColor: string
  ringColor: string
}

/*
let walls: number[] = [];
let goldWalls: number[] = [];
let cryptoWalls: number[] = [];

const getWalletValueByAssetName = async (userId: string, assetName: string) => {


  const wallets = await getWallets(userId);
  const prices = await getLatestPricings();




  const walletAmnt = ((await getWalletByAssetName(wallets, assetName)).amount);

  const assetValue = await (returnDataItem(prices, assetName).value);

  const res = Math.round(Number(walletAmnt) * assetValue);
  walls.push(res);
  if (assetName === "abshodeh" || assetName === "sekke" || assetName === "kian") {
    goldWalls.push(res);
  }
  else if (assetName === "btc" || assetName === "usdt" || assetName === "sol" || assetName === "eth") {
    cryptoWalls.push(res);
  }
  return String(res);
}

async function getWalletValuesSum(): Promise<number[]> {
  let sum = 0;
  let goldSum = 0;
  let cryptoSum = 0;
  for (let i = 0; i < walls.length; i++) {
    if (walls[i] !== undefined) {
      sum = sum + walls[i];
    }
  }
  for (let i = 0; i <= goldWalls.length; i++) {
    if (goldWalls[i] !== undefined) {
      goldSum = goldSum + goldWalls[i];
    }
  }
  for (let i = 0; i <= cryptoWalls.length; i++) {
    if (cryptoWalls[i] !== undefined) {
      cryptoSum = cryptoSum + cryptoWalls[i];
    }
  }
  return [sum, goldSum, cryptoSum];
}
  */

interface dataType {
  title: string
  value: string
  percent: number
  icon: any
  bgColor: string
  ringColor: string
}

function AssetItem({ title, value, percent, icon, bgColor, ringColor }: AssetItemProps) {
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference


  return (
    <div
      className="
        relative
        flex
        flex-col
        items-center
        justify-between
        rounded-2xl
        p-5
        sm:p-6
        text-center
        bg-white/30
        backdrop-blur-xl
        border
        border-white/30
        shadow-3xl
        transition-all
        duration-300
        group
        overflow-hidden
        h-full
        min-w-0
      "
    >
      {/* Glow */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-white via-blue-100 to-transparent opacity-20 blur-2xl rounded-full group-hover:opacity-30 transition-all" />

      {/* Icon */}
      <div
        className={`
          w-16
          h-16
          sm:w-20
          sm:h-20
          rounded-full
          flex
          items-center
          justify-center
          ${bgColor}
          text-white
          text-2xl
          sm:text-3xl
          mb-4
          sm:mb-6
          shadow-lg
        `}
      >
        {icon}
      </div>

      {/* Animated Progress Circle */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-4 sm:mb-6">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            className="text-gray-300"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="48"
            cy="48"
          />
          <motion.circle
            className={ringColor}
            strokeWidth="10"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="48"
            cy="48"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-base sm:text-lg font-bold text-gray-800 drop-shadow-sm">
          {percent}%
        </div>
      </div>

      {/* Title & Value */}
      <div className="flex flex-col gap-1 mt-auto">
        <h4 className="text-gray-800 font-semibold text-base sm:text-lg">{title}</h4>
        <p className="text-emerald-600 text-xs sm:text-sm font-medium break-words">{value}</p>
      </div>
    </div>
  )
}

export default function DistributionChart() {

  const [assetData, setAssetData] = useState<dataType[]>([
    {
      title: "ارز دیجیتال",
      value: "45,000,000 تومان",
      percent: 30,
      icon: < FaBitcoin />,
      bgColor: "bg-purple-500",
      ringColor: "text-purple-400"
    }
  ])

  useEffect(() => {
    (async () => {
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem('userProfile');
        if (raw !== null) {
          try {
            const prof = JSON.parse(raw);

            const wallets = await getWallets(prof["userId"]);
            const prices = await getLatestPricings();


            let solAmount = Number(wallets.filter(itm => itm.assetName === "sol")[0].amount);
            let solPrice = Number(prices.filter(itm => itm.assetName === "sol")[0].price);
            const solValue = Math.round(solAmount * solPrice);

            let btcAmount = Number(wallets.filter(itm => itm.assetName === "btc")[0].amount);
            let btcPrice = Number(prices.filter(itm => itm.assetName === "btc")[0].price);
            const btcValue = Math.round(btcAmount * btcPrice);

            let ethAmount = Number(wallets.filter(itm => itm.assetName === "eth")[0].amount);
            let ethPrice = Number(prices.filter(itm => itm.assetName === "eth")[0].price);
            const ethValue = Math.round(ethAmount * ethPrice);

            let usdtAmount = Number(wallets.filter(itm => itm.assetName === "usdt")[0].amount);
            let usdtPrice = Number(prices.filter(itm => itm.assetName === "usdt")[0].price);
            const usdtValue = Math.round(usdtAmount * usdtPrice);


            let cryptoTotalValue = solValue + btcValue + ethValue + usdtValue;

            let abshodehAmount = Number(wallets.filter(itm => itm.assetName === "abshodeh")[0].amount);
            let abshodehPrice = Number(prices.filter(itm => itm.assetName === "abshodeh")[0].price);
            const abshodehValue = Math.round(abshodehAmount * abshodehPrice);

            let sekkeAmount = Number(wallets.filter(itm => itm.assetName === "sekke")[0].amount);
            let sekkePrice = Number(prices.filter(itm => itm.assetName === "sekke")[0].price);
            const sekkeValue = Math.round(sekkeAmount * sekkePrice);

            let kianAmount = Number(wallets.filter(itm => itm.assetName === "kian")[0].amount);
            let kianPrice = Number(prices.filter(itm => itm.assetName === "kian")[0].price);
            const kianValue = Math.round(kianAmount * kianPrice);

            let goldTotalValue = kianValue + sekkeValue + abshodehValue;

            const data = [{
              title: "دارایی طلا",
              value: String(goldTotalValue),
              percent: parseFloat(((goldTotalValue / (goldTotalValue+cryptoTotalValue)) * 100).toFixed(2)),
              icon: < FaCoins />,
              bgColor: "bg-cyan-500",
              ringColor: "text-cyan-400",
            },
            {
              title: "ارز دیجیتال",
              value: String(cryptoTotalValue),
              percent: parseFloat(((cryptoTotalValue / (goldTotalValue+cryptoTotalValue)) * 100).toFixed(2)),
              icon: < FaBitcoin />,
              bgColor: "bg-purple-500",
              ringColor: "text-purple-400",
            },
            {
              title: "توکن ملک",
              value: "22000000",
              percent: 25,
              icon: <FaHome />,
              bgColor: "bg-green-500",
              ringColor: "text-green-400"
            }
            ]
            setAssetData(data);


          } catch (err: any) {
            console.error(err);
          }
        }
      }
    })();
  }, []);


  return (
    <div
      className="
        relative
        w-full
        rounded-3xl
        px-4
        sm:px-6
        py-8
        sm:py-10
        bg-white/30
        backdrop-blur-2xl
        border
        border-white/30
        shadow-3xl
        ring-1
        ring-white/20
        overflow-hidden
        group
        max-w-[1200px]
        mx-auto
      "
      dir="rtl"
    >
      {/* Glow background */}
      <div className="absolute -top-16 -left-12 w-40 sm:w-52 h-40 sm:h-52 bg-gradient-to-br from-lime-200 via-white to-transparent opacity-20 rounded-full blur-2xl group-hover:opacity-30 transition-all" />

      <div className="text-center mb-6 sm:mb-10">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 drop-shadow">
          میزان دارایی‌ها به تفکیک
        </h3>
      </div>

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          gap-4
          sm:gap-6
          md:gap-8
          items-stretch
        "
      >

        {assetData.map(
          (itm) => (
            <AssetItem
              key={itm.title /* افزوده برای بهبود React list handling */}
              title={itm.title}
              value={`${formatWithCommas(itm.value)} تومان`}
              percent={itm.percent}
              icon={itm.icon}
              bgColor={itm.bgColor}
              ringColor={itm.ringColor}
            />
          ))}

      </div>
    </div>
  )
}
