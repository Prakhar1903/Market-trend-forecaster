from fastapi import APIRouter
from app.database import raw_data_collection

router = APIRouter()

@router.get("/ai/product-comparison")
async def product_comparison():

    cursor = raw_data_collection.find({})
    products = await cursor.to_list(length=50)

    result = []

    for p in products:

        result.append({
            "product": p.get("product_name"),
            "rating": p.get("rating"),
            "sentiment": p.get("sentiment"),
            "review": p.get("review")
        })

    return {"products": result}