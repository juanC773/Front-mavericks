import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductService from '../services/ProductService';
import { Product } from '../types/Product';
import PageTitle from '../components/PageTitle';
import { Upload } from 'lucide-react';
import '../styles/forms.css';

const EditProductPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await ProductService.getProductById(Number(id));
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !product) return;

    setUploading(true);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'product_images');
    
    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/delu6ory2/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );
      
      const data = await response.json();
      console.log('Respuesta de Cloudinary:', data);
      setProduct({
        ...product,
        image: data.secure_url
      });
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      setError('Error al subir la imagen');
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (product) {
      const value = e.target.type === 'number' 
        ? Number(e.target.value)
        : e.target.value;
      
      setProduct({
        ...product,
        [e.target.name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      try {
        setLoading(true);
        await ProductService.updateProduct(Number(id), product);
        navigate('/products');
      } catch (error) {
        setError('Error al actualizar el producto');
        console.error('Error al actualizar el producto:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-bold text-gray-600">Cargando producto...</p>
      </div>
    );
  }

  return (
    <section>
      <PageTitle title="Editar Producto" />
      
      <div className="flex justify-center box-border px-20 py-10">
        <div className="container_create">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          
          {product && (
            <form onSubmit={handleSubmit}>
              <div className="input_group">
                <label className="form_label" htmlFor="name">
                  Nombre del Producto
                </label>
                <input
                  className="form_input"
                  type="text"
                  id="name"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
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
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  placeholder="Escribe una breve descripción"
                  required
                />
              </div>

              {/* Campo de imagen nuevo */}
              <div className="input_group">
                <label className="form_label" htmlFor="image">
                  Imagen del Producto
                </label>
                <div className="flex flex-col items-center gap-4">
                  {product.image && (
                    <img 
                      src={product.image} 
                      alt="Vista previa" 
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  )}
                  <div className="relative w-full">
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                    <label
                      htmlFor="image"
                      className="flex items-center justify-center gap-2 px-4 py-2 
                               bg-gray-100 text-gray-700 rounded-full cursor-pointer 
                               hover:bg-gray-200 transition-colors w-full border border-gray-300"
                    >
                      <Upload size={20} />
                      {uploading ? 'Subiendo...' : product.image ? 'Cambiar Imagen' : 'Subir Imagen'}
                    </label>
                  </div>
                </div>
              </div>

              <div className="input_group">
                <label className="form_label" htmlFor="price">
                  Precio
                </label>
                <input
                  className="form_input"
                  type="number"
                  id="price"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
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
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
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
                  name="categoryId"
                  value={product.categoryId}
                  onChange={handleChange}
                  placeholder="Ingresa el ID de la categoría"
                  required
                />
              </div>

              <div className="button_group">
                <button 
                  className="button_save" 
                  type="submit"
                  disabled={loading || uploading}
                >
                  {loading ? 'Guardando...' : 'Guardar Cambios'}
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
          )}
        </div>
      </div>
    </section>
  );
};

export default EditProductPage;