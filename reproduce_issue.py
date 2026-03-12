import pandas as pd
import os

DATA_PATH = "data/sentiment_output.csv"
df = pd.read_csv(DATA_PATH, sep="\t")

print(f"Total rows: {len(df)}")
print("\nUnique products:")
print(df['product'].unique())
print("\nUnique platforms:")
print(df['platform'].unique())

# Test filters
mapped_product = "Apple HomePod Mini"
mapped_platform = "amazon"

filtered_df = df.copy()
filtered_df = filtered_df[filtered_df['product'].str.contains(mapped_product, case=False, na=False)]
print(f"\nFiltered by product '{mapped_product}': {len(filtered_df)} rows")

final_df = filtered_df[filtered_df['platform'].str.contains(mapped_platform, case=False, na=False)]
print(f"Filtered by platform '{mapped_platform}' + product '{mapped_product}': {len(final_df)} rows")

# Let's try Google Nest Mini too
mapped_product_nest = "Google Nest Mini"
nest_df = df[df['product'].str.contains(mapped_product_nest, case=False, na=False)]
print(f"\nFiltered by product '{mapped_product_nest}': {len(nest_df)} rows")

nest_final_df = nest_df[nest_df['platform'].str.contains(mapped_platform, case=False, na=False)]
print(f"Filtered by platform '{mapped_platform}' + product '{mapped_product_nest}': {len(nest_final_df)} rows")
