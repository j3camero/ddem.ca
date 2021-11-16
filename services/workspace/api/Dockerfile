FROM node:latest

ARG API_PORT

WORKDIR /app

COPY ["openapi.json", "package.json", "./"]


COPY [".npmrc", "./.npmrc"]

RUN npm install

COPY . .

EXPOSE ${API_PORT}

CMD ["node", "index.js"]
