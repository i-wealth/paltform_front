'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function UserManagementDashboard() {
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('users')

  // داده‌های کاربران
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'علی محمدی',
      email: 'ali.mohammadi@example.com',
      role: 'کاربر عادی',
      status: 'فعال',
      joinDate: '1402-01-15',
      lastLogin: '1403-06-22 14:30',
      totalTransactions: 47,
      totalVolume: 1250000000,
      phone: '09123456789'
    },
    {
      id: 2,
      name: 'سارا احمدی',
      email: 'sara.ahmadi@example.com',
      role: 'مدیر',
      status: 'فعال',
      joinDate: '1401-11-03',
      lastLogin: '1403-06-22 15:45',
      totalTransactions: 128,
      totalVolume: 3450000000,
      phone: '09129876543'
    },
    {
      id: 3,
      name: 'رضا کریمی',
      email: 'reza.karimi@example.com',
      role: 'کاربر عادی',
      status: 'مسدود',
      joinDate: '1402-08-20',
      lastLogin: '1403-05-15 09:20',
      totalTransactions: 23,
      totalVolume: 680000000,
      phone: '09131234567'
    },
    {
      id: 4,
      name: 'فاطمه حسینی',
      email: 'fateme.hosseini@example.com',
      role: 'ناظر',
      status: 'فعال',
      joinDate: '1402-05-12',
      lastLogin: '1403-06-22 16:10',
      totalTransactions: 65,
      totalVolume: 1890000000,
      phone: '09137654321'
    }
  ])

  // انواع دارایی‌ها
  const assetTypes = [
    'طلای آب‌شده',
    'سکه',
    'صندوق طلا',
    'تتر',
    'بیت‌کوین',
    'سولانا',
    'اتریوم'
  ]

  // تراکنش‌های نمونه
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      user: 'علی محمدی',
      type: 'خرید',
      fromAsset: 'تومان',
      toAsset: 'طلای آب‌شده',
      amount: 50000000,
      volume: 2.1,
      timestamp: '1403-06-22 14:30:25',
      price: 23800000,
      status: 'موفق'
    },
    {
      id: 2,
      user: 'سارا احمدی',
      type: 'تبدیل',
      fromAsset: 'تتر',
      toAsset: 'بیت‌کوین',
      amount: 10000,
      volume: 0.00042,
      timestamp: '1403-06-22 15:15:10',
      price: 650000000000,
      status: 'موفق'
    },
    {
      id: 3,
      user: 'رضا کریمی',
      type: 'فروش',
      fromAsset: 'سکه',
      toAsset: 'تومان',
      amount: 85000000,
      volume: 1,
      timestamp: '1403-06-22 13:45:30',
      price: 85000000,
      status: 'ناموفق'
    },
    {
      id: 4,
      user: 'فاطمه حسینی',
      type: 'خرید',
      fromAsset: 'تومان',
      toAsset: 'اتریوم',
      amount: 75000000,
      volume: 0.25,
      timestamp: '1403-06-22 16:20:15',
      price: 300000000,
      status: 'موفق'
    },
    {
      id: 5,
      user: 'علی محمدی',
      type: 'تبدیل',
      fromAsset: 'طلای آب‌شده',
      toAsset: 'تتر',
      amount: 35000000,
      volume: 1500,
      timestamp: '1403-06-22 11:30:45',
      price: 23333,
      status: 'موفق'
    }
  ])

  // آمار کلی
  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'فعال').length,
    blockedUsers: users.filter(u => u.status === 'مسدود').length,
    totalTransactions: transactions.length,
    totalVolume: transactions.reduce((sum, t) => sum + t.amount, 0),
    successRate: (transactions.filter(t => t.status === 'موفق').length / transactions.length * 100).toFixed(1)
  }

  // تراکنش‌های ۶ ماه اخیر
  const monthlyTransactions = [
    { month: 'فروردین', volume: 1250000000, transactions: 89 },
    { month: 'اردیبهشت', volume: 1870000000, transactions: 112 },
    { month: 'خرداد', volume: 2340000000, transactions: 145 },
    { month: 'تیر', volume: 2980000000, transactions: 167 },
    { month: 'مرداد', volume: 3420000000, transactions: 189 },
    { month: 'شهریور', volume: 4150000000, transactions: 234 }
  ]

  // توزیع دارایی‌ها
  const assetDistribution = [
    { asset: 'طلای آب‌شده', volume: 45, color: '#facc15' },
    { asset: 'تتر', volume: 20, color: '#3b82f6' },
    { asset: 'بیت‌کوین', volume: 15, color: '#f59e0b' },
    { asset: 'سکه', volume: 8, color: '#eab308' },
    { asset: 'اتریوم', volume: 7, color: '#8b5cf6' },
    { asset: 'سولانا', volume: 3, color: '#10b981' },
    { asset: 'صندوق طلا', volume: 2, color: '#f97316' }
  ]

  // ساعات اوج تراکنش‌ها
  const hourlyTransactions = [
    { hour: '8-10', count: 45 },
    { hour: '10-12', count: 78 },
    { hour: '12-14', count: 112 },
    { hour: '14-16', count: 98 },
    { hour: '16-18', count: 67 },
    { hour: '18-20', count: 34 },
    { hour: '20-22', count: 23 }
  ]

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fa-IR') + ' تومان'
  }

  const handleBlockUser = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: user.status === 'فعال' ? 'مسدود' : 'فعال' } : user
    ))
  }

  const handleChangeRole = (userId: number, newRole: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ))
  }

  const getStatusColor = (status: string) => {
    return status === 'فعال' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  const getRoleColor = (role: string) => {
    switch(role) {
      case 'مدیر': return 'bg-purple-100 text-purple-800'
      case 'ناظر': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTransactionTypeColor = (type: string) => {
    switch(type) {
      case 'خرید': return 'bg-green-100 text-green-800'
      case 'فروش': return 'bg-red-100 text-red-800'
      case 'تبدیل': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-8 p-6">
      {/* تب‌های اصلی */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 py-4 px-6 text-center font-medium ${
              activeTab === 'users'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            👥 مدیریت کاربران
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`flex-1 py-4 px-6 text-center font-medium ${
              activeTab === 'transactions'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            💰 تراکنش‌ها و آمار
          </button>
        </div>
      </div>

      {/* آمار کلی */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
      >
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.totalUsers}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">کل کاربران</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center">
          <div className="text-2xl font-bold text-green-600">{stats.activeUsers}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">کاربران فعال</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center">
          <div className="text-2xl font-bold text-red-600">{stats.blockedUsers}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">کاربران مسدود</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center">
          <div className="text-2xl font-bold text-purple-600">{stats.totalTransactions}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">تراکنش‌ها</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center">
          <div className="text-xl font-bold text-orange-600">
            {(stats.totalVolume / 1000000000).toFixed(1)}B
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">حجم معاملات</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center">
          <div className="text-2xl font-bold text-teal-600">{stats.successRate}%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">نرخ موفقیت</div>
        </div>
      </motion.div>

      {/* محتوای تب کاربران */}
      {activeTab === 'users' && (
        <>
          {/* مدیریت کاربران */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold dark:text-gray-100">👥 مدیریت کاربران</h3>
              <button
                onClick={() => setIsUserModalOpen(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
              >
                ➕ کاربر جدید
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700 text-right">
                    <th className="p-3">نام کاربر</th>
                    <th className="p-3">ایمیل</th>
                    <th className="p-3">نقش</th>
                    <th className="p-3">وضعیت</th>
                    <th className="p-3">تعداد تراکنش</th>
                    <th className="p-3">حجم معاملات</th>
                    <th className="p-3">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="p-3">
                        <div>
                          <div className="font-medium dark:text-gray-100">{user.name}</div>
                          <div className="text-xs text-gray-500">{user.phone}</div>
                        </div>
                      </td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">{user.email}</td>
                      <td className="p-3">
                        <select
                          value={user.role}
                          onChange={(e) => handleChangeRole(user.id, e.target.value)}
                          className={`px-2 py-1 rounded-full text-xs ${getRoleColor(user.role)} border-0`}
                        >
                          <option value="کاربر عادی">کاربر عادی</option>
                          <option value="ناظر">ناظر</option>
                          <option value="مدیر">مدیر</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="p-3 text-center">{user.totalTransactions}</td>
                      <td className="p-3 font-medium">
                        {(user.totalVolume / 1000000).toFixed(1)}M
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleBlockUser(user.id)}
                            className={`px-3 py-1 rounded text-xs ${
                              user.status === 'فعال' 
                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                : 'bg-green-600 hover:bg-green-700 text-white'
                            }`}
                          >
                            {user.status === 'فعال' ? 'مسدود' : 'رفع مسدودیت'}
                          </button>
                          <button
                            onClick={() => {
                              setSelectedUser(user)
                              setIsUserModalOpen(true)
                            }}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs"
                          >
                            ویرایش
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </>
      )}

      {/* محتوای تب تراکنش‌ها */}
      {activeTab === 'transactions' && (
        <>
          {/* نمودار حجم تراکنش‌ها در ۶ ماه اخیر */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
          >
            <h3 className="text-lg font-bold dark:text-gray-100 mb-4">
              📈 حجم تراکنش‌ها در ۶ ماه اخیر
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {monthlyTransactions.map((month, index) => (
                <div key={month.month} className="text-center">
                  <div className="bg-gradient-to-b from-indigo-500 to-purple-600 text-white p-4 rounded-lg mb-2">
                    <div className="text-xl font-bold">{(month.volume / 1000000000).toFixed(1)}B</div>
                    <div className="text-xs opacity-90">{month.transactions} تراکنش</div>
                  </div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {month.month}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* توزیع دارایی‌ها */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
          >
            <h3 className="text-lg font-bold dark:text-gray-100 mb-4">
              🎯 توزیع دارایی‌ها در پلتفرم
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {assetDistribution.map((asset) => (
                <div key={asset.asset} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: asset.color }}
                    ></div>
                    <span className="text-sm font-medium">{asset.asset}</span>
                  </div>
                  <span className="text-sm font-bold">{asset.volume}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ساعات اوج تراکنش‌ها */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
          >
            <h3 className="text-lg font-bold dark:text-gray-100 mb-4">
              🕒 ساعات اوج تراکنش‌ها
            </h3>
            <div className="space-y-3">
              {hourlyTransactions.map((hour) => (
                <div key={hour.hour} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ساعت {hour.hour}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(hour.count / 112) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium w-8">{hour.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* لیست تراکنش‌های اخیر */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold dark:text-gray-100">🔄 تراکنش‌های اخیر</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                📥 خروجی گزارش
              </button>
            </div>

            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
                  onClick={() => {
                    setSelectedTransaction(transaction)
                    setIsTransactionModalOpen(true)
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span className={`px-2 py-1 rounded text-xs ${getTransactionTypeColor(transaction.type)}`}>
                      {transaction.type}
                    </span>
                    <div>
                      <div className="font-medium text-sm">
                        {transaction.fromAsset} → {transaction.toAsset}
                      </div>
                      <div className="text-xs text-gray-500">
                        {transaction.user} • {transaction.timestamp}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm">{formatCurrency(transaction.amount)}</div>
                    <div className="text-xs text-gray-500">
                      حجم: {transaction.volume} {transaction.toAsset}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}

      {/* Modal کاربر */}
      {isUserModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-[500px] max-w-[90%] max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4 dark:text-gray-100">
              {selectedUser ? 'ویرایش کاربر' : 'ایجاد کاربر جدید'}
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">نام کامل</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-800"
                    defaultValue={selectedUser?.name || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">ایمیل</label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-800"
                    defaultValue={selectedUser?.email || ''}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">شماره تماس</label>
                  <input
                    type="tel"
                    className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-800"
                    defaultValue={selectedUser?.phone || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">نقش</label>
                  <select className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-800">
                    <option value="کاربر عادی">کاربر عادی</option>
                    <option value="ناظر">ناظر</option>
                    <option value="مدیر">مدیر</option>
                  </select>
                </div>
              </div>

              {!selectedUser && (
                <div>
                  <label className="block text-sm font-medium mb-2">رمز عبور</label>
                  <input
                    type="password"
                    className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-800"
                  />
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsUserModalOpen(false)
                  setSelectedUser(null)
                }}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg text-sm hover:bg-gray-500"
              >
                انصراف
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                {selectedUser ? 'ذخیره تغییرات' : 'ایجاد کاربر'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal جزئیات تراکنش */}
      {isTransactionModalOpen && selectedTransaction && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-[500px] max-w-[90%] max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4 dark:text-gray-100">📋 جزئیات تراکنش</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">نوع تراکنش</label>
                  <p className="text-sm font-medium">{selectedTransaction.type}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">وضعیت</label>
                  <span className={`px-2 py-1 rounded text-xs ${
                    selectedTransaction.status === 'موفق' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedTransaction.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">از دارایی</label>
                  <p className="text-sm font-medium">{selectedTransaction.fromAsset}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">به دارایی</label>
                  <p className="text-sm font-medium">{selectedTransaction.toAsset}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">مبلغ</label>
                  <p className="text-sm font-bold">{formatCurrency(selectedTransaction.amount)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">حجم</label>
                  <p className="text-sm font-medium">{selectedTransaction.volume} {selectedTransaction.toAsset}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">کاربر</label>
                <p className="text-sm">{selectedTransaction.user}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">زمان تراکنش</label>
                <p className="text-sm">{selectedTransaction.timestamp}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">قیمت واحد</label>
                <p className="text-sm">{formatCurrency(selectedTransaction.price)}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsTransactionModalOpen(false)
                  setSelectedTransaction(null)
                }}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg text-sm hover:bg-gray-500"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}