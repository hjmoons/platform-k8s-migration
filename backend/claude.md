# DevOps Backend

DevOps 플랫폼 데모 버전 백엔드 API 서버

## 프로젝트 개요

Jenkins, GitHub, Keycloak API를 연동하는 DevOps 플랫폼의 백엔드 서버. 데모/미니 버전으로 간단하게 구현 중.

## 기술 스택

- Java 21
- Spring Boot 3.3.4
- Spring Security + OAuth2 Resource Server
- Spring Data JPA
- H2 Database (파일 기반: `./data/devops`)
- Lombok
- SpringDoc OpenAPI (Swagger UI)

## 프로젝트 구조

```
src/main/java/io/hjmoons/devops/
├── DevopsApplication.java       # 메인 애플리케이션 (JPA Auditing 활성화)
├── config/
│   ├── SecurityConfig.java      # Spring Security 설정 (현재 개발용 전체 허용)
│   └── SwaggerConfig.java       # OpenAPI 설정
├── project/
│   ├── Project.java             # 프로젝트 엔티티
│   ├── ProjectController.java   # REST API 컨트롤러
│   ├── ProjectRepository.java   # JPA Repository
│   ├── ProjectService.java      # 비즈니스 로직
│   └── dto/
│       ├── ProjectRequest.java  # 요청 DTO
│       └── ProjectResponse.java # 응답 DTO
└── jenkins/
    ├── JenkinsFolder.java           # Jenkins 폴더-프로젝트 매핑 엔티티
    ├── JenkinsFolderRepository.java # JPA Repository
    ├── JenkinsProperties.java       # Jenkins 연결 설정 (@ConfigurationProperties)
    ├── JenkinsClient.java           # Jenkins API 호출 클라이언트
    ├── JenkinsService.java          # 비즈니스 로직
    ├── JenkinsController.java       # REST API 컨트롤러
    └── dto/
        ├── JenkinsFolderRequest.java  # 요청 DTO
        └── JenkinsFolderResponse.java # 응답 DTO
```

## API 엔드포인트

Base Path: `/api`

### Project API (`/api/projects`)
- `POST /projects` - 프로젝트 생성
- `GET /projects` - 전체 프로젝트 조회
- `GET /projects/{id}` - 프로젝트 조회
- `PUT /projects/{id}` - 프로젝트 수정
- `DELETE /projects/{id}` - 프로젝트 삭제

### Jenkins API (`/api/jenkins`)
- `POST /jenkins/folders` - Jenkins 폴더 생성 (프로젝트와 매핑)
- `GET /jenkins/folders` - 전체 Jenkins 폴더 조회
- `GET /jenkins/folders/project/{projectId}` - 프로젝트별 Jenkins 폴더 조회

### 개발 도구
- Swagger UI: `/api/swagger-ui/index.html`
- H2 Console: `/api/h2-console`

## 빌드 및 실행

```bash
# 실행
gradle bootRun

# 빌드
gradle build

# 테스트
gradle test
```

## 외부 연동

### Jenkins (구현됨)
- URL: `http://localhost:8080` (로컬 개발용)
- 인증: Basic Auth (username + API token)
- 기능: 폴더 생성

### 향후 연동 예정
- **GitHub API**: 저장소 연동, 웹훅
- **Keycloak**: OAuth2 인증/인가

## 개발 컨벤션

- 패키지 구조: 도메인 기반 (project, user, pipeline 등)
- DTO 사용: Request/Response 분리
- JPA Auditing: createdAt, updatedAt 자동 관리
- Lombok 사용: @Getter, @Setter, @Builder 등

## 현재 상태

- 기본 프로젝트 CRUD API 구현 완료
- Jenkins 폴더 생성 API 연동 완료
- Security 설정은 개발용으로 전체 허용 상태
- Keycloak OAuth2 연동 준비됨 (의존성 추가됨, 설정 미완료)
