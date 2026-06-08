import { useState } from "react";
import "./App.css";

function App() {

  const offers = [
    {
      id: 1,
      title: "iPhone 14",
      category: "Mobiles",
      price: "₹59,999",
      discount: "25% OFF",
      store: "Amazon",
      image: "https://via.placeholder.com/200"
    },
    {
      id: 2,
      title: "Dell Laptop",
      category: "Laptops",
      price: "₹69,999",
      discount: "30% OFF",
      store: "Flipkart",
      image: "https://via.placeholder.com/200"
    },
    {
      id: 3,
      title: "Men Jacket",
      category: "Fashion",
      price: "₹1,499",
      discount: "50% OFF",
      store: "Amazon",
      image: "https://via.placeholder.com/200"
    },
    {
      id: 4,
      title: "Samsung Galaxy S23",
      category: "Mobiles",
      price: "₹49,999",
      discount: "20% OFF",
      store: "Flipkart",
      image: "https://via.placeholder.com/200"
    }
  ];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredOffers = offers.filter((item) => {
    return (
      (category === "All" || item.category === category) &&
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="container">

      <h1>🔥 ADS.In - Best Online Deals</h1>

      {/* Search Bar */}
      <input
        className="search"
        type="text"
        placeholder="Search deals..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category Filters */}
      <div className="filters">
        <button onClick={() => setCategory("All")}>All</button>
        <button onClick={() => setCategory("Mobiles")}>Mobiles</button>
        <button onClick={() => setCategory("Laptops")}>Laptops</button>
        <button onClick={() => setCategory("Fashion")}>Fashion</button>
      </div>

      {/* Offers Grid */}
      <div className="offers">

        {filteredOffers.map((item) => (
          <div className="card" key={item.id}>

            <span className="discount">{item.discount}</span>

            <img src={item.image} alt={item.title} />

            <h3>{item.title}</h3>

            <p className="price">{item.price}</p>

            <p className="store">
              {item.store === "Amazon" ? "🛒 Amazon" : "🛍 Flipkart"}
            </p>

            <button className="deal">Grab Deal</button>

          </div>
        ))}

      </div>
    </div>
  );
}

export default App;