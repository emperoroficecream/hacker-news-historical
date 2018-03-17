const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const queryAPI = require('./query');



/* function extractArticle(article) {
  fs.writeFile(`./articles/${article.id}.txt`, extracted.text, (e) => {
    if (e) console.log(e);
  }); 
  return new Promise((resolve, reject) => {
    curl.get(article.url, {}, (error, response, body) => {
      if (body) {
        let parsed = extractor(body);
        console.log('parsed', parsed.title)
        resolve(parsed);
      } else {
        reject(error || 'nothing found');
      }
    })
  }).catch(e => console.log(e));
} */

app.get('/story', (req, res, next) => {
/*   const mockDataFilePath = path.join(__dirname, 'mockServer/db.json');
  fs.createReadStream(mockDataFilePath)
    .on('error', e => console.log(e))
    .pipe(res); */

    queryAPI(req.query)
      .then(results => {
        res.json(results);
        console.log(results instanceof Array);
/*         const articlePromises = results.map(extractArticle);
        return Promise.all(articlePromises); */
      })
/*       .then(articlePromises => {
        console.log('then,', articlePromises);
      }) */
      .catch(e => {
        console.log(e);
      });
});

app.use(express.static(path.join(__dirname, '..', 'web', 'public')));

app.use((err, req, res, next) => {
  if (req.xhr) {
    res.status(500).send({ error: err});
  } else {
    next(err);
  }
});

app.listen(3000, () => console.log('app started'));