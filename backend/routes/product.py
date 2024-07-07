from fastapi import APIRouter, HTTPException, status
from fastapi.responses import JSONResponse
from config.config import database
from models.product import JsonOrder
from schemas.order import order_schema
from bson.objectid import ObjectId
import logging

router = APIRouter(
    prefix="/product",
    tags=["Product"],
)

logger = logging.getLogger(__name__)
products_collection = database["products"]
orders_collection = database["orders"]

products = []

@router.post("/add")
def add_array_products():
    products_dict = products

    result = products_collection.insert_many(products_dict)
    if result.inserted_ids:
        return JSONResponse(status_code=201, content=True)
    else:
        raise HTTPException(status_code=500, detail="Failed to insert products")

@router.get("s")
async def get_products():
    try:
      products = list(products_collection.find())

      if not products: 
          raise HTTPException(
           status_code=status.HTTP_404_NOT_FOUND,
           detail=f'Error: No hay productos en base de datos'
       )

      for product in products:
          product["_id"] = str(product["_id"])
          
      return products
    except Exception as e:
       logger.error(f"Error: {e}")
       raise HTTPException(
           status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
           detail=f'Error: {e}'
       )

async def verify_products(list_products):
    try:
        
        db_products = []
        
        for item in list_products:
            product = products_collection.find_one({"_id": ObjectId(item['id'])})
            product['_id'] = str(product['_id'])
            db_products.append(product)

        for product in list_products:
            for db_product in db_products:
                  if db_product['stock'] <= 0:
                      raise HTTPException(
                          status_code=status.HTTP_409_CONFLICT,
                          detail=f"Para '{product['title']}' no hay disponibles"
                      )
                  elif product['qty'] > db_product['stock']:
                      raise HTTPException(
                          status_code=status.HTTP_409_CONFLICT,
                          detail=f"Para '{product['title']}' solo hay '{db_product['stock']}' disponibles"
                      )

        return db_products

    except HTTPException as e:
        logger.error(f'Error new_order: {e}')
        raise e

    except Exception as e:
        logger.error(f'Error verify_products: {e}')
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='error en verify_products'
        )

@router.post('/create/order')
async def new_order(data: JsonOrder):
    try:
        dict_data = data.model_dump()
        list_products = []

        for item in dict_data['order']:
              item.pop('imagen')
              list_products.append(item)

        # * Verifica la disponibilidad
        await verify_products(list_products)

        # * Actualizar el stock de los productos
        for item in list_products:
            result = products_collection.update_one(
                {"_id": ObjectId(item['id']), "stock": {"$gte": item['qty']}},
                {"$inc": {"stock": -int(item['qty'])}}
            )
            if result.modified_count == 0:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail=f"No se pudo actualizar el stock para el producto '{item['title']}'"
                )

        # * Registrar la orden
        order = order_schema(dict_data)

        orders_collection.update_one(
            {"_id": ObjectId(dict_data["userId"])},
            {
                "$set": {"email": dict_data["email"]},
                "$push": {"orders": order}
            },
            upsert=True
        )

        return JSONResponse(
            status_code=status.HTTP_202_ACCEPTED,
            content="Orden recibida"
        )

    except HTTPException as e:
        logger.error(f'Error new_order: {e}')
        raise e

    except Exception as e:
        logger.error(f'Error new_order: {e}')
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='error en new_order'
        )
    


# async def verify_products(list_products):
#     db_products = []

#     try:
#       for item in list_products:
#           product = products_collection.find_one({"_id": ObjectId(item['id'])})
#           product['_id'] = str(product['_id'])
#           db_products.append(product)

#       for product in list_products:
#             for db_product in db_products:
#                 if db_product['stock'] <= 0:
#                     raise HTTPException(
#                         status_code=status.HTTP_409_CONFLICT, 
#                         detail=f"Para '{product['title']}' no hay disponibles'")

#                 elif product['qty'] > db_product['stock']:
#                     raise HTTPException(
#                         status_code=status.HTTP_409_CONFLICT,
#                         detail=f"Para '{product['title']}' solo hay '{db_product['stock']} disponibles'"
#                     ) 
    
#       return f"Productos añadidos con éxito, dirígete a 'Movimientos'"

#     except HTTPException as e:
#       logger.error(f'Error new_order: {e}')
#       raise e

#     except Exception as e:
#         logger.error(f'Error verify_products: {e}')
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail='error en verify_products'
#         )

# @router.post('/create/order')
# async def new_order(data: JsonOrder):
#     try:

#         dict_data = data.model_dump()
#         list_products = []

#         for item in dict_data['order']:
#               item.pop('imagen')
#               list_products.append(item)
  

#         await verify_products(list_products)
#         order = order_schema(dict_data)

#         orders_collection.update_one(
#             {"_id": ObjectId(dict_data["userId"])},
#             { 
#                 "$set": { "email": dict_data["email"]}, 
#                 "$push": { "orders": order}
#             },
#             upsert=True
#             )
        
#         for item in list_products:
#             products_collection.update_one(
#                 {"_id": ObjectId(item['id'])},
#                 {
#                   "$inc": {"stock": -int(item['qty'])}
#                 }
#                 )

#         return JSONResponse(
#                   status_code= status.HTTP_202_ACCEPTED,
#                   content= "Orden recibida"
#               )

#     except HTTPException as e:
#         logger.error(f'Error new_order: {e}')
#         raise e
    
#     except Exception as e:
#         logger.error(f'Error new_order: {e}')
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail='error en new_order'
#         )