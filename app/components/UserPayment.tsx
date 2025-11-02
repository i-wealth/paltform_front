import React, { useState } from 'react';

const FinancialPeriodicalReport = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedSection, setSelectedSection] = useState(null);

  // داده‌های نمونه منطبق با بازار ایران
  const reportData = {
    monthly: {
      period: "1 ابان 1404 - 30 ابان 1403",
      netWorth: "4.58 میلیون تومان",
      totalInvestments: "5.60 میلیون تومان",
      totalLiabilities: "1.02 میلیون تومان",
      creditScore: 725,
      profitLoss: "+12.5%",
      profitLossAmount: "+572,000 تومان",
      totalPayments: "1.25 میلیون تومان",
      bestPerformingAsset: { name: "  طلای ابشده  ", return: "+18.3%" },
      worstPerformingAsset: { name: "اتریوم ", return: "-5.2%" },
      tradingBehavior: "محتاط",
      totalInvestmentsAmount: "2.8 میلیون تومان",
      avgHoldingPeriod: "4.2 ماه",
      cashFlow: {
        inflow: "2.50 میلیون",
        outflow: "1.80 میلیون",
        netFlow: "0.70 میلیون"
      },
      transactions: [
        { category: "هزینه‌های روزمره", amount: "450,000" },
        { category: "قسط وام", amount: "250,000" },
        { category: "سرمایه‌گذاری جدید", amount: "600,000" }
      ]
    },
    biweekly: {
      period: "1 آبان 1404 - 14 آبان 1403",
      netWorth: "4.45 میلیون تومان",
      totalInvestments: "5.50 میلیون تومان",
      totalLiabilities: "1.05 میلیون تومان",
      creditScore: 718,
      profitLoss: "+8.1%",
      profitLossAmount: "+344,000 تومان",
      totalPayments: "680,000 تومان",
      bestPerformingAsset: { name: "طلای ابشده  ", return: "+12.7%" },
      worstPerformingAsset: { name: "سولانا  ", return: "-2.1%" },
      tradingBehavior: "متعادل",
      totalInvestmentsAmount: "1.9 میلیون تومان",
      avgHoldingPeriod: "3.8 ماه",
      cashFlow: {
        inflow: "1.20 میلیون",
        outflow: "0.95 میلیون",
        netFlow: "0.25 میلیون"
      },
      transactions: [
        { category: "خرید دارایی", amount: "220,000" },
        { category: "قسط وام", amount: "125,000" },
        { category: "خرید پورتفولیو  ", amount: "180,000" }
      ]
    },
    quarterly: {
      period: "1 آبان 1404 - 1 دی 1404",
      netWorth: "4.58 میلیون تومان",
      totalInvestments: "5.60 میلیون تومان",
      totalLiabilities: "1.02 میلیون تومان",
      creditScore: 725,
      profitLoss: "+23.8%",
      profitLossAmount: "+1.1 میلیون تومان",
      totalPayments: "3.75 میلیون تومان",
      bestPerformingAsset: { name: "طلای آبشده  ", return: "+42.5%" },
      worstPerformingAsset: { name: "    کریپتو((تتر و سولانا))", return: "+4.2%" },
      tradingBehavior: "متعادل",
      totalInvestmentsAmount: "5.6 میلیون تومان",
      avgHoldingPeriod: "5.1 ماه",
      cashFlow: {
        inflow: "7.50 میلیون",
        outflow: "5.40 میلیون",
        netFlow: "2.10 میلیون"
      },
      transactions: [
        { category: "هزینه‌های روزمره", amount: "1,350,000" },
        { category: "اقساط وام", amount: "750,000" },
        { category: "سرمایه‌گذاری", amount: "2,000,000" }
      ]
    }
  };

  // داده‌های تفکیک دارایی‌ها
  const assetBreakdown = {
    stocks: [
      { name: "طلای آبشده  ", value: "850,000", change: "+5.2%" },
      { name: "تتر", value: "680,000", change: "+18.7%" },
      { name: "بیت کوین", value: "500,000", change: "-2.1%" }
    ],
    mutualFunds: [
      { name: "سولانا  ", value: "550,000", change: "+12.3%" },
      { name: "اتریوم ", value: "480,000", change: "+8.9%" }
    ],
    bonds: [
      { name: "اونس جهانی  ", value: "450,000", change: "+4.2%" },
      { name: "سهام آمریکا ", value: "400,000", change: "+3.8%" }
    ],
    gold: [
      { name: "طلای آبشده ۱۸ عیار", value: "300,000", change: "+15.2%" },
      { name: "سکه بهار آزادی", value: "150,000", change: "+12.8%" }
    ],
    crypto: [
      { name: "بیت‌کوین", value: "120,000", change: "+25.7%" },
      { name: "اتریوم", value: "100,000", change: "+18.3%" }
    ]
  };

  const currentData = reportData[selectedPeriod];

  // کامپوننت مودال برای نمایش جزئیات
  const DetailModal = ({ section, onClose }) => {
    const modalContents = {
      netWorth: {
        title: "جزئیات خالص دارایی",
        content: (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">دارایی‌های نقدی</p>
                <p className="text-lg font-bold">1.2 میلیون تومان</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">سرمایه‌گذاری‌ها</p>
                <p className="text-lg font-bold">5.6 میلیون تومان</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">اقساط</p>
                <p className="text-lg font-bold">1.02 میلیون تومان</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">سرمایه گذاری ماهانه</p>
                <p className="text-lg font-bold">2.8 میلیون تومان</p>
              </div>
            </div>
          </div>
        )
      },
      profitLoss: {
        title: "تحلیل سود و زیان",
        content: (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-xl">
              <h4 className="font-semibold mb-2">عملکرد کلی</h4>
              <p className="text-2xl font-bold text-green-600">{currentData.profitLoss}</p>
              <p className="text-gray-600">{currentData.profitLossAmount}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-600">بیشترین سود</p>
                <p className="font-bold">{currentData.bestPerformingAsset.name}</p>
                <p className="text-green-600">{currentData.bestPerformingAsset.return}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-600">کمترین سود</p>
                <p className="font-bold">{currentData.worstPerformingAsset.name}</p>
                <p className="text-red-600">{currentData.worstPerformingAsset.return}</p>
              </div>
            </div>
          </div>
        )
      },
      assets: {
        title: "جزئیات دارایی‌ها",
        content: (
          <div className="space-y-6">
            {/* طلای آبشده */}
            <div className="border border-yellow-200 rounded-xl p-4 bg-yellow-50">
              <h4 className="font-semibold text-yellow-800 mb-3">طلای آبشده</h4>
              {assetBreakdown.gold.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg mb-2">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">۱۸ عیار - </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{item.value} تومان</p>
                    <p className={`text-sm ${item.change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {item.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ارزهای دیجیتال */}
            <div className="border border-purple-200 rounded-xl p-4 bg-purple-50">
              <h4 className="font-semibold text-purple-800 mb-3">ارزهای دیجیتال</h4>
              {assetBreakdown.crypto.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg mb-2">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">ارز دیجیتال</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{item.value} تومان</p>
                    <p className={`text-sm ${item.change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {item.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      },
      payments: {
        title: "جزئیات پرداخت‌ها",
        content: (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-600">اقساط وام</p>
                <p className="text-xl font-bold">450,000 تومان</p>
                <p className="text-xs text-gray-500">وام خودرو - بانک ملت</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-600">اشتراک‌ها</p>
                <p className="text-xl font-bold">180,000 تومان</p>
                <p className="text-xs text-gray-500">فیلیمو. </p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-600">شارژ حساب</p>
                <p className="text-xl font-bold">320,000 تومان</p>
                <p className="text-xs text-gray-500">کیف پول و کارت‌ها</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-600">کارمزد</p>
                <p className="text-xl font-bold">300,000 تومان</p>
                <p className="text-xs text-gray-500">معاملات طلا/کریپتو</p>
              </div>
            </div>
          </div>
        )
      }
    };

    const content = modalContents[section];

    if (!content) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <h3 className="text-xl font-bold">{content.title}</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          <div className="p-6">
            {content.content}
          </div>
          <div className="p-6 border-t">
            <button 
              onClick={onClose}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              بستن
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* هدر اصلی */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                📊 گزارش مالی هوشمند
              </h1>
              <p className="text-gray-600 mt-2">تاریخ تولید: 1 ابان 1404</p>
              <p className="text-gray-500 text-sm">{currentData.period}</p>
            </div>
            
            {/* انتخاب بازه زمانی */}
            <div className="flex gap-2 bg-gray-100 p-2 rounded-2xl">
              {[
                { value: 'biweekly', label: '۲ هفته', icon: '🔄' },
                { value: 'monthly', label: '۱ ماه', icon: '📅' },
                { value: 'quarterly', label: '۳ ماه', icon: '📊' }
              ].map((period) => (
                <button
                  key={period.value}
                  onClick={() => setSelectedPeriod(period.value)}
                  className={`px-6 py-3 rounded-xl transition-all flex items-center gap-2 ${
                    selectedPeriod === period.value
                      ? 'bg-white shadow-lg text-blue-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <span>{period.icon}</span>
                  <span>{period.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* کارت‌های خلاصه وضعیت */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* خالص دارایی */}
            <div 
              className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={() => setSelectedSection('netWorth')}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl">💰</div>
                <div className="text-blue-200 text-sm">خالص دارایی</div>
              </div>
              <p className="text-2xl font-bold mb-2">{currentData.netWorth}</p>
              <p className="text-blue-200 text-sm">کلیک برای جزئیات</p>
            </div>

            {/* سود و زیان */}
            <div 
              className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={() => setSelectedSection('profitLoss')}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl">📈</div>
                <div className="text-green-200 text-sm">سود و زیان</div>
              </div>
              <p className="text-2xl font-bold mb-2">{currentData.profitLoss}</p>
              <p className="text-green-200 text-sm">{currentData.profitLossAmount}</p>
            </div>

            {/* مجموع دارایی‌ها */}
            <div 
              className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={() => setSelectedSection('assets')}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl">💎</div>
                <div className="text-purple-200 text-sm">مجموع دارایی‌ها</div>
              </div>
              <p className="text-2xl font-bold mb-2">{currentData.totalInvestments}</p>
              <p className="text-purple-200 text-sm">طلابشده و ارز دیجیتال</p>
            </div>

            {/* کل پرداخت‌ها */}
            <div 
              className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={() => setSelectedSection('payments')}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl">💳</div>
                <div className="text-orange-200 text-sm">کل پرداخت‌ها</div>
              </div>
              <p className="text-2xl font-bold mb-2">{currentData.totalPayments}</p>
              <p className="text-orange-200 text-sm">اقساط، اشتراک، شارژ</p>
            </div>
          </div>

          {/* بخش‌های پایینی */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* سمت چپ: عملکرد و گردش مالی */}
            <div className="space-y-6">
              {/* نمودار عملکرد */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    📊 عملکرد پرتفوی
                  </h2>
                  <button className="text-blue-600 text-sm hover:text-blue-800 transition-colors">
                    مشاهده جزئیات
                  </button>
                </div>
                <div className="h-48 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📈</div>
                    <p className="text-gray-500">نمودار عملکرد تعاملی</p>
                    <p className="text-gray-400 text-sm">کلیک برای مشاهده نمودار پیشرفته</p>
                  </div>
                </div>
              </div>

              {/* گردش مالی */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  💸 گردش مالی
                </h2>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center bg-green-50 p-4 rounded-xl border border-green-200">
                    <p className="text-gray-600 text-sm">ورودی</p>
                    <p className="text-lg font-bold text-green-600">+{currentData.cashFlow.inflow}</p>
                  </div>
                  <div className="text-center bg-red-50 p-4 rounded-xl border border-red-200">
                    <p className="text-gray-600 text-sm">خروجی</p>
                    <p className="text-lg font-bold text-red-600">-{currentData.cashFlow.outflow}</p>
                  </div>
                  <div className="text-center bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <p className="text-gray-600 text-sm">خالص</p>
                    <p className="text-lg font-bold text-blue-600">{currentData.cashFlow.netFlow}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="font-medium mb-3 text-gray-700">تراکنش‌های اصلی</h3>
                  {currentData.transactions.map((transaction, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                      <span className="text-gray-700">{transaction.category}</span>
                      <span className="font-medium bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {transaction.amount} تومان
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* سمت راست: اطلاعات تکمیلی */}
            <div className="space-y-6">
              {/* رفتار معاملاتی */}
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  🎯 رفتار معاملاتی
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-white bg-opacity-20 p-4 rounded-xl">
                    <span>سبک معاملاتی</span>
                    <span className="font-bold bg-white bg-opacity-30 px-3 py-1 rounded-full">
                      {currentData.tradingBehavior}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-white bg-opacity-20 p-4 rounded-xl">
                    <span>میانگین مدت نگهداری</span>
                    <span className="font-bold">{currentData.avgHoldingPeriod}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white bg-opacity-20 p-4 rounded-xl">
                    <span>تعداد معاملات</span>
                    <span className="font-bold">۲۴ مورد</span>
                  </div>
                </div>
              </div>

              {/* اعلان‌های مهم */}
              <div className="bg-white border border-yellow-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-yellow-700">
                  🔔 اعلان‌های مهم
                </h2>
                <div className="space-y-3">
                  {[
                    "📈 طلای آبشده   ۱۵٪ رشد داشت - زمان مناسب برای فروش",
                    "⚠️ فردا سررسید قسط وام خودرو - مبلغ: ۲۵۰,۰۰۰ تومان",
                    "💡 قیمت طلا در کف حمایتی - فرصت خرید"
                  ].map((notification, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                      <div className="flex-1">
                        <p className="text-yellow-800">{notification}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* پیشنهادات هوش مصنوعی */}
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  🤖 پیشنهادات هوشمند
                </h2>
                <div className="space-y-3">
                  {[
                    "توزیع سرمایه‌گذاری خود را متنوع‌تر کنید",
                    "برای سود بیشتر صندوق‌های سهامی بررسی کنید", 
                    "۲۰٪ از درآمد این ماه را پس‌انداز کنید"
                  ].map((suggestion, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white bg-opacity-20 rounded-lg">
                      <div className="flex-1">
                        <p className="text-white">{suggestion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* بخش اقدام */}
        <div className="flex justify-center gap-4 mt-8">
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center gap-2">
            📋 دریافت گزارش کامل
          </button>
          <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center gap-2">
            💼 تحلیل سبد دارایی
          </button>
          <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center gap-2">
            🧠 مشاوره هوشمند
          </button>
        </div>
      </div>

      {/* مودال نمایش جزئیات */}
      {selectedSection && (
        <DetailModal 
          section={selectedSection} 
          onClose={() => setSelectedSection(null)} 
        />
      )}
    </div>
  );
};

export default FinancialPeriodicalReport;