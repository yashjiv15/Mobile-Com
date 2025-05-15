from pydantic import BaseModel, EmailStr , Field
from enum import Enum
from typing import Optional

class RoleEnum(str, Enum):
    admin = "admin"
    customer = "customer"

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    role: str = Field(default="customer")  # Default role set to "customer"

class UserLogin(BaseModel):
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    password: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    role: RoleEnum
class UserRole(str, Enum):
    admin = "admin"
    customer = "customer"

class UserOut(BaseModel):
    id: int
    email: EmailStr
    role: UserRole
    class Config:
        from_attributes = True
