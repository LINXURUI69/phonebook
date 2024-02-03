### Create ConfigMap and Secret for DB
microk8s kubectl apply -f db-configmap.yaml
microk8s kubectl apply -f db-secret.yaml
### Create PersistentVolume and PersistentVolumeClaim for DB
##### Create a dir /mnt/data on cluster node before applying yaml
microk8s kubectl apply -f db-pv-pvc.yaml
### Create ServiceAccount, Role, and RoleBinding for DB
microk8s kubectl apply -f db-rbac.yaml
### Create Deployment and Service for DB
microk8s kubectl apply -f db-deployment.yaml
microk8s kubectl apply -f db-service.yaml
### Add NetworkPolicy to DB
microk8s kubectl apply -f db-networkpolicy.yaml

### Create ServiceAccount, Role, and RoleBinding for SERVER
microk8s kubectl apply -f server-rbac.yaml
### Create Deployment and Service for SERVER
microk8s kubectl apply -f server-deployment.yaml
microk8s kubectl apply -f server-service.yaml
### Add NetworkPolicy to SERVER
microk8s kubectl apply -f server-networkpolicy.yaml

### Create ServiceAccount, Role, and RoleBinding for FRONTEND
microk8s kubectl apply -f frontend-rbac.yaml
### Create Deployment and Service for FRONTEND
microk8s kubectl apply -f frontend-deployment.yaml
microk8s kubectl apply -f frontend-service.yaml
### Add NetworkPolicy to FRONTEND
microk8s kubectl apply -f frontend-networkpolicy.yaml
