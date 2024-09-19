const { exec } = require('child_process');

exports.handler = async function (event, context) {
  const keyword = event.queryStringParameters.keyword;

  return new Promise((resolve, reject) => {
    exec(`python3 netlify/functions/get_news.py ${keyword}`, (error, stdout, stderr) => {
      if (error) {
        reject({
          statusCode: 500,
          body: `Error: ${error.message}`,
        });
      }
      if (stderr) {
        reject({
          statusCode: 500,
          body: `Stderr: ${stderr}`,
        });
      }

      resolve({
        statusCode: 200,
        body: stdout,
      });
    });
  });
};
