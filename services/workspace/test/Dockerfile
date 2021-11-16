FROM node:latest

WORKDIR /app

COPY ["package.json", "./"]

COPY [".npmrc", "./.npmrc"]

RUN npm install

COPY . .

CMD ["npm", "run", "test"]
