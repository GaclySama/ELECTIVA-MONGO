from pydantic import BaseModel, Field
from typing import Optional



class UpdateProduct(BaseModel):
    stock: Optional[int] = Field(None, description="The stock of the product")
    price: Optional[float] = Field(None, description="The price of the product")
    available: Optional[int] = Field(None, description="The price of the product")

class Product(BaseModel):
    imagen: str = Field(...)
    title: str = Field(...)
    stock: int = Field(gt=0)
    price: float = Field(gt=0)
    category: str = Field(...)
    available: int = Field(default=1)