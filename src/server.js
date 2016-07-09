var express = require('express');
var app = express();

app.get('/', (_, res) => {
  console.log('got a request (down here in Node-land)');

  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
