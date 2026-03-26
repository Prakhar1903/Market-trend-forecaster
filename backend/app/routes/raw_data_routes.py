from fastapi import APIRouter, Depends
from app.utils.auth import get_current_user
from app.database import raw_data_collection

import datetime
import subprocess
import pandas as pd
import os
import sys

router = APIRouter()

# 📁 Absolute base path (VERY IMPORTANT FIX)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
OUTPUT_FILE = os.path.join(BASE_DIR, "data/processed/all_reviews_clean.csv")
TRACKER_FILE = os.path.join(BASE_DIR, "backend/data/last_update.txt")


# ✅ Existing API (UNCHANGED)
@router.post("/raw_data")
async def insert_raw_data(data: dict, current_user=Depends(get_current_user)):
    result = await raw_data_collection.insert_one(data)
    return {"inserted_id": str(result.inserted_id)}


# ✅ UPDATED API (ERROR-FREE VERSION)
@router.post("/update-reviews")
def update_reviews(current_user=Depends(get_current_user)):
    today = datetime.date.today()

    try:
        # 🔹 OLD COUNT
        old_count = 0
        if os.path.exists(OUTPUT_FILE):
            old_df = pd.read_csv(OUTPUT_FILE)
            old_count = len(old_df)

        # 🔹 Script paths (ABSOLUTE → NO ERROR)
        scripts = [
            os.path.join(BASE_DIR, "ingestion/amazon_reviews.py"),
            os.path.join(BASE_DIR, "ingestion/crawl_web_reviews.py"),
            os.path.join(BASE_DIR, "ingestion/youtube_comments.py"),
            os.path.join(BASE_DIR, "ingestion/news_fetch.py"),
            os.path.join(BASE_DIR, "ingestion/merge_reviews.py"),
            os.path.join(BASE_DIR, "ingestion/analyze_sentiment.py"),
        ]

        # 🔥 READ CUTOFF TIMESTAMP
        cutoff = "2000-01-01T00:00:00"
        os.makedirs(os.path.dirname(TRACKER_FILE), exist_ok=True)
        if os.path.exists(TRACKER_FILE):
            with open(TRACKER_FILE, "r") as f:
                cutoff = f.read().strip()

        # 🔥 RUN SCRIPTS WITH CUTOFF
        for script in scripts:
            result = subprocess.run(
                [sys.executable, script, cutoff],
                capture_output=True,
                text=True
            )

            # ❌ If script fails → show exact error
            if result.returncode != 0:
                return {
                    "status": "error",
                    "message": f"Error in {os.path.basename(script)}:\n{result.stderr}"
                }

        # 🔹 NEW COUNT
        new_count = 0
        if os.path.exists(OUTPUT_FILE):
            new_df = pd.read_csv(OUTPUT_FILE)
            new_count = len(new_df)

        # 🔥 CALCULATE ADDED
        added_reviews = max(new_count - old_count, 0)

        # 🔥 SAVE NEW TIMESTAMP
        with open(TRACKER_FILE, "w") as f:
            f.write(datetime.datetime.now().isoformat())

        return {
            "status": "success",
            "message": f"{added_reviews} new reviews added for {today}"
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }
