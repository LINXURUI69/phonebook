# 部署db
### 1. 生成本地docker镜像
1. 在/db目录下执行`docker build -t db .`生成db:latest镜像。
2. 执行`docker tag db:latest localhost:32000/db:latest`生成localhost:32000/db:latest镜像。注意，如果microk8s运行在vm中，则需要通过`multipass list`获取vm的ip，localhost替换为vm的ip，此外，还需要在docker的配置json文件中增加`"insecure-registries": ["ip:32000"]`。
### 2. 将本地docker镜像推送到microk8s个人镜像库
1. 执行`microk8s enable registry`启用microk8s个人镜像库。
2. 执行`docker push localhost:32000/db:latest`将镜像推送到microk8s个人镜像库，如果microk8s运行在vm中，替换localhost为vm的ip。
### 3. 创建deployment和service
5. 在/k8s-services目录下执行`microk8s kubectl apply -f db-deployment.yaml`创建deployment。
6. 执行`microk8s kubectl get pods -l app=db`查看创建的pod是否成功运行。
7. 执行`microk8s kubectl apply -f db-service.yaml`创建service。
8. 执行`microk8s kubectl get svc`查看创建的clusterip。
9. 执行`curl http://<clusterip>:9999/persons`可以返回数据库查询结果，如果microk8s运行在虚拟机，需要在虚拟机内部shell执行该命令。

# 部署server
### 1. 生成本地docker镜像
1. `docker build -t server .`
2. `docker tag server:latest localhost:32000/server:latest`
### 2. 将本地docker镜像推送到microk8s个人镜像库。
1. `docker push localhost:32000/server:latest`
### 3. 创建deployment和service
1. `microk8s kubectl apply -f server-deployment.yaml`
2. `microk8s kubectl get pods -l app=server`
3. `microk8s kubectl apply -f server-service.yaml`
4. `microk8s kubectl get svc`

# 部署frontend
### 1. 生成本地docker镜像
1. `docker build -t frontend .`
2. `docker tag frontend:latest localhost:32000/frontend:latest`
### 2. 将本地docker镜像推送到microk8s个人镜像库。
1. `docker push localhost:32000/frontend:latest`
### 3. 创建deployment和service
1. `microk8s kubectl apply -f frontend-deployment.yaml`
2. `microk8s kubectl get pods -l app=frontend`
3. `microk8s kubectl apply -f frontend-service.yaml`
4. `microk8s kubectl get svc`

# 我需要的命令
cd ../db
docker build -t db .
docker tag db:latest 192.168.64.2:32000/db:latest
docker push 192.168.64.2:32000/db:latest
cd ../k8s-services/
microk8s kubectl apply -f db-deployment.yaml
microk8s kubectl apply -f db-service.yaml
microk8s kubectl delete svc db-service
microk8s kubectl delete deployment db-deployment

cd ../server
docker build -t server .
docker tag server:latest 192.168.64.2:32000/server:latest
docker push 192.168.64.2:32000/server:latest
cd ../k8s-services/
microk8s kubectl apply -f server-deployment.yaml
microk8s kubectl apply -f server-service.yaml
microk8s kubectl delete svc server-service
microk8s kubectl delete deployment server-deployment

cd ../frontend
docker build -t frontend .
docker tag frontend:latest 192.168.64.2:32000/frontend:latest
docker push 192.168.64.2:32000/frontend:latest
cd ../k8s-services/
microk8s kubectl apply -f frontend-deployment.yaml
microk8s kubectl apply -f frontend-service.yaml
microk8s kubectl delete svc frontend-service
microk8s kubectl delete deployment frontend-deployment

microk8s kubectl get svc
microk8s kubectl get pod
microk8s kubectl exec -it <pod> -- /bin/sh