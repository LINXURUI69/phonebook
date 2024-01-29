# 使用Node.js官方镜像
FROM node:21.5.0 as build-container

# 设置工作目录
WORKDIR /app/frontend

# 复制应用程序文件
COPY . .

# 安装依赖
RUN npm install

RUN npm run build

FROM nginx

COPY --from=build-container /app/frontend/dist /usr/share/nginx/html

COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf