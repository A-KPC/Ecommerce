import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPage, onPageChange }) => {
    return (
        <div className="flex justify-center mt-4 mb-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-1 bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
                Prev
            </button>
            {Array.from({ length: totalPage }, (_, index) => (
                <button
                    key={index}
                    onClick={() => onPageChange(index + 1)}
                    className={`px-4 py-2 mx-1 rounded-lg ${currentPage === index + 1 ? "bg-orange-500" : "bg-gray-700"}`}>
                    {index + 1}
                </button>
            ))
            }
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPage}
                className="px-4 py-2 mx-1 bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
                Next
            </button>
        </div >
    )
}

export default Pagination

