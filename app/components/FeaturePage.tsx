'use client'

interface FeaturePageProps {
  id: string
}

export default function FeaturePage({ id }: FeaturePageProps) {
  const getFeatureName = (id: string) => {
    switch (id) {
      case '1':
        return 'پیشنهاد شخصیت سرمایه‌گذاری'
      case '2':
        return 'بودجه‌بندی هوشمند'
      case '3':
        return 'ثبت درآمد و هزینه'
      default:
        return 'ویژگی نامشخص'
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold mb-4">
        {getFeatureName(id)}
      </h1>
      <p className="text-gray-600">در حال توسعه قابلیت شماره {id}...</p>
    </div>
  )
}
