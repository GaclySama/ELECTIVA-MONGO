import api from "./api";
import { getProducts } from './product';


export const createOrder = async (data) => {

  try {
    const res = await api.put('/order/create', data)
    getProducts()
    console.log(res);
    return res;
  } catch (error) { 
      console.log(error);
  }
}

export const getOrders = async (id) => {

  try {
    const res = await api.get(`/order/get/${id}`)

    return res.data
  } catch (error) {
      if (error.response) {
          err = error.response.data.detail || 'Error desconocido';
      } else if (error.request) {
          err = 'No se recibió respuesta del servidor';
      } else {
          err = 'Error en la configuración de la solicitud';
      }
  }
}