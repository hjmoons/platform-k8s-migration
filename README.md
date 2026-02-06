# DevOps Platform Portal

Keycloak OAuth 인증 기반의 프로젝트/GitHub/Jenkins 통합 관리 포털. Kubernetes 환경에 배포하여 운영한다.

## 주요 기능

- **Keycloak OAuth 로그인** - Authorization Code Flow 기반 SSO 인증
- **프로젝트 관리** - DevOps 프로젝트 생성 및 조회
- **GitHub 저장소 연동** - 프로젝트별 GitHub 저장소 생성/조회, 외부 링크
- **Jenkins 폴더 연동** - 프로젝트별 Jenkins 폴더 생성/조회, 외부 링크

## 기술 스택

| 구분 | 기술 |
|------|------|
| Frontend | React 19, Vite 6, Tailwind CSS 3, React Router 7 |
| Backend | Spring Boot 3.3, Java 21, Spring Security (OAuth2) |
| Database | H2 (파일 기반) |
| Auth | Keycloak (OAuth 2.0 / OpenID Connect) |
| CI/CD | GitHub Actions → GHCR → Kustomize 이미지 태그 자동 업데이트 |
| Infra | Docker, Kubernetes (Kustomize) |

## 프로젝트 구조

```
platform-k8s-migration/
├── backend/                          # Spring Boot 백엔드
│   ├── src/main/java/io/hjmoons/devops/
│   │   ├── auth/                     # OAuth 콜백, 토큰 교환
│   │   ├── project/                  # 프로젝트 CRUD
│   │   ├── github/                   # GitHub API 연동
│   │   ├── jenkins/                  # Jenkins API 연동
│   │   └── config/                   # Security, Swagger 설정
│   ├── src/main/resources/
│   │   └── application.yaml          # 설정 (환경변수 기반)
│   ├── deployment/k8s/               # 백엔드 K8s 매니페스트
│   │   ├── base/                     # Deployment, Service, Ingress, PVC
│   │   └── overlays/dev|prod/        # 환경별 ConfigMap, 패치
│   ├── Dockerfile
│   └── build.gradle
├── frontend/                         # React SPA
│   ├── src/
│   │   ├── components/               # 공통, 레이아웃, 도메인별 컴포넌트
│   │   ├── contexts/AuthContext.jsx   # JWT 인증 상태 관리
│   │   ├── pages/                    # Login, Callback, Dashboard, ProjectDetail
│   │   └── services/                 # API 호출 (axios)
│   ├── deployment/k8s/               # 프론트엔드 K8s 매니페스트
│   ├── Dockerfile                    # nginx 기반
│   └── nginx.conf                    # SPA fallback 설정
├── keycloak/deployment/k8s/          # Keycloak StatefulSet
├── jenkins/deployment/k8s/           # Jenkins Deployment
├── .github/workflows/                # CI/CD 파이프라인
│   ├── portal-backend-build.yaml
│   └── portal-frontend-build.yaml
└── CLAUDE.md
```

## 로컬 개발 환경 설정

### 사전 요구사항

- Node.js 20+
- Java 21+
- Keycloak 서버 (localhost:8180)

### 1. Frontend 환경변수

```bash
cp frontend/.env.example frontend/.env
```

기본값이 로컬 개발 환경에 맞게 설정되어 있다:

```env
VITE_API_BASE_URL=http://localhost:8090/api
VITE_KEYCLOAK_URL=http://localhost:8180
VITE_KEYCLOAK_REALM=devops
VITE_KEYCLOAK_CLIENT_ID=portal
VITE_KEYCLOAK_REDIRECT_URI=http://localhost:5173/callback
```

### 2. Backend 환경변수

`application.yaml`의 URL 관련 설정은 기본값이 localhost로 잡혀있어 별도 설정 불필요. **시크릿만 환경변수로 주입**하면 된다:

| 환경변수 | 설명 | 필수 |
|----------|------|------|
| `KEYCLOAK_CLIENT_SECRET` | Keycloak portal 클라이언트 시크릿 | O |
| `GITHUB_TOKEN` | GitHub Personal Access Token | O |
| `JENKINS_TOKEN` | Jenkins API Token | O |

IntelliJ의 경우 Run Configuration > Environment variables에 설정.

### 3. 실행

```bash
# Frontend (http://localhost:5173)
cd frontend && npm install && npm run dev

# Backend (http://localhost:8090)
cd backend && ./gradlew bootRun
```

### 4. API 문서

백엔드 실행 후 Swagger UI: http://localhost:8090/api/swagger-ui/index.html

## Kubernetes 배포

### 서비스 구성

| 서비스 | Ingress Host | 내부 포트 |
|--------|-------------|-----------|
| Frontend | portal.devops.com | 80 (nginx) |
| Backend | portal-api.devops.com | 8090 |
| Keycloak | keycloak.devops.com | 8080 |
| Jenkins | jenkins.devops.com | 8080 |

### 배포

```bash
# dev 환경
kubectl apply -k backend/deployment/k8s/overlays/dev
kubectl apply -k frontend/deployment/k8s/overlays/dev
kubectl apply -k keycloak/deployment/k8s/overlays/dev
kubectl apply -k jenkins/deployment/k8s/overlays/dev

# Secret은 별도 생성 (gitignore 대상)
kubectl create secret generic portal-backend-secret \
  --from-literal=KEYCLOAK_CLIENT_SECRET=xxx \
  --from-literal=GITHUB_TOKEN=xxx \
  --from-literal=JENKINS_TOKEN=xxx \
  -n devops-dev
```

### 백엔드 ConfigMap (dev)

```yaml
KEYCLOAK_REALM_URL: "http://keycloak:8080/realms/devops"       # 클러스터 내부 통신
KEYCLOAK_EXTERNAL_URL: "http://keycloak.devops.com/realms/devops"  # JWT issuer 매칭
FRONTEND_REDIRECT_URI: "http://portal.devops.com/callback"
CORS_ALLOWED_ORIGINS: "http://portal.devops.com,http://portal-api.devops.com,http://keycloak.devops.com"
```

## CI/CD

GitHub Actions로 빌드 → Docker 이미지 GHCR 푸시 → Kustomize 이미지 태그 자동 커밋.

| 워크플로우 | 트리거 | 동작 |
|-----------|--------|------|
| portal-backend-build | `backend/**` 변경 (deployment 제외) | Gradle bootJar → Docker (amd64/arm64) → GHCR → kustomize edit |
| portal-frontend-build | `frontend/**` 변경 (deployment 제외) | npm build → Docker (amd64/arm64) → GHCR → kustomize edit |

이미지 태그 형식: `YYYYMMDD-{short_sha}` (예: `20260205-9dfebfa`)

## 인증 플로우

```
사용자 → Keycloak 로그인 → /callback?code=xxx → Backend /api/auth/oauth/callback
                                                       ↓
                                              Keycloak 토큰 교환
                                                       ↓
                                              JWT(access_token) 반환
                                                       ↓
                                        Frontend localStorage 저장 → Dashboard
```

이후 모든 API 요청에 `Authorization: Bearer {token}` 헤더를 포함한다.

## API 엔드포인트

| Method | Endpoint | 인증 | 설명 |
|--------|----------|------|------|
| POST | /api/auth/oauth/callback | X | OAuth 코드 → JWT 교환 |
| GET | /api/projects | O | 프로젝트 목록 |
| POST | /api/projects | O | 프로젝트 생성 |
| GET | /api/projects/{id} | O | 프로젝트 상세 |
| GET | /api/github/{projectId}/repos | O | GitHub 저장소 목록 |
| POST | /api/github/{projectId}/repos | O | GitHub 저장소 생성 |
| GET | /api/jenkins/{projectId}/folders | O | Jenkins 폴더 조회 |
| POST | /api/jenkins/{projectId}/folders | O | Jenkins 폴더 생성 |

## 화면 구성

### 로그인
- Keycloak OAuth 로그인 버튼 → 로그인 성공 시 대시보드로 이동

### 대시보드
- 프로젝트 통계 카드 (프로젝트 수, 빌드 현황, 파이프라인)
- 프로젝트 목록 테이블 → 클릭 시 상세 페이지 이동
- 프로젝트 생성 모달

### 프로젝트 상세
- GitHub 저장소 섹션: 연결된 저장소 목록, 추가 모달, GitHub 외부 링크
- Jenkins 폴더 섹션: 연결된 폴더 정보, 생성 모달, Jenkins 외부 링크
