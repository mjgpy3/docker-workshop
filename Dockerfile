FROM node

EXPOSE 3000
VOLUME /tmp

RUN mkdir /app
COPY . /app

ENTRYPOINT ["node", "/app/server.js"]
