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
    
    result.rss.channel[0].item.forEach(item => {
      const pubDate = new Date(item.pubDate[0]);
      if (pubDate > oneWeekAgo) {
        console.log(`제목: ${item.title[0]}`);
        console.log(`링크: ${item.link[0]}`);
        console.log(`발행일: ${pubDate}`);
        console.log();
      }
    });
  } catch (error) {
    console.error('Error fetching news:', error);
  }
}

const keyword = process.argv[2] || '비트코인';
getNews(keyword);
