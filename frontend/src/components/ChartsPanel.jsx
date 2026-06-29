

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

export default function ChartsPanel({ chapters = [], sectionDistribution = {} }) {
  // Prepare data for question count chart
  const questionData = chapters
    .map((ch) => ({
      name: ch.chapter.length > 15 ? ch.chapter.substring(0, 12) + '...' : ch.chapter,
      fullName: ch.chapter,
      questions: ch.questionCount
    }))
    .slice(0, 8) // Limit to top 8 chapters
  
  // Prepare data for marks chart (only chapters with marks)
  const marksData = chapters
    .filter((ch) => ch.totalMarks > 0)
    .map((ch) => ({
      name: ch.chapter.length > 15 ? ch.chapter.substring(0, 12) + '...' : ch.chapter,
      fullName: ch.chapter,
      marks: ch.totalMarks
    }))
    .slice(0, 8)
  
  // Prepare section distribution data
  const sectionData = Object.entries(sectionDistribution).map(([name, count]) => ({
    name,
    value: count
  }))
  
  // Colors for pie chart
  const COLORS = ['#6366f1', '#a78bfa', '#c4b5fd', '#e0e7ff', '#818cf8', '#7c3aed']
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Question Count Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Questions by Chapter</h3>
        {questionData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={questionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
                labelStyle={{ color: '#000' }}
                formatter={(value) => value}
                labelFormatter={(label) => {
                  const chapter = chapters.find((ch) => ch.chapter === questionData.find((d) => d.name === label)?.fullName)
                  return chapter?.fullName || label
                }}
              />
              <Bar dataKey="questions" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-center py-10">No data available</p>
        )}
      </div>
      
      {/* Marks Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Marks by Chapter</h3>
        {marksData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={marksData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
                labelStyle={{ color: '#000' }}
              />
              <Bar dataKey="marks" fill="#9333ea" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-center py-10">No marks data available</p>
        )}
      </div>
      
      {/* Section Distribution Pie Chart */}
      {sectionData.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-1">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Questions by Section</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sectionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {sectionData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
      
      {/* Summary Stats */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Analysis Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-700">Total Chapters</span>
            <span className="font-bold text-primary-600">{chapters.length}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-700">Total Questions</span>
            <span className="font-bold text-primary-600">
              {chapters.reduce((sum, ch) => sum + ch.questionCount, 0)}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-700">Total Marks</span>
            <span className="font-bold text-primary-600">
              {chapters.reduce((sum, ch) => sum + (ch.totalMarks || 0), 0)}
            </span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-700">Avg Confidence</span>
            <span className="font-bold text-primary-600">
              {(
                chapters.reduce((sum, ch) => sum + ch.averageConfidence, 0) / chapters.length * 100
              ).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
