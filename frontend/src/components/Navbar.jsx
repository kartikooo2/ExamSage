/**
 * Navigation bar component
 */

export default function Navbar() {
  return (
    <nav className="bg-primary-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold">📚</div>
            <h1 className="text-2xl font-bold">ExamSage</h1>
            <span className="text-sm text-primary-100 ml-2">PYQ Weightage Analyzer</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            <a href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition">
              Home
            </a>
            <a href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition">
              Analyze
            </a>
            <a href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition">
              Help
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
