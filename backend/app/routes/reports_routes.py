from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import FileResponse
import pandas as pd
import os
from app.schemas.reports import ReportRequest

router = APIRouter()

DATA_PATH = os.path.join(os.path.dirname(__file__), "../../../data/sentiment_output.csv")

@router.get("/reports")
async def generate_report(
    type: str,
    format: str,
    brand: str = "all",
    channel: str = "all",
    from_date: str = Query(None, alias="from"),
    to_date: str = Query(None, alias="to")
):
    if not os.path.exists(DATA_PATH):
        raise HTTPException(status_code=404, detail="Sentiment data not found")

    try:
        # Load data
        df = pd.read_csv(DATA_PATH, sep="\t")
        
        # Filter
        filtered_df = df.copy()
        
        # Date Filtering logic removed as requested
        
        if brand and brand.lower() != "all":
            filtered_df = filtered_df[filtered_df['product'].str.contains(brand, case=False, na=False)]
        
        if channel and channel.lower() != "all":
            filtered_df = filtered_df[filtered_df['platform'].str.contains(channel, case=False, na=False)]

        # Determine output filename
        if format == "xlsx":
            filename = f"report_{type}_{brand}.xlsx"
            filepath = os.path.join("/tmp", filename)
            filtered_df.to_excel(filepath, index=False)
            media_type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        else:
            # Fallback for PDF or CSV
            filename = f"report_{type}_{brand}.csv"
            filepath = os.path.join("/tmp", filename)
            filtered_df.to_csv(filepath, index=False)
            media_type = "text/csv"

        return FileResponse(
            path=filepath,
            filename=filename,
            media_type=media_type
        )

    except Exception as e:
        print(f"Report generation error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
