'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const SystemConfiguration = () => {
  const [selectedConfig, setSelectedConfig] = useState<any>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('apiKeys')

  // تنظیمات API Keys
  const [apiKeys, setApiKeys] = useState([
    {
      id: 1,
      name: 'کلید اصلی زرین‌پال',
      key: 'zp_*****_123456',
      type: 'درگاه پرداخت',
      status: 'فعال',
      lastUsed: '1403-06-22 14:30',
      usage: 1247,
      permissions: ['پرداخت', 'استرداد']
    },
    {
      id: 2,
      name: 'API مدل هوش مصنوعی',
      key: 'sk_*****_789012',
      type: 'هوش مصنوعی',
      status: 'فعال',
      lastUsed: '1403-06-22 15:45',
      usage: 892,
      permissions: ['پیش‌بینی', 'تحلیل']
    },
    {
      id: 3,
      name: 'کلید بازار سرمایه',
      key: 'ts_*****_345678',
      type: 'داده‌های مالی',
      status: 'غیرفعال',
      lastUsed: '1403-06-20 09:20',
      usage: 456,
      permissions: ['نقلات لحظه‌ای', 'تاریخچه']
    }
  ])

  // Threshold های مدل
  const [modelThresholds, setModelThresholds] = useState([
    {
      id: 1,
      modelName: 'پیش‌بینی قیمت طلا',
      parameter: 'confidence_level',
      currentValue: 0.85,
      minValue: 0.5,
      maxValue: 0.95,
      description: 'حداقل اطمینان برای اجرای مدل'
    },
    {
      id: 2,
      modelName: 'تحلیل ریسک سهام',
      parameter: 'risk_tolerance',
      currentValue: 0.7,
      minValue: 0.3,
      maxValue: 0.9,
      description: 'حداکثر ریسک قابل تحمل'
    },
    {
      id: 3,
      modelName: 'پیش‌بینی ارز دیجیتال',
      parameter: 'volatility_threshold',
      currentValue: 0.15,
      minValue: 0.05,
      maxValue: 0.3,
      description: 'آستانه نوسان برای هشدار'
    },
    {
      id: 4,
      modelName: 'تشخیص الگو',
      parameter: 'pattern_accuracy',
      currentValue: 0.92,
      minValue: 0.8,
      maxValue: 0.98,
      description: 'دقت تشخیص الگوهای معاملاتی'
    }
  ])

  // Task Scheduler
  const [scheduledTasks, setScheduledTasks] = useState([
    {
      id: 1,
      name: 'بروزرسانی قیمت‌ها',
      description: 'دریافت آخرین قیمت‌های طلا و ارز',
      schedule: 'هر 5 دقیقه',
      nextRun: '1403-06-22 16:05',
      status: 'فعال',
      lastRun: '1403-06-22 16:00',
      lastRunStatus: 'موفق'
    },
    {
      id: 2,
      name: 'پشتیبان‌گیری داده‌ها',
      description: 'تهیه بک‌آپ از پایگاه داده',
      schedule: 'روزانه - 02:00',
      nextRun: '1403-06-23 02:00',
      status: 'فعال',
      lastRun: '1403-06-22 02:00',
      lastRunStatus: 'موفق'
    },
    {
      id: 3,
      name: 'اجرای مدل‌های پیش‌بینی',
      description: 'اجرای مدل‌های هوش مصنوعی برای پیش‌بینی',
      schedule: 'ساعتی',
      nextRun: '1403-06-22 17:00',
      status: 'فعال',
      lastRun: '1403-06-22 16:00',
      lastRunStatus: 'موفق'
    },
    {
      id: 4,
      name: 'پاک‌سازی لاگ‌ها',
      description: 'حذف لاگ‌های قدیمی',
      schedule: 'هفتگی - شنبه 00:00',
      nextRun: '1403-06-24 00:00',
      status: 'غیرفعال',
      lastRun: '1403-06-17 00:00',
      lastRunStatus: 'موفق'
    }
  ])

  // تنظیمات سیستم
  const [systemSettings, setSystemSettings] = useState([
    {
      category: 'امنیت',
      settings: [
        { name: 'احراز هویت دو مرحله‌ای', value: true, type: 'boolean' },
        { name: 'حداکثر تلاش ورود', value: 5, type: 'number' },
        { name: 'مدت زمان قفل حساب', value: 30, type: 'number', unit: 'دقیقه' }
      ]
    },
    {
      category: 'اعلان‌ها',
      settings: [
        { name: 'اعلان ایمیل', value: true, type: 'boolean' },
        { name: 'اعلان پیامک', value: false, type: 'boolean' },
        { name: 'اعلان درون‌برنامه‌ای', value: true, type: 'boolean' }
      ]
    },
    {
      category: 'کارایی',
      settings: [
        { name: 'حافظه کش', value: 512, type: 'number', unit: 'MB' },
        { name: 'تعداد Threads', value: 8, type: 'number' },
        { name: 'فاصله بروزرسانی', value: 5, type: 'number', unit: 'ثانیه' }
      ]
    }
  ])

  const handleToggleAPIKey = (id: number) => {
    setApiKeys(apiKeys.map(key => 
      key.id === id ? { ...key, status: key.status === 'فعال' ? 'غیرفعال' : 'فعال' } : key
    ))
  }

  const handleUpdateThreshold = (id: number, newValue: number) => {
    setModelThresholds(thresholds => 
      thresholds.map(threshold => 
        threshold.id === id ? { ...threshold, currentValue: newValue } : threshold
      )
    )
  }

  const handleToggleTask = (id: number) => {
    setScheduledTasks(tasks => 
      tasks.map(task => 
        task.id === id ? { ...task, status: task.status === 'فعال' ? 'غیرفعال' : 'فعال' } : task
      )
    )
  }

  const handleRunTask = (id: number) => {
    // شبیه‌سازی اجرای تسک
    const task = scheduledTasks.find(t => t.id === id)
    if (task) {
      alert(`تسک "${task.name}" در حال اجرا است...`)
    }
  }

  const getStatusColor = (status: string) => {
    return status === 'فعال' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  const getRunStatusColor = (status: string) => {
    return status === 'موفق' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  const generateNewAPIKey = () => {
    const newKey = {
      id: Date.now(),
      name: 'کلید جدید',
      key: 'new_*****_' + Math.random().toString(36).substr(2, 6),
      type: 'عمومی',
      status: 'فعال',
      lastUsed: 'هرگز',
      usage: 0,
      permissions: ['دسترسی پایه']
    }
    setApiKeys([...apiKeys, newKey])
  }

  return (
    <div className="space-y-8 p-6">
      {/* تب‌های اصلی */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('apiKeys')}
            className={`flex-1 py-4 px-6 text-center font-medium ${
              activeTab === 'apiKeys'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            🔑 کلیدهای API
          </button>
          <button
            onClick={() => setActiveTab('thresholds')}
            className={`flex-1 py-4 px-6 text-center font-medium ${
              activeTab === 'thresholds'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            ⚡ Threshold مدل‌ها
          </button>
          <button
            onClick={() => setActiveTab('scheduler')}
            className={`flex-1 py-4 px-6 text-center font-medium ${
              activeTab === 'scheduler'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            🕒 Task Scheduler
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-4 px-6 text-center font-medium ${
              activeTab === 'settings'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            ⚙️ تنظیمات سیستم
          </button>
        </div>
      </div>

      {/* محتوای تب کلیدهای API */}
      {activeTab === 'apiKeys' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold dark:text-gray-100">🔑 مدیریت کلیدهای API</h3>
              <button
                onClick={generateNewAPIKey}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
              >
                ➕ کلید جدید
              </button>
            </div>

            <div className="space-y-4">
              {apiKeys.map((key) => (
                <div key={key.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold dark:text-gray-100">{key.name}</h4>
                      <p className="text-sm text-gray-500">{key.type}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(key.status)}`}>
                        {key.status}
                      </span>
                      <button
                        onClick={() => handleToggleAPIKey(key.id)}
                        className={`px-3 py-1 rounded text-xs ${
                          key.status === 'فعال' 
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                      >
                        {key.status === 'فعال' ? 'غیرفعال' : 'فعال'}
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">کلید:</span>
                      <p className="font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded mt-1">{key.key}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">آخرین استفاده:</span>
                      <p>{key.lastUsed}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">تعداد استفاده:</span>
                      <p>{key.usage.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <span className="text-gray-500 text-sm">دسترسی‌ها:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {key.permissions.map((permission, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-yellow-400 text-xl">⚠️</span>
              </div>
              <div className="mr-3">
                <p className="text-yellow-800 font-semibold">توصیه امنیتی:</p>
                <p className="text-yellow-700 text-sm mt-1">
                  کلیدهای API را به صورت دوره‌ای بازبینی و کلیدهای استفاده نشده را غیرفعال کنید.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* محتوای تب Threshold مدل‌ها */}
      {activeTab === 'thresholds' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-lg font-bold dark:text-gray-100 mb-6">⚡ تنظیمات Threshold مدل‌های هوش مصنوعی</h3>

            <div className="space-y-6">
              {modelThresholds.map((threshold) => (
                <div key={threshold.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold dark:text-gray-100">{threshold.modelName}</h4>
                      <p className="text-sm text-gray-500">{threshold.description}</p>
                    </div>
                    <div className="text-left">
                      <span className="text-2xl font-bold text-indigo-600">
                        {threshold.currentValue}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">پارامتر:</span>
                      <span className="font-medium">{threshold.parameter}</span>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-500">
                          محدوده: {threshold.minValue} - {threshold.maxValue}
                        </span>
                        <span className="font-medium">مقدار فعلی: {threshold.currentValue}</span>
                      </div>
                      <input
                        type="range"
                        min={threshold.minValue}
                        max={threshold.maxValue}
                        step="0.01"
                        value={threshold.currentValue}
                        onChange={(e) => handleUpdateThreshold(threshold.id, parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateThreshold(threshold.id, threshold.minValue)}
                        className="px-3 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600"
                      >
                        حداقل
                      </button>
                      <button
                        onClick={() => handleUpdateThreshold(threshold.id, (threshold.minValue + threshold.maxValue) / 2)}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                      >
                        پیش‌فرض
                      </button>
                      <button
                        onClick={() => handleUpdateThreshold(threshold.id, threshold.maxValue)}
                        className="px-3 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600"
                      >
                        حداکثر
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* محتوای تب Task Scheduler */}
      {activeTab === 'scheduler' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-lg font-bold dark:text-gray-100 mb-6">🕒 مدیریت تسک‌های زمان‌بندی شده</h3>

            <div className="space-y-4">
              {scheduledTasks.map((task) => (
                <div key={task.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold dark:text-gray-100">{task.name}</h4>
                      <p className="text-sm text-gray-500">{task.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                      <button
                        onClick={() => handleToggleTask(task.id)}
                        className={`px-3 py-1 rounded text-xs ${
                          task.status === 'فعال' 
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                      >
                        {task.status === 'فعال' ? 'متوقف' : 'شروع'}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">زمان‌بندی:</span>
                      <p className="font-medium">{task.schedule}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">اجرای بعدی:</span>
                      <p>{task.nextRun}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">آخرین اجرا:</span>
                      <p>{task.lastRun}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">وضعیت آخرین اجرا:</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getRunStatusColor(task.lastRunStatus)}`}>
                        {task.lastRunStatus}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => handleRunTask(task.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                      disabled={task.status === 'غیرفعال'}
                    >
                      اجرای دستی
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-xl shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-blue-400 text-xl">ℹ️</span>
              </div>
              <div className="mr-3">
                <p className="text-blue-800 font-semibold">اطلاعات زمان‌بندی:</p>
                <p className="text-blue-700 text-sm mt-1">
                  تمام زمان‌ها به وقت محلی (Tehran) نمایش داده می‌شوند.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* محتوای تب تنظیمات سیستم */}
      {activeTab === 'settings' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-lg font-bold dark:text-gray-100 mb-6">⚙️ تنظیمات پیشرفته سیستم</h3>

            <div className="space-y-6">
              {systemSettings.map((category, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4 className="font-bold text-lg mb-4 dark:text-gray-100">{category.category}</h4>
                  
                  <div className="space-y-4">
                    {category.settings.map((setting, settingIndex) => (
                      <div key={settingIndex} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                        <div>
                          <span className="font-medium dark:text-gray-100">{setting.name}</span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {setting.type === 'boolean' ? (
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={setting.value}
                                onChange={() => {}}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                            </label>
                          ) : (
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                value={setting.value}
                                onChange={() => {}}
                                className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-center bg-white dark:bg-gray-700"
                              />
                              {setting.unit && (
                                <span className="text-sm text-gray-500">{setting.unit}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button className="px-4 py-2 bg-gray-400 text-white rounded-lg text-sm hover:bg-gray-500">
                بازنشانی
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                ذخیره تغییرات
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* اطلاعات سیستم */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
      >
        <h3 className="text-lg font-bold dark:text-gray-100 mb-4">📊 وضعیت سیستم</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600">۹۹.۸٪</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">آپ‌تایم</div>
          </div>
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">۴۲ms</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">میانگین پاسخ</div>
          </div>
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">۱.۲K</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">درخواست/دقیقه</div>
          </div>
          <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">۶۵٪</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">مصرف CPU</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default SystemConfiguration