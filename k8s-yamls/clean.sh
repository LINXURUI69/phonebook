# Clean
microk8s kubectl delete configmap db-configmap
microk8s kubectl delete secret db-secret
microk8s kubectl delete pv db-pv
microk8s kubectl delete pvc db-pvc
microk8s kubectl delete serviceaccount db-sa
microk8s kubectl delete role db-role
microk8s kubectl delete rolebinding db-role-binding
microk8s kubectl delete deployment db-deployment
microk8s kubectl delete svc db-service
microk8s kubectl delete networkpolicy db-networkpolicy

microk8s kubectl delete serviceaccount server-sa
microk8s kubectl delete role server-role
microk8s kubectl delete rolebinding server-role-binding
microk8s kubectl delete deployment server-deployment
microk8s kubectl delete svc server-service
microk8s kubectl delete networkpolicy server-networkpolicy

microk8s kubectl delete serviceaccount frontend-sa
microk8s kubectl delete role frontend-role
microk8s kubectl delete rolebinding frontend-role-binding
microk8s kubectl delete deployment frontend-deployment
microk8s kubectl delete svc frontend-service
microk8s kubectl delete networkpolicy frontend-networkpolicy