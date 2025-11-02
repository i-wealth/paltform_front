'use client'

import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

type Props = {
  risk: string
  duration: string
}

export default function DistributionChart(
{ risk, duration }: Props) {
  const data = {
    labels: ['سهام', 'درآمد ثابت', 'طلا'],
    datasets: [
      {
        data: [40, 35, 25],
        backgroundColor: ['#0f172a', '#0891b2', '#fbbf24'],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' as const },
    },
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 w-full max-w-md mx-auto">
      <h3 className="font-bold text-center mb-4">سبد سرمایه‌گذاری پیشنهادی</h3>
      <div className="w-64 h-64 mx-auto">
        <Pie data={data} options={options} />
      </div>
      <div className="text-center mt-4 font-medium text-gray-700">
        {risk} / {duration}
      </div>
    </div>
  )
}
