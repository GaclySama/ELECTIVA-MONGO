from fastapi import APIRouter, HTTPException, status
from fastapi.responses import JSONResponse
from config.config import database
from models.order import JsonOrder
from schemas.order import order_schema
from bson.objectid import ObjectId
import logging

router = APIRouter(
      prefix="/order",
      tags=["Orders"],
)


logger = logging.getLogger(__name__)
products_collection = database["products"]
orders_collection = database["orders"]

# * Función que verifica la existencia de los productos
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
    

# TODO Ruta para crear ordenes
@router.put('/create')
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
    
# TODO Ruta para las ordenes del cliente
@router.get('/get')
async def get_orders(id_user):
    try:
        
        results = orders_collection.find_one({'_id': ObjectId(id_user)})

        results["_id"] = str(results["_id"])

        if not results:
            raise HTTPException(
                status_code= status.HTTP_404_NOT_FOUND,
                detail= 'No has realizado ordenes'
            )

        return JSONResponse(
            status_code= status.HTTP_200_OK,
            content= results["orders"]
        )


    except HTTPException as e:
        logger.error(f'Error get_orders: {e}')
        raise e
    except Exception as e:
        raise HTTPException(
            status_code= status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail= f'Error get_orders: {e}'
        )