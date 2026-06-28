/**
 * Summary card component for displaying key metrics
 */

export default function SummaryCard({ title, value, icon = '📊', subtitle = '' }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-primary-600 mt-2">
            {value !== null && value !== undefined ? value : 'N/A'}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className="text-4xl text-primary-100">{icon}</div>
      </div>
    </div>
  )
}
