FROM node:16

ENV NODE_ENV=production

WORKDIR /app/api

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 4000

CMD ["sh", "-c", "npm run start"]