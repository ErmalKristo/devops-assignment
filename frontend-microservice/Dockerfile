FROM node:18.6.0-alpine3.16

ENV NODE_ENV development
ENV LIGHTSHIP_PORT 9000
WORKDIR /mnt

COPY package*.json ./
RUN npm install
COPY . .

USER node

CMD ["node","index.js"]

EXPOSE 5000 9000
