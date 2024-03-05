FROM node:20
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . /app

CMD ["npm", "run", "start"]

EXPOSE 3000