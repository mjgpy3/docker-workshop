FROM node

EXPOSE 3000

RUN mkdir /app
COPY . /app

ENTRYPOINT ["node", "/app/server.js"]
