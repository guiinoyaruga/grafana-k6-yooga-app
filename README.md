# Grafana K6

### Essa documentação tem como proposito demonstrar como é feita a instalação do K6 e também como realizar a instalação do Influx DB para uso do Dashboard em tempo real dos testes realizados.

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

Depois dos containers serem criados, acesse no navegador o dashboard através do link para realizar o login:

```http://localhost:3000```

Após isso, é necessário criamos o database do InfluxDB para guardar os dados dos testes realizados. Primeiros vamos precisar buscar o id do container com o comando: 

```docker ps```

Após ter o container ID, digite no terminal o seguinte comando, substituindo container ID pelo ID do container que foi salvo anteriormente:

```docker exec -it container ID influx```

Se tudo der certo, o seguinte aviso no terminal deve aparecer:

```connected to http://localhost:8086 version 1.8.10```

A partir daqui, já temos o banco criado para registro dos dados dos testes realizados.


# Criando o Dashboard conectado ao banco do InfluxDB

Acesse o dashboard do Grafana no navegador através do link localhost:3000, vá em Connections e procure por InfluxDB na barra de pesquisa. Clique na imagem do InfluxDB que irá aparecer após a pesquisa.

Na próxima página, clique no botão a sua direita da tela chamado "Create a InfluxDB data source". Na proxima tela, preencha somentes os campos abaixo com os seguintes dados:

name: o nome do banco do influxDB (pode ser qualquer nome)
url: http://influxdb:8086

Os campos abaixo, deixe em branco
- user
- password




