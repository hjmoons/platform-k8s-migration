# CLAUDE.md

이 파일은 Claude Code가 프로젝트를 이해하고 작업할 때 참고하는 문서입니다.

## 프로젝트 개요

DevOps 플랫폼 포털 - Keycloak OAuth 인증 기반의 프로젝트/GitHub/Jenkins 관리 시스템

## 기술 스택

### Frontend (frontend)
- React 19.1.0 + Vite 6.3.5
- Tailwind CSS 4.1.7
- React Router DOM 7.6.0
- Axios (HTTP 클라이언트)
- jwt-decode (JWT 토큰 디코딩)

### Backend (backend)
- Spring Boot 3.x
- Java 17+
- Spring Security (OAuth2 Resource Server)
- Spring Data JPA
- PostgreSQL

### 인프라
- Keycloak (OAuth 2.0 인증)
- Jenkins (CI/CD)
- GitHub API 연동
- Docker / Kubernetes (Kustomize)
- GitHub Actions (CI/CD 파이프라인)

## Kubernetes 배포 구조

```
├── keycloak/deployment/k8s/
│   ├── base/
│   │   ├── statefulset.yaml
│   │   ├── service-headless.yaml
│   │   ├── ingress.yaml
│   │   └── kustomization.yaml
│   └── overlays/dev/
│       └── kustomization.yaml
├── jenkins/deployment/k8s/
│   ├── base/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   ├── ingress.yaml
│   │   ├── rbac.yaml
│   │   └── kustomization.yaml
│   └── overlays/dev/
│       └── kustomization.yaml
├── backend/deployment/k8s/
│   ├── base/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   ├── ingress.yaml
│   │   └── kustomization.yaml
│   └── overlays/dev/
│       ├── configmap.yaml
│       └── kustomization.yaml
└── frontend/deployment/k8s/
    ├── base/
    │   ├── deployment.yaml
    │   ├── service.yaml
    │   ├── ingress.yaml
    │   └── kustomization.yaml
    └── overlays/dev/
        └── kustomization.yaml
```

## K8s 환경변수 (Backend ConfigMap)

```yaml
KEYCLOAK_CLIENT_ID: "portal"
KEYCLOAK_REALM_URL: "http://keycloak:8080/realms/devops"        # 내부 URL (서버 간 통신)
KEYCLOAK_EXTERNAL_URL: "http://keycloak.devops.com/realms/devops" # 외부 URL (JWT issuer 매칭)
JENKINS_URL: "http://jenkins:8080"                               # 내부 URL
FRONTEND_REDIRECT_URI: "http://portal.devops.com/callback"
CORS_ALLOWED_ORIGINS: "http://portal.devops.com,http://portal-api.devops.com,http://keycloak.devops.com"
```

### JWT issuer 내부/외부 URL 분리

- `KEYCLOAK_REALM_URL`: Pod 내부에서 Keycloak 접근 (jwk-set-uri)
- `KEYCLOAK_EXTERNAL_URL`: JWT의 iss 클레임과 매칭 (issuer-uri)
- Keycloak은 KC_HOSTNAME_URL 기반으로 토큰 issuer를 설정하므로 분리 필요

## 프론트엔드 구조

```
frontend/src/
├── App.jsx                 # 라우팅 및 레이아웃 설정
├── main.jsx               # React 진입점
├── index.css              # Tailwind CSS 설정
├── axios.js               # Axios 인스턴스 (인터셉터 포함)
├── components/
│   ├── common/
│   │   ├── Button.jsx     # 공통 버튼 컴포넌트
│   │   └── Card.jsx       # 공통 카드 컴포넌트
│   ├── layout/
│   │   └── Header.jsx     # 헤더 (사용자 정보 표시)
│   ├── auth/
│   │   └── OAuthLoginButton.jsx
│   ├── project/
│   │   └── ProjectCreateModal.jsx
│   ├── github/
│   │   └── GitHubRepoCreateModal.jsx
│   └── jenkins/
│       └── JenkinsFolderCreateModal.jsx
├── contexts/
│   └── AuthContext.jsx    # 인증 상태 관리 (JWT 디코딩 포함)
├── pages/
│   ├── LoginPage.jsx      # 로그인 페이지
│   ├── OAuthCallbackPage.jsx  # OAuth 콜백 처리
│   ├── DashboardPage.jsx  # 대시보드 (프로젝트 목록)
│   └── ProjectDetailPage.jsx  # 프로젝트 상세 (GitHub/Jenkins)
└── services/
    ├── authService.js     # 인증 API
    ├── projectService.js  # 프로젝트 API
    ├── githubService.js   # GitHub API
    └── jenkinsService.js  # Jenkins API
```

## 백엔드 구조

```
backend/src/main/java/io/hjmoons/devops/
├── DevopsApplication.java
├── config/
│   ├── SecurityConfig.java    # Spring Security 설정
│   └── SwaggerConfig.java     # Swagger 문서화
├── auth/
│   ├── AuthController.java    # /api/auth/*
│   ├── AuthService.java
│   └── dto/
├── project/
│   ├── Project.java           # 엔티티
│   ├── ProjectController.java # /api/projects/*
│   ├── ProjectService.java
│   ├── ProjectRepository.java
│   └── dto/
├── github/
│   ├── GitHubRepo.java        # 엔티티
│   ├── GitHubController.java  # /api/github/*
│   ├── GitHubService.java
│   ├── GitHubClient.java      # GitHub API 클라이언트
│   ├── GitHubRepoRepository.java
│   └── dto/
└── jenkins/
    ├── JenkinsFolder.java     # 엔티티
    ├── JenkinsController.java # /api/jenkins/*
    ├── JenkinsService.java
    ├── JenkinsClient.java     # Jenkins API 클라이언트
    ├── JenkinsRepository.java
    └── dto/
```

## API 엔드포인트

### 인증
- `POST /api/auth/callback` - OAuth 콜백 (code → JWT 교환)

### 프로젝트
- `GET /api/projects` - 프로젝트 목록 조회
- `GET /api/projects/{id}` - 프로젝트 상세 조회
- `POST /api/projects` - 프로젝트 생성

### GitHub
- `GET /api/github/{projectId}/repos` - 프로젝트별 저장소 목록
- `POST /api/github/{projectId}/repos` - 저장소 생성/연결

### Jenkins
- `GET /api/jenkins/{projectId}/folders` - 프로젝트별 폴더 조회
- `POST /api/jenkins/{projectId}/folders` - 폴더 생성

## 환경 변수 (Frontend)

```env
VITE_API_BASE_URL=http://localhost:8090/api
VITE_KEYCLOAK_URL=http://localhost:8180
VITE_KEYCLOAK_REALM=devops
VITE_KEYCLOAK_CLIENT_ID=portal
VITE_KEYCLOAK_REDIRECT_URI=http://localhost:5173/callback
VITE_JENKINS_URL=http://localhost:8080
```

## 인증 플로우

1. 사용자가 로그인 버튼 클릭
2. Keycloak 로그인 페이지로 리다이렉트
3. 로그인 성공 시 `/callback?code=xxx`로 리다이렉트
4. 프론트엔드가 code를 백엔드 `/api/auth/callback`으로 전송
5. 백엔드가 Keycloak과 code를 교환하여 JWT 발급
6. JWT를 localStorage에 저장하고 대시보드로 이동
7. 이후 모든 API 요청에 `Authorization: Bearer {token}` 헤더 포함

## 주요 기능

1. **Keycloak OAuth 로그인** - Authorization Code Flow
2. **프로젝트 관리** - 생성, 조회
3. **GitHub 저장소 연동** - 프로젝트별 저장소 생성/조회, 외부 링크
4. **Jenkins 폴더 관리** - 프로젝트별 폴더 생성/조회, 외부 링크

## 개발 서버 실행

```bash
# Frontend
cd frontend
npm install
npm run dev  # http://localhost:5173

# Backend
cd backend
./gradlew bootRun  # http://localhost:8090
```

## 빌드 명령어

```bash
# Frontend 빌드
cd frontend
npm run build

# Backend 빌드
cd backend
./gradlew build
```

## Kubernetes 배포

```bash
# 전체 배포 (dev 환경)
kubectl apply -k keycloak/deployment/k8s/overlays/dev
kubectl apply -k jenkins/deployment/k8s/overlays/dev
kubectl apply -k backend/deployment/k8s/overlays/dev
kubectl apply -k frontend/deployment/k8s/overlays/dev

# 개별 재시작
kubectl rollout restart deployment portal-backend -n devops-dev
kubectl rollout restart deployment portal-frontend -n devops-dev
```

## GitHub Actions CI/CD

### 트리거 조건

- `workflow_dispatch`: 수동 실행
- `push`: main 브랜치에 소스 변경 시 (deployment/ 제외)
- `pull_request`: main 브랜치 대상 PR

### 파이프라인 흐름

1. 소스 빌드 (Gradle/npm)
2. Docker 이미지 빌드 (multi-arch: amd64, arm64)
3. GHCR에 이미지 푸시
4. kustomize 이미지 태그 업데이트
5. 변경사항 커밋/푸시

## Ingress 도메인 (dev)

| 서비스 | 도메인 |
| ------ | ------ |
| Frontend | portal.devops.com |
| Backend API | portal-api.devops.com/api |
| Keycloak | keycloak.devops.com |
| Jenkins | jenkins.devops.com |
