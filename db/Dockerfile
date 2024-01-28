# 使用Node.js官方镜像
FROM node:14

# 设置工作目录
WORKDIR /app/db

# 复制应用程序文件
COPY . .

# 安装依赖
RUN npm install

# 暴露端口
EXPOSE 3000

# 运行数据库
CMD ["npm", "run", "db"]
