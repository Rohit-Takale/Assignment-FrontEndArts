import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import FilterButton from "./components/FilterButton";
import SelectInput from "./components/SelectInput";

function App() {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  // const [pricelist, setPriceList] = useState(null)

  const priceList = ["Low-High", "High-Low"];
  const ratingList = [1, 2, 3, 4, 5];

  useEffect(() => {
    let getProducts = async () => {
      try {
        let list = await axios.get("https://dummyjson.com/products");
        let response = list.data.products;
        let categories_list = response.reduce((acc, item) => {
          if (!acc.includes(item.category)) {
            acc.push(item.category);
          }
          return acc;
        }, []);

        setCategories(categories_list);
        // console.log(categories_list);

        setProducts(response);
      } catch (err) {
        console.error("Error While Fetching The Data", err);
        setProducts(null);
        setCategories(null);
      }
    };
    getProducts();
  }, []);

  const priceChange = (e) => {
    e.preventDefault();
    let sortOrder = e.target.value;

    if (products) {
      let sortedProducts = [...products].sort((a, b) => {
        if (sortOrder === "Low-High") {
          return a.price - b.price;
        } else if (sortOrder === "High-Low") {
          return b.price - a.price;
        }
        return 0;
      });
      setProducts(sortedProducts)
    }
  };
  const catChange = (e) => {
    e.preventDefault();
    let cat = e.target.value;
  };
  const ratingChange = (e) => {
    e.preventDefault();
    let rating = e.target.value;
  };

  return (
    <>
      <div className="container mx-auto p-6">
        <div className="my-10">
          <FilterButton />
        </div>
        <div>
          <div className="grid grid-cols-3 gap-5 my-10">
            <div>
              <SelectInput
                id="price_id"
                label="Filter By Price"
                options={priceList}
                onChange={priceChange}
              />
            </div>
            <div>
              <SelectInput
                id="cat_id"
                label="Filter By Category"
                options={categories}
                onChange={catChange}
              />
            </div>
            <div>
              <SelectInput
                id="filter_id"
                label="Filter By Rating"
                options={ratingList}
                onChange={ratingChange}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products ? (
            <>
              {products.map((item) => (
                <div
                  className="bg-white shadow-md rounded-lg overflow-hidden"
                  key={item.id}
                >
                  <img
                    className="w-full h-48 object-cover"
                    src={item.thumbnail}
                    alt="Not available"
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
