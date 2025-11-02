'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const SystemHealthDashboard = () => {
  const [selectedService, setSelectedService] = useState<any>(null)
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)
  const [timeRange, setTimeRange] = useState('1h')

  // وضعیت سرویس‌ها
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'API سرور اصلی',
      status: 'active',
      uptime: '99.98%',
      responseTime: '42ms',
      cpu: 65,
      memory: 42,
      lastIncident: '2 روز پیش',
      endpoint: 'https://api.irwealth.com/v1'
    },
    {
      id: 2,
      name: 'پایگاه داده',
      status: 'active',
      uptime: '99.95%',
      responseTime: '18ms',
      cpu: 45,
      memory: 78,
      lastIncident: '1 هفته پیش',
      endpoint: 'postgresql://db.irwealth.com'
    },
    {
      id: 3,
      name: 'کش ردیس',
      status: 'warning',
      uptime: '99.92%',
      responseTime: '5ms',
      cpu: 85,
      memory: 65,
      lastIncident: '12 ساعت پیش',
      endpoint: 'redis://cache.irwealth.com'
    },
    {
      id: 4,
      name: 'سرویس پرداخت',
      status: 'active',
      uptime: '99.99%',
      responseTime: '128ms',
      cpu: 32,
      memory: 28,
      lastIncident: '1 ماه پیش',
      endpoint: 'https://payment.irwealth.com'
    },
    {
      id: 5,
      name: 'سرویس هوش مصنوعی',
      status: 'error',
      uptime: '98.75%',
      responseTime: '256ms',
      cpu: 92,
      memory: 88,
      lastIncident: '30 دقیقه پیش',
      endpoint: 'https://ai.irwealth.com'
    },
    {
      id: 6,
      name: 'CDN و ذخیره‌سازی',
      status: 'active',
      uptime: '99.99%',
      responseTime: '15ms',
      cpu: 25,
      memory: 35,
      lastIncident: '3 ماه پیش',
      endpoint: 'https://cdn.irwealth.com'
    }
  ])

  // صف‌های سیستم
  const [queues, setQueues] = useState([
    {
      name: 'پردازش تراکنش‌ها',
      currentSize: 1247,
      maxSize: 5000,
      processingRate: '45/ثانیه',
      avgWaitTime: '2.3s',
      status: 'normal'
    },
    {
      name: 'اجرای مدل‌های AI',
      currentSize: 892,
      maxSize: 2000,
      processingRate: '12/ثانیه',
      avgWaitTime: '8.7s',
      status: 'warning'
    },
    {
      name: 'ارسال اعلان‌ها',
      currentSize: 345,
      maxSize: 10000,
      processingRate: '89/ثانیه',
      avgWaitTime: '0.5s',
      status: 'normal'
    },
    {
      name: 'پشتیبان‌گیری',
      currentSize: 0,
      maxSize: 1000,
      processingRate: '1/ثانیه',
      avgWaitTime: '0s',
      status: 'normal'
    }
  ])

  // مصرف منابع
  const resourceUsage = {
    cpu: {
      current: 68,
      trend: 'up',
      cores: 16,
      load: [65, 68, 72, 70, 68, 65, 70]
    },
    memory: {
      current: 58,
      trend: 'stable',
      total: '32GB',
      used: '18.5GB',
      trendData: [55, 56, 58, 57, 58, 59, 58]
    },
    disk: {
      current: 42,
      trend: 'up',
      total: '1TB',
      used: '420GB',
      trendData: [38, 39, 40, 41, 42, 42, 42]
    },
    network: {
      current: 125,
      trend: 'down',
      unit: 'Mbps',
      trendData: [140, 135, 130, 128, 125, 122, 125]
    }
  }

  // هشدارهای فعال
  const [activeAlerts, setActiveAlerts] = useState([
    {
      id: 1,
      severity: 'high',
      service: 'سرویس هوش مصنوعی',
      message: 'مصرف CPU به ۹۲٪ رسیده است',
      timestamp: '1403-06-22 15:30',
      acknowledged: false
    },
    {
      id: 2,
      severity: 'medium',
      service: 'کش ردیس',
      message: 'حافظه کش در حال پر شدن است',
      timestamp: '1403-06-22 14:45',
      acknowledged: true
    },
    {
      id: 3,
      severity: 'low',
      service: 'صف مدل‌های AI',
      message: 'زمان انتظار در صف افزایش یافته',
      timestamp: '1403-06-22 13:20',
      acknowledged: false
    }
  ])

  // آمار کلی
  const systemStats = {
    totalServices: services.length,
    activeServices: services.filter(s => s.status === 'active').length,
    warningServices: services.filter(s => s.status === 'warning').length,
    errorServices: services.filter(s => s.status === 'error').length,
    totalUptime: '99.96%',
    avgResponseTime: '78ms'
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'error': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'active': return 'فعال'
      case 'warning': return 'هشدار'
      case 'error': return 'خطا'
      default: return 'نامشخص'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getQueueStatusColor = (status: string) => {
    switch(status) {
      case 'normal': return 'bg-green-100 text-green-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'critical': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const calculateUsagePercentage = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100)
  }

  const handleAcknowledgeAlert = (alertId: number) => {
    setActiveAlerts(alerts =>
      alerts.map(alert =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    )
  }

  const handleRestartService = (serviceId: number) => {
    const service = services.find(s => s.id === serviceId)
    if (service) {
      alert(`سرویس "${service.name}" در حال راه‌اندازی مجدد...`)
      // در اینجا کد واقعی برای راه‌اندازی مجدد سرویس قرار می‌گیرد
    }
  }

  return (
    <div className="space-y-8 p-6">
      {/* آمار کلی سیستم */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
      >
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center">
          <div className="text-2xl font-bold text-blue-600">{systemStats.totalServices}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">کل سرویس‌ها</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center">
          <div className="text-2xl font-bold text-green-600">{systemStats.activeServices}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">سرویس‌های فعال</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center">
          <div className="text-2xl font-bold text-yellow-600">{systemStats.warningServices}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">در حالت هشدار</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center">
          <div className="text-2xl font-bold text-red-600">{systemStats.errorServices}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">دارای خطا</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center">
          <div className="text-2xl font-bold text-purple-600">{systemStats.totalUptime}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">آپ‌تایم کل</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center">
          <div className="text-2xl font-bold text-teal-600">{systemStats.avgResponseTime}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">میانگین پاسخ</div>
        </div>
      </motion.div>

      {/* هشدارهای فعال */}
      {activeAlerts.some(alert => !alert.acknowledged) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border-l-4 border-red-400 p-4 rounded-xl shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-red-400 text-xl">🚨</span>
              </div>
              <div className="mr-3">
                <p className="text-red-800 font-semibold">هشدارهای فعال:</p>
                <p className="text-red-700 text-sm mt-1">
                  {activeAlerts.filter(alert => !alert.acknowledged).length} هشدار نیاز به توجه دارد
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsAlertModalOpen(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
            >
              مشاهده هشدارها
            </button>
          </div>
        </motion.div>
      )}

      {/* سرویس‌ها و وضعیت‌ها */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold dark:text-gray-100">🔄 وضعیت سرویس‌ها</h3>
          <div className="flex gap-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
            >
              <option value="1h">۱ ساعت گذشته</option>
              <option value="6h">۶ ساعت گذشته</option>
              <option value="24h">۲۴ ساعت گذشته</option>
              <option value="7d">۷ روز گذشته</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-bold dark:text-gray-100">{service.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(service.status)}`}>
                  {getStatusLabel(service.status)}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">آپ‌تایم:</span>
                  <span className="font-medium">{service.uptime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">زمان پاسخ:</span>
                  <span className="font-medium">{service.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">مصرف CPU:</span>
                  <span className="font-medium">{service.cpu}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">مصرف حافظه:</span>
                  <span className="font-medium">{service.memory}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">آخرین حادثه:</span>
                  <span className="font-medium">{service.lastIncident}</span>
                </div>
              </div>

              {service.status !== 'active' && (
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRestartService(service.id)
                    }}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                  >
                    راه‌اندازی مجدد
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* مصرف منابع */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* مصرف CPU و Memory */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
        >
          <h3 className="text-lg font-bold dark:text-gray-100 mb-4">💻 مصرف منابع</h3>
          
          <div className="space-y-4">
            {/* CPU */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">پردازنده (CPU)</span>
                <span className="text-sm text-gray-500">{resourceUsage.cpu.cores} Core</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${resourceUsage.cpu.current}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-500">{resourceUsage.cpu.current}% استفاده</span>
                <span className={`flex items-center ${resourceUsage.cpu.trend === 'up' ? 'text-red-500' : 'text-green-500'}`}>
                  {resourceUsage.cpu.trend === 'up' ? '📈' : '📉'}
                  روند {resourceUsage.cpu.trend === 'up' ? 'صعودی' : 'نزولی'}
                </span>
              </div>
            </div>

            {/* Memory */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">حافظه (RAM)</span>
                <span className="text-sm text-gray-500">{resourceUsage.memory.used} / {resourceUsage.memory.total}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div
                  className="bg-green-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${resourceUsage.memory.current}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-500">{resourceUsage.memory.current}% استفاده</span>
                <span className="text-gray-500">پایدار</span>
              </div>
            </div>

            {/* Disk */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">دیسک</span>
                <span className="text-sm text-gray-500">{resourceUsage.disk.used} / {resourceUsage.disk.total}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div
                  className="bg-purple-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${resourceUsage.disk.current}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-500">{resourceUsage.disk.current}% استفاده</span>
                <span className="text-yellow-500">📈 روند صعودی</span>
              </div>
            </div>

            {/* Network */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">شبکه</span>
                <span className="text-sm text-gray-500">پهنای باند</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div
                  className="bg-orange-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(resourceUsage.network.current / 2, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-500">{resourceUsage.network.current} {resourceUsage.network.unit}</span>
                <span className="text-green-500">📉 روند نزولی</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* صف‌های سیستم */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
        >
          <h3 className="text-lg font-bold dark:text-gray-100 mb-4">📊 صف‌های سیستم</h3>
          
          <div className="space-y-4">
            {queues.map((queue, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium dark:text-gray-100">{queue.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs ${getQueueStatusColor(queue.status)}`}>
                    {queue.status === 'normal' ? 'عادی' : queue.status === 'warning' ? 'هشدار' : 'بحرانی'}
                  </span>
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">اندازه صف</span>
                      <span className="font-medium">{queue.currentSize.toLocaleString()} / {queue.maxSize.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${calculateUsagePercentage(queue.currentSize, queue.maxSize)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">نرخ پردازش:</span>
                      <p className="font-medium">{queue.processingRate}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">میانگین انتظار:</span>
                      <p className="font-medium">{queue.avgWaitTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* لاگ‌های عملکرد */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
      >
        <h3 className="text-lg font-bold dark:text-gray-100 mb-4">📈 عملکرد سیستم در ۲۴ ساعت گذشته</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">۱۲۴۷</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">درخواست API</div>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600">۹۹.۹٪</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">موفقیت درخواست‌ها</div>
          </div>
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">۴۲ms</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">میانگین پاسخ</div>
          </div>
          <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">۰</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">قطعی سرویس</div>
          </div>
        </div>
      </motion.div>

      {/* Modal جزئیات سرویس */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-[500px] max-w-[90%] max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4 dark:text-gray-100">🔍 جزئیات سرویس</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-lg">{selectedService.name}</h4>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedService.status)}`}>
                  {getStatusLabel(selectedService.status)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">آپ‌تایم:</span>
                  <p className="font-medium">{selectedService.uptime}</p>
                </div>
                <div>
                  <span className="text-gray-500">زمان پاسخ:</span>
                  <p className="font-medium">{selectedService.responseTime}</p>
                </div>
                <div>
                  <span className="text-gray-500">مصرف CPU:</span>
                  <p className="font-medium">{selectedService.cpu}%</p>
                </div>
                <div>
                  <span className="text-gray-500">مصرف حافظه:</span>
                  <p className="font-medium">{selectedService.memory}%</p>
                </div>
              </div>

              <div>
                <span className="text-gray-500 text-sm">آخرین حادثه:</span>
                <p className="font-medium">{selectedService.lastIncident}</p>
              </div>

              <div>
                <span className="text-gray-500 text-sm">Endpoint:</span>
                <p className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1">
                  {selectedService.endpoint}
                </p>
              </div>

              {selectedService.status !== 'active' && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                    ⚠️ این سرویس در حالت {getStatusLabel(selectedService.status)} قرار دارد. 
                    برای بازیابی عملکرد مطلوب، راه‌اندازی مجدد پیشنهاد می‌شود.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg text-sm hover:bg-gray-500"
              >
                بستن
              </button>
              {selectedService.status !== 'active' && (
                <button
                  onClick={() => {
                    handleRestartService(selectedService.id)
                    setSelectedService(null)
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                >
                  راه‌اندازی مجدد
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal هشدارها */}
      {isAlertModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-[600px] max-w-[90%] max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4 dark:text-gray-100">🚨 هشدارهای فعال</h3>
            
            <div className="space-y-3">
              {activeAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`border rounded-lg p-4 ${
                    alert.acknowledged 
                      ? 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700' 
                      : getSeverityColor(alert.severity) + ' border'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        alert.severity === 'high' ? 'bg-red-500 text-white' :
                        alert.severity === 'medium' ? 'bg-yellow-500 text-white' :
                        'bg-blue-500 text-white'
                      }`}>
                        {alert.severity === 'high' ? 'بالا' : alert.severity === 'medium' ? 'متوسط' : 'پایین'}
                      </span>
                      <span className="font-medium text-sm">{alert.service}</span>
                    </div>
                    <span className="text-xs text-gray-500">{alert.timestamp}</span>
                  </div>
                  
                  <p className="text-sm mb-3">{alert.message}</p>
                  
                  {!alert.acknowledged && (
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleAcknowledgeAlert(alert.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                      >
                        تایید هشدار
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsAlertModalOpen(false)}
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

export default SystemHealthDashboard