# Usando a imagem Node oficial
FROM node:18-alpine

# Configuração do ambiente de trabalho
WORKDIR /usr/src/app

# Copiando os arquivos necessários
COPY package*.json ./
COPY tsconfig.json ./
COPY ecosystem.config.js ./
COPY src/ ./src

# Instalando pm2 globalmente
RUN npm install --global pm2

# Instalando as dependências
RUN npm install

# Compilando o código TypeScript
RUN npm run build

# Expondo a porta 3000
EXPOSE 3000

# Comando para iniciar o app com PM2
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
