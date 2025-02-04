export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    reviews: Review[];
    quantity: number;
}

export interface Category {
    slug: string;
    name: string;
    url: string;
};

export interface Review {
    reviewerName: string;
    rating: number;
    comment: string;
}