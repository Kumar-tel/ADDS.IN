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
      image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=400&auto=format&fit=crop&q=60",
      url: "https://www.amazon.in/s?k=iphone+14"
    },
    {
      id: 2,
      title: "Dell Laptop",
      category: "Laptops",
      price: "₹69,999",
      discount: "30% OFF",
      store: "Flipkart",
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&auto=format&fit=crop&q=60",
      url: "https://www.flipkart.com/search?q=dell+laptop"
    },
    {
      id: 3,
      title: "Men Jacket",
      category: "Fashion",
      price: "₹1,499",
      discount: "50% OFF",
      store: "Amazon",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&auto=format&fit=crop&q=60",
      url: "https://www.amazon.in/s?k=men+jacket"
    },
    {
      id: 4,
      title: "Samsung Galaxy S23",
      category: "Mobiles",
      price: "₹49,999",
      discount: "20% OFF",
      store: "Flipkart",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&auto=format&fit=crop&q=60",
      url: "https://www.flipkart.com/search?q=samsung+galaxy+s23"
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

  const handleGrabDeal = (url) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      alert("Deal link coming soon!");
    }
  };

  return (
    <div className="container">

      <h1 style={{ color: "#1e293b", marginBottom: "20px" }}>
        🔥 ADS.In - Best Online Deals
      </h1>

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

            <button className="deal" onClick={() => handleGrabDeal(item.url)}>
              Grab Deal
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}

export default App;