import axios from './axios';  // Importar la instancia de axios
import { Product } from '../types/Product'; //Importar la interface product para el tema de los tipados

// Tipar la respuesta de los productos
const ProductService = {
  // Método para obtener todos los productos
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const response = await axios.get('/products');
      return response.data;
    } catch (error) {
      console.error('Error al obtener los productos', error);
      throw error;
    }
  },

 
  deleteProduct: async (id: number): Promise<void> => {
    try {
      await axios.delete(`/products/${id}`);  
    } catch (error) {
      console.error('Error al eliminar el producto', error);
      throw error;
    }
  }
};

export default ProductService;
