# Documentação K6 

## Essa documentação tem como proposito demonstrar como é feita a instalação do K6 e também como realizar a instalação do Influx DB para uso do Dashboard em tempo real do Grafana

# Instalando o Grafana K6 

Para instalar o K6, você pode usar o seguinte comando:

1. Windows

Digite no terminal o seguinte comando para instalar o Windows Package Manager:

 ```winget install k6 --source winge```

2. Linux 

Digite no terminal os seguintes comandos para instalação do K6 no ambiente Linux:

```
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k
```

3. Docker

Digite no terminal o seguinte comando para instalar via docker image:

```docker pull grafana/k6```


Após isso, já é possível utilizar o K6 para realizar diferentes tipos de testes.


# Instalando e criando o container do InfluxDB e Grafana no Docker

Primeiro, é necessário utilizar o comando abaixo para que ele suba o Grafana junto do InfluxDB no Docker. Com o terminal aberto na pasta grafana-k6-yooga-app/Docker, digite o comando:

```docker-compose up```

