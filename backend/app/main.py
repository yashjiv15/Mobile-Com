from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, products, user
from app.db.session import Base, engine

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins or specify the frontend URL (e.g., ["http://localhost:3000"])
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Include routers
app.include_router(auth.router, prefix="/api", tags=["Auth"])
app.include_router(products.router, prefix="/api/products", tags=["Products"])
app.include_router(user.router, prefix="/api/USERS", tags=["Users"])
