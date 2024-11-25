import React, { useState, useEffect } from 'react';
import CategoriesService from '../services/CategoriesService';
import ProductService from '../services/ProductService';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import { Upload } from 'lucide-react';
import '../styles/Forms.css';
import { Category } from '../types/Category';

const AddProductPage: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await CategoriesService.getAllCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        setError('Error al obtener las categorías');
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'product_images');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/delu6ory2/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Respuesta de Cloudinary:', data);
      setImageUrl(data.secure_url);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      setError('Error al subir la imagen');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = {
      name,
      description,
      price,
      stock,
      categoryId,
      image: imageUrl, // Incluimos la URL de la imagen
    };

    console.log('Producto a guardar:', newProduct); // Agrega este log
    try {
      setLoading(true);
      await ProductService.createProduct(newProduct);
      //const savedProduct = await ProductService.createProduct(newProduct);
      //console.log('Producto guardado:', savedProduct); // Y este log
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

            {/* Campo de imagen nuevo */}
            <div className="input_group">
              <label className="form_label" htmlFor="image">
                Imagen del Producto
              </label>
              <div className="flex flex-col items-center gap-4">
                {imageUrl && (
                  <img
                    src={imageUrl}
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
                    {uploading ? 'Subiendo...' : imageUrl ? 'Cambiar Imagen' : 'Subir Imagen'}
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
                Categoría
              </label>
              <select
                className="form_input"
                id="categoryId"
                value={categoryId}
                onChange={(e) => setCategoryId(parseInt(e.target.value))}
                required
              >
                <option value={0}>Selecciona una categoría</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="button_group">
              <button className="button_save" type="submit" disabled={loading || uploading}>
                {loading ? 'Guardando...' : 'Guardar Producto'}
              </button>
              <button className="button_cancel" type="button" onClick={() => navigate('/products')}>
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
