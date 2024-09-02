FROM node:18

# Configura o diretório de trabalho
WORKDIR /app

# Copia os arquivos de configuração
COPY package*.json ./

# Instala as dependências
RUN apt-get update && \
    apt-get install -y build-essential python3 && \
    npm install

# Copia o código da aplicação
COPY . .

# Expõe a porta que o aplicativo usará
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["node", "index.js"]
