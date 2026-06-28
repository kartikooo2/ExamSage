/**
 * Chapter table component for displaying all chapters
 */

import ChapterRow from './ChapterRow'

export default function ChapterTable({ chapters = [] }) {
  if (!chapters || chapters.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
        <p className="text-lg">No chapters found</p>
      </div>
    )
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="table-header">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Unit</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Chapter</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Questions</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Marks</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Years</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Sections</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Avg Confidence</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {chapters.map((chapter, idx) => (
              <ChapterRow key={idx} chapter={chapter} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
