# DevOps Platform Frontend

DevOps 플랫폼 데모 버전 프론트엔드

## 기술 스택

- React 19.1.0
- Vite 6.3.5
- React Router DOM 7.13.0
- Tailwind CSS 3.4.17
- Axios 1.10.0

## 프로젝트 구조

```
src/
├── contexts/
│   └── AuthContext.jsx           # 인증 상태 관리
├── services/
│   ├── authService.js            # Keycloak OAuth 인증 API
│   └── projectService.js         # 프로젝트 API
├── components/
│   ├── auth/
│   │   └── OAuthLoginButton.jsx  # OAuth 로그인 버튼
│   ├── layout/
│   │   └── Header.jsx            # 헤더 컴포넌트
│   └── common/
│       ├── Button.jsx            # 공통 버튼
│       └── Card.jsx              # 공통 카드
├── pages/
│   ├── LoginPage.jsx             # 로그인 페이지
│   ├── DashboardPage.jsx         # 대시보드
│   └── OAuthCallbackPage.jsx    # OAuth 콜백 처리
└── App.jsx                       # 라우팅 설정
```

## 환경 설정

`.env` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# Backend API URL
VITE_API_BASE_URL=http://localhost:9090/api

# Keycloak OAuth Configuration
VITE_KEYCLOAK_URL=http://localhost:8180
VITE_KEYCLOAK_REALM=devops
VITE_KEYCLOAK_CLIENT_ID=devops-portal
VITE_KEYCLOAK_REDIRECT_URI=http://localhost:5173/callback
```

## 실행 방법

```bash
# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 빌드 결과물 미리보기
npm run preview
```

## 주요 기능

### 인증
- Keycloak OAuth 2.0 기반 인증
- JWT 토큰 관리
- 라우트 보호 (PrivateRoute, PublicRoute)

### 라우팅
- `/login` - 로그인 페이지
- `/callback` - OAuth 콜백 처리
- `/dashboard` - 대시보드 (인증 필요)

## 개발 서버

- URL: `http://localhost:5173`
- HMR (Hot Module Replacement) 지원
