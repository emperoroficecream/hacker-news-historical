const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const queryAPI = require('./query');

app.get('/story', (req, res, next) => {
/*   const mockDataFilePath = path.join(__dirname, 'mockServer/db.json');
  fs.createReadStream(mockDataFilePath)
    .on('error', e => console.log(e))
    .pipe(res); */

    queryAPI(req.query)
      .then(results => {
        res.json(results);
      })
      .catch(e => {
        console.log(e);
      });
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