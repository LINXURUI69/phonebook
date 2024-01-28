# 使用Node.js官方镜像
FROM node:14

# 设置工作目录
WORKDIR /app/server

# 复制应用程序文件
COPY . .

# 安装依赖
RUN npm install

# 暴露端口
EXPOSE 9999

# 运行应用
CMD ["npm", "start"]
