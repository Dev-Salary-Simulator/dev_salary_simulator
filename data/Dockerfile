FROM node

WORKDIR /app

# Install app dependencies
COPY ./app/package*.json ./

RUN npm install

COPY ./app .

EXPOSE 3000

CMD [ "node", "index.js" ]