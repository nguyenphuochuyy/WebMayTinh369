import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/HomeComponents/Sidebar";
import Banner from "../components/HomeComponents/Banner";
import FlashSalesTitle from "../components/HomeComponents/FlashSalesTitle";
import CountdownTimer from "../components/HomeComponents/CountdownTimer";
import "../styles/HomeStyles/Home.scss";
import Arrow from "../components/HomeComponents/Arrow";
import FlashSalesProduct from "../components/HomeComponents/FlashSalesProduct";
import ButtonShow from "../components/HomeComponents/ButtonShow";
import CategoriesTitle from "../components/HomeComponents/CategoriesTitle";
import ArrowCategories from "../components/HomeComponents/ArrowCategories";
import ThisMonthTitle from "../components/HomeComponents/ThisMonthTitle";
import ButtonThisMonth from "../components/HomeComponents/ButtonThisMonth";
import ThisMonthProduct from "../components/HomeComponents/ThisMonthProduct";
import OurProductsTitle from "../components/HomeComponents/OurProductsTitle";
import Banner2 from "../components/HomeComponents/Banner2";
import ArrowOurProductsTitle from "../components/HomeComponents/ArrowOurProductsTitle";
import OurProducts from "../components/HomeComponents/OurProducts";
import ButtonOurproducts from "../components/HomeComponents/ButtonOurproducts";
import Featured from "../components/HomeComponents/Featured";
import FeaturedProduct from "../components/HomeComponents/FeaturedProduct";
import FeaturedService from "../components/HomeComponents/FeaturedService";
import Footer from "../components/layout/Footer";

const Home = () => {
  const [flashSalesProducts, setFlashSalesProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [thisMonthProducts, setThisMonthProducts] = useState([]);
  const [ourProducts, setOurProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [selectedCategoryProducts, setSelectedCategoryProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]); // State cho kết quả tìm kiếm
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false); // Loading khi tìm kiếm
  const [error, setError] = useState(null);
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const categoryProductsSection = useRef(null);

  const API_URL = "http://localhost:8082/api";
  const targetTime = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;

  const categoryImages = {
    "Điện thoại": "https://up-load-file-tranquocanh.s3.ap-southeast-2.amazonaws.com/iphone.jpg",
    "Laptop": "https://up-load-file-tranquocanh.s3.ap-southeast-2.amazonaws.com/laptop.jpg",
    "Linh kiện PC": "https://up-load-file-tranquocanh.s3.ap-southeast-2.amazonaws.com/cpui9.jpg",
    "Màn hình": "https://up-load-file-tranquocanh.s3.ap-southeast-2.amazonaws.com/manhinh.jpg",
    "Chuột & Bàn phím": "https://up-load-file-tranquocanh.s3.ap-southeast-2.amazonaws.com/banphim.jpg",
    "Thiết bị lưu trữ": "https://up-load-file-tranquocanh.s3.ap-southeast-2.amazonaws.com/ssd.jpg",
    "Phụ kiện khác": "https://up-load-file-tranquocanh.s3.ap-southeast-2.amazonaws.com/webcam.jpg",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productsResponse = await fetch(`${API_URL}/products`);
        const allProducts = await productsResponse.json();

        const flashSales = allProducts.slice(0, 4).map(product => ({
          id: product.id,
          image: product.image,
          name: product.name,
          price: product.price,
          discount: product.discount || 0
        }));
        setFlashSalesProducts(flashSales);

        const categoriesResponse = await fetch(`${API_URL}/categories`);
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        const thisMonth = allProducts.slice(4, 8).map(product => ({
          id: product.id,
          image: product.image,
          name: product.name,
          price: product.price,
          discount: product.discount || 0
        }));
        setThisMonthProducts(thisMonth);

        const ourProds = allProducts.slice(8, 17).map(product => ({
          id: product.id,
          image: product.image,
          name: product.name,
          price: product.price,
          discount: product.discount || 0
        }));
        setOurProducts(ourProds);

        const featured = allProducts.slice(0, 4).map(product => ({
          id: product.id,
          image: product.image,
          name: product.name,
          description: product.description || "No description available"
        }));
        setFeaturedProducts(featured);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const scrollToCategoryProducts = () => {
    categoryProductsSection.current.scrollIntoView({ behavior: "smooth" });
  };
  // Callback để nhận products từ Sidebar
  const handleCategorySelect = (products) => {
    setSelectedCategoryProducts(products);
    setSearchResults([]); // Clear search results when category is selected
    scrollToCategoryProducts();
  };

  // Hàm xử lý khi click vào các nút để lấy toàn bộ sản phẩm
  const handleShowAllProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const products = await response.json();
      setSelectedCategoryProducts(products); // Tái sử dụng section hiện có
      setSearchResults([]); // Clear search results when showing all products
      scrollToCategoryProducts();
    } catch (err) {
      console.error("Error fetching all products:", err);
    }
  };

  const handleSearch = async (keyword) => {
    setSearchLoading(true);
    setError(null);
    setCurrentSearchTerm(keyword);
    setSearchResults([]); // Reset search results

    if (!keyword.trim()) {
      // Nếu từ khóa tìm kiếm trống, hiển thị tất cả sản phẩm
      try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch all products");
        }
        const allProducts = await response.json();
        setSearchResults(allProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setSearchLoading(false);
      }
      setSelectedCategoryProducts([]); // Clear category products
      return; // Kết thúc hàm tại đây
    }

    // Nếu từ khóa không trống, thực hiện tìm kiếm như bình thường
    try {
      const response = await fetch(`${API_URL}/products/search?keyword=${keyword}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (response.status === 204) {
        setSearchResults([]);
      } else {
        const data = await response.json();
        setSearchResults(data);
      }
      setSelectedCategoryProducts([]); // Clear category products on search
    } catch (err) {
      setError(err.message);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home-container">
      <Navbar onSearch={handleSearch} /> {/* Render Navbar ở đây và truyền hàm handleSearch */}
      <div className="content">
        <Sidebar onCategorySelect={handleCategorySelect} />
        <Banner />
      </div>

      {searchLoading && <div style={{ padding: '20px', textAlign: 'center' }}>Đang tìm kiếm...</div>}
      {searchResults.length > 0 ? (
        <div className="selected-category-products" style={{ marginTop: '20px' }}>
          <h2>Kết quả tìm kiếm</h2>
          <div className="product-list">
            {searchResults.map((product) => (
              <div key={product.id} className="product-item">
                <div className="product-image-container">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-details">
                  <p className="product-name">{product.name}</p>
                  <p className="product-price">
                    {product.price.toLocaleString()} VND
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        !searchLoading && currentSearchTerm && (
          <p style={{ color: '#777', fontSize: '1.1em', textAlign: 'center', padding: '20px' }}>
            Không tìm thấy sản phẩm nào phù hợp với từ khóa {currentSearchTerm}.
          </p>
        )
      )}

      {/* Section hiển thị sản phẩm theo category */}
      {selectedCategoryProducts.length > 0 && (
        <div
          className="selected-category-products"
          ref={categoryProductsSection}
        >
          <h2>Products</h2>
          <div className="product-list">
            {selectedCategoryProducts.map((product) => (
              <div key={product.id} className="product-item">
                <div className="product-image-container">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-details">
                  <p className="product-name">{product.name}</p>
                  <p className="product-price">
                    {product.price.toLocaleString()} VND
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flash-sales-container">
        <FlashSalesTitle />
        <Arrow />
      </div>

      <div className="flash-sales-products">
        {flashSalesProducts.map((product) => (
          <FlashSalesProduct
            key={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            discount={product.discount}
          />
        ))}
      </div>

      <div className="footer-button">
        <ButtonShow onClick={handleShowAllProducts} /> {/* Thêm onClick */}
      </div>

      <div className="categories-container">
        <CategoriesTitle />
        <ArrowCategories />
      </div>

      <div className="category-products">
        <div className="category-list">
          {categories.map((category) => (
            <div key={category.id} className="category-item">
              <img
                src={categoryImages[category.name] || "https://via.placeholder.com/50"}
                alt={category.name}
                className="category-image"
              />
              <p className="category-name">{category.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="thisMonth-container">
        <ThisMonthTitle />
        <ButtonThisMonth onClick={handleShowAllProducts} /> {/* Thêm onClick */}
      </div>

      <div className="this-month-products">
        {thisMonthProducts.map((product) => (
          <ThisMonthProduct
            key={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            discount={product.discount}
          />
        ))}
      </div>

      <div className="banner2-container">
        <Banner2 />
      </div>

      <div className="our-products-container">
        <OurProductsTitle />
        <ArrowOurProductsTitle />
      </div>

      <div className="our-ProductSales-products">
        {ourProducts.map((product) => (
          <OurProducts
            key={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            discount={product.discount}
          />
        ))}
      </div>

      <div className="footer-buttonOurProducts">
        <ButtonOurproducts onClick={handleShowAllProducts} /> {/* Thêm onClick */}
      </div>

      <div className="featured-container">
        <Featured />
      </div>

      <div className="featured-products">
        {featuredProducts.map((product) => (
          <FeaturedProduct
            key={product.id}
            image={product.image}
            name={product.name}
            description={product.description}
          />
        ))}
      </div>

      <div className="featured-service-container">
        <FeaturedService />
      </div>

      <div className="footer-home">
        <Footer />
      </div>
    </div>
  );
};

export default Home;