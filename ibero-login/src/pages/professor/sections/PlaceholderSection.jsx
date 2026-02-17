import { Construction } from 'lucide-react'

const PlaceholderSection = ({ sectionName }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
      <Construction className="mx-auto text-slate-300 mb-4" size={48} />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{sectionName}</h3>
      <p className="text-slate-500">
        This section is under development and will be available soon.
      </p>
    </div>
  )
}

export default PlaceholderSection
