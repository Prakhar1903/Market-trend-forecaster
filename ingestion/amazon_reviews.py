import pandas as pd
import os

# 🔥 FIX: Absolute base path (VERY IMPORTANT)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 🔹 Correct input path
input_path = os.path.join(BASE_DIR, "data/raw/amazon_alexa.tsv")

# 🔹 Correct output path
output_dir = os.path.join(BASE_DIR, "data/processed")
output_path = os.path.join(output_dir, "amazon_reviews_clean.csv")

# 🔹 Load dataset
df = pd.read_csv(input_path, sep="\t")

# 🔹 Clean + normalize
df_clean = pd.DataFrame({
    "product": "Amazon Alexa / Echo",
    "review_content": df["verified_reviews"].astype(str).str.lower().str.strip(),
    "rating": df["rating"],
    "review_date": df["date"],
    "variant": df["variation"],
    "source": "kaggle_amazon_alexa"
})

# 🔹 Drop empty reviews
df_clean = df_clean.dropna(subset=["review_content"])
df_clean = df_clean[df_clean["review_content"].str.strip() != ""]

# 🔹 Incremental Scraping Filter
import sys
if len(sys.argv) > 1:
    cutoff_date = pd.to_datetime(sys.argv[1], errors="coerce")
    if pd.notnull(cutoff_date):
        dt_col = pd.to_datetime(df_clean["review_date"], format="%d-%b-%y", errors="coerce")
        df_clean = df_clean[dt_col >= cutoff_date]

# 🔹 Ensure output directory exists
os.makedirs(output_dir, exist_ok=True)

# 🔹 Save cleaned data
df_clean.to_csv(output_path, index=False)

# 🔥 IMPORTANT: print only number (for backend use)
print(len(df_clean))
