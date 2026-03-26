import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")

print("MONGODB_URL:", MONGODB_URL)   # 👈 ADD THIS

client = AsyncIOMotorClient(MONGODB_URL)
database = client["market_trend_db"]

users_collection = database["users"]
