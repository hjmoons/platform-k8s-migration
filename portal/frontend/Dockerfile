# Nginx base image
FROM nginx:alpine

# 빌드된 정적 파일 복사 (이미 Vite 빌드된 상태여야 함)
COPY dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]