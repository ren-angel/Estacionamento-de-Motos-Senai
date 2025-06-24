# Usa a imagem Node como base para o Back-end
FROM node:20-alpine

# Cria a pasta /backend dentro do contêiner e entra nela
WORKDIR /backend

# Copia apenas os arquivos necessários para instalar as dependências na pasta /backend
COPY package.json /backend/

# Roda o comando para instalar as dependências no contêiner, --production instala só as dependências de produção
RUN npm install --production

# Copia o restante dos arquivos para o contêiner
COPY . /backend/

# Garante que o script tem permissão para ser executado
# RUN chmod +x /backend/src/config/esperarMySQL.js

# Indica que a aplicação dentro do contêiner é executada na porta 5000.
EXPOSE 5000

# Comando para iniciar o servidor
CMD ["npm", "start"]

# Comanda para esperar o MySQL e só então iniciar o servidor
# CMD ["sh", "-c", "node src/config/esperarMySQL.js && npm start"]