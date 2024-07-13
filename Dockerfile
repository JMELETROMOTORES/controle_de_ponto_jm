FROM --platform=linux/amd64 ubuntu:20.04 as homologacao

# Instale dependências necessárias
RUN apt-get update && apt-get install locales nfs-common tini nfs-kernel-server curl libfontconfig1 systemd -y
RUN cd ~

# Instale o Node.js
RUN curl -SLO https://deb.nodesource.com/nsolid_setup_deb.sh
RUN chmod 500 nsolid_setup_deb.sh
RUN ./nsolid_setup_deb.sh 18
RUN apt-get install nodejs -y

# Crie e configure o usuário node
RUN useradd -ms /bin/bash node

WORKDIR /home/node/app

COPY package*.json ./
COPY .env.prod ./.env
# Defina as permissões apropriadas antes de mudar para o usuário node
RUN chown -R node:node /home/node/app

# Mude para o usuário node
USER node

# Instale as dependências do projeto
RUN npm install

# Gere o prisma client

# Copie o restante do código-fonte para o contêiner
COPY --chown=node:node . .
COPY --chown=1030:1010 .env.test /usr/src/app/dist/.env
COPY --chown=1030:1010 .env.test /usr/src/app/.env

RUN npx prisma generate
# Compile o projeto
RUN npm run build

EXPOSE 3333

CMD [ "node", "dist/server.js" ]
