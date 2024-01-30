# Commands
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

microk8s kubectl get pod
microk8s kubectl get svc
microk8s kubectl get deployment
microk8s kubectl exec -it <pod> -- /bin/sh

# Features
1. 前端、后端和数据库都是Deployment，前端和后端使用NodePort，数据库使用ClusterIP。
2. 外部通过NodePort访问前端和后端，后端通过CoreDNS访问数据库。