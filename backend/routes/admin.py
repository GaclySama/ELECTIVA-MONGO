from fastapi import APIRouter, HTTPException, status
from fastapi.responses import JSONResponse
from config.config import database
from models.product import Product, UpdateProduct
from bson.objectid import ObjectId
import logging

router = APIRouter(
      prefix="/admin",
      tags=["Admin"]
)

logger = logging.getLogger(__name__)
products_collection = database["products"]

# ! RUTAS DE ADMINISTRADOR  !

# * Agregar nuevos productos
@router.post("/newProduct")
async def add_product(data_product: Product):
  try:
    data_product = data_product.model_dump()

    result = products_collection.insert_one(data_product).inserted_id

    print(str(result))

    return JSONResponse(
      status_code= status.HTTP_200_OK,
      content= str(result)
    )

  except HTTPException as e:
    logger.error(f'add_product: {e}')
    raise e
  except Exception as e:
    logger.error(f'add_product: {e}')
    raise HTTPException(
      status_code= status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail=f'add_product: {e}'
    )
  

@router.patch("/updateProduct/{id}")
async def update_product(id: str, data: UpdateProduct):
    try:
        data = data.model_dump()
        update_data = {}

        for key in data:
           if data[key] != None:
            update_data[key] = data[key]

        result = products_collection.update_one({"_id": ObjectId(id)}, {"$set": update_data})

        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Product not found")
        
        return {"msg": "Product updated successfully"}
  
    except HTTPException as e:
      logger.error(f'update_product: {e}')
      raise e
    except Exception as e:
      logger.error(f'update_product: {e}')
      raise HTTPException(
        status_code= status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail=f'update_product: {e}'
      )
