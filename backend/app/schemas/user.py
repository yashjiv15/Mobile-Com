from pydantic import BaseModel, EmailStr
from enum import Enum

class RoleEnum(str, Enum):
    admin = "admin"
    customer = "customer"

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    role: RoleEnum

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    role: RoleEnum

    class Config:
        orm_mode = True
