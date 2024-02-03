# Some useful commands
microk8s kubectl logs <pod>
microk8s kubectl exec -it <pod> -- /bin/sh
microk8s ctr images help
microk8s ctr images ls | cut -c 1-150