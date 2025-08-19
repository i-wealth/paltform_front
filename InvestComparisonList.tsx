export default function InvestComparisonList() {
    const data = [
      { label: 'سکه', percent: '+113.7%' },
      { label: 'طلا', percent: '+101.5%' },
      { label: 'دلار', percent: '+69.0%' },
      { label: 'بورس', percent: '+39.9%' },
      { label: 'سبد پیشنهادی', percent: '+59.1%' },
    ]
  
    return (
      <div className="bg-white rounded-lg shadow p-4 mt-6">
        <h3 className="font-bold mb-4 text-center">مقایسه بازدهی</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {data.map((item) => (
            <div
              key={item.label}
              className="bg-gray-50 border rounded p-3 text-center"
            >
              <div className="text-green-600 font-bold text-lg">
                {item.percent}
              </div>
              <div className="text-sm text-gray-700 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  