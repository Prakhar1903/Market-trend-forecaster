import asyncio
import pandas as pd
import re
import re
import os
import sys

# 🔥 SAFE IMPORT (avoid crash if not installed)
try:
    from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, CacheMode
except:
    print(0)
    exit()

# 🔥 FIX: absolute path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_DIR = os.path.join(BASE_DIR, "data/processed")
OUTPUT_PATH = os.path.join(OUTPUT_DIR, "web_reviews_scraped.csv")


products = {
    "Google Nest Mini": "https://www.techradar.com/reviews/google-nest-mini",
    "Apple HomePod Mini": "https://www.techradar.com/reviews/apple-homepod-mini",
    "Amazon Alexa": "https://www.techradar.com/reviews/amazon-echo-dot"
}


def clean_text(text):
    if not text:
        return ""
    text = text.lower()
    text = re.sub(r"[^\w\s]", "", text)
    return text.strip()


async def crawl_reviews():
    # 🔹 Incremental Scraping (Skip static web reviews if checked within 24h)
    if len(sys.argv) > 1:
        cutoff = pd.to_datetime(sys.argv[1], errors="coerce")
        if pd.notnull(cutoff) and (pd.Timestamp.now() - cutoff).total_seconds() < 86400:
            print(0)
            return

    all_reviews = []

    async with AsyncWebCrawler(verbose=False) as crawler:
        for product, url in products.items():
            try:
                result = await crawler.arun(
                    url=url,
                    config=CrawlerRunConfig(cache_mode=CacheMode.BYPASS)
                )

                if result.success:
                    content = result.markdown
                    paragraphs = content.split("\n")

                    for p in paragraphs:
                        text = p.strip()
                        if len(text) > 60:
                            all_reviews.append({
                                "product": product,
                                "review_content": clean_text(text),
                                "rating": None,
                                "review_date": None,
                                "variant": None,
                                "source": "crawl4ai_techradar"
                            })
            except:
                continue

    if all_reviews:
        df = pd.DataFrame(all_reviews)
        os.makedirs(OUTPUT_DIR, exist_ok=True)
        df.to_csv(OUTPUT_PATH, index=False)

        print(len(df))  # 🔥 IMPORTANT (only number)
    else:
        print(0)


if __name__ == "__main__":
    asyncio.run(crawl_reviews())
