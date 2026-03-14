from fastapi import APIRouter
from app.services.market_insight_service import generate_market_insights

router = APIRouter()

@router.get("/ai/market-insights")
async def market_insights():
    return await generate_market_insights()