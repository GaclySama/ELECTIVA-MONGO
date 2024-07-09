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
    const res = await api.get(`/order/get/${id}`);
    return { success: true, data: res.data };
  } catch (error) {
    // Manejar diferentes tipos de errores
    if (error.response && error.response.status === 404) {
      return { success: false, message: 'Order not found' };
    } else {
      return { success: false, message: 'An error occurred while fetching orders' };
    }
  }
};