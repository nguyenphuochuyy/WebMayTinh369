// import React, { useState, useEffect } from 'react';
// import { Card, Button, Rate, Row, Col, message } from 'antd';
// import './FlashSale.css';

// const FlashSales = () => {
//   const [timeLeft, setTimeLeft] = useState({
//     days: 3,
//     hours: 23,
//     minutes: 19,
//     seconds: 56,
//   });
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [viewAll, setViewAll] = useState(false);

//   const API_URL = 'http://localhost:8090/api/recommendations';
//   const initialDisplayCount = 4; // Hiển thị 4 sản phẩm ban đầu, giống BestSellingProducts

//   // Hàm định dạng giá tiền thành VND
//   const formatPrice = (price) => {
//     return `${Math.round(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} ₫`;
//   };

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         let { days, hours, minutes, seconds } = prev;
//         seconds--;
//         if (seconds < 0) {
//           seconds = 59;
//           minutes--;
//         }
//         if (minutes < 0) {
//           minutes = 59;
//           hours--;
//         }
//         if (hours < 0) {
//           hours = 23;
//           days--;
//         }
//         if (days < 0) {
//           return { days: 0, hours: 0, minutes: 0, seconds: 0 };
//         }
//         return { days, hours, minutes, seconds };
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         console.log('Bắt đầu gọi API:', API_URL);
//         const response = await fetch(API_URL, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         console.log('Phản hồi từ API:', response.status, response.statusText);
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         console.log('Dữ liệu thô từ API:', JSON.stringify(data, null, 2));
//         if (!Array.isArray(data)) {
//           throw new Error('Dữ liệu không phải là mảng!');
//         }
//         const mappedProducts = data.map((product, index) => {
//           console.log(`Ánh xạ sản phẩm ${index}:`, product);
//           return {
//             id: product.id ?? index,
//             name: product.name ?? 'Tên không xác định',
//             price: product.price ?? 0.0,
//             originalPrice: product.originalPrice ?? product.price * 1.2, // Giả lập giá gốc
//             image: product.image ?? 'https://via.placeholder.com/200',
//             description: product.description ?? 'Mô tả không có',
//             quantity: product.quantity ?? 0,
//             factory: product.factory ?? 'Không xác định',
//             score: product.score ?? 0.0,
//             rating: product.rating ?? 4.5, // Giả lập rating
//             reviews: product.reviews ?? Math.floor(Math.random() * 100), // Giả lập số đánh giá
//           };
//         });
//         console.log('Dữ liệu đã ánh xạ:', JSON.stringify(mappedProducts, null, 2));
//         if (mappedProducts.length === 0) {
//           console.warn('Mảng mappedProducts rỗng sau ánh xạ!');
//         }
//         setProducts(mappedProducts);
//       } catch (error) {
//         console.error('Lỗi khi lấy sản phẩm:', error.message);
//         message.error('Không thể tải sản phẩm, vui lòng thử lại sau!');
//         setProducts([]);
//       } finally {
//         setLoading(false);
//         console.log('Danh sách sản phẩm cuối cùng:', JSON.stringify(products, null, 2));
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleCollapse = () => {
//     setViewAll(false);
//   };

//   const handleViewAll = () => {
//     setViewAll(true);
//   };

//   const handleAddToCart = async (productId) => {
//     try {
//       const response = await fetch('http://localhost:8080/api/cart/add', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           productId: productId,
//           quantity: 1,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       if (data.code === 200) {
//         message.success('Đã thêm sản phẩm vào giỏ hàng!');
//       } else {
//         message.error('Thêm vào giỏ hàng thất bại');
//       }
//     } catch (error) {
//       message.error('Lỗi khi thêm vào giỏ hàng');
//       console.error('Error adding to cart:', error);
//     }
//   };

//   const displayedProducts = viewAll ? products : products.slice(0, initialDisplayCount);

//   return (
//     <div className="best-selling-container">
//       <div className="best-selling-header">
//         <div className="best-selling-title">
//           <span className="red-bar"></span>
//           <span>Hôm nay</span>
//         </div>
//         <div className="best-selling-actions">
//           <div className="flash-sales-timer">
//             <h2>Flash Sales</h2>
//             <div className="timer">
//               <div>
//                 <span>Ngày</span>
//                 <span>{String(timeLeft.days).padStart(2, '0')}</span>
//               </div>
//               <span className="separator">:</span>
//               <div>
//                 <span>Giờ</span>
//                 <span>{String(timeLeft.hours).padStart(2, '0')}</span>
//               </div>
//               <span className="separator">:</span>
//               <div>
//                 <span>Phút</span>
//                 <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
//               </div>
//               <span className="separator">:</span>
//               <div>
//                 <span>Giây</span>
//                 <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
//               </div>
//             </div>
//           </div>
//           {!viewAll && products.length > initialDisplayCount && (
//             <Button type="primary" danger className="view-all-btn" onClick={handleViewAll}>
//               Xem tất cả
//             </Button>
//           )}
//           {viewAll && products.length > initialDisplayCount && (
//             <Button type="primary" className="collapse-btn" onClick={handleCollapse}>
//               Thu gọn
//             </Button>
//           )}
//         </div>
//       </div>
//       <Row gutter={[16, 16]} className="product-list">
//         {loading ? (
//           <Col span={24}>
//             <div>Đang tải sản phẩm...</div>
//           </Col>
//         ) : displayedProducts.length > 0 ? (
//           displayedProducts.map((product) => (
//             <Col key={product.id} xs={24} sm={12} md={6}>
//               <Card
//                 style={{ width: '100%', textAlign: 'center' }}
//                 hoverable
//                 cover={
//                   <img
//                     alt={product.name}
//                     src={product.image}
//                     style={{ width: '100%', objectFit: 'cover' }}
//                     onError={(e) => {
//                       e.target.src = 'https://via.placeholder.com/200';
//                       console.log('Hình ảnh lỗi, sử dụng placeholder:', product.image);
//                     }}
//                   />
//                 }
//               >
//                 <h3 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                   {product.name}
//                 </h3>
//                 <div className="price">
//                   <span className="current-price">{formatPrice(product.price)}</span>
//                   <span className="original-price">{formatPrice(product.originalPrice)}</span>
//                 </div>
//                 <Rate allowHalf defaultValue={product.rating} disabled />
//                 <span className="reviews">({product.reviews})</span>
//                 <Button
//                   type="primary"
//                   style={{ marginTop: '10px', width: '100%' }}
//                   onClick={() => handleAddToCart(product.id)}
//                 >
//                   Thêm vào giỏ hàng
//                 </Button>
//               </Card>
//             </Col>
//           ))
//         ) : (
//           <Col span={24}>
//             <div>Không có sản phẩm nào để hiển thị</div>
//           </Col>
//         )}
//       </Row>
//     </div>
//   );
// };

// export default FlashSales;


import React, { useState, useEffect } from 'react';
import { Card, Button, Rate, Row, Col, message } from 'antd';
import './FlashSale.css';

const FlashSales = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewAll, setViewAll] = useState(false);

  const API_URL = 'http://localhost:8090/api/recommendations';
  const initialDisplayCount = 4; // Khớp với BestSellingProducts

  // Hàm định dạng giá tiền thành VND
  const formatPrice = (price) => {
    return `${Math.round(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} ₫`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) {
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log('Bắt đầu gọi API:', API_URL);
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Phản hồi từ API:', response.status, response.statusText);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Dữ liệu thô từ API:', JSON.stringify(data, null, 2));
        if (!Array.isArray(data)) {
          throw new Error('Dữ liệu không phải là mảng!');
        }
        const mappedProducts = data.map((product, index) => {
          console.log(`Ánh xạ sản phẩm ${index}:`, product);
          return {
            id: product.id ?? index,
            name: product.name ?? 'Tên không xác định',
            price: product.price ?? 0.0,
            originalPrice: product.originalPrice ?? product.price * 1.2, // Giả lập giá gốc
            image: product.image ?? 'https://via.placeholder.com/200',
            description: product.description ?? 'Mô tả không có',
            quantity: product.quantity ?? 0,
            factory: product.factory ?? 'Không xác định',
            score: product.score ?? 0.0,
            rating: product.rating ?? 4.5, // Giả lập rating
            reviews: product.reviews ?? Math.floor(Math.random() * 100), // Giả lập số đánh giá
          };
        });
        console.log('Dữ liệu đã ánh xạ:', JSON.stringify(mappedProducts, null, 2));
        if (mappedProducts.length === 0) {
          console.warn('Mảng mappedProducts rỗng sau ánh xạ!');
        }
        setProducts(mappedProducts);
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error.message);
        message.error('Không thể tải sản phẩm, vui lòng thử lại sau!');
        setProducts([]);
      } finally {
        setLoading(false);
        console.log('Danh sách sản phẩm cuối cùng:', JSON.stringify(products, null, 2));
      }
    };

    fetchProducts();
  }, []);

  const handleCollapse = () => {
    setViewAll(false);
  };

  const handleViewAll = () => {
    setViewAll(true);
  };

  const handleAddToCart = async (productId) => {
    try {
      const response = await fetch('http://localhost:8080/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productId,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.code === 200) {
        message.success('Đã thêm sản phẩm vào giỏ hàng!');
      } else {
        message.error('Thêm vào giỏ hàng thất bại');
      }
    } catch (error) {
      message.error('Lỗi khi thêm vào giỏ hàng');
      console.error('Error adding to cart:', error);
    }
  };

  const displayedProducts = viewAll ? products : products.slice(0, initialDisplayCount);

  return (
    <div className="best-selling-container">
      <div className="best-selling-header">
        <div className="best-selling-title">
          <span className="red-bar"></span>
          <span>Hôm nay</span>
        </div>
        <div className="best-selling-actions">
          <div className="flash-sales-timer">
            <h2>Flash Sales</h2>
            <div className="timer">
              <div>
                <span>Ngày</span>
                <span>{String(timeLeft.days).padStart(2, '0')}</span>
              </div>
              <span className="separator">:</span>
              <div>
                <span>Giờ</span>
                <span>{String(timeLeft.hours).padStart(2, '0')}</span>
              </div>
              <span className="separator">:</span>
              <div>
                <span>Phút</span>
                <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
              </div>
              <span className="separator">:</span>
              <div>
                <span>Giây</span>
                <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
              </div>
            </div>
          </div>
          {!viewAll && products.length > initialDisplayCount && (
            <Button type="primary" danger className="view-all-btn" onClick={handleViewAll}>
              Xem tất cả
            </Button>
          )}
          {viewAll && products.length > initialDisplayCount && (
            <Button type="primary" className="collapse-btn" onClick={handleCollapse}>
              Thu gọn
            </Button>
          )}
        </div>
      </div>
      <Row gutter={[16, 16]} className="product-list">
        {loading ? (
          <Col span={24}>
            <div>Đang tải sản phẩm...</div>
          </Col>
        ) : displayedProducts.length > 0 ? (
          displayedProducts.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={6}>
              <Card
                style={{ width: '100%', textAlign: 'center' }}
                hoverable
                cover={
                  <img
                    alt={product.name}
                    src={product.image}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/200';
                      console.log('Hình ảnh lỗi, sử dụng placeholder:', product.image);
                    }}
                  />
                }
              >
                <h3 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {product.name}
                </h3>
                <div className="price">
                  <span className="current-price">{formatPrice(product.price)}</span>
                  <span className="original-price">{formatPrice(product.originalPrice)}</span>
                </div>
                <Rate allowHalf defaultValue={product.rating} disabled />
                <span className="reviews">({product.reviews})</span>
                <Button
                  type="primary"
                  style={{ marginTop: '10px', width: '100%' }}
                  onClick={() => handleAddToCart(product.id)}
                >
                  Thêm vào giỏ hàng
                </Button>
              </Card>
            </Col>
          ))
        ) : (
          <Col span={24}>
            <div>Không có sản phẩm nào để hiển thị</div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default FlashSales;