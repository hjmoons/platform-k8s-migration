import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-base sm:text-xl font-bold text-gray-800">DevOps Platform</h1>
            <p className="text-xs text-gray-500 hidden sm:block">통합 개발 운영 플랫폼</p>
          </div>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-2 sm:gap-4">
          {user && (
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-gray-800">{user.name || user.username}</p>
              {user.email && <p className="text-xs text-gray-500">{user.email}</p>}
            </div>
          )}
          <Button variant="outline" onClick={handleLogout} className="text-xs sm:text-sm">
            로그아웃
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
