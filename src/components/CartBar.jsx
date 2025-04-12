import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartBar = ({ itemCount, totalAmount }) => {
    const navigate = useNavigate();
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full z-50 shadow-lg p-4">
    <div className="w-[100%] bg-pink-500 text-white px-4 py-3 flex justify-between items-center shadow-lg rounded-lg">
      {/* Items & Amount */}
      <div className="text-sm sm:text-base font-semibold">
        {itemCount} Item{itemCount !== 1 && 's'} | ₹{totalAmount}
      </div>

      {/* View Cart Button */}
      <button
        onClick={() => navigate("/cartdetail")}
        className="flex items-center gap-2 bg-white text-pink-600 font-semibold px-4 py-2 rounded-full shadow-md hover:bg-pink-100 transition"
      >
        <ShoppingBag size={18} />
        View Cart
      </button>
    </div>
    </div>
  );
};

export default CartBar;
