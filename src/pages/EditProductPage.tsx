import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductService from '../services/ProductService';
import { Product } from '../types/Product';

const EditProductPage: React.FC = () => {
  const { id } = useParams();  // Obtener el ID del producto de la URL
  const navigate = useNavigate();  // Para redirigir después de editar
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await ProductService.getProductById(Number(id));  // Obtener producto por ID
        setProduct(data);
      } catch (error) {
        setError('Error al cargar el producto');
        console.error('Error al obtener el producto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (product) {
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      try {
        await ProductService.updateProduct(Number(id), product);  // Actualizar producto
        navigate('/products');  // Redirigir a la página de productos
      } catch (error) {
        setError('Error al actualizar el producto');
        console.error('Error al actualizar el producto:', error);
      }
    }
  };

  if (loading) {
    return <div>Cargando producto...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Editar Producto</h1>
      {product && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Descripción</label>
            <input
              type="text"
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Precio</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Categoría ID</label>
            <input
              type="number"
              name="categoryId"
              value={product.categoryId}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Guardar Cambios</button>
        </form>
      )}
    </div>
  );
};

export default EditProductPage;
