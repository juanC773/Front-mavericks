import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProductService from '../services/ProductService';
import { Product } from '../types/Product';
import PageTitle from '../components/PageTitle';
import { 
  PlusCircle, 
  Package, 
  DollarSign, 
  BoxIcon, 
  Tag, 
  Edit2, 
  Trash2, 
  ShoppingCart, 
  Search, 
} from 'lucide-react';
import { addItem } from '../store/cartSlice';

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const dispatch = useDispatch();

  const fetchProducts = async (params = {}) => {
    setLoading(true);
    try {
      const data = await ProductService.searchProducts(params);
      setProducts(data);
    } catch (error) {
      setError('Error al cargar los productos');
      console.error('Error al obtener los productos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = async () => {
    const params = {
      name: searchTerm || undefined,
      sortBy: sortBy || undefined,
      sortDirection: sortDirection || undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    };
    await fetchProducts(params);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await ProductService.deleteProduct(id);
        setProducts(products.filter(product => product.idProduct !== id));
      } catch (error) {
        setError('Error al eliminar el producto');
        console.error('Error al eliminar el producto:', error);
      }
    }
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addItem({ product, quantity: 1 }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
        <Package className="animate-spin mr-2" />
        Cargando productos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center mx-auto max-w-md mt-8">
        {error}
      </div>
    );
  }

  return (
    <>
      <PageTitle title="Lista de Productos" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sección superior con botón de agregar y filtros */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <Link to="/products/add">
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-600 
                           text-white font-semibold rounded-full shadow-lg hover:from-orange-500 
                           hover:to-orange-700 transition-all duration-200 hover:scale-105">
              <PlusCircle size={20} />
              Agregar Nuevo Producto
            </button>
          </Link>

          {/* Contenedor de filtros */}
          <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto">
            {/* Barra de búsqueda */}
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full lg:w-64 px-4 py-2 pl-10 rounded-full border border-gray-300 
                          focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>

            {/* Filtros de precio */}
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Precio min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-24 px-3 py-2 rounded-full border border-gray-300 
                          focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Precio max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-24 px-3 py-2 rounded-full border border-gray-300 
                          focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Selector de ordenamiento */}
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setSortDirection('asc');
              }}
              className="px-4 py-2 rounded-full border border-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            >
              <option value="">Ordenar por...</option>
              <option value="name">Nombre</option>
              <option value="price">Precio</option>
            </select>

            {/* Dirección del ordenamiento */}
            {sortBy && (
              <select
                value={sortDirection}
                onChange={(e) => setSortDirection(e.target.value)}
                className="px-4 py-2 rounded-full border border-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              >
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
              </select>
            )}

            {/* Botón de búsqueda */}
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white 
                       rounded-full hover:from-orange-500 hover:to-orange-700 transition-all 
                       duration-200 font-semibold shadow-md hover:shadow-lg"
            >
              Buscar
            </button>
          </div>
        </div>

        {/* Grid de productos */}
        {products.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Package size={48} className="mx-auto mb-4" />
            <p>No hay productos disponibles</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: Product) => (
              <article 
                key={product.idProduct} 
                className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100
                         transition-all duration-200 hover:shadow-xl"
              >
                <div className="w-full h-48 bg-gray-100 overflow-hidden flex items-center justify-center">
                  <img 
                    src="https://ih1.redbubble.net/image.4252685049.9677/pp,504x498-pad,600x600,f8f8f8.jpg" 
                    alt={product.name} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm overflow-hidden text-ellipsis">
                    {product.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <DollarSign size={16} className="text-orange-500" />
                      <span className="text-orange-600 font-bold text-lg">
                        {product.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <BoxIcon size={16} className="text-gray-400" />
                      <span className="text-gray-500">
                        {product.stock} unidades disponibles
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Tag size={16} className="text-gray-400" />
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs
                                     bg-gray-100 text-gray-600">
                        Categoría {product.categoryId}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <Link to={`/products/edit/${product.idProduct}`}>
                      <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-blue-600 
                                       rounded-full border border-blue-600 hover:bg-blue-50 transition-colors">
                        <Edit2 size={16} />
                        Editar
                      </button>
                    </Link>
                    <button 
                      className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-red-600 
                               rounded-full border border-red-600 hover:bg-red-50 transition-colors"
                      onClick={() => {
                        if (product.idProduct !== undefined) {
                          handleDelete(product.idProduct);
                        }
                      }}
                    >
                      <Trash2 size={16} />
                      Eliminar
                    </button>
                    <button
                      className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-green-600 
                               rounded-full border border-green-600 hover:bg-green-50 transition-colors"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart size={16} />
                      Agregar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductPage;