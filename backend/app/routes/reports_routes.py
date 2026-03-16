from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import FileResponse
import pandas as pd
import os
from fpdf import FPDF
from datetime import datetime

router = APIRouter()

DATA_PATH = os.path.join(os.path.dirname(__file__), "../../../data/sentiment_output.csv")

def create_pdf_report(df, report_type, brand):
    pdf = FPDF()
    pdf.add_page()
    
    # Title
    pdf.set_font("helvetica", "B", 16)
    pdf.cell(0, 10, f"Market Intelligence Report: {report_type.upper()}", ln=True, align="C")
    
    # Metadata
    pdf.set_font("helvetica", "", 10)
    pdf.cell(0, 10, f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M')}", ln=True, align="C")
    pdf.cell(0, 10, f"Target Brand: {brand.upper()}", ln=True, align="C")
    pdf.ln(10)
    
    # Table Header
    pdf.set_font("helvetica", "B", 10)
    pdf.set_fill_color(200, 220, 255)
    
    # Select columns to display
    cols = ['platform', 'product', 'sentiment_label', 'sentiment_score']
    col_widths = [40, 40, 40, 40]
    
    for i, col in enumerate(cols):
        pdf.cell(col_widths[i], 10, col.replace("_", " ").title(), border=1, fill=True)
    pdf.ln()
    
    # Table Body
    pdf.set_font("helvetica", "", 9)
    # Take top 50 rows for the PDF to keep it manageable
    for _, row in df.head(50).iterrows():
        for i, col in enumerate(cols):
            val = str(row[col])
            if col == 'sentiment_score':
                val = f"{float(val):.2f}"
            pdf.cell(col_widths[i], 10, val[:20], border=1) # Truncate long strings
        pdf.ln()
    
    filename = f"report_{report_type}_{brand}.pdf"
    filepath = os.path.join("/tmp", filename)
    pdf.output(filepath)
    return filepath

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
        
        if brand and brand.lower() != "all":
            # Map brand IDs if needed, but here we just filter by substring like Dashboard.jsx
            filtered_df = filtered_df[filtered_df['product'].str.contains(brand, case=False, na=False)]
        
        if channel and channel.lower() != "all":
            filtered_df = filtered_df[filtered_df['platform'].str.contains(channel, case=False, na=False)]

        # Determine output filename and format
        if format == "xlsx":
            filename = f"report_{type}_{brand}.xlsx"
            filepath = os.path.join("/tmp", filename)
            filtered_df.to_excel(filepath, index=False)
            media_type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        elif format == "pdf":
            filepath = create_pdf_report(filtered_df, type, brand)
            filename = os.path.basename(filepath)
            media_type = "application/pdf"
        else:
            # Fallback for CSV
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
        import traceback
        print(traceback.format_exc())
        print(f"Report generation error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
