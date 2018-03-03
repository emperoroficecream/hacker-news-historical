const BigQuery = require('@google-cloud/bigquery');
const gcpConfig = require('./gcp-config.json');
const projectId = gcpConfig.project_id;

function printResult(rows) {
  console.log('Query Results:');
  rows.forEach(function(row) {
    let url = row['url'];
    let title = row['title'];
    let score = row['score'];
    console.log(`url: ${url}, ${title}, score: ${score}`);
  });
}

const bigQuery = new BigQuery({
  projectId: projectId
});

const sqlQuery = `
  SELECT *
  FROM \`bigquery-public-data.hacker_news.stories\`
  WHERE score > 2000
  LIMIT 10
`;

const options = {
  query: sqlQuery,
  timeoutMs: 5000
};


module.exports = function() {
  return new Promise((res, rej) => {
    bigQuery
    .query(options)
    .then(results => {
      const rows = results[0];
      console.log(results);
      printResult(rows);
      res(rows);
    })
    .catch(e => {
      console.log(e);
      rej(e);
    })
  })
}