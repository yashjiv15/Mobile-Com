from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.user import UserOut
from app.crud import user as crud_user
from typing import List

from app.middleware.auth import get_current_user, admin_required
from app.db.session import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
@router.get("/", response_model=List[UserOut])
def list_users(db: Session = Depends(get_db)):
    return crud_user.get_users(db)

@router.get("/{user_id}", response_model=UserOut)
def get_user(user_id: int, db: Session = Depends(get_db),user = Depends(admin_required)):
    db_user = crud_user.get_user_by_id(db, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
@router.delete("/{user_id}", response_model=dict)
def delete_user(user_id: int, db: Session = Depends(get_db),user = Depends(admin_required)):
    db_user = crud_user.get_user_by_id(db, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    crud_user.delete_user(db, user_id)
    return {"detail": "User deleted successfully"}
@router.put("/{user_id}", response_model=UserOut)
def update_user(user_id: int, user: UserOut, db: Session = Depends(get_db)):
    db_user = crud_user.get_user_by_id(db, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    updated_user = crud_user.update_user(db, user_id, user)
    return updated_user
