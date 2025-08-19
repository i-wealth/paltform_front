'use client'

import React from 'react';
import { useState, useEffect } from 'react'
import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
} from 'chart.js'

import { getWalletByAssetName, getWallets } from "../lib/api/wallet";
import { getLatestPricings, returnDataItem } from "../lib/api/pricing";
import { formatWithCommas } from "../utils/string";

ChartJS.register(ArcElement, Tooltip)

interface cryptoAssets {
  name: string
  symbol: string
  valueInToman: string
  percentage: number
  color: string
}

/*
let walls: number[] = [];

const getWalletValueByAssetName = async (userId: string, assetName: string) => {

  const wallets = await getWallets(userId);
  const prices = await getLatestPricings();


  const walletAmnt = ((await getWalletByAssetName(wallets, assetName)).amount);

  const assetValue = await (returnDataItem(prices, assetName).value);

  const res = Math.round(Number(walletAmnt) * assetValue);
  walls.push(res);
  return String(res);
}

const getWalletValuesSum = async (): Promise<number> => {
  let sum: number = 0;
  for (let i = 0; i <= walls.length; i += 2) {
    if (walls[i] !== undefined) {
      sum = sum + walls[i];
    }

  }
  return sum;
}
  */

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          const label = context.label || ''
          const value = context.formattedValue || ''
          return `${label}: ${value}%`
        },
      },
    },
  },
}

export default function CryptoAssetsDistribution() {
  const [cryptoData, setCryptoData] = useState<cryptoAssets[]>([{
    name: 'طلای آبشده',
    symbol: 'GLD',
    valueInToman: '12,000,000',
    percentage: 50,
    color: '#FACC15',
  }]);

  const data = {
    labels: cryptoData.map((a) => a.symbol),
    datasets: [
      {
        data: cryptoData.map((a) => a.percentage),
        backgroundColor: cryptoData.map((a) => a.color),
        borderWidth: 6,
        borderColor: '#ffffff',
      },
    ],
  }


  useEffect(() => {
    (async () => {
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem('userProfile');
        if (raw !== null) {
          try {
            const prof = JSON.parse(raw);
            const wallets = await getWallets(prof["userId"]);
            const prices = await getLatestPricings();

            let abshodehAmount = Number(wallets.filter(itm => itm.assetName === "abshodeh")[0].amount);
            let abshodehPrice = Number(prices.filter(itm => itm.assetName === "abshodeh")[0].price);
            const abshodehValue = Math.round(abshodehAmount * abshodehPrice);

            let sekkeAmount = Number(wallets.filter(itm => itm.assetName === "sekke")[0].amount);
            let sekkePrice = Number(prices.filter(itm => itm.assetName === "sekke")[0].price);
            const sekkeValue = Math.round(sekkeAmount * sekkePrice);

            let kianAmount = Number(wallets.filter(itm => itm.assetName === "kian")[0].amount);
            let kianPrice = Number(prices.filter(itm => itm.assetName === "kian")[0].price);
            const kianValue = Math.round(kianAmount * kianPrice);

            let totalValue = kianValue + sekkeValue + abshodehValue;



            const cryptoAssets: cryptoAssets[] = [
              {
                name: 'طلای آبشده',
                symbol: 'GLD',
                valueInToman: formatWithCommas(abshodehValue),
                percentage: abshodehValue / totalValue,
                color: '#FACC15',
              },
              {
                name: 'سکه تمام',
                symbol: 'SKT',
                valueInToman: formatWithCommas(sekkeValue),
                percentage: sekkeValue / totalValue,
                color: '#A855F7',
              },
              {
                name: 'صندوق کیان',
                symbol: 'SE1',
                valueInToman: formatWithCommas(kianValue),
                percentage: kianValue / kianValue,
                color: '#22C55E',
              },
            ]

            setCryptoData(cryptoAssets);

          } catch (err: any) {
            console.error(err);
          }
        }
      }
    })();
  }, []);


  return (
    <div className="bg-white/70 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-6 w-full">
      <h3 className="text-lg font-bold text-gray-800 mb-6 text-right">
        توزیع دارایی طلا
      </h3>

      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
        {/* Chart */}
        <div className="relative w-[220px] h-[220px]">
          <Pie data={data} options={options} />
        </div>

        {/* Asset List */}
        <div className="flex-1 w-full space-y-4">
          {cryptoData.map((asset, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl shadow-md border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: asset.color }}
                />
                <span className="text-sm text-gray-800 font-medium">
                  {asset.name}
                  <span className="ml-1 text-xs text-gray-500">({asset.symbol})</span>
                </span>
              </div>
              <div className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                {asset.valueInToman} تومان
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
