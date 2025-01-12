from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from datetime import timedelta
from bson import ObjectId
from .models import UserCreate, User, Token, LoginCredentials
from .auth import get_password_hash, verify_password, create_access_token, get_current_user
from .database import db
import os

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_db_client():
    await db.connect_db()

@app.on_event("shutdown")
async def shutdown_db_client():
    await db.close_db()

@app.post("/api/auth/register", response_model=Token)
async def register(user_data: UserCreate):
    # Check if user already exists
    if await db.users_collection.find_one({"email": user_data.email}):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    user_dict = user_data.dict()
    hashed_password = get_password_hash(user_data.password)
    user_dict["hashed_password"] = hashed_password
    del user_dict["password"]
    
    result = await db.users_collection.insert_one(user_dict)
    
    # Create access token
    access_token_expires = timedelta(minutes=int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")))
    access_token = create_access_token(
        data={"sub": user_data.email}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@app.post("/api/auth/login", response_model=Token)
async def login(credentials: LoginCredentials):
    user = await db.users_collection.find_one({"email": credentials.email})
    if not user or not verify_password(credentials.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")))
    access_token = create_access_token(
        data={"sub": credentials.email}, expires_delta=access_token_expires
    )
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "email": user["email"],
            "name": user["name"]
        }
    }

@app.get("/api/auth/me", response_model=User)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    return current_user


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)