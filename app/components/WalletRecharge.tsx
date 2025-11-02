export default function WalletRecharge() {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">شارژ کیف پول تومان</h2>
        <div className="space-y-4">
          <input
            type="number"
            placeholder="مبلغ مورد نظر"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="flex gap-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded">واریز</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded">برداشت</button>
          </div>
        </div>
      </div>
    )
  }
  