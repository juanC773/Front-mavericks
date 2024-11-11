import React, { useEffect, useState } from 'react';  
import ProductService from '../services/ProductService';  // Importa el servicio para obtener productos
import { Product } from '../types/Product';  // Importa el tipo Product

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);  // Estado para almacenar los productos
  const [loading, setLoading] = useState<boolean>(true);  // Estado para saber si están cargando los productos
  const [error, setError] = useState<string | null>(null);  // Estado para manejar errores

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getAllProducts();  // Obtiene los productos
        setProducts(data);  // Guarda los productos en el estado
      } catch (error) {
        setError('Error al cargar los productos');  
        console.error('Error al obtener los productos:', error); 
      } finally {
        setLoading(false);  
      }
    };

    fetchProducts();  // Llama la función para obtener productos
  }, []);  //aqui pues es lo de las dependencias que solo se ejecuta una vez al montarse el componente

  if (loading) {
    return <div>Cargando productos...</div>; 
  }

  if (error) {
    return <div>{error}</div>;  // Muestra el mensaje de error si ocurrió uno
  }

  return (
    <div>
      <h1>Lista de Productos</h1>
      {products.length === 0 ? (
        <p>No hay productos disponibles</p> 
      ) : (
        <ul>
          {products.map((product: Product) => (
            <li key={product.idProduct}>
              {product.name} - ${product.price}  
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductPage;
