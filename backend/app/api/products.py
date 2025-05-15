from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from app.schemas.product import ProductCreate, ProductUpdate, ProductOut
from app.crud.product import (
    create_product, get_all_products, get_product,
    update_product, delete_product
)
from app.middleware.auth import get_current_user, admin_required
from app.db.session import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=ProductOut)
def create(product: ProductCreate, db: Session = Depends(get_db), user = Depends(admin_required)):
    return create_product(db, product, user.id)

@router.get("/", response_model=List[ProductOut])
def read_all(db: Session = Depends(get_db)):
    return get_all_products(db)

@router.get("/{product_id}", response_model=ProductOut)
def read_one(product_id: int, db: Session = Depends(get_db)):
    return get_product(db, product_id)

@router.put("/{product_id}", response_model=ProductOut)
def update(product_id: int, product: ProductUpdate, db: Session = Depends(get_db), user = Depends(admin_required)):
    return update_product(db, product_id, product)

@router.delete("/{product_id}")
def delete(product_id: int, db: Session = Depends(get_db), user = Depends(admin_required)):
    return delete_product(db, product_id)