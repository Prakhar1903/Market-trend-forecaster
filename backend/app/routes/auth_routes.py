from fastapi import APIRouter, HTTPException
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin, Token
from app.utils.auth import get_password_hash, verify_password, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from app.database import users_collection
from datetime import timedelta, datetime

@router.post("/signup", response_model=User)
async def signup(user: UserCreate):
    # Trim inputs for consistency
    username = user.username.strip()
    email = user.email.strip().lower()
    name = user.name.strip() if user.name else username
    
    existing_user = await users_collection.find_one({
        "$or": [
            {"username": username},
            {"email": email}
        ]
    })
    
    if existing_user:
        raise HTTPException(status_code=400, detail="Username or email already registered")
        
    hashed_password = get_password_hash(user.password)
    user_dict = user.dict()
    user_dict["username"] = username
    user_dict["email"] = email
    user_dict["name"] = name
    user_dict["joined_date"] = datetime.now().strftime("%Y-%m-%d")
    user_dict["hashed_password"] = hashed_password
    
    result = await users_collection.insert_one(user_dict)
    user_dict["id"] = str(result.inserted_id)
    return User(**user_dict)

@router.post("/login", response_model=Token)
async def login(user: UserLogin):
    identifier = user.username.strip()
    
    # Allow login with either username or email (case-insensitive for email)
    db_user = await users_collection.find_one({
        "$or": [
            {"username": identifier},
            {"email": {"$regex": f"^{identifier}$", "$options": "i"}}
        ]
    })
    
    if not db_user or not verify_password(user.password, db_user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Incorrect username or email, or password")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(db_user["_id"])}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
