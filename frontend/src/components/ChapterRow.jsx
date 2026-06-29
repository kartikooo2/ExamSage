

import { useState } from 'react'

export default function ChapterRow({ chapter }) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <>
      <tr className="table-row cursor-pointer hover:bg-blue-50" onClick={() => setIsExpanded(!isExpanded)}>
        <td className="px-6 py-4 text-sm font-medium text-gray-900">{chapter.unit}</td>
        <td className="px-6 py-4 text-sm text-gray-700">{chapter.chapter}</td>
        <td className="px-6 py-4 text-sm text-gray-700 font-semibold text-center">
          {chapter.questionCount}
        </td>
        <td className="px-6 py-4 text-sm text-gray-700 text-center">
          {chapter.totalMarks || '-'}
        </td>
        <td className="px-6 py-4 text-sm text-gray-700">
          <div className="flex flex-wrap gap-1">
            {chapter.years && chapter.years.length > 0 ? (
              chapter.years.map((year) => (
                <span
                  key={year}
                  className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                >
                  {year}
                </span>
              ))
            ) : (
              <span className="text-gray-500">-</span>
            )}
          </div>
        </td>
        <td className="px-6 py-4 text-sm">
          <div className="flex flex-wrap gap-1">
            {chapter.sections && Object.keys(chapter.sections).length > 0 ? (
              Object.entries(chapter.sections).map(([section, count]) => (
                <span
                  key={section}
                  className="inline-block px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded"
                >
                  {section}({count})
                </span>
              ))
            ) : (
              <span className="text-gray-500">-</span>
            )}
          </div>
        </td>
        <td className="px-6 py-4 text-sm text-center">
          <span className="font-semibold text-primary-600">
            {(chapter.averageConfidence * 100).toFixed(0)}%
          </span>
        </td>
        <td className="px-6 py-4 text-center">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsExpanded(!isExpanded)
            }}
            className="text-primary-600 hover:text-primary-800 transition text-xl"
          >
            {isExpanded ? '▼' : '▶'}
          </button>
        </td>
      </tr>
      
      {isExpanded && (
        <tr className="bg-gray-50">
          <td colSpan="8" className="px-6 py-4">
            <div className="space-y-4">
              {/* Repeated Topics */}
              {chapter.repeatedTopics && chapter.repeatedTopics.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Repeated Topics:</h4>
                  <div className="flex flex-wrap gap-2">
                    {chapter.repeatedTopics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-3 py-1 text-sm bg-yellow-100 text-yellow-900 rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Matched Questions */}
              {chapter.matchedQuestions && chapter.matchedQuestions.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Matched Questions ({chapter.matchedQuestions.length}):</h4>
                  <div className="space-y-3 bg-white rounded-lg p-3 border border-gray-200">
                    {chapter.matchedQuestions.map((q, idx) => (
                      <div
                        key={idx}
                        className="border-l-4 border-primary-400 pl-3 py-2 text-sm bg-gray-50 rounded p-3"
                      >
                        <p className="text-gray-900 font-medium mb-1">{q.question}</p>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-600">
                          {q.year && <span>📅 {q.year}</span>}
                          {q.section && <span>📍 {q.section}</span>}
                          {q.marks && <span>⭐ {q.marks} marks</span>}
                          <span className="ml-auto text-primary-600 font-semibold">
                            Confidence: {(q.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
