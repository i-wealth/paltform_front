'use client'

import { useState } from 'react'

type Props = {
  orgKey: string
  onBack: () => void
  onDonate: (amount: number) => void
}

const orgLabels: Record<string, string> = {
  mahak: 'مؤسسه محک',
  khanom: 'مؤسسه خانوم',
  rahdoobare: 'مؤسسه راه دوباره',
  kehrizak: 'مؤسسه کهریزک',
}

export default function DonationForm({ orgKey, onBack, onDonate }: Props) {
  const [amount, setAmount] = useState<number>(0)
  const [card, setCard] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (amount > 0 && card.length === 16) {
      onDonate(amount)
    } else {
      alert('لطفاً مبلغ و شماره کارت معتبر وارد کنید.')
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-6">
      <button onClick={onBack} className="text-sm text-gray-500 hover:underline">← بازگشت</button>
      <h3 className="text-xl font-bold text-center text-indigo-700">کمک به {orgLabels[orgKey]}</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">💸 مبلغ کمک (تومان)</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={amount}
            onChange={(e) => setAmount(+e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">شماره کارت بانکی</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={card}
            maxLength={16}
            onChange={(e) => setCard(e.target.value)}
            placeholder="مثلاً 6037991234567890"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
        >
          پرداخت و کمک
        </button>
      </form>
    </div>
  )
}
