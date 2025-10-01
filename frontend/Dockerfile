FROM node:20

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.ts ./
COPY postcss.config.mjs ./
COPY . .
RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]