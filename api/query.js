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
  const startYear = queryParams.startYear;
  const startMonth = queryParams.startMonth;
  const endYear = queryParams.endYear;
  const endMonth = queryParams.endMonth;
  const minPoints = queryParams.minPoints;
  // Time field is in seconds
  const fromTimestamp = Math.floor(Date.UTC(startYear, startMonth, 1, 0, 0, 0) / 1000);
  const toTimestamp = Math.floor(Date.UTC(endYear, endMonth, 1, 0, 0, 0) / 1000);
  const sqlQuery = `
    SELECT *
    FROM \`bigquery-public-data.hacker_news.stories\`
    WHERE score > ${minPoints}
    AND time > ${fromTimestamp}
    AND time < ${toTimestamp}
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