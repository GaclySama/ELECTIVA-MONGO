import api from './api'

export const addProduct = async ({ pImagen, pTitle, pStock, pPrice, pGenero }) => {

  data = {
    imagen: pImagen,
    title: str = pTitle,
    stock: int = pStock,
    price: float = pPrice, 
    category: str = pGenero,
    avalible: int = 1
  }

     try {
        const res = await api.post('/admin/newProduct', data)

        console.log(res);
      
     } catch (error) {
        console.log(error);
     }
};

export const updateProduct = async ({id, disponible = undefined, precio = undefined, available = undefined}) => {

    let data = {};

    if (disponible !== undefined) data.stock = parseInt(disponible);
    if (precio !== undefined) data.price = parseFloat(parseFloat(precio).toFixed(2));
    if (available !== undefined) data.available = parseInt(available);
  
    try {
        const res = await api.patch(`/admin/updateProduct/${id}`, data); // Ajusta la URL del endpoint
        console.log(res);
        return res;

    } catch (error) {
      console.log(error);
    }
  };