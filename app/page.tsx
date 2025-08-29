export default function Home() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Environmental Protection Initiative
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to TadomSea
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Join our mission to protect the Tadom environment by reporting and tracking plastic pollution incidents. Together, we can make a difference.
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <div className="card p-8 hover:scale-[1.02] group">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Report Pollution
              </h3>
              <p className="text-gray-600 mb-4">
                Found plastic waste or pollution? Report it with location details and photos to help us track environmental issues.
              </p>
              <a
                href="/report"
                className="btn-primary inline-flex items-center gap-2"
              >
                Submit Report
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="card p-8 hover:scale-[1.02] group">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                View Heatmap
              </h3>
              <p className="text-gray-600 mb-4">
                Explore an interactive map showing pollution hotspots and reported incidents across the Tadom area.
              </p>
              <a
                href="/heatmap"
                className="btn-secondary inline-flex items-center gap-2"
              >
                Explore Map
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 sm:grid-cols-3 mt-12">
        <div className="card p-6 text-center">
          <div className="text-2xl font-bold text-blue-600">0</div>
          <div className="text-sm text-gray-600 mt-1">Reports Submitted</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-2xl font-bold text-green-600">0</div>
          <div className="text-sm text-gray-600 mt-1">Areas Monitored</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-2xl font-bold text-purple-600">Active</div>
          <div className="text-sm text-gray-600 mt-1">System Status</div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center border border-blue-100">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Make an Impact Today
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Every report matters. Help us create a cleaner, healthier environment for future generations by reporting pollution incidents in your area.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/report" className="btn-primary">
            Report Now
          </a>
          <a href="/heatmap" className="btn-secondary">
            View Current Data
          </a>
        </div>
      </div>
    </div>
  );
}