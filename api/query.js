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

function getSQLQuery(queryParams) {
  const beforeYear = queryParams.year;
  const pointThreshold = queryParams.pointThreshold;
  // Time field is in seconds
  const beforeTimestamp = Math.floor(Date.UTC(beforeYear, 1, 1, 0, 0, 0) / 1000);
  const sqlQuery = `
    SELECT *
    FROM \`bigquery-public-data.hacker_news.stories\`
    WHERE score > ${pointThreshold}
    AND time < ${beforeTimestamp}
    ORDER BY time DESC
    LIMIT 100
    `;
  return sqlQuery;
}


module.exports = function(queryParams) {
  return new Promise((res, rej) => {
    bigQuery
    .query({
      query: getSQLQuery(queryParams),
      timeoutMs: 5000
    })
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