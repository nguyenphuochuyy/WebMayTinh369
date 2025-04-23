import React, { useState, useEffect } from "react";
import "../../styles/HomeStyles/Sidebar.scss";

const Sidebar = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:8082/api";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/categories`);
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    try {
      const response = await fetch(`${API_URL}/products/category/${categoryId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const products = await response.json();
      console.log(`Products in category ${categoryId}:`, products);
      if (onCategorySelect) {
        onCategorySelect(products);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  if (loading) {
    return (
      <div className="sidebar">
        <p>Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sidebar">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="sidebar">
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            onClick={() => handleCategoryClick(category.id)} // Dùng category.id
            className="sidebar-item"
          >
            {category.name}
            <span>&gt;</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;