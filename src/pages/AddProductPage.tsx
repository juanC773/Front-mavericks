import React, { useState } from 'react';
import ProductService from '../services/ProductService';  // Importar el servicio para la API
import { useNavigate } from 'react-router-dom';  // Importar para redirigir después de crear el producto
import PageTitle from '../components/PageTitle';

const AddProductPage: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();  // Para redirigir después de agregar el producto

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct = {
      name,
      description,
      price,
      stock,
      categoryId,
    };

    try {
      setLoading(true);
      await ProductService.createProduct(newProduct);  
      navigate('/products');  
    } catch (error) {
      setError('Error al agregar el producto');
      console.error('Error al agregar el producto:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageTitle title="Agregar Producto" />
      

      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="categoryId">ID Categoría:</label>
          <input
            type="number"
            id="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(parseInt(e.target.value))}
            required
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Cargando...' : 'Agregar Producto'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
