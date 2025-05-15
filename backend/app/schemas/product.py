from pydantic import BaseModel
from typing import Optional

class ProductBase(BaseModel):
    name: str
    description: Optional[str]
    price: int

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    pass

class ProductOut(ProductBase):
    id: int
    created_by: int

    class Config:
        orm_mode = True
