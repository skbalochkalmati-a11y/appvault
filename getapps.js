const gplay = require('google-play-scraper');

exports.handler = async (event) => {
  const appId = event.queryStringParameters.id || 'com.whatsapp';

  try {
    const app = await gplay.app({ appId });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: app.appId,
        title: app.title,
        developer: app.developer,
        icon: app.icon,
        headerImage: app.headerImage,
        scoreText: app.scoreText,
        installs: app.installs,
        version: app.version || 'Varies with device',
        updated: app.updated,
        summary: app.summary,
        description: app.description,
        screenshots: app.screenshots,
        // Generates dynamic Google Play Store direct download page link
        playStoreUrl: app.url,
      }),
    };
  } catch (error) {
    return {
      statusCode: 404,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'App not found on Play Store.' }),
    };
  }
};
