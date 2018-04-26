const functions = require('firebase-functions');
const express = require('express');
const app = express();
const queryAPI = require('./query');
const curl = require('curlrequest');
const extractor = require('unfluff');

const RESPONSE_TIMEOUT = 5000;

process.env['GOOGLE_APPLICATION_CREDENTIALS'] = './gcp-config.json';

function extractArticle(article, cb) {
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
  })
  .then(parsed => {
    article.content = (parsed.text).replace('{', '');
    cb(article);
  })
  .catch(e => {});
}

app.get('/story', (req, res, next) => {
  queryAPI(req.query)
    .then(results => {
      setTimeout(() => {
        res.json(articlesToSend);
      }, RESPONSE_TIMEOUT);

      const articlesToSend = [];
      results.forEach(function(result) {
        extractArticle(result, function(article) {
          articlesToSend.push(article);
        });
      });
    })
    .catch(e => {
      console.log(e);
    });
});

exports.app = functions.https.onRequest(app);
