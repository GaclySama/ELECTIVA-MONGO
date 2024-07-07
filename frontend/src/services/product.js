import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";



// * Función que consume endPoint de FastAPI y devuelve los productos guardados en FireBase
export const getProducts = async () => {

  try {
      // * URL de la api 
      const res = await api.get('/products')

      // * Lo almacena en async para luego renderizar en home
      await AsyncStorage.setItem('@products', JSON.stringify(res))


      // * Imprime en consola para saber que se envió a async
      // console.log(res);
      return res;
  } catch (error) {
      return[false]
  }
};

export const createOrder = async (data) => {

  try {
    const res = await api.post('/product/create/order', data)
    getProducts()
    console.log(res);
    return res;
  } catch (error) { 
      console.log(error);
  }
}