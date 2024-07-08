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