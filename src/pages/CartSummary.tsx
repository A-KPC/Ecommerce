import React, { useMemo } from "react";
import { Product } from "../types/productType";
import BackButton from "../components/BackButton";

interface CartSummaryProps {
    cart: Product[];
    updateCart: (updatedCart: Product[]) => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ cart, updateCart }) => {
    // ฟังก์ชันคำนวณราคา subtotal
    const calculateSubtotal = (price: number, quantity: number): number => {
        return price * quantity;
    };

    // ฟังก์ชันคำนวณราคาทั้งหมด
    const calculateTotal = (): number => {
        return cart.reduce((total, item) => {
            const price = Number(item.price);
            const quantity = Number(item.quantity);
            return total + (isNaN(price) || isNaN(quantity) ? 0 : calculateSubtotal(price, quantity));
        }, 0);
    };

    // ฟังก์ชันเพิ่มจำนวนสินค้า
    const handleQuantityChange = (productId: number, quantity: number) => {
        if (quantity < 1) return; // ไม่ให้จำนวนสินค้าต่ำกว่า 1
        updateCart(cart.map(item =>
            item.id === productId
                ? { ...item, quantity: quantity }
                : item
        ));
    };

    // ฟังก์ชันลบสินค้าออกจากตะกร้า
    const handleRemoveItem = (productId: number) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        updateCart(updatedCart);
    };

    //คำนวณ total โดยใช้ use memo 
    const total = useMemo(() => calculateTotal(), [cart])

    return (
        <div className="max-w-4xl mx-auto my-10 p-8 bg-gradient-to-r from-gray-800 to-black text-white rounded-lg shadow-lg">
            <BackButton />
            <h1 className="text-4xl text-center text-white font-serif mb-8">
                Cart Summary
            </h1>
            <div className="space-y-6">
                {cart.length === 0 ? (
                    <p className="text-center text-lg text-gray-400">Your cart is empty</p>
                ) :
                    (
                        cart.map(
                            item => (
                                <div key={item.id} className="flex justify-between items-center py-4 border-b border-gray-600">
                                    {/* สินค้าและรายละเอียด */}
                                    <div className="flex items-center space-x-4">
                                        <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
                                        <div>
                                            <p className="text-lg font-semibold text-white">{item.title}</p>
                                            <p className="text-sm text-gray-400">Price: ${item.price.toFixed(2)}</p>
                                        </div>
                                    </div>

                                    {/* จำนวนสินค้า, ปุ่มเพิ่ม/ลด, ปุ่มลบ และราคาสินค้า */}
                                    <div className="flex items-center space-x-4 ml-auto text-right">
                                        {/* จำนวนสินค้า และปุ่มเพิ่ม/ลด */}
                                        <div className="flex items-center space-x-2">
                                            <button
                                                className="text-lg bg-gray-700 text-white px-2 py-1 rounded-full hover:bg-gray-600"
                                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                            >
                                                -
                                            </button>
                                            <span className="text-xl text-white">{item.quantity}</span>
                                            <button
                                                className="text-lg bg-gray-700 text-white px-2 py-1 rounded-full hover:bg-gray-600"
                                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>


                                        {/* ราคาสินค้า */}
                                        <p className="text-lg text-white font-semibold">${calculateSubtotal(Number(item.price), item.quantity).toFixed(2)}</p>

                                        {/* ปุ่มลบสินค้า */}
                                        <button
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="text-red-500 hover:text-red-700 text-sm font-semibold"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                    )}
            </div>

            {/* Total */}
            <div className="mt-8 flex justify-between text-xl font-semibold text-white">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default CartSummary;
