# Platform K8s Migration

DevOps 플랫폼 포털 - Keycloak OAuth 인증 기반의 프로젝트/GitHub/Jenkins 통합 관리 시스템

## 주요 기능

- **Keycloak OAuth 로그인** - SSO 기반 인증
- **프로젝트 관리** - DevOps 프로젝트 생성 및 관리
- **GitHub 저장소 연동** - 프로젝트별 GitHub 저장소 생성/연결
- **Jenkins CI/CD 연동** - 프로젝트별 Jenkins 폴더 생성/관리

## 기술 스택

| 구분 | 기술 |
|------|------|
| Frontend | React 19, Vite 6, Tailwind CSS 4 |
| Backend | Spring Boot 3, Java 17, Spring Security |
| Database | PostgreSQL |
| Auth | Keycloak (OAuth 2.0) |
| CI/CD | Jenkins |
| VCS | GitHub API |
| Container | Docker, Kubernetes |

## 프로젝트 구조

```
platform-k8s-migration/
├── portal/
│   ├── backend/          # Spring Boot 백엔드
│   │   └── src/main/java/io/hjmoons/devops/
│   │       ├── auth/     # OAuth 인증
│   │       ├── project/  # 프로젝트 관리
│   │       ├── github/   # GitHub 연동
│   │       ├── jenkins/  # Jenkins 연동
│   │       └── config/   # Security, Swagger 설정
│   ├── frontend/         # React 프론트엔드
│   │   └── src/
│   │       ├── components/   # UI 컴포넌트
│   │       ├── contexts/     # React Context (인증)
│   │       ├── pages/        # 페이지 컴포넌트
│   │       └── services/     # API 서비스
│   └── k8s/              # Kubernetes 매니페스트
├── CLAUDE.md             # Claude Code 참고 문서
└── README.md
```

## 시작하기

### 사전 요구사항

- Node.js 18+
- Java 17+
- Docker & Docker Compose
- Keycloak 서버
- PostgreSQL

### 환경 설정

#### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:8090/api
VITE_KEYCLOAK_URL=http://localhost:8180
VITE_KEYCLOAK_REALM=devops
VITE_KEYCLOAK_CLIENT_ID=portal
VITE_KEYCLOAK_REDIRECT_URI=http://localhost:5173/callback
VITE_JENKINS_URL=http://localhost:8080
```

#### Backend (application.yml)
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/devops
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: http://localhost:8180/realms/devops

keycloak:
  auth-server-url: http://localhost:8180
  realm: devops
  client-id: portal
  client-secret: ${KEYCLOAK_CLIENT_SECRET}

github:
  token: ${GITHUB_TOKEN}

jenkins:
  url: http://localhost:8080
  username: admin
  token: ${JENKINS_TOKEN}
```

### 개발 서버 실행

```bash
# Frontend
cd portal/frontend
npm install
npm run dev

# Backend
cd portal/backend
./gradlew bootRun
```

### 빌드

```bash
# Frontend
cd portal/frontend
npm run build

# Backend
cd portal/backend
./gradlew build
```

## API 문서

백엔드 실행 후 Swagger UI 접속: `http://localhost:8090/swagger-ui.html`

### 주요 API

| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | /api/auth/callback | OAuth 콜백 처리 |
| GET | /api/projects | 프로젝트 목록 |
| POST | /api/projects | 프로젝트 생성 |
| GET | /api/projects/{id} | 프로젝트 상세 |
| GET | /api/github/{projectId}/repos | GitHub 저장소 목록 |
| POST | /api/github/{projectId}/repos | GitHub 저장소 생성 |
| GET | /api/jenkins/{projectId}/folders | Jenkins 폴더 조회 |
| POST | /api/jenkins/{projectId}/folders | Jenkins 폴더 생성 |

## 화면 구성

### 로그인 페이지
- Keycloak OAuth 로그인 버튼
- 로그인 성공 시 대시보드로 이동

### 대시보드
- 프로젝트 통계 (프로젝트 수, 빌드 현황)
- 프로젝트 목록 테이블
- 프로젝트 생성 모달

### 프로젝트 상세
- GitHub 저장소 섹션
  - 연결된 저장소 목록 (클릭 시 GitHub로 이동)
  - 저장소 추가 모달
- Jenkins 폴더 섹션
  - 연결된 폴더 정보 (클릭 시 Jenkins로 이동)
  - 폴더 생성 모달

## 인증 플로우

```
[사용자] → [로그인 버튼] → [Keycloak 로그인 페이지]
                                    ↓
[대시보드] ← [JWT 저장] ← [Backend /api/auth/callback] ← [OAuth Callback]
```

1. 사용자가 로그인 버튼 클릭
2. Keycloak Authorization URL로 리다이렉트
3. Keycloak에서 로그인 후 `/callback?code=xxx`로 리다이렉트
4. Frontend가 code를 Backend로 전송
5. Backend가 Keycloak에서 토큰 교환 후 JWT 반환
6. Frontend가 JWT를 localStorage에 저장
7. 이후 모든 API 요청에 Bearer 토큰 포함

## 라이선스

MIT License
