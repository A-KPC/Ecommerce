import { useEffect, useState } from "react";
import { fetchProducts } from "../service/api";
import ProductCard from "../components/ProductCard";
import { Product, Category } from "../types/productType";
import axios from "axios";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import SearchFilter from "../components/SearchFilter";

const Home = ({ cart, updateCart }: { cart: Product[], updateCart: (cart: Product[]) => void }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState<Product[]>([]);
    const [category, setCategory] = useState('all');
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")


    //Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 20;


    //ดึงข้อมูลสินค้า
    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const data = await fetchProducts();
                setProducts(data);
                setFiltered(data);
            } catch (error) {
                setError("Failed to load products.");
                console.error(error);
            } finally {
                setLoading(false)
            }

        };
        getProducts();
    }, [])

    //ดึงข้อมูล category  
    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await axios.get<Category[]>('https://dummyjson.com/products/categories');
                setCategories(response.data);
            } catch (error) {
                console.error("Failed to load categories", error);

            }

        }
        getCategories();
    }, [])

    //กรองสินค้าตาม search และ category
    useEffect(() => {
        const filter = products.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = category === 'all' || product.category === category;
            return matchesSearch && matchesCategory
        });
        setFiltered(filter);
        setCurrentPage(1); //reset ไปหน้าแรกเมื่อมีการ filter ใหม่
    }, [search, category, products]);



    //รายการที่จะแสดงในหน้าปัจจุบัน
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);



    const totalPage = Math.ceil(filtered.length / itemPerPage)

    //Add to Cart and Check for Duplicate
    const addToCart = (product: Product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            // ถ้าสินค้าซ้ำให้เพิ่มจำนวนสินค้า
            updateCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            // ถ้าไม่ซ้ำให้เพิ่มสินค้าลงใน cart พร้อมกับตั้ง quantity เป็น 1
            updateCart([...cart, { ...product, quantity: 1 }]);
        }

    };


    return (
        <div className="max-w-screen-2xl mx-auto p-6 bg-gradient-to-r from-gray-800 to-black text-white">
            <div className="flex justify-between items-center mb-8">
                {/* Header */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-wider mb-5">
                    Modern Luxury Store
                </h1>


                {/* Cart Icon */}
                <div className="relative" >
                    <Link to='/cart'>
                        <FiShoppingCart className="text-orange-300 text-3xl cursor-pointer" />
                    </Link>
                    {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center">
                            {cart.length}
                        </span>
                    )}
                </div>
            </div>

            {/* Error */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Loading */}
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <>
                    <Pagination
                        currentPage={currentPage}
                        totalPage={totalPage}
                        onPageChange={setCurrentPage}
                    />

                    <SearchFilter
                        search={search}
                        category={category}
                        categories={categories}
                        onSearchChange={setSearch}
                        onCategoryChange={setCategory}
                    />


                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {currentItems.map((product) => (
                            <ProductCard key={product.id} product={product} onAddToCart={() => addToCart(product)} />
                        ))}
                    </div>


                </>
            )}



        </div>)
}

export default Home;