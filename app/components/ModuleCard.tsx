type Props = {
  title: string
  description: string
  icon: React.ReactNode
}

export default function ModuleCard({ title, description, icon }: Props) {
  return (
    <div className="w-72 bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex justify-center items-center text-blue-600 text-4xl mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-center mb-2">{title}</h3>
      <p className="text-sm text-gray-600 text-center leading-relaxed">{description}</p>
    </div>
  )
}
