import React from 'react';
import { Product } from '../types/productType';
import { Link } from 'react-router-dom';

interface ProductCardProp {
    product: Product;
    onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProp> = ({ product, onAddToCart }) => {
    return (
        <div className="bg-gray-900 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out relative">
            {/* Product Thumbnail */}
            <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
            />

            {/* Product Title */}
            <h3 className="text-xl sm:text-xl md:text-xl lg:text-xl font-serif text-yellow-400 mb-2">{product.title}</h3>

            {/* Product Description (shortened) */}
            <p className="text-gray-600 mb-4 text-sm sm:text-xs md:text-sm lg:text-sm line-clamp-3">
                {product.description}
            </p>

            {/* Product Price */}
            <p className="text-xl sm:text-lg md:text-xl lg:text-xl text-white font-semibold">Price: ${product.price}</p>

            {/* Add to Cart */}
            <button
                onClick={onAddToCart}
                className="text-sm bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-2 rounded-lg shadow-md transition duration-200 mt-4">
                Add to Cart
            </button>

            {/* View Detail Link */}
            <Link
                to={`/product/${product.id}`}
                className="absolute bottom-2 right-2 text-white hover:text-blue-200 font-semibold mt-4"
            >
                View Detail
            </Link>
        </div>
    );

}

export default ProductCard;