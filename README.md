# Commands
docker tag mongo:latest 192.168.64.2:32000/db:latest
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

microk8s kubectl get deployment
microk8s kubectl get pod
microk8s kubectl get svc
microk8s kubectl exec -it <pod> -- /bin/sh

microk8s ctr images help
microk8s ctr images ls | cut -c 1-150

# Features
1. 前端使用Two-Stage构建镜像。
2. 前端、后端和数据库都部署为Deployment。
3. 前端、后端使用NodePort，数据库使用ClusterIP。
4. 后端使用CoreDNS访问数据库。

# TODO
1. PersistentVolume + PersistentVolumeClaim + StorageClass
2. ConfigMap + Secret
3. AutoScaler + Canary