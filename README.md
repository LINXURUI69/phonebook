# Commands
### Create ConfigMap and Secret for DB
cd ../k8s-services/
microk8s kubectl apply -f db-configmap.yaml
microk8s kubectl get configmap
microk8s kubectl apply -f db-secret.yaml
microk8s kubectl get secret
### Create PersistentVolume and PersistentVolumeClaim for DB
cd ../k8s-services/
microk8s kubectl apply -f db-pv-pvc.yaml
microk8s kubectl get pv
microk8s kubectl get pvc
### Create Deployment and Service for DB
cd ../k8s-services/
docker tag mongo:latest 192.168.64.2:32000/db:latest
docker push 192.168.64.2:32000/db:latest
microk8s kubectl apply -f db-deployment.yaml
microk8s kubectl apply -f db-service.yaml
microk8s kubectl get deployment
microk8s kubectl get svc
### Create Deployment and Service for SERVER
cd ../server
docker build -t server .
docker tag server:latest 192.168.64.2:32000/server:latest
docker push 192.168.64.2:32000/server:latest
cd ../k8s-services/
microk8s kubectl apply -f server-deployment.yaml
microk8s kubectl apply -f server-service.yaml
microk8s kubectl get deployment
microk8s kubectl get svc
### Create Deployment and Service for FRONTEND
cd ../frontend
docker build -t frontend .
docker tag frontend:latest 192.168.64.2:32000/frontend:latest
docker push 192.168.64.2:32000/frontend:latest
cd ../k8s-services/
microk8s kubectl apply -f frontend-deployment.yaml
microk8s kubectl apply -f frontend-service.yaml
microk8s kubectl get deployment
microk8s kubectl get svc
### Clean
microk8s kubectl delete configmap db-configmap
microk8s kubectl delete secret db-secret
microk8s kubectl delete pv db-pv
microk8s kubectl delete pvc db-pvc
microk8s kubectl delete deployment db-deployment
microk8s kubectl delete svc db-service
microk8s kubectl delete deployment server-deployment
microk8s kubectl delete svc server-service
microk8s kubectl delete deployment frontend-deployment
microk8s kubectl delete svc frontend-service
### Some useful commands
microk8s kubectl exec -it <pod> -- /bin/sh
microk8s ctr images help
microk8s ctr images ls | cut -c 1-150

# Features
1. 前端使用Two-Stage构建镜像。
2. 前端、后端和数据库都部署为Deployment。
3. 前端、后端使用NodePort，数据库使用ClusterIP。
4. 后端使用CoreDNS访问数据库。

# TODO
1. 自动扩缩容
2. 升级部署方案