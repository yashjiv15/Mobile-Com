from fastapi import FastAPI
from app.api import auth
from app.db.session import Base, engine
from app.api import auth, products ,user


# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router, prefix="/api", tags=["Auth"])
app.include_router(products.router, prefix="/api/products", tags=["Products"])
app.include_router(user.router, prefix="/api/USERS", tags=["Users"])
