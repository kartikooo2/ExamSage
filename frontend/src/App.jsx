import { useState, useEffect } from 'react'
import Home from './pages/Home'
import Analyzer from './pages/Analyzer'
import Results from './pages/Results'
import { checkHealth } from './services/api'
import demoResponse from './data/demoResponse.js'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home') // home, analyzer, results
  const [analysisData, setAnalysisData] = useState(null)
  const [backendHealth, setBackendHealth] = useState(null)
  
  useEffect(() => {
    checkBackendHealth()
  }, [])
  
  const checkBackendHealth = async () => {
    try {
      const response = await checkHealth()
      setBackendHealth(true)
      console.log('Backend is healthy:', response)
    } catch (error) {
      console.warn('Backend health check failed. Using demo mode.')
      setBackendHealth(false)
    }
  }
  
  const handleAnalysisComplete = (data) => {
    setAnalysisData(data)
    setCurrentPage('results')
  }
  
  const handleNavigateHome = () => {
    setCurrentPage('home')
  }
  
  const handleNavigateToAnalyzer = () => {
    setCurrentPage('analyzer')
  }
  
  const handleDemoAnalysis = () => {
    setAnalysisData(demoResponse)
    setCurrentPage('results')
  }
  
  return (
    <div className="min-h-screen">
      {currentPage === 'home' && (
        <Home
          onNavigateToAnalyzer={handleNavigateToAnalyzer}
          onDemoMode={handleDemoAnalysis}
        />
      )}
      
      {currentPage === 'analyzer' && (
        <Analyzer
          onAnalysisComplete={handleAnalysisComplete}
          onNavigateHome={handleNavigateHome}
          backendHealthy={backendHealth}
          onDemoMode={handleDemoAnalysis}
        />
      )}
      
      {currentPage === 'results' && (
        <Results
          analysisData={analysisData}
          onNavigateHome={handleNavigateHome}
        />
      )}
      
      
      {backendHealth === false && currentPage !== 'results' && (
        <div className="fixed bottom-4 left-4 bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded text-sm text-yellow-800">
          <strong>Note:</strong> Backend not connected. Use demo data or ensure Flask server is running on localhost:5000
        </div>
      )}
    </div>
  )
}
