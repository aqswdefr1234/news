import sys
import feedparser
from datetime import datetime, timedelta
import json

def get_news(keyword):
    rss_url = f"https://news.google.com/rss/search?q={keyword}&hl=ko&gl=KR&ceid=KR:ko"
    news_feed = feedparser.parse(rss_url)
    now = datetime.now()
    one_week_ago = now - timedelta(days=7)

    news_data = []
    for entry in news_feed.entries:
        published_time = datetime(*entry.published_parsed[:6])
        if published_time > one_week_ago:
            news_data.append({
                "title": entry.title,
                "link": entry.link,
                "published": published_time.strftime('%Y-%m-%d %H:%M')
            })

    return news_data

if __name__ == "__main__":
    keyword = sys.argv[1]
    news = get_news(keyword)
    print(json.dumps(news))
