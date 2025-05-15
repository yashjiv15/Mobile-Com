from http.client import HTTPException
from sqlalchemy.orm import Session
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductOut, ProductUpdate
from fastapi.responses import JSONResponse
from fastapi import HTTPException, status

def create_product(db: Session, product: ProductCreate, user_id: int):
    # Create a new product instance from the provided data
    new_product = Product(**product.dict(), created_by=user_id)
    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    # Serialize the new product object to a Pydantic model for response
    product_response = ProductOut.from_orm(new_product)

    # Return the response with the Pydantic model as content
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=product_response.dict())
def get_all_products(db: Session):
    return db.query(Product).all()

def get_product(db: Session, product_id: int):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

def update_product(db: Session, product_id: int, product_data: ProductUpdate):
    product = get_product(db, product_id)
    for field, value in product_data.dict(exclude_unset=True).items():
        setattr(product, field, value)
    db.commit()
    db.refresh(product)
    return product

def delete_product(db: Session, product_id: int):
    product = get_product(db, product_id)
    db.delete(product)
    db.commit()
    return {"detail": "Product deleted"}