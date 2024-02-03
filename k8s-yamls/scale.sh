# Scale Deployment for SERVER
microk8s kubectl scale deployment server-deployment --replicas=3
# Scale Deployment for FRONTEND
microk8s kubectl scale deployment frontend-deployment --replicas=3