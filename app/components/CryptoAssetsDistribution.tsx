'use client'

import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip)

const cryptoAssets = [
  {
    name: 'بیت کوین',
    symbol: 'BTC',
    valueInToman: '12,000,000',
    percentage: 50,
    color: '#FACC15',
  },
  {
    name: 'اتریوم',
    symbol: 'ETH',
    valueInToman: '8,500,000',
    percentage: 30,
    color: '#A855F7',
  },
  {
    name: 'تتر',
    symbol: 'USDT',
    valueInToman: '94,000,000',
    percentage: 20,
    color: '#22C55E',
  },
]

const data = {
  labels: cryptoAssets.map((a) => a.symbol),
  datasets: [
    {
      data: cryptoAssets.map((a) => a.percentage),
      backgroundColor: cryptoAssets.map((a) => a.color),
      borderWidth: 6,
      borderColor: '#ffffff',
    },
  ],
}

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
  return (
    <div className="bg-white/70 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-6 w-full">
      <h3 className="text-lg font-bold text-gray-800 mb-6 text-right">
        توزیع دارایی ارز دیجیتال
      </h3>

      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
        {/* Chart */}
        <div className="relative w-[220px] h-[220px]">
          <Pie data={data} options={options} />
        </div>

        {/* Asset List */}
        <div className="flex-1 w-full space-y-4">
          {cryptoAssets.map((asset, index) => (
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
