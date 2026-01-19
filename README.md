# Platform K8s Migration

DevOps 플랫폼을 Kubernetes로 컨테이너화한 프로젝트입니다.

## 프로젝트 구조

```
platform-k8s-migration/
├── portal/
│   ├── backend/       # 백엔드 서비스
│   ├── frontend/      # 프론트엔드 서비스
│   └── k8s/           # Kubernetes 매니페스트 파일
└── README.md
```

## 기술 스택

- **Backend**: Spring Boot / Java
- **Frontend**: React / TypeScript
- **Container**: Docker
- **Orchestration**: Kubernetes

## 배포

K8s 매니페스트 파일은 `portal/k8s/` 디렉토리에 위치합니다.
