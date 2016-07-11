var express = require('express');
var app = express();
var fs = require('fs');
var uuid = require('node-uuid');
var redis = require("redis"),
  redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  });

app.use(require('body-parser').json());

app.get('/', (_, res) => {
  console.log('got a request (down here in Node-land)');

  res.send('Hello World!');
});

app.post('/file', (req, res) => {
  console.log('POST /file :)');
  console.log('CONTENT:', req.body);

  const filename = `${uuid.v4()}.json`;

  fs.writeFile(`/tmp/${filename}`, JSON.stringify(req.body), (err) => {
    if (err) {
      return res.status(500).send('failed to save content');
    }

    res.send(`The file was saved as ${filename}`);
  });
});

const key = 'data';

app.post('/data', (req, res) => {
  console.log('POST /data :)');
  console.log('CONTENT:', req.body);

  redisClient.lpush(key, req.body, (err, data) => {
    if (err) {
      return res.status(500).send(`failed to save content ${err}`);
    }
    return res.send('saved successfully');
  });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
