import axios from './axios';  // Importar la instancia de axios
import { Product } from '../types/Product'; //Importar la interface product para el tema de los tipados


interface SearchParams {
  name?: string;
  sortBy?: string;
  sortDirection?: string;
  minPrice?: number;
  maxPrice?: number;
}

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

  
updateProduct: async (id: number, product: Product): Promise<Product> => {
  try {
    const response = await axios.put(`/products/${id}`, product);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el producto', error);
    throw error;
  }
},


createProduct: async (product: Product): Promise<Product> => {
  try {
    const response = await axios.post('/products', product);  // Llamada POST al backend
    return response.data;
  } catch (error) {
    console.error('Error al agregar el producto', error);
    throw error;
  }
},

  
getProductById: async (id: number): Promise<Product> => {
  try {
    const response = await axios.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el producto por ID', error);
    throw error;
  }
},



searchProducts: async (params: SearchParams): Promise<Product[]> => {
  try {
    const queryParams = new URLSearchParams();
    if (params.name) queryParams.append('name', params.name);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortDirection) queryParams.append('sortDirection', params.sortDirection);
    if (params.minPrice) queryParams.append('minPrice', params.minPrice.toString());
    if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());

    const response = await axios.get(`/products/search?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error al buscar productos', error);
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
