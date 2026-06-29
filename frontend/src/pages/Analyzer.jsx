

import { useState } from 'react'
import Navbar from '../components/Navbar'
import FileUploadCard from '../components/FileUploadCard'
import ErrorBanner from '../components/ErrorBanner'
import LoadingSpinner from '../components/LoadingSpinner'
import { submitAnalysis } from '../services/api'

export default function Analyzer({ onAnalysisComplete, onNavigateHome, backendHealthy, onDemoMode }) {
  const [subjectName, setSubjectName] = useState('')
  const [syllabusFile, setSyllabusFile] = useState(null)
  const [pyqFiles, setPyqFiles] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  
  const isFormValid = subjectName.trim() && syllabusFile && pyqFiles.length > 0
  
  const handleSyllabusSelect = (files) => {
    if (files.length > 0) {
      setSyllabusFile(files[0])
      setError('')
    }
  }
  
  const handlePyqSelect = (files) => {
    setPyqFiles(files)
    setError('')
  }
  
  const handleRemovePyq = (index) => {
    setPyqFiles(pyqFiles.filter((_, i) => i !== index))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!subjectName.trim()) {
      setError('Please enter a subject name')
      return
    }
    
    if (!syllabusFile) {
      setError('Please upload a syllabus file')
      return
    }
    
    if (pyqFiles.length === 0) {
      setError('Please upload at least one question paper')
      return
    }
    
    try {
      setLoading(true)
      setError('')
      
      const result = await submitAnalysis(
        subjectName,
        syllabusFile,
        pyqFiles,
        setUploadProgress
      )
      
      if (result.success) {
        onAnalysisComplete(result)
      } else {
        setError(result.error || 'Analysis failed')
      }
    } catch (err) {
      const errorMessage = err.error || err.message || 'Failed to analyze files. Please check the file format and try again.'
      setError(errorMessage)
      console.error('Analysis error:', err)
    } finally {
      setLoading(false)
      setUploadProgress(0)
    }
  }
  
  if (loading) {
    return (
      <div>
        <Navbar />
        <LoadingSpinner message="Analyzing your files... This may take a minute." />
        {uploadProgress > 0 && (
          <div className="fixed bottom-8 right-8 bg-white rounded-lg shadow-lg p-6 w-80">
            <p className="text-sm font-semibold text-gray-900 mb-2">Upload Progress</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-600 mt-2">{uploadProgress}%</p>
          </div>
        )}
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <button
            onClick={onNavigateHome}
            className="text-primary-600 hover:text-primary-700 font-medium mb-4 flex items-center"
          >
            ← Back to Home
          </button>
          <h1 className="text-4xl font-bold text-gray-900">Analyze Your PYQs</h1>
          <p className="text-gray-600 mt-2">
            Upload your syllabus and question papers to get chapter-wise insights
          </p>
        </div>
        
        {error && <ErrorBanner message={error} onClose={() => setError('')} />}
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Subject Name */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Subject Name *
            </label>
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="e.g., Engineering Mathematics, Data Structures"
              className="input-field"
              required
            />
            <p className="text-sm text-gray-500 mt-2">
              Enter the name of the subject you want to analyze
            </p>
          </div>
          
          {/* Syllabus Upload */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <FileUploadCard
              label="Upload Syllabus File *"
              accept=".pdf,.txt"
              multiple={false}
              onFileSelect={handleSyllabusSelect}
              selectedFiles={syllabusFile ? [syllabusFile] : null}
            />
            <p className="text-sm text-gray-500 mt-3">
              Upload a single syllabus file in PDF or TXT format
            </p>
          </div>
          
          {/* PYQ Files Upload */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <FileUploadCard
              label="Upload Question Papers *"
              accept=".pdf,.txt"
              multiple={true}
              onFileSelect={handlePyqSelect}
              selectedFiles={pyqFiles.length > 0 ? pyqFiles : null}
            />
            <p className="text-sm text-gray-500 mt-3">
              Upload multiple question paper files from different years in PDF or TXT format
            </p>
            
            {pyqFiles.length > 0 && (
              <div className="mt-6 space-y-2">
                <h4 className="font-medium text-gray-900 text-sm">Selected Files:</h4>
                {pyqFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded px-3 py-2"
                  >
                    <span className="text-sm text-blue-900">
                      {idx + 1}. {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemovePyq(idx)}
                      className="text-red-500 hover:text-red-700 transition font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Submit Button */}
          <div className="flex gap-4 flex-col sm:flex-row">
            <button
              type="submit"
              disabled={!isFormValid}
              className="btn-primary flex-1 text-lg py-3"
            >
              {loading ? 'Analyzing...' : 'Analyze 🔍'}
            </button>
            <button
              type="reset"
              onClick={() => {
                setSubjectName('')
                setSyllabusFile(null)
                setPyqFiles([])
                setError('')
              }}
              className="btn-secondary flex-1 text-lg py-3"
            >
              Clear
            </button>
          </div>
          
          {backendHealthy === false && (
            <div className="bg-blue-50 border border-blue-200 rounded p-4 text-center">
              <p className="text-blue-900 font-medium mb-3">
                Backend connection issues? Try our demo analysis instead
              </p>
              <button
                type="button"
                onClick={onDemoMode}
                className="btn-secondary w-full"
              >
                View Demo Analysis
              </button>
            </div>
          )}
        </form>
        
        {/* Info Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="font-bold text-gray-900 mb-3">💡 Tips for Best Results:</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>• Use clear, legible PDF or text files</li>
            <li>• Include the year in question paper filenames (e.g., "Math_2023.pdf")</li>
            <li>• Ensure questions are properly numbered or separated</li>
            <li>• Include section headers (Section A, Section B) for better categorization</li>
            <li>• Add marks information in question papers if available</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
