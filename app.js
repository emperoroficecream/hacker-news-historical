const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.get('/data', (req, res, next) => {
  const mockDataFilePath = path.join(__dirname, 'mockServer/db.json');
  fs.createReadStream(mockDataFilePath)
    .on('error', e => console.log(e))
    .pipe(res);
});

app.use(express.static('public'));

app.use((err, req, res, next) => {
  if (req.xhr) {
    res.status(500).send({ error: err});
  } else {
    next(err);
  }
});

app.listen(3000, () => console.log('app started'));