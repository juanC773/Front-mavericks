import axios from './axios';  // Importar la instancia de axios
import { Product } from '../types/Product'; //Importar la interface product para el tema de los tipados

// Tipar la respuesta de los productos
const ProductService = {
  getAllProducts: async (): Promise<Product[]> => { 
    try {
      const response = await axios.get('/products');
      return response.data;  // Retornamos los datos de la respuesta, que deberían ser de tipo Product[]
    } catch (error) {
      console.error('Error al obtener los productos', error);
      throw error;
    }
  }
};

export default ProductService;
