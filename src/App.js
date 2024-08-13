import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import FilterButton from "./components/FilterButton";
import SelectInput from "./components/SelectInput";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(false);
  const [showFilters, setShowFilters] = useState(false)

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceOrder, setSelectedPriceOrder] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  // const [pricelist, setPriceList] = useState(null)

  const priceList = ["Low-High", "High-Low"];
  const ratingList = [1, 2, 3, 4, 5];

  useEffect(() => {
    let getProducts = async () => {
      try {
        let list = await axios.get("https://dummyjson.com/products");
        let response = list.data.products;

        response = response.map((product) => {
          const totalRating = product.reviews.reduce(
            (acc, review) => acc + review.rating,
            0
          );
          const averageRating =
            product.reviews.length > 0
              ? totalRating / product.reviews.length
              : 0;
          return { ...product, averageRating };
        });

        let categories_list = response.reduce((acc, item) => {
          if (!acc.includes(item.category)) {
            acc.push(item.category);
          }
          return acc;
        }, []);

        setCategories(categories_list);
        // console.log(categories_list);
        setFilteredProducts(response);
        setProducts(response);
        setError(false);
      } catch (err) {
        console.error("Error While Fetching The Data", err);
        setFilteredProducts([]);
        setProducts([]);
        setCategories([]);
        setError(true);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    applyFilters(); // Apply filters whenever filter state changes
  }, [selectedCategory, selectedPriceOrder, selectedRating, products]);

  const applyFilters = () => {
    let filtered = [...products];

    if (selectedCategory && selectedCategory !== "Choose an option") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (selectedRating && selectedRating !== "Choose an option") {
      filtered = filtered.filter(
        (product) => product.averageRating >= selectedRating
      );
    }

    if (selectedPriceOrder) {
      filtered = filtered.sort((a, b) => {
        if (selectedPriceOrder === "Low-High") {
          return a.price - b.price;
        } else if (selectedPriceOrder === "High-Low") {
          return b.price - a.price;
        }
        return 0;
      });
    }
    setFilteredProducts(filtered);
  };

  const priceChange = (e) => {
    e.preventDefault();
    let sortOrder = e.target.value;
    console.log(sortOrder);

    setSelectedPriceOrder(sortOrder);
    applyFilters();
  };
  const catChange = (e) => {
    e.preventDefault();
    let cat = e.target.value;
    setSelectedCategory(cat);
    applyFilters();
  };
  const ratingChange = (e) => {
    e.preventDefault();
    let rating = e.target.value;
    setSelectedRating(rating);
    applyFilters();
  };
  const toggleFilter = (e) => {
    e.preventDefault();
    setShowFilters(!showFilters)
  }
  console.log(filteredProducts);

  return (
    <>
      <div className="container mx-auto p-6">
        {error ? (
          <div className="text-red-500">
            Error while fetching data. Please try again later.
          </div>
        ) : (
          <>
            <div className="my-10">
              <FilterButton onClick={toggleFilter} title={showFilters ? 'Hide Filters' : 'Show Filters'} />
            </div>
            <div className={showFilters ? "block my-10" : 'hidden'}>
              <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
                <div>
                  <SelectInput
                    id="price_id"
                    label="Filter By Price"
                    options={priceList}
                    onChange={priceChange}
                    value={selectedPriceOrder}
                  />
                </div>
                <div>
                  <SelectInput
                    id="cat_id"
                    label="Filter By Category"
                    options={categories}
                    onChange={catChange}
                    value={selectedCategory}
                  />
                </div>
                <div>
                  <SelectInput
                    id="filter_id"
                    label="Filter By Rating"
                    options={ratingList}
                    onChange={ratingChange}
                    value={selectedRating}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.length > 0 ? (
                <>
                  {filteredProducts.map((item) => (
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
                <div>Unable to load the products .....</div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
