import { useDispatch, useSelector } from "react-redux";
import CartBar from "./CartBar";
import ProductCategory from "./ProductCategory";
import ProductList from "./ProductList";
import SpecialOffers from "./SpecialOffers";

const ProductCard = ({ image, label, discount }) => (
    <div className="relative w-28 md:w-36 rounded-xl overflow-hidden shadow-md bg-white">
      <img src={image} alt={label} className="w-full h-28 md:h-32 object-cover" />
      {discount && (
        <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {discount} Off
        </div>
      )}
      <p className="text-sm text-center p-2">{label}</p>
    </div>
  );
  
  export default function HomeView() {

    const dispatch = useDispatch();
    const cartCount = useSelector((state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));
    const totalAmount = useSelector((state) => state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0));
    return (
      <div className="px-3 space-y-4">

        {/* <div className="bg-purple-700 text-white rounded-xl p-4 flex flex-col items-center text-center shadow-lg">
          <p className="text-yellow-300 font-bold text-lg">FLAT ₹50 OFF</p>
          <p className="text-sm font-medium">ON ORDERS ABOVE ₹149</p>
          <p className="text-xs text-pink-200 mt-1 italic">*Applicable on Skincare Products</p>
        </div> */}

        <SpecialOffers></SpecialOffers>

        <ProductCategory></ProductCategory>
        <ProductList></ProductList>
        {cartCount>0 && (
                  <CartBar itemCount={cartCount} totalAmount={totalAmount}></CartBar>
          )}
      </div>
    );
  }
  