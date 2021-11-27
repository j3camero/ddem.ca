FROM node:latest

WORKDIR /app

COPY ["openapi.json", "package.json", "./"]

COPY [".npmrc", "./.npmrc"]

RUN npm install

COPY . .

EXPOSE ${API_DEMOCRACY_PORT}

CMD ["node", "index.js"]
