from pydantic import BaseModel
from typing import Optional
from bson import ObjectId

class User(BaseModel):
    id: Optional[str] = None
    username: str
    email: str
    name: Optional[str] = ""
    joined_date: Optional[str] = ""
    hashed_password: str

    class Config:
        validate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
