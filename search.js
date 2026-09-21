const gplay = require('google-play-scraper');

exports.handler = async (event) => {
  const query = event.queryStringParameters.q;

  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Query parameter "q" is required.' }),
    };
  }

  try {
    const results = await gplay.search({ term: query, num: 12 });

    const formattedResults = results.map((app) => ({
      id: app.appId,
      title: app.title,
      developer: app.developer,
      icon: app.icon,
      scoreText: app.scoreText,
    }));

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedResults),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Failed to search apps.' }),
    };
  }
};
