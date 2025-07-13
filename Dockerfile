# Usa imagem base
FROM node:18

# Cria diretório de trabalho
WORKDIR /app

# Copia os arquivos
COPY . .

# Instala dependências
RUN npm install

# Expõe a porta da aplicação
EXPOSE 3000

# Inicia a aplicação
CMD ["npm", "start"]
