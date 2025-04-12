import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, incrementQuantity, decrementQuantity, removeFromCart } from '../features/cart/cartSlice';
import BillSummary from './BillSummary';


function calculateBillDetails(cartItems) {
  let subtotal = 0;
  let savings = 0;
  const appliedOffers = [];

  let cheeseCount = 0;
  let soupCount = 0;
  let breadCount = 0;
  let butterCount = 0;

  // Calculate subtotal
  cartItems.forEach(item => {
    subtotal += item.price * item.quantity;

    if (item.name.toLowerCase() === 'cheese') cheeseCount = item.quantity;
    if (item.name.toLowerCase() === 'soup') soupCount = item.quantity;
    if (item.name.toLowerCase() === 'bread') breadCount = item.quantity;
    if (item.name.toLowerCase() === 'butter') butterCount = item.quantity;
  });

  if (cheeseCount >= 2) {
    const freeCheese = Math.floor(cheeseCount / 2);
    const cheesePrice = cartItems.find(item => item.name.toLowerCase() === 'cheese').price;
    const saved = freeCheese * cheesePrice;
    savings += saved;
    appliedOffers.push({
      description: `Buy 1 Get 1 Free on Cheese (${freeCheese} free)`,
      amount: saved.toFixed(2)
    });
  }

  const breadDiscounted = Math.min(soupCount, breadCount);
  if (breadDiscounted > 0) {
    const breadPrice = cartItems.find(item => item.name.toLowerCase() === 'bread').price;
    const saved = breadDiscounted * breadPrice * 0.5;
    savings += saved;
    appliedOffers.push({
      description: `Half price Bread with Soup (${breadDiscounted} Bread)`,
      amount: saved.toFixed(2)
    });
  }

  // Butter 1/3 off
  if (butterCount > 0) {
    const butterPrice = cartItems.find(item => item.name.toLowerCase() === 'butter').price;
    const saved = butterCount * butterPrice * (1 / 3);
    savings += saved;
    appliedOffers.push({
      description: `1/3 off Butter (${butterCount} Butter)`,
      amount: saved.toFixed(2)
    });
  }

  const total = subtotal - savings;

  return {
    subtotal: subtotal.toFixed(2),
    total: total.toFixed(2),
    savings: savings.toFixed(2),
    appliedOffers
  };
}

function CartDetails() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const { subtotal, total, savings, appliedOffers } = calculateBillDetails(cartItems);
  console.log(cartItems);
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-4 ">
      <header className="bg-pink-500 text-white py-4 sticky top-0 shadow-md z-10 max-w-4xl mx-auto rounded-lg fixed">
        <h1 className="text-center text-2xl font-bold tracking-wide">🛒 Your Cart</h1>
      </header>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {cartItems.length === 0 ? (
          <p className="text-center text-lg text-gray-500 mt-20">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item, i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg flex items-center justify-between p-4">
                  <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />

                  <div className="flex-1 px-4">
                    <div className="font-semibold text-lg">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.quantityText}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => dispatch(decrementQuantity(item))} className="w-8 h-8 bg-pink-100 hover:bg-pink-200 text-pink-600 font-bold rounded">
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button onClick={() => { dispatch(incrementQuantity(item)); console.log(cartItems) }} className="w-8 h-8 bg-pink-100 hover:bg-pink-200 text-pink-600 font-bold rounded">
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold text-pink-600">₹{item.price * item.quantity}</div>
                    <button
                      onClick={() => dispatch(removeFromCart(item))}
                      className="text-xs text-gray-400 hover:text-red-500 mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#f2f2f2] shadow-xl p-6 rounded-2xl sticky bottom-4 border border-gray-200">
              {/* <div className="bg-white shadow-xl p-6 rounded-2xl">
                <h2 className="text-xl font-bold mb-2 text-pink-600">🧾 Bill Summary</h2>
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{subtotal}</span>
                </div>

                {appliedOffers.map((offer, index) => (
                  <div key={index} className="flex justify-between text-sm text-green-600">
                    <span>✔ {offer.description}</span>
                    <span>Saved ₹{offer.amount}</span>
                  </div>
                ))}

                <div className="flex justify-between font-semibold mt-2">
                  <span>Total Savings:</span>
                  <span>₹{savings}</span>
                </div>

                <div className="flex justify-between text-lg font-bold">
                  <span>Total to Pay:</span>
                  <span>₹{total}</span>
                </div>
              </div> */}
              <BillSummary
                subtotal={subtotal}
                total={total}
                savings={savings}
                appliedOffers={appliedOffers}
              ></BillSummary>

              <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold rounded-full shadow-lg hover:scale-105 transition transform duration-200 mt-2">
                💳 Click to Pay ₹{total}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartDetails;
