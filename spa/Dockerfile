FROM node:18.12.1

WORKDIR /code

COPY ./salary-simulator ./
RUN npm install && npm run build

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]