import React, { useEffect, useState } from 'react';
import axios from '../services/axios';
import { Product } from '../types/Product';
import '../styles/OrderDetailsStyle.css';

interface ProductDetailsProps {
  productId: number;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId }) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`/products/${productId}`);
          setProduct(response.data);
        } catch (err) {
          console.error('Error al cargar el producto:', err);
          setError('No se pudieron cargar los detalles del producto.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchProduct();
    }, [productId]);
  
    if (loading) return <div className="loading-state">Cargando detalles del producto...</div>;
    if (error) return <div className="error-state">Error: {error}</div>;
    if (!product) return <div className="error-state">No se encontraron detalles para este producto.</div>;
  
    return (
      <div className="product-details">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </div>
    );
  };
export default ProductDetails;
