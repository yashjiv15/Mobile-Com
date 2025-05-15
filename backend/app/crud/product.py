from sqlalchemy.orm import Session
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate

def create_product(db: Session, product: ProductCreate, user_id: int):
    new_product = Product(**product.dict(), created_by=user_id)
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

def get_all_products(db: Session, admin_name: str = None):
    if admin_name:
        return db.query(Product).join(Product.admin).filter(Product.admin.email == admin_name).all()
    return db.query(Product).all()

def get_product(db: Session, product_id: int):
    return db.query(Product).filter(Product.id == product_id).first()

def update_product(db: Session, product_id: int, product_data: ProductUpdate):
    product = db.query(Product).filter(Product.id == product_id).first()
    if product:
        for key, value in product_data.dict().items():
            setattr(product, key, value)
        db.commit()
        db.refresh(product)
    return product

def delete_product(db: Session, product_id: int):
    product = db.query(Product).filter(Product.id == product_id).first()
    if product:
        db.delete(product)
        db.commit()
    return product
