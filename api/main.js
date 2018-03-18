const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const queryAPI = require('./query');
const curl = require('curlrequest');
const extractor = require('unfluff');

function extractArticle(article) {
  return new Promise((resolve, reject) => {
    curl.request({
      url: article.url,
      timeout: 3
    }, (error, response) => {
      if (response) {
        let parsed = extractor(response);
        console.log('parsed', parsed.title)
        resolve(parsed);
      } else {
        reject(error || 'nothing found');
      }
    })
  }).catch(e => console.log(e));
}

app.get('/story', (req, res, next) => {
    queryAPI(req.query)
      .then(results => {
        res.json(results);
        console.log(results instanceof Array);
        const articlePromises = results.map(extractArticle);
        return Promise.all(articlePromises);
      })
      .then(articles => {
        articles.forEach(a => {
          if (a) {
            console.log(a);
/*             a = JSON.parse(a); */
            fs.writeFileSync(`${a.title}.txt`, a.text, e => {
              console.log(e);
            })
          }
        })
      })
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