import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductService from '../services/ProductService';
import CategoriesService from '../services/CategoriesService';
import { Product } from '../types/Product';
import { Category } from '../types/Category';
import PageTitle from '../components/PageTitle';
import { Upload } from 'lucide-react';
import '../styles/forms.css';

const EditProductPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productData, categoriesData] = await Promise.all([
          ProductService.getProductById(Number(id)),
          CategoriesService.getAllCategories()
        ]);
        setProduct(productData);
        setCategories(categoriesData);
      } catch (error) {
        setError('Error al cargar los datos');
        console.error('Error al obtener los datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (product) {
      const { name, value, type } = e.target;
      
      let parsedValue: string | number = value;
      
      // Convertir a número si el campo es numérico
      if (type === 'number' || name === 'categoryId') {
        parsedValue = Number(value);
      }
      
      setProduct({
        ...product,
        [name]: parsedValue,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      try {
        setLoading(true);
        // Asegurarse de que categoryId sea un número antes de enviar
        const updatedProduct = {
          ...product,
          categoryId: Number(product.categoryId)
        };
        await ProductService.updateProduct(Number(id), updatedProduct);
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
                  Categoría
                </label>
                <select
                  className="form_input"
                  id="categoryId"
                  name="categoryId"
                  value={product.categoryId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
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