import React from 'react';

function ProductList({ products }) {
    return (
        <div>
            {products.length > 0 ? (
                <ul>
                    {products.map(product => (
                        <li key={product.id}>
                            <h3>{product.name}</h3>
                            <p>Descripción: {product.description}</p>
                            <p>Precio: ${product.price}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay productos disponibles.</p>
            )}
        </div>
    );
}

export default ProductList;
