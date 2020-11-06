#!/bin/bash
for hosts in {1}; do

id=$(docker ps -a | cut -c1-12) 
docker rm -f $id
port=5432
pid=$(lsof -i :$port | cut -c10-13 | grep "1")
# lsof -i :$portspostgres
kill -9 $pid;
clear
done

echo "Digite o usuario do banco de dados: "
read user

echo "Digite a senha do banco de dados: "
read senha

echo "Digite a tabela do banco de dados: "
read database
clear
echo "Docker iniciando ..."

docker run --name postgres -e POSTGRES_USER=$user -e POSTGRES_PASSWORD=$senha -e POSTGRES_DB=$database -p 5432:5432 -d postgres


docker run --name adminer -p 8080:8080 --link postgres:postgres -d adminer


