import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./features/products/productSlice";
import Header from "./components/Header";
import HomeView from "./components/HomeView";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CartDetails from "./components/CartDetail";

function App() {

  const dispatch = useDispatch();
  const { items, status } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
       <Router>
      <div>
        <Header></Header>
      </div>
      <div className="pt-16">
        <Routes>
          <Route path="/" element={
              <HomeView></HomeView>
          }></Route>
          <Route path="/cartdetail" element={<CartDetails />} /> 
        </Routes>
        </div>

      </Router>
    </>
  );
}

export default App;
