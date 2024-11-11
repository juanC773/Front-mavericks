import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductService from '../services/ProductService';
import { Product } from '../types/Product';
import PageTitle from '../components/PageTitle';

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

  const handleDelete = async (id: number) => {
    try {
      await ProductService.deleteProduct(id);
      setProducts(products.filter(product => product.idProduct !== id));
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
      <PageTitle title="Lista de Productos" />
      
      {/* Botón para agregar un nuevo producto, visible siempre */}
      <Link to="/products/add">
        <button>Agregar Nuevo Producto</button>
      </Link>

      {products.length === 0 ? (
        <p>No hay productos disponibles</p>
      ) : (
        <ul>
          {products.map((product: Product) => (
            <li key={product.idProduct}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Precio: ${product.price}</p>
              <p>Stock: {product.stock}</p>
              <p>Categoría ID: {product.categoryId}</p>

              <button 
                onClick={() => {
                  if (product.idProduct !== undefined) {
                    handleDelete(product.idProduct);
                  } else {
                    console.error('ID de producto no definido');
                  }
                }}
              >
                Eliminar
              </button>

              <Link to={`/products/edit/${product.idProduct}`}>
                <button>Editar</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductPage;
