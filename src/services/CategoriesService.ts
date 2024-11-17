import axios from './axios';  // Importar la instancia de axios
import { Category } from '../types/Category';

// Tipar la respuesta de los productos
const CategoriesService = {
  // Método para obtener todos los productos
  getAllCategories: async (): Promise<Category[]> => {
    try {
      const response = await axios.get('/categories/all');
      return response.data;
    } catch (error) {
      console.error('Error al obtener las categorías', error);
      throw error;
    }
  }
}

export default CategoriesService