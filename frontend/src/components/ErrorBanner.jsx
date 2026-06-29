

export default function ErrorBanner({ message, onClose }) {
  if (!message) return null
  
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded">
      <div className="flex items-start">
        <div className="text-red-500 mr-3 text-xl">⚠️</div>
        <div className="flex-1">
          <p className="text-red-800 font-medium">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 transition ml-2 text-lg"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}
