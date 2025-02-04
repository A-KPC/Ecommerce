import axios from "axios";
import { Product } from "../types/productType";

const URL = 'https://dummyjson.com'

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await axios.get<{ products: Product[] }>(`${URL}/products?limit=194`);
    return response.data.products;
}

export const fetchProductById = async (id: number): Promise<Product> => {
    const response = await axios.get<Product>(`${URL}/products/${id}`);
    return response.data;
}