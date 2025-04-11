import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./features/products/productSlice";

function App() {
  const dispatch = useDispatch  ();
  const { items, status } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Products</h1>
      {status === "loading" && <p>Loading...</p>}
      <div className="grid grid-cols-2 gap-4">
        {items.map(product => (
          <div key={product.id} className="p-4 bg-white rounded shadow">
            <h2 className="font-semibold">{product.name}</h2>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
