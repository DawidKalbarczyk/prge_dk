FROM node:24
LABEL maintainer="Dawid Kalbarczyk"

WORKDIR app

COPY config/node/frontend/package.json .
RUN npm install

COPY config/node/frontend .
ENV CI=false

# Komenda zamykająca uruchamiająca polecenie i zamykająca terminal
CMD ["npm", "start"]