

export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600"></div>
        </div>
        <p className="text-lg text-gray-600 font-medium">{message}</p>
        <p className="text-sm text-gray-500 mt-2">This may take a minute...</p>
      </div>
    </div>
  )
}
