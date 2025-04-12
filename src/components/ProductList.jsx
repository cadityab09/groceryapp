import React, { useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { fetchProducts } from '../features/products/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQuantity, decrementQuantity } from '../features/cart/cartSlice';


function ProductList() {

    const dispatch = useDispatch();
    const { items, status } = useSelector(state => state.products);
    const cartItems = useSelector(state => state.cart.items);
    const selectedCategory = useSelector(state => state.categories.selectedCategory);

    const filteredItems = selectedCategory ? items.filter(product => (product.category === selectedCategory || selectedCategory === "All Items")) : items;
    console.log('Filtered items:', filteredItems,"  Selected: ", items);
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);


    return (
        <div>
            <div className="p-4 bg-gradient-to-r from-purple-200 via-purple-200 to-pink-200 rounded-2xl shadow-2xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {filteredItems.map((p, i) => (
                        <div key={i} className="bg-[#ffffff] shadow-md rounded-lg p-4 relative border border-gray-200 hover:shadow-xl transition duration-300 ease-in-out bg-white-999 hover:bg-gray-100">
                            <div className="absolute top-2 left-2 bg-purple-700 text-white text-xs px-2 py-1 rounded">
                                {p.offer} Off
                            </div>

                            <div className='flex justify-center items-center p-2'>
                                <img src={p.img} alt={p.name} className="rounded mb-2 w-full max-w-[200px] h-[180px] object-cover center" />
                            </div>

                            {p.badge && (
                                <div className="absolute bottom-20 left-2 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded">
                                    {p.badge}
                                </div>
                            )}

                            <div className="text-sm font-medium">{p.name}</div>
                            <div className="text-xs text-gray-500">{p.quantity}</div>
                            <div className="flex justify-between items-center mt-1">
                                <div>
                                    <span className="text-sm font-semibold">{p.price}</span>{" "}
                                    <span className="text-xs line-through text-gray-400">{p.originalPrice}</span>
                                </div>
                                {(() => {
                                    const inCart = cartItems.find(item => item.name === p.name);
                                    if (inCart) {
                                        return (
                                            <div className="flex items-center space-x-2 border border-pink-500 rounded">
                                                <button onClick={() => dispatch(decrementQuantity(p))} className="px-2 py-1 bg-pink-200">-</button>
                                                <span>{inCart.quantity}</span>
                                                <button onClick={() => dispatch(incrementQuantity(p))} className="px-2 py-1 bg-pink-200">+</button>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <button onClick={() => dispatch(addToCart(p))} className="border border-pink-500 text-pink-500 text-sm px-2 py-1 rounded hover:bg-pink-100 transition duration-300">
                                                Add
                                            </button>
                                        );
                                    }
                                })()}

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductList;
