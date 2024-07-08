from fastapi import APIRouter, HTTPException, status
from fastapi.responses import JSONResponse
from models.user import SingUpSchema, LoginSchema, User
from config.config import database
from passlib.context import CryptContext
import logging

# * Creación de router para usuario
router = APIRouter(
    prefix="/user",
    tags=["User"],
)

collection = database["user"]
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
logger = logging.getLogger(__name__)

# * Inserta en mongo
def create_user_in_mongo( user_data: SingUpSchema  ):
    try:
      data = {
          "name": user_data.name,
          "lastname": user_data.lastname,
          "email": user_data.email,
          "password": hash_password(user_data.password),  
      }

      result = collection.insert_one( data ).inserted_id
      return str( result )
    except Exception as e:
        logger.error(f"Error create_user_in_mongo: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error al crear el usuario: {e}"
        )

# * Hashea la contraseña
def hash_password( password: str ) -> str:
    crypt_pass = pwd_context.hash(password)
    return crypt_pass

# * Verifica la contraseña
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# * Verifica el email
def verify_email( email: str ):
    try:
        user_data = collection.find_one({'email': email})

        if not user_data:
           return None
        
        user_data["_id"] = str(user_data["_id"])  # Convertir ObjectId a str
        user = User(**user_data)

        return user.model_dump(by_alias=True)
      
    except Exception as e:
        logger.error(f"Error verify_email: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error: {e}"
        )
    

# ! RUTAS USUARIO ! #
# TODO: CREAR USUARIO
@router.post("/new")
async def new_user( user_data: SingUpSchema ):

  try:
    exist = verify_email(user_data.email)

    if exist:
       raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Ya hay una cuenta con este email")

    user_dict = user_data.model_dump()
    user = SingUpSchema(**user_dict)

    # * Envía a Mongo los datos que va a guardar
    create_user_in_mongo( user )

    # * Devuelve mensaje de ser exitoso
    return JSONResponse(
        content={"mensaje": f"Usuario creado exitosamente"},
        status_code=status.HTTP_201_CREATED,
    )
  except HTTPException as e:
        logger.error(f"Error: {e}")
        raise HTTPException(status_code=e.status_code, detail=e.detail)
  except Exception as e:
    logger.error(f"Unhandled error new_user: {e}")
    raise HTTPException(
          status_code=500, detail=f"Error: {e}"
      )


# TODO: INICIAR SESIÓN
@router.post('/login')
async def sing_in(login_data: LoginSchema):
    email = login_data.email
    password = login_data.password

    try:
        user_data = verify_email(email)

        if not user_data:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No hay cuentas con ese email")

        if not verify_password(password, user_data['password']):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Correo o contraseña incorrecto")

        del user_data["password"]

        return JSONResponse(
          content={
              "authenticated": "true",
              "user": user_data
          },
          status_code=status.HTTP_200_OK,
    )

    except HTTPException as e:
        logger.error(f"Error sing_in: {e}")
        raise HTTPException(status_code=e.status_code, detail=e.detail)
    except Exception as e:
        logger.error(f"Error sing_in: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error: {e}"
        )
        

