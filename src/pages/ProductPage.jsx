import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';


function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Llama al endpoint para obtener los productos
        axios.get('http://localhost:8080/products')
            .then(response => {
                setProducts(response.data); // Guarda los productos en el estado
                setLoading(false); // Cambia el estado de carga
            })
            .catch(error => {
                console.error("Hubo un error al obtener los productos:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Cargando productos...</p>;
    }

    return (
        <div>
            <ProductList products={products} />
        </div>
    );
}

export default ProductPage;
