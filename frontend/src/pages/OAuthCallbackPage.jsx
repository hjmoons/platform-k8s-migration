import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { handleOAuthCallback } from '../services/authService';

const OAuthCallbackPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const isProcessing = useRef(false);

  useEffect(() => {
    const processCallback = async () => {
      // 중복 실행 방지
      if (isProcessing.current) {
        return;
      }
      isProcessing.current = true;

      try {
        // URL에서 authorization code 추출
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (!code) {
          throw new Error('Authorization code가 없습니다');
        }

        // 백엔드에서 토큰 교환
        const data = await handleOAuthCallback(code);

        // 로그인 처리
        login(data.token);

        // 대시보드로 이동
        navigate('/dashboard');
      } catch (error) {
        console.error('OAuth 콜백 처리 실패:', error);
        alert('로그인 처리 중 오류가 발생했습니다.');
        navigate('/login');
      }
    };

    processCallback();
  }, [navigate, login]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-sm sm:text-base text-gray-600">로그인 처리 중...</p>
      </div>
    </div>
  );
};

export default OAuthCallbackPage;
