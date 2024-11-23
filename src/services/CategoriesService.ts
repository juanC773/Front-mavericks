import axios from './axios';
import { Category } from '../types/Category';

const CategoriesService = {
  getAllCategories: async (): Promise<Category[]> => {
    try {
      const { data } = await axios.get<Category[]>('/categories/all');
      console.log('Datos recibidos de la API:', data);

      // Verificar si data es undefined o null
      if (!data) {
        console.error('No se recibieron datos de la API');
        return [];
      }

      // Asegurarnos de que data es un array
      if (!Array.isArray(data)) {
        console.error('Los datos recibidos no son un array:', data);
        return [];
      }

      return data;
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
      return []; // Retornamos un array vacío en lugar de lanzar el error
    }
  },
};

export default CategoriesService;
