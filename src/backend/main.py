from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import api
import uvicorn

# Initialize FastAPI app
app = FastAPI(
    title="Quantix Dashboard API",
    description="Backend API for the Quantix Dashboard",
    version="1.0.0"
)

# CORS Configuration
# Allow the frontend (served from file system or localhost) to access the API
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "*" # For development simplicity, allow all. Restrict in production.
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(api.router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "Welcome to Quantix API. Visit /docs for Swagger UI."}

if __name__ == "__main__":
    # Run the server
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
