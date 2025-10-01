FROM node:20

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./
COPY src ./src

RUN npm install

CMD ["npm", "run", "dev"]