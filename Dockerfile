# Use uma imagem base do Node.js
FROM node:14

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código da aplicação para o diretório de trabalho
COPY . .

# Exponha a porta que sua aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "index.js"]
