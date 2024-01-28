# 使用Node.js官方镜像
FROM node:21.5.0

# 设置工作目录
WORKDIR /app/frontend

# 复制应用程序文件
COPY . .

# 安装依赖
RUN npm install

# 暴露端口
EXPOSE 3000

# 运行应用
CMD ["npm", "run", "dev"]