import Card from '../components/common/Card';

const DashboardPage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">대시보드</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">DevOps 플랫폼에 오신 것을 환영합니다</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">프로젝트</p>
              <p className="text-2xl font-bold text-gray-800">0</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">성공한 빌드</p>
              <p className="text-2xl font-bold text-gray-800">0</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">활성 파이프라인</p>
              <p className="text-2xl font-bold text-gray-800">0</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">빠른 시작</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <p className="text-sm sm:text-base font-medium text-blue-900">새 프로젝트 생성</p>
              <p className="text-xs sm:text-sm text-blue-700">Jenkins 파이프라인과 연동된 프로젝트를 생성합니다</p>
            </button>
            <button className="w-full text-left px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <p className="text-sm sm:text-base font-medium text-green-900">GitHub 연동</p>
              <p className="text-xs sm:text-sm text-green-700">GitHub 저장소를 연결합니다</p>
            </button>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">최근 활동</h2>
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm sm:text-base">최근 활동이 없습니다</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
