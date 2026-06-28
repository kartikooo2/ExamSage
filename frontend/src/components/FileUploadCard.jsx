/**
 * File upload card component for selecting files
 */

import { useState } from 'react'

export default function FileUploadCard({
  label,
  accept = '.pdf,.txt',
  multiple = false,
  onFileSelect,
  selectedFiles = null
}) {
  const [isDragging, setIsDragging] = useState(false)
  
  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }
  
  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }
  
  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (onFileSelect) {
      onFileSelect(multiple ? files : [files[0]])
    }
  }
  
  const handleFileInput = (e) => {
    const files = Array.from(e.target.files)
    if (onFileSelect) {
      onFileSelect(multiple ? files : [files[0]])
    }
  }
  
  const getFileName = (file) => {
    if (typeof file === 'string') return file
    return file.name
  }
  
  const getFileSize = (file) => {
    if (typeof file === 'string') return ''
    return `(${(file.size / 1024 / 1024).toFixed(2)} MB)`
  }
  
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {label}
      </label>
      
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition ${
          isDragging
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 bg-gray-50 hover:border-gray-400'
        }`}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          className="hidden"
          id={`file-input-${label}`}
        />
        
        <label htmlFor={`file-input-${label}`} className="cursor-pointer block">
          <div className="text-4xl mb-2">📁</div>
          <p className="text-primary-600 font-semibold">Click to upload</p>
          <p className="text-gray-500 text-sm">or drag and drop</p>
          <p className="text-gray-400 text-xs mt-2">PDF or TXT files</p>
        </label>
      </div>
      
      {selectedFiles && selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {selectedFiles.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-green-50 border border-green-200 rounded px-3 py-2 text-sm"
            >
              <span className="text-green-700 font-medium">✓ {getFileName(file)}</span>
              <span className="text-gray-500">{getFileSize(file)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
