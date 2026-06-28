/**
 * API service for communicating with ExamSage backend
 */

import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000, // 2 minutes for large file processing
})

/**
 * Submit syllabus and PYQ files for analysis
 * 
 * @param {string} subjectName - Name of the subject
 * @param {File} syllabusFile - Syllabus file (PDF or TXT)
 * @param {File[]} pyqFiles - Array of question paper files
 * @param {Function} onProgress - Progress callback (optional)
 * @returns {Promise} Analysis results
 */
export const submitAnalysis = async (
  subjectName,
  syllabusFile,
  pyqFiles,
  onProgress = null
) => {
  const formData = new FormData()
  formData.append('subjectName', subjectName)
  formData.append('syllabusFile', syllabusFile)
  
  // Add all PYQ files
  pyqFiles.forEach((file) => {
    formData.append('pyqFiles', file)
  })
  
  try {
    const response = await api.post('/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentComplete = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          onProgress(percentComplete)
        }
      },
    })
    
    return response.data
  } catch (error) {
    throw error.response?.data || {
      error: error.message || 'An error occurred during analysis'
    }
  }
}

/**
 * Check backend health
 */
export const checkHealth = async () => {
  try {
    const response = await api.get('/health')
    return response.data
  } catch (error) {
    throw error
  }
}

export default api
