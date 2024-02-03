registry_ip="192.168.64.2"

docker tag mongo:latest $registry_ip:32000/db:latest
docker push $registry_ip:32000/db:latest

cd ../server
docker build -t server .
docker tag server:latest $registry_ip:32000/server:latest
docker push $registry_ip:32000/server:latest

cd ../frontend
docker build -t frontend .
docker tag frontend:latest $registry_ip:32000/frontend:latest
docker push $registry_ip:32000/frontend:latest