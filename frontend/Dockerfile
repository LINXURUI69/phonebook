# 使用Node.js官方镜像
FROM node:21.5.0 as build-container

# 设置工作目录
WORKDIR /app/frontend

# 复制应用程序文件
COPY . .

# 安装依赖
RUN npm install

# 构建应用程序
RUN npm run build

# 使用Nginx官方镜像
FROM nginx

# 复制构建结果
COPY --from=build-container /app/frontend/build /usr/share/nginx/html

# 复制自定义Nginx配置
COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf