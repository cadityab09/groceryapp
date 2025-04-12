import { useState } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import mylogo from "../assets/grocerylogo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector(state => state.products);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const cartCount = useSelector((state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));

  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchSuggestions = searchTerm.length > 0
    ? items.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5) // limit to 5 suggestions
    : [];

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200">
      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-6 xl:px-2">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <img src={mylogo} alt="App Logo" className="w-10 h-10 object-contain" />
            <span className="text-xl font-bold text-blue-600 sm:inline">MyShop</span>
          </div>

          {/* Search Bar */}
          <div className="relative flex-grow max-w-[600px] hidden md:block">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              className="w-full px-6 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            {showSuggestions && searchSuggestions.length > 0 && (
              <ul className="absolute z-50 bg-white w-[100%] mt-1 rounded-lg shadow-md border border-gray-200 overflow-hidden max-h-64 overflow-y-auto">
                {searchSuggestions.map((item, idx) => (
                  <li
                    key={idx}
                    className="px-4 py-2 text-sm hover:bg-pink-100 cursor-pointer"
                    onClick={() => {
                      setSearchTerm(item.name);
                      setShowSuggestions(false);
                    }}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <button className="relative text-gray-700 hover:text-blue-600 hidden md:inline" onClick={() => navigate("/cartdetail")}>
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="text-gray-700 hover:text-blue-600 hidden md:inline">
              <User className="w-6 h-6" />
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-4 shadow">
          <div>
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <User className="w-5 h-5" />
            <span>Profile</span>
          </button>
          <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600" onClick={() => navigate("/cartdetail")}>
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
          </button>
        </div>
      )}

    </nav>
  );
};

export default Header;
