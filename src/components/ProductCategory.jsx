import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../features/products/categoriesSlice';
import { setSelectedCategory } from '../features/products/categoriesSlice';

function ProductCategory() {

    const dispatch = useDispatch();
    const { items, loading } = useSelector(state => state.categories);
    // const [selectedCategory, setSelectedCategory] = useState('All Items');
    const { selectedCategory } = useSelector(state => state.categories);

    const handleSelectCategory = (categoryName) => {
        dispatch(setSelectedCategory(categoryName));
        console.log('Selected category:', categoryName);

    };

    useEffect(() => {
        dispatch(fetchCategories());
        console.log(items);
    }, [dispatch]);

      
    // const categories = [
    //     { name: "All Items", icon: "❤️" },
    //     { name: "Fruits & Vegetables", icon: "🍎" },
    //     { name: "Dairy Products", icon: "🥛" },
    //     { name: "Snacks & Drinks", icon: "🍿" },
    //     { name: "Grocery & Kitchen", icon: "🧂" },
    // ];

    return (
        <div className="">
          {loading ? (
            <p>Loading...</p>
          ) : items && Array.isArray(items) ? (
            <div className="flex space-x-6 overflow-x-auto border-b border-gray-200 bg-gradient-to-r from-purple-200 via-purple-200 to-pink-200 p-4 rounded-2xl shadow-xl">
              {items.map((cat, i) => (
                <div key={i} 
                    onClick={() => handleSelectCategory(cat.name)}
                    className="flex flex-col items-center min-w-[80px]"
                >
                  <div className={`text-3xl ${cat.name === selectedCategory ? "bg-pink-100 p-2 rounded-full" : ""}`}>
                    {cat.icon}
                  </div>
                  <span className={`text-sm mt-1 ${cat.name === selectedCategory ? "text-pink-600 font-semibold" : "text-gray-700"}`}>
                    {cat.name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p>No categories found.</p>
          )}
        </div>
      );
      
}

export default ProductCategory