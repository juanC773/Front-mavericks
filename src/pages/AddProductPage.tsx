import React, { useState } from 'react';
import ProductService from '../services/ProductService';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import '../styles/forms.css'; // Importamos el CSS

const AddProductPage: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

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
    <section>
      <PageTitle title="Agregar Producto" />
      
      <div className="flex justify-center box-border px-20 py-10">
        <div className="container_create">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          
          <form onSubmit={handleSubmit}>
            <div className="input_group">
              <label className="form_label" htmlFor="name">
                Nombre del Producto
              </label>
              <input
                className="form_input"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Escribe el nombre del producto"
                required
              />
            </div>

            <div className="input_group">
              <label className="form_label" htmlFor="description">
                Descripción
              </label>
              <textarea
                className="form_textarea"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Escribe una breve descripción"
                required
              />
            </div>

            <div className="input_group">
              <label className="form_label" htmlFor="price">
                Precio
              </label>
              <input
                className="form_input"
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                placeholder="Ingresa el precio"
                required
              />
            </div>

            <div className="input_group">
              <label className="form_label" htmlFor="stock">
                Stock
              </label>
              <input
                className="form_input"
                type="number"
                id="stock"
                value={stock}
                onChange={(e) => setStock(parseInt(e.target.value))}
                placeholder="Ingresa el stock disponible"
                required
              />
            </div>

            <div className="input_group">
              <label className="form_label" htmlFor="categoryId">
                ID Categoría
              </label>
              <input
                className="form_input"
                type="number"
                id="categoryId"
                value={categoryId}
                onChange={(e) => setCategoryId(parseInt(e.target.value))}
                placeholder="Ingresa el ID de la categoría"
                required
              />
            </div>

            <div className="button_group">
              <button 
                className="button_save" 
                type="submit" 
                disabled={loading}
              >
                {loading ? 'Cargando...' : 'Guardar Producto'}
              </button>
              <button 
                className="button_cancel"
                type="button"
                onClick={() => navigate('/products')}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddProductPage;