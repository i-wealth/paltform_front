'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function LogManagement() {
  const [selectedLog, setSelectedLog] = useState<any>(null)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [filters, setFilters] = useState({
    logType: '',
    severity: '',
    dateRange: '',
    user: '',
  })

  // انواع لاگ‌ها
  const logTypes = [
    'همه',
    'ورود به سیستم',
    'خطاهای سیستم',
    'اجرای مدل',
    'تغییرات داده',
    'عملیات کاربر',
    'ایمنی و امنیت'
  ]

  // سطوح شدت لاگ
  const severityLevels = [
    { level: 'INFO', color: 'bg-blue-100 text-blue-800', label: 'اطلاعات' },
    { level: 'WARNING', color: 'bg-yellow-100 text-yellow-800', label: 'هشدار' },
    { level: 'ERROR', color: 'bg-red-100 text-red-800', label: 'خطا' },
    { level: 'CRITICAL', color: 'bg-purple-100 text-purple-800', label: 'بحرانی' },
  ]

  // لاگ‌های نمونه
  const [logs, setLogs] = useState([
    {
      id: 1,
      type: 'ورود به سیستم',
      severity: 'INFO',
      message: 'کاربر علی محمدی با موفقیت وارد سیستم شد',
      user: 'علی محمدی',
      ip: '192.168.1.100',
      timestamp: '1403-06-22 14:30:25',
      details: 'ورود از طریق احراز هویت دو مرحله‌ای'
    },
    {
      id: 2,
      type: 'اجرای مدل',
      severity: 'INFO',
      message: 'مدل پیش‌بینی سهام با موفقیت اجرا شد',
      user: 'سیستم',
      ip: 'localhost',
      timestamp: '1403-06-22 14:25:10',
      details: 'مدل: StockPrediction_v2 - زمان اجرا: 2.3 ثانیه'
    },
    {
      id: 3,
      type: 'خطاهای سیستم',
      severity: 'ERROR',
      message: 'خطا در اتصال به پایگاه داده',
      user: 'سیستم',
      ip: '192.168.1.50',
      timestamp: '1403-06-22 14:20:15',
      details: 'Connection timeout after 30 seconds - Retrying...'
    },
    {
      id: 4,
      type: 'تغییرات داده',
      severity: 'WARNING',
      message: 'تغییر در پورتفولیوی کاربر سارا احمدی',
      user: 'سارا احمدی',
      ip: '192.168.1.75',
      timestamp: '1403-06-22 14:15:42',
      details: 'افزایش سرمایه‌گذاری در بخش طلا به میزان 50 میلیون تومان'
    },
    {
      id: 5,
      type: 'ایمنی و امنیت',
      severity: 'CRITICAL',
      message: 'تلاش ناموفق برای دسترسی غیرمجاز',
      user: 'نامشخص',
      ip: '103.21.244.0',
      timestamp: '1403-06-22 14:10:30',
      details: '5 تلاش ناموفق برای ورود به حساب مدیر - IP مسدود شد'
    },
    {
      id: 6,
      type: 'عملیات کاربر',
      severity: 'INFO',
      message: 'کاربر جدید ثبت‌نام کرد',
      user: 'سیستم',
      ip: '192.168.1.200',
      timestamp: '1403-06-22 14:05:18',
      details: 'کاربر: رضا کریمی - نقش: کاربر عادی'
    }
  ])

  // آمار لاگ‌ها
  const logStats = {
    total: logs.length,
    today: logs.filter(log => log.timestamp.includes('1403-06-22')).length,
    errors: logs.filter(log => log.severity === 'ERROR' || log.severity === 'CRITICAL').length,
    uniqueUsers: [...new Set(logs.map(log => log.user))].length
  }

  // فیلتر کردن لاگ‌ها
  const filteredLogs = logs.filter(log => {
    if (filters.logType && filters.logType !== 'همه' && log.type !== filters.logType) return false
    if (filters.severity && log.severity !== filters.severity) return false
    if (filters.user && !log.user.includes(filters.user)) return false
    return true
  })

  const formatDate = (dateString: string) => {
    return dateString
  }

  const getSeverityColor = (severity: string) => {
    const level = severityLevels.find(s => s.level === severity)
    return level ? level.color : 'bg-gray-100 text-gray-800'
  }

  const getSeverityLabel = (severity: string) => {
    const level = severityLevels.find(s => s.level === severity)
    return level ? level.label : severity
  }

  const clearFilters = () => {
    setFilters({
      logType: '',
      severity: '',
      dateRange: '',
      user: '',
    })
  }

  const exportLogs = () => {
    // شبیه‌سازی export لاگ‌ها
    const logData = JSON.stringify(filteredLogs, null, 2)
    const blob = new Blob([logData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `logs_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8 p-6">
      {/* 1. آمار کلی لاگ‌ها */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center">
          <div className="text-2xl font-bold text-blue-600">{logStats.total}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">کل لاگ‌ها</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center">
          <div className="text-2xl font-bold text-green-600">{logStats.today}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">لاگ امروز</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center">
          <div className="text-2xl font-bold text-red-600">{logStats.errors}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">خطاها</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center">
          <div className="text-2xl font-bold text-purple-600">{logStats.uniqueUsers}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">کاربران منحصربفرد</div>
        </div>
      </motion.div>

      {/* 2. هشدار لاگ‌های بحرانی */}
      {logs.some(log => log.severity === 'CRITICAL') && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border-l-4 border-red-400 p-4 rounded-xl shadow"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-red-400 text-xl">🚨</span>
            </div>
            <div className="mr-3">
              <p className="text-red-800 font-semibold">هشدار امنیتی:</p>
              <p className="text-red-700 text-sm mt-1">
                {logs.filter(log => log.severity === 'CRITICAL').length} رویداد بحرانی در سیستم شناسایی شد
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* 3. فیلترها و جستجو */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <h3 className="text-lg font-bold dark:text-gray-100">📊 مدیریت لاگ‌های سیستم</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
            >
              🔍 فیلتر پیشرفته
            </button>
            <button
              onClick={exportLogs}
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
            >
              📥 خروجی JSON
            </button>
          </div>
        </div>

        {/* فیلترهای سریع */}
        <div className="flex flex-wrap gap-2 mb-4">
          <select
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
            value={filters.logType}
            onChange={(e) => setFilters({ ...filters, logType: e.target.value })}
          >
            <option value="">همه انواع</option>
            {logTypes.filter(type => type !== 'همه').map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
            value={filters.severity}
            onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
          >
            <option value="">همه سطوح</option>
            {severityLevels.map(level => (
              <option key={level.level} value={level.level}>{level.label}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="جستجوی کاربر..."
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
            value={filters.user}
            onChange={(e) => setFilters({ ...filters, user: e.target.value })}
          />

          {(filters.logType || filters.severity || filters.user) && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600"
            >
              پاک کردن فیلترها
            </button>
          )}
        </div>

        {/* نمایش لاگ‌ها */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
              onClick={() => setSelectedLog(log)}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(log.severity)}`}>
                    {getSeverityLabel(log.severity)}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{log.type}</span>
                </div>
                <span className="text-xs text-gray-400">{formatDate(log.timestamp)}</span>
              </div>
              <p className="text-sm font-medium mb-1">{log.message}</p>
              <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                <span>👤 {log.user}</span>
                <span>🌐 {log.ip}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            هیچ لاگی با فیلترهای انتخاب شده یافت نشد
          </div>
        )}
      </motion.div>

      {/* 4. توزیع انواع لاگ */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
      >
        <h3 className="text-lg font-bold dark:text-gray-100 mb-4">📈 توزیع انواع لاگ</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {logTypes.filter(type => type !== 'همه').map((type) => {
            const count = logs.filter(log => log.type === type).length
            const percentage = (count / logs.length) * 100
            return (
              <div key={type} className="text-center">
                <div className="text-2xl font-bold text-indigo-600">{count}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{type}</div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{percentage.toFixed(1)}%</div>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* 5. لاگ‌های اخیر */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
      >
        <h3 className="text-lg font-bold dark:text-gray-100 mb-4">🕒 لاگ‌های اخیر (۲۴ ساعت گذشته)</h3>
        <div className="space-y-3">
          {logs.slice(0, 5).map((log) => (
            <div key={log.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${
                  log.severity === 'INFO' ? 'bg-blue-500' :
                  log.severity === 'WARNING' ? 'bg-yellow-500' :
                  log.severity === 'ERROR' ? 'bg-red-500' : 'bg-purple-500'
                }`}></span>
                <div>
                  <p className="text-sm font-medium">{log.message}</p>
                  <p className="text-xs text-gray-500">{log.user} • {formatDate(log.timestamp)}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLog(log)}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                مشاهده
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Modal جزئیات لاگ */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-[500px] max-w-[90%] max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4 dark:text-gray-100">📋 جزئیات کامل لاگ</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">نوع رویداد</label>
                <p className="text-sm font-medium">{selectedLog.type}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">سطح شدت</label>
                <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(selectedLog.severity)}`}>
                  {getSeverityLabel(selectedLog.severity)}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">پیام</label>
                <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">{selectedLog.message}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">جزئیات فنی</label>
                <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-lg font-mono text-xs">
                  {selectedLog.details}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">کاربر</label>
                  <p className="text-sm">{selectedLog.user}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">آی‌پی</label>
                  <p className="text-sm">{selectedLog.ip}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">زمان وقوع</label>
                <p className="text-sm">{formatDate(selectedLog.timestamp)}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg text-sm hover:bg-gray-500"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal فیلتر پیشرفته */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-[450px] max-w-[95%] space-y-4">
            <h3 className="text-lg font-bold mb-3 dark:text-gray-100">🔍 فیلتر پیشرفته لاگ‌ها</h3>

            <div>
              <label className="block text-sm font-medium mb-2">نوع لاگ</label>
              <select
                className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-800"
                value={filters.logType}
                onChange={(e) => setFilters({ ...filters, logType: e.target.value })}
              >
                <option value="">همه انواع</option>
                {logTypes.filter(type => type !== 'همه').map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">سطح شدت</label>
              <select
                className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-800"
                value={filters.severity}
                onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
              >
                <option value="">همه سطوح</option>
                {severityLevels.map(level => (
                  <option key={level.level} value={level.level}>{level.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">بازه زمانی</label>
              <select
                className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-800"
                value={filters.dateRange}
                onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
              >
                <option value="">همه زمان‌ها</option>
                <option value="today">امروز</option>
                <option value="week">هفته جاری</option>
                <option value="month">ماه جاری</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">نام کاربر</label>
              <input
                type="text"
                className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-800"
                placeholder="جستجوی کاربر..."
                value={filters.user}
                onChange={(e) => setFilters({ ...filters, user: e.target.value })}
              />
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg text-sm hover:bg-gray-500"
              >
                لغو
              </button>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                اعمال فیلتر
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}