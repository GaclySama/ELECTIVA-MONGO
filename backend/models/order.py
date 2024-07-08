from pydantic import BaseModel, Field
from typing import List


class JsonProduct(BaseModel):
    id: str = Field(...)
    title: str = Field(...)
    qty: int = Field(...)
    imagen: str = Field(...)
    price: float = Field(...)


class JsonOrder(BaseModel):
    userId: str = Field(...)
    email: str = Field(...)
    order: List[JsonProduct]
    amount: str = Field(...)
    orderId: str = Field(...)
    orderStatus: str = Field(...)
    createdAt: str = Field(...)

class Product(BaseModel):
    id: str = Field(...)
    title: str = Field(...)
    qty: int = Field(...)
    price: float = Field(...)

class ListProducts(BaseModel):
    orderId: str = Field(...)
    createAt: str = Field(...)
    products: List[Product]
    amount: str = Field(...)
    orderStaus: str = Field(...)


class NewOrder(BaseModel):
    email: str = Field(...)
    orders: List[JsonProduct]




