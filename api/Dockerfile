FROM node:22.5.1-slim

WORKDIR /home/node/app

# Copiar todo el código fuente
COPY . .

# Instalar dependencias
RUN yarn

# Construir la aplicación
RUN yarn build

# Exponer el puerto
EXPOSE 80

# Comando para iniciar la aplicación
CMD ["yarn", "start"]