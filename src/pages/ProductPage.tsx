import React, { useEffect, useState } from 'react';  
import ProductService from '../services/ProductService';  
import { Product } from '../types/Product';  

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getAllProducts();
        setProducts(data);
      } catch (error) {
        setError('Error al cargar los productos');  
        console.error('Error al obtener los productos:', error); 
      } finally {
        setLoading(false);  
      }
    };

    fetchProducts();
  }, []); 

  // Función para eliminar un producto
  const handleDelete = async (id: number) => {
    try {
      await ProductService.deleteProduct(id);  // Llamamos al servicio para eliminar el producto
      setProducts(products.filter(product => product.idProduct !== id));  // Actualizamos el estado eliminando el producto
    } catch (error) {
      setError('Error al eliminar el producto');
      console.error('Error al eliminar el producto:', error);
    }
  };

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
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
              <h3>{product.name}</h3>
              <p>{product.description}</p> {/* Mostrar descripción */}
              <p>Precio: ${product.price}</p>
              <p>Stock: {product.stock}</p> {/* Mostrar stock */}
              <p>Categoría ID: {product.categoryId}</p> {/* Mostrar categoría */}
              <button onClick={() => handleDelete(product.idProduct)}>Eliminar</button>  {/* Botón para eliminar */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductPage;
