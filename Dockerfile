FROM node:16

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4173

RUN npm run build

CMD [ "npx", "vite", "preview", "--host", "0.0.0.0"]