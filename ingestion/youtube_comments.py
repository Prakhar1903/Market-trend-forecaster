import os
import requests
import pandas as pd
import pandas as pd
import time
import sys
from dotenv import load_dotenv

# 🔥 FIX: absolute base path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 🔹 Load env properly
load_dotenv(os.path.join(BASE_DIR, "backend/.env"))

API_KEY = os.getenv("YOUTUBE_API_KEY")

PRODUCT_QUERIES = [
    "Google Nest Mini review",
    "Apple HomePod Mini review"
]

# 🔹 Correct output path
OUTPUT_PATH = os.path.join(BASE_DIR, "data/processed/youtube_reviews_clean.csv")


# ❌ If API key missing → safe exit
if not API_KEY:
    print(0)
    exit()


def search_videos(query, max_results=5):
    try:
        url = "https://www.googleapis.com/youtube/v3/search"
        params = {
            "part": "snippet",
            "q": query,
            "type": "video",
            "maxResults": max_results,
            "key": API_KEY
        }

        r = requests.get(url, params=params, timeout=10)
        data = r.json()

        videos = []
        for item in data.get("items", []):
            videos.append({
                "video_id": item["id"]["videoId"],
                "title": item["snippet"]["title"]
            })

        return videos

    except:
        return []


def get_comments(video_id):
    try:
        url = "https://www.googleapis.com/youtube/v3/commentThreads"
        params = {
            "part": "snippet",
            "videoId": video_id,
            "maxResults": 100,
            "key": API_KEY,
            "textFormat": "plainText"
        }

        comments = []
        r = requests.get(url, params=params, timeout=10)
        data = r.json()

        for item in data.get("items", []):
            snippet = item["snippet"]["topLevelComment"]["snippet"]
            text = snippet["textDisplay"]
            pub_at = snippet.get("publishedAt", "")
            comments.append((text, pub_at))

        return comments

    except:
        return []


all_rows = []

for query in PRODUCT_QUERIES:
    videos = search_videos(query)

    product = "Google Nest Mini" if "Nest" in query else "Apple HomePod Mini"

    for v in videos:
        comments = get_comments(v["video_id"])

        for c_text, c_date in comments:
            if len(c_text) > 20:
                all_rows.append({
                    "platform": "youtube",
                    "product": product,
                    "title": v["title"],
                    "text": c_text,
                    "date": c_date
                })

        time.sleep(1)


df = pd.DataFrame(all_rows)

# 🔹 Incremental Scraping Filter
if not df.empty and len(sys.argv) > 1:
    cutoff_date = pd.to_datetime(sys.argv[1], errors="coerce", utc=True)
    if pd.notnull(cutoff_date):
        dt_col = pd.to_datetime(df["date"], errors="coerce", utc=True)
        df = df[dt_col >= cutoff_date]

if df.empty:
    print(0)
else:
    df = df.drop_duplicates(subset=["text"])

    # 🔹 Ensure folder exists
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)

    df.to_csv(OUTPUT_PATH, index=False)

    print(len(df))  # 🔥 IMPORTANT: return only number
