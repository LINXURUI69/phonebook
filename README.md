# How to run the application?
### How to build images?
Prerequisites: You need download a mongo:latest Docker image to local. You need enable registry on MicroK8S.
1. Go to /k8s-yamls.
2. Edit /k8s-yamls/image.sh, change registry_ip to the ip address of MicroK8S private registry.
3. Run image.sh to build and push images.
### How to deploy app to MicroK8S?
Prerequisites: You need enable dns and hostpath-storage on MicroK8S.
1. Go to /k8s-yamls.
2. Run deploy.sh to deploy app to MicroK8S.
### How to scale app?
1. Go to /k8s-yamls.
2. Run scale.sh.
### How to delete app?
1. Go to /k8s-yamls.
2. Run clean.sh.