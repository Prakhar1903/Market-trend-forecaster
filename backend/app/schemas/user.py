from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    name: Optional[str] = ""

class UserLogin(BaseModel):
    username: str
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    username: Optional[str] = None

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
