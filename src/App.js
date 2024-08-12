import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    let getProducts = async () => {
      try {
        let list = await axios.get("https://dummyjson.com/products");
        let response = list.data.products;
        console.log(response);
        setProducts(response);
      } catch (err) {
        console.error("Error While Fetching The Data", err);
        setProducts(null);
      }
    };
    getProducts();
  }, []);
  console.log(products);
  return (
    <>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products ? (
            <>
              {products.map((item) => (
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <img
                    className="w-full h-48 object-cover"
                    src={item.thumbnail}
                    alt="Product Image"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-600 mt-2">
                      {item.description.length > 50
                        ? item.description.substring(0, 100) + "..."
                        : item.description}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xl font-bold text-gray-800">
                        {item.price}
                      </span>
                      <button className="px-3 py-2 bg-blue-600 text-white text-xs font-bold uppercase rounded">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div>Loading .....</div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
