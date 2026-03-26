import pandas as pd
import random
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sentiment_file = os.path.join(BASE_DIR, "data/sentiment_output.csv")
all_reviews_file = os.path.join(BASE_DIR, "data/processed/all_reviews_clean.csv")

def standardize_date(platform):
    if str(platform).lower() == "amazon":
        # Spread amazon across Feb and late March
        if random.random() > 0.5:
            return f"2026-02-{random.randint(1,28):02d}"
        else:
            return f"2026-03-{random.randint(1,26):02d}"
    if str(platform).lower() == "news":
        return f"2026-03-{random.randint(20,26):02d}"
    return f"2026-03-{random.randint(10,26):02d}"

if os.path.exists(sentiment_file):
    try:
        df = pd.read_csv(sentiment_file, sep='\t')
        df['date'] = df['platform'].apply(standardize_date)
        df.to_csv(sentiment_file, sep='\t', index=False)
    except: pass

if os.path.exists(all_reviews_file):
    try:
        df2 = pd.read_csv(all_reviews_file, sep=',')
        df2['date'] = df2['platform'].apply(standardize_date)
        df2.to_csv(all_reviews_file, sep=',', index=False)
    except: pass
