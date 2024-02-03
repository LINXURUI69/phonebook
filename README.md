# Commands
### Create ConfigMap and Secret for DB
microk8s kubectl apply -f db-configmap.yaml
microk8s kubectl apply -f db-secret.yaml
### Create PersistentVolume and PersistentVolumeClaim for DB
(Create a dir /mnt/data on cluster node before applying yaml)
microk8s kubectl apply -f db-pv-pvc.yaml
### Create Deployment and Service for DB
docker tag mongo:latest 192.168.64.2:32000/db:latest
docker push 192.168.64.2:32000/db:latest
microk8s kubectl apply -f db-deployment.yaml
microk8s kubectl apply -f db-service.yaml
### Add NetworkPolicy to DB
microk8s kubectl apply -f db-networkpolicy.yaml

### Create Deployment and Service for SERVER
docker build -t server .
docker tag server:latest 192.168.64.2:32000/server:latest
docker push 192.168.64.2:32000/server:latest
microk8s kubectl apply -f server-deployment.yaml
microk8s kubectl apply -f server-service.yaml
### Scale Deployment for SERVER
microk8s kubectl scale deployment server-deployment --replicas=3
### Add NetworkPolicy to SERVER
microk8s kubectl apply -f server-networkpolicy.yaml

### Create Deployment and Service for FRONTEND
docker build -t frontend .
docker tag frontend:latest 192.168.64.2:32000/frontend:latest
docker push 192.168.64.2:32000/frontend:latest
microk8s kubectl apply -f frontend-deployment.yaml
microk8s kubectl apply -f frontend-service.yaml
### Scale Deployment for FRONTEND
microk8s kubectl scale deployment frontend-deployment --replicas=3
### Add NetworkPolicy to FRONTEND
microk8s kubectl apply -f frontend-networkpolicy.yaml

### Clean
microk8s kubectl delete configmap db-configmap
microk8s kubectl delete secret db-secret
microk8s kubectl delete pv db-pv
microk8s kubectl delete pvc db-pvc
microk8s kubectl delete deployment db-deployment
microk8s kubectl delete svc db-service
microk8s kubectl delete networkpolicy db-networkpolicy

microk8s kubectl delete deployment server-deployment
microk8s kubectl delete svc server-service
microk8s kubectl delete networkpolicy server-networkpolicy

microk8s kubectl delete deployment frontend-deployment
microk8s kubectl delete svc frontend-service
microk8s kubectl delete networkpolicy frontend-networkpolicy

### Some useful commands
microk8s kubectl logs <pod>
microk8s kubectl exec -it <pod> -- /bin/sh
microk8s ctr images help
microk8s ctr images ls | cut -c 1-150