import React from 'react';
import Card from '../components/common/Card';
import OAuthLoginButton from '../components/auth/OAuthLoginButton';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          {/* Logo/Icon */}
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            DevOps Platform
          </h1>
          <p className="text-gray-600">
            통합 개발 운영 플랫폼 데모 버전
          </p>
        </div>

        {/* Divider */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">로그인</span>
            </div>
          </div>
        </div>

        {/* Login Button */}
        <div className="space-y-4">
          <OAuthLoginButton />

          <div className="text-center text-sm text-gray-500">
            <p>Keycloak OAuth 2.0 인증을 사용합니다</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
          <p>Jenkins · GitHub · Keycloak 통합</p>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
