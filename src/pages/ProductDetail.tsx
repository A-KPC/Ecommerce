import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchProductById } from "../service/api"
import { Product } from "../types/productType"
import BackButton from "../components/BackButton"
import { FiShoppingCart } from "react-icons/fi"

interface ProductDetailProps {
    cart: Product[];
    updateCart: (cart: Product[]) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ cart, updateCart }) => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const data = await fetchProductById(Number(id));
                setProduct(data);
            } catch (error) {
                setError("Failed to fetch product")
            } finally {
                setLoading(false)
            }
        }

        getProduct();
    }, [id])

    if (loading) return <p className="text-center text-xl font-semibold text-gray-600">Loading...</p>;
    if (error) return <p className="text-center text-xl font-semibold text-red-500">{error}</p>;
    if (!product) return <p className="text-center text-xl font-semibold text-gray-600">Product not found</p>;

    const addToCart = () => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            updateCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            updateCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    return (
        <div className="max-w-6xl mx-auto my-10 p-8 bg-gradient-to-r from-gray-800 to-black text-white rounded-lg shadow-2xl">
            <div className="flex justify-between items-center">

                < BackButton />
                {/* Cart Icon */}
                <div className=" relative">
                    <Link to="/cart">
                        <FiShoppingCart className="text-orange-300 text-3xl cursor-pointer" />
                    </Link>
                    {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center">
                            {cart.length}
                        </span>
                    )}
                </div>
            </div>

            {/* Product Info Section */}
            <div className="grid md:grid-cols-2 gap-12 mt-8">
                {/* Product Image */}
                <div className="flex justify-center items-center bg-gray-900 p-4 rounded-lg shadow-lg">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-96 object-cover rounded-lg shadow-xl"
                    />
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                    <h1 className="text-4xl font-serif text-yellow-400">{product.title}</h1>
                    <p className="text-lg text-gray-300">{product.description}</p>
                    <p className="text-xl font-semibold text-white">Price: <span className="text-yellow-500">${product.price}</span></p>
                    <p className="text-sm text-gray-400">Rating: {product.rating} ⭐</p>
                    <p className="text-sm text-gray-400">Stock: {product.stock} available</p>

                    {/* Add to Cart Button */}
                    <div className="mt-6">
                        <button
                            onClick={addToCart}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-12">
                <h2 className="text-2xl font-semibold text-yellow-400">Customer Reviews</h2>
                {product.reviews.length > 0 ? (
                    <div className="space-y-4 mt-4">
                        {product.reviews.map((review, index) => (
                            <div key={index} className="p-6 bg-gray-800 rounded-lg shadow-md">
                                <div className="flex items-center mb-3">
                                    <span className="font-semibold text-white">{review.reviewerName}</span>
                                    <span className="ml-2 text-sm text-gray-400">({review.rating} ⭐)</span>
                                </div>
                                <p className="text-gray-300">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400 mt-4">No reviews yet.</p>
                )}
            </div>
        </div>
    )
}

export default ProductDetail