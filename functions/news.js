const axios = require('axios');
const xml2js = require('xml2js');
const { parseStringPromise } = xml2js;

async function getNews(keyword) {
  const rssUrl = `https://news.google.com/rss/search?q=${keyword}&hl=ko&gl=KR&ceid=KR:ko`;
  
  try {
    const response = await axios.get(rssUrl);
    const result = await parseStringPromise(response.data);
    
    const now = new Date();
    const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
    
    const newsData = result.rss.channel[0].item
      .filter(item => new Date(item.pubDate[0]) > oneWeekAgo)
      .map(item => ({
        title: item.title[0],
        link: item.link[0],
        published: new Date(item.pubDate[0]).toLocaleString(),
      }));

    return {
      statusCode: 200,
      body: JSON.stringify(newsData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error fetching news: ${error.message}`,
    };
  }
}

exports.handler = async function (event, context) {
  const keyword = event.queryStringParameters.keyword || '비트코인';
  return await getNews(keyword);
};
