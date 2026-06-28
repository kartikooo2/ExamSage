

import Navbar from '../components/Navbar'

export default function Home({ onNavigateToAnalyzer }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-gray-900 text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Section */}
        <section className="py-24 text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-extrabold mb-6">
              📚 Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                ExamSage
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              Analyze Previous Year Question Papers using AI and discover
              chapter-wise weightage, frequently asked topics, and exam
              patterns to prepare smarter.
            </p>
          </div>

          <button
            onClick={onNavigateToAnalyzer}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:scale-105 transition-all duration-300"
          >
            🚀 Start Analysis
          </button>
        </section>

        {/* Features */}
        <section className="py-20">

          <h2 className="text-4xl font-bold text-center mb-16">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center hover:border-blue-500 hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-300">
              <div className="text-6xl mb-5">📤</div>

              <h3 className="text-2xl font-bold mb-4">
                Upload Files
              </h3>

              <p className="text-gray-400 leading-7">
                Upload your syllabus and multiple Previous Year Question Papers
                in PDF or TXT format.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center hover:border-cyan-500 hover:shadow-cyan-500/20 hover:shadow-2xl transition-all duration-300">
              <div className="text-6xl mb-5">🤖</div>

              <h3 className="text-2xl font-bold mb-4">
                AI Analysis
              </h3>

              <p className="text-gray-400 leading-7">
                AI automatically maps every question to syllabus chapters using
                intelligent text matching.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center hover:border-purple-500 hover:shadow-purple-500/20 hover:shadow-2xl transition-all duration-300">
              <div className="text-6xl mb-5">📊</div>

              <h3 className="text-2xl font-bold mb-4">
                Visual Insights
              </h3>

              <p className="text-gray-400 leading-7">
                Explore chapter weightage, repeated questions and beautiful
                analytics charts.
              </p>
            </div>

          </div>

        </section>

        {/* Benefits */}

        <section className="py-20">

          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-12">

            <h2 className="text-4xl font-bold text-center mb-12">
              Why Choose ExamSage?
            </h2>

            <div className="grid md:grid-cols-2 gap-10">

              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-2">
                  ✅ Smart Study Planning
                </h3>

                <p className="text-gray-400">
                  Focus on the chapters that appear most frequently in exams.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-green-400 mb-2">
                  📈 Weightage Analysis
                </h3>

                <p className="text-gray-400">
                  Understand marks distribution chapter by chapter.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-2">
                  🎯 Pattern Recognition
                </h3>

                <p className="text-gray-400">
                  Detect repeated topics from years of PYQs.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">
                  🔒 100% Local Processing
                </h3>

                <p className="text-gray-400">
                  Your files stay on your system. No signup required.
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* CTA */}

        <section className="py-24 text-center">

          <h2 className="text-5xl font-bold mb-6">
            Ready to Ace Your Exams?
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            Upload your syllabus and Previous Year Question Papers to generate
            AI-powered insights in seconds.
          </p>

          <button
            onClick={onNavigateToAnalyzer}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 px-10 py-4 rounded-xl text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            Launch Analyzer
          </button>

        </section>

      </main>

      <footer className="border-t border-gray-800 bg-black py-8">
        <div className="text-center text-gray-500">
          © 2025 ExamSage • AI Powered PYQ Weightage Analyzer
        </div>
      </footer>

    </div>
  )
}

