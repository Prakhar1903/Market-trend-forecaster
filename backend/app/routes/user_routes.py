from fastapi import APIRouter, Depends
from app.utils.auth import get_current_user

router = APIRouter()

@router.get("/profile")
async def read_users_me(current_user = Depends(get_current_user)):
    return {"username": current_user["username"], "email": current_user["email"]}
