import React from "react";
import { Category } from "../types/productType";

interface SearchFilterProps {
    search: string;
    category: string;
    categories: Category[];
    onSearchChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ search, category, categories, onSearchChange, onCategoryChange }) => {
    return (
        <div className="mb-6 flex justify-between items-center gap-4">
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search Products..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className=" w-1/3 p-3 rounded-lg border-2 border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />

            {/* Category Dropdown */}
            <select
                value={category}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-[200px] p-3 rounded-lg border-2 border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                        {cat.name}
                    </option>
                ))}
            </select>

        </div>
    )
}

export default SearchFilter