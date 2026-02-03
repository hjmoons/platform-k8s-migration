import axios from '../axios';

/**
 * Keycloak OAuth 로그인 URL 생성
 */
export const getKeycloakLoginUrl = () => {
  const keycloakUrl = import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8180';
  const realm = import.meta.env.VITE_KEYCLOAK_REALM || 'devops';
  const clientId = import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'portal';
  const redirectUri = import.meta.env.VITE_KEYCLOAK_REDIRECT_URI || `${window.location.origin}/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid profile email',
  });

  return `${keycloakUrl}/realms/${realm}/protocol/openid-connect/auth?${params.toString()}`;
};

/**
 * OAuth 콜백 처리 - authorization code로 토큰 교환
 */
export const handleOAuthCallback = async (code) => {
  try {
    const response = await axios.post('/auth/oauth/callback', { code });
    return response.data;
  } catch (error) {
    console.error('OAuth callback 처리 실패:', error);
    throw error;
  }
};

/**
 * 로그아웃
 */
export const logout = async () => {
  try {
    await axios.post('/auth/logout');
  } catch (error) {
    console.error('로그아웃 실패:', error);
  }
};

/**
 * 현재 사용자 정보 가져오기
 */
export const getCurrentUser = async () => {
  try {
    const response = await axios.get('/auth/me');
    return response.data;
  } catch (error) {
    console.error('사용자 정보 가져오기 실패:', error);
    throw error;
  }
};
