var express = require('express');
var app = express();
var rp = require('request-promise');
app.use(require('body-parser').json());

const instances = process.env.INSTANCES.split(',')

app.post('/data', (req, res) => {
  var node = instances[Math.floor(Math.random() * instances.length)];

  console.log('POST /data :)');
  console.log('Selecting node', node);

  rp
    .post({
      url: `http://${node}/data`,
      json: true,
      body: req.body
    })
    .then(
      () => res.send('success'),
      err => res.status(500).send(`failure, ${err}`)
    );
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
