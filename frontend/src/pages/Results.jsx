

import Navbar from '../components/Navbar'
import SummaryCard from '../components/SummaryCard'
import ChapterTable from '../components/ChapterTable'
import ChartsPanel from '../components/ChartsPanel'

export default function Results({ analysisData, onNavigateHome }) {
  if (!analysisData || !analysisData.data) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-500 py-12">
            <p className="text-lg">No analysis data available</p>
            <button
              onClick={onNavigateHome}
              className="btn-primary mt-4"
            >
              Go Back
            </button>
          </div>
        </main>
      </div>
    )
  }
  
  const { data, totalQuestionsProcessed } = analysisData
  const { subject, summary, chapters } = data
  const { sectionDistribution = {} } = analysisData
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={onNavigateHome}
            className="text-primary-600 hover:text-primary-700 font-medium mb-4 flex items-center"
          >
            ← Start New Analysis
          </button>
          <h1 className="text-4xl font-bold text-gray-900">
            📊 Analysis Results
          </h1>
          <p className="text-xl text-gray-600 mt-2">
            {subject}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Processed {totalQuestionsProcessed} questions from {summary.totalPapers} exam papers
          </p>
        </div>
        
        {/* Summary Cards */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SummaryCard
              title="Total Papers Analyzed"
              value={summary.totalPapers}
              icon="📄"
            />
            <SummaryCard
              title="Total Chapters Found"
              value={summary.totalChapters}
              icon="📚"
            />
            <SummaryCard
              title="Most Repeated Chapter"
              value={summary.mostRepeatedChapter}
              icon="🔥"
              subtitle="Most frequent in exams"
            />
            <SummaryCard
              title="Highest Weightage"
              value={summary.highestWeightageChapter}
              icon="⭐"
              subtitle="Highest marks contribution"
            />
          </div>
        </section>
        
        {/* Charts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Visual Insights</h2>
          <ChartsPanel
            chapters={chapters}
            sectionDistribution={sectionDistribution}
          />
        </section>
        
        {/* Chapter Details Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Chapter-wise Details
          </h2>
          <p className="text-gray-600 mb-6">
            Click on any row to expand and view matched questions with confidence scores
          </p>
          <ChapterTable chapters={chapters} />
        </section>
        
        {/* Stats Footer */}
        <section className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-8 border border-primary-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Analysis Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Questions Analyzed</p>
              <p className="text-3xl font-bold text-primary-600 mt-2">{totalQuestionsProcessed}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">Chapters Discovered</p>
              <p className="text-3xl font-bold text-primary-600 mt-2">{chapters.length}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">Average Matching Confidence</p>
              <p className="text-3xl font-bold text-primary-600 mt-2">
                {chapters.length > 0
                  ? (
                      (chapters.reduce((sum, ch) => sum + ch.averageConfidence, 0) /
                        chapters.length) *
                      100
                    ).toFixed(0)
                  : 0}
                %
              </p>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <div className="mt-12 text-center space-y-4">
          <p className="text-gray-700 text-lg">
            ✨ Ready to ace your exams with these insights?
          </p>
          <button
            onClick={onNavigateHome}
            className="btn-primary text-lg px-8 py-3 inline-block"
          >
            Analyze Another Subject
          </button>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            Use these insights wisely. Focus on high-weightage chapters and repeated topics. 📚
          </p>
        </div>
      </footer>
    </div>
  )
}
