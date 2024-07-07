import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import user, product

# * DESCRIPCIÓN DE API
app = FastAPI(
    title="FastAPI & MONGO",
    description="API para nuestra APP Nemesis Store",
    version="0.1",
    docs_url="/",
)

# * ROUTERS
app.include_router(user.router)
app.include_router(product.router)


# * MIDDELWARE
origins = [
    "http://localhost:8081",
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run("main:app", host='0.0.0.0', port=8000, reload=True)
