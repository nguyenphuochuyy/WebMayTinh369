import React, { useState } from "react";
import "../../styles/PD_styles/PD_styles.scss";

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value) => {
    if (quantity + value > 0) {
      setQuantity(quantity + value);
    }
  };

  const images = [
    "https://s3-alpha-sig.figma.com/img/1490/1cca/de638588f27b571d7565fbaacfe57243?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=twG8T9TnrVlffCGjjx6y4GxQdNE8Qw2oE70FSOVNI6ramfE8QmeqvZ3BYEMQncC5YdaUzopc5nH~kvnllZ2MEle30L2CbnvhJH1HEOYYMmDTMBzLnCozY9i9isGqgbA91lJRNogG4bYQCahheEJzmJx3xUbE4iANhrBoQ7u5P3gpL490DnEnUzRiyaAVa22L8wCltfZABjPnbaVM2rSu0SxlFNHwjlWXz6oBMIUKLo-5PSjtBdFZ8szgzJbgChbYqzjUfEM1CZwj-tHbpOJADD610UUO0Ab3THQWbcfEx17ielLHOmGNBEX18I6n~ZkHiMaQSXvWT5LaNpVBx4rU2Q__",
    "https://s3-alpha-sig.figma.com/img/ca92/325b/4d31381f7fe4841786f4511bd4849d87?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=aGqPCXI58k0Cio0aQoJdNLDHLToRV1nG2lVnZZ29deYMSQuR-35GLuPxaxhEEy~QJmT-TvY5AOytR9BRtINulIOGyqisPDYUUKqyzKsZNh0cfCpU07nQufg3wvlk7w0YGz2JksI8TU38AMtGOnm7ULX01S6~lIwFNKBHFVfdqIdMjJSVw0ZdOXwIA4KWDzsHJ6pku3FPp9N~H4J04wGiqToUtYASHm9AAt9-rNVGiCkHVVpBhLZ5i35gk91flkBttjRznto1dd-0i0iqnz0qnGuR~uvAa7gmt4HXzAuTSkjCrNkGZ1teSHlaq8148MnGI~1nSFqjo9NY-HPRy0uotA__",
    "https://s3-alpha-sig.figma.com/img/faa8/0b60/9e3950aed9181acb44510f859f50d850?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=DQ4VeKoLUASRGKGc7RTJk1QOVasejzJEyklokJndfNZHLBXIb1PUn31qkwyPA6QZr273ZoD1YgNqD6BRRADF2b2vtrxJRL-b2UX3AdQdf7ktd3yPbrNGtmesGvtB4DiXYJInYNXrmX93Oq-StHfU7Vd1~ljFjx3SspvWdNgb0LRl1WSWiiwS7492WXNJb~ynehQeatHCVGjbXdaZ9eLaobdpMhFaqNGwh2uW9yczw-ECz0uvSsrp6IG5LRPLG-4G8q-pf2KFLCEeFKzaQmbw~Vdfr-MIc7-nBeOBAl12CuiTGaulTRseJF6vfa8Z~9kYpUbEinJzE0s3jLblue-~dg__",
    "https://s3-alpha-sig.figma.com/img/f109/e9ce/a445f7c73ec2a2153e0e149e85ee9d28?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=oIXRanx9VI-XkPbNv5-w1DDSO5kUj4lG9BXJDOWnmH0KnEAGLpbKYn2h6VRujS4G6k4C0Xa1Nvzdaimj6TTGKwOpJZJWjaB5pk-0-Ihk8WkM5ovQIaslZHkSAO0MXehkRo2sG1dJsBP8DOp-e~ECifl0VDLWd~ZUHVyPJE276qHh0A8gpA93m9HDqMVlGbm-jsejSLWmtcRQycrr2iE-hSlaItk9bMdmg7JKiYb6pgosnD0rFYfddkpBxRMASDBbByEOvkHpbKHb~OTMK5UlVUJu9dvKGcA696DftSxadVw-Bgh9GVwV99SNup9Vl0T1~8sH2XAlaQlHE30qUVfFbQ__",
  ];

  //   const relatedItems = [
  //     "https://s3-alpha-sig.figma.com/img/5d5c/2e52/50752d55f8b60f2aa2923183dadbc135?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RllB6GQf2G3Ow8RukRsZq~A1U7YNRznp67K~xLO48Ltq5G2Oevj0yLfSLPbclp57tu1p~QmzOGhh5cCvoQYTmERoYEbE7C1opetKup4-0iREFvid0ryaRRq4cfcnIrX~YpQqOshHoycre1tsOIEdfNpBadEyWdcKRazpH3UyRsP-okw55AvbW-HFHcKEtkah1b4fh9cov3nDwLvVcmRqCL5f4e9wiqQlv4nEo3OlHQ9ivIKSrx6~3ZLSJ8UapWKMbPT3msZvIKZ0oZacIwtVYcvVHHApM-iN7BMIYMcCbC2nNaHhRJ~SwrxGWGNRdICqV3RtyC-1JsDA8g4wYUc2tw__",
  //     "https://s3-alpha-sig.figma.com/img/e59d/9f34/8cc24eeff489863523b63971c3ff8e4a?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=sFKmTovEsq09-BAykbFjSZiBdm5hl5JvucLPgDSjokbY~Rs9LBOTD4XSMveuPZXv04CrRygokh79Scibpgz2DCpX2O~Ruo5gJySWb-1ZH3ppopL3ofz41cfqn0cJVEwBmma4krju9Bk8dm9Cu0Nr1UiUBEcSlRQxs1copyNzdoFSHQOSyNykqaF4ZZhTvPkMnaCViSnrbumtpHhSa5ARRPRrg~EUpxCgOU22yAeMZTHPkmzsnZ~tIVXB8UXBialI9vwqY0QJ1pVlJmo6Z2pSAC7zyQQZEt7u4K3behdip9Ev1639Pk-xfCnaYz7lsPQ43-mvjwCws4XZvSHj41l-~w__",
  //     "https://s3-alpha-sig.figma.com/img/5e63/4682/db5174aff99bb9337d2dc9598a0b44e4?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ST2kohAjKL9Ukazoj-8Oq3hNg238wr9EhJ7Cvy7kQcpqJMVbHp4WiL7RgbaGGM862CV6JJ0~HNoejZABFnCFq5gImHBe1u9Oa7t0~Fj9Gyx6Ti~i5nChmLDL2fNC0MCa09he6B1wCM8luAFqxQP2RFGVt7Cdd12zZVl2dd0cmwA1LLP0IpCjBiVo2gyhoGWIQx0tDjBINfzYXJjnq2XUmj8OS1dw-8oolF7g7dYdVf3V8l77hCMCS0p18LbDlZMSYIS6MelXXgRjGN3OmuzG7-uLKGlENRQyduEdlk0MvopCD8EmFX7~MdjRB-Lqfnw7Ki~PTgp37Mf1AWm6IwEosw__",
  //     "https://s3-alpha-sig.figma.com/img/6739/d39d/c218c97b645d616c8188a4f2e6aaf84b?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=DQ-8alxumC2zzJ0q6LavSZEzgHaxspjyRxO38xEnY--TgPSP3cFYFZpHLqYsIQS7Du6TTcVGhPtGBzVJYOuERYdwBTlY~yRkuyx~3n4LmqGvLxiR3Vnt0S2akHOdRT1~BRfHrVc5kxz0kw1xmT8s3DbbOTskoMo-k7hwqtnsqCUrlJgMHnUeCtE~KqpZtAOXVJfL5CyEMiWFn31dwZZ7FlBNog8N538p3KBv-hZf7z5lbYfYiA0fMMkmEuHaLlN5DF7Y6fDHM6~Pu2Lku62XfznIgFpR81B3tTPqOUZDQ5F3WbpDA9~D1luR2n1VwMaT8aLiQ2sqRJiDtgrByXEqWQ__",
  //   ];

  const relatedItems = [
    {
      id: 1,
      name: "HAVIT HV-G92 Gamepad",
      image: "https://s3-alpha-sig.figma.com/img/5d5c/2e52/50752d55f8b60f2aa2923183dadbc135?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RllB6GQf2G3Ow8RukRsZq~A1U7YNRznp67K~xLO48Ltq5G2Oevj0yLfSLPbclp57tu1p~QmzOGhh5cCvoQYTmERoYEbE7C1opetKup4-0iREFvid0ryaRRq4cfcnIrX~YpQqOshHoycre1tsOIEdfNpBadEyWdcKRazpH3UyRsP-okw55AvbW-HFHcKEtkah1b4fh9cov3nDwLvVcmRqCL5f4e9wiqQlv4nEo3OlHQ9ivIKSrx6~3ZLSJ8UapWKMbPT3msZvIKZ0oZacIwtVYcvVHHApM-iN7BMIYMcCbC2nNaHhRJ~SwrxGWGNRdICqV3RtyC-1JsDA8g4wYUc2tw__",
      currentPrice: 120,
      originalPrice: 160,
      discount: 40,
      rating: 5,
      reviewCount: 88,
    },
    {
      id: 2,
      name: "AK-900 Wired Keyboard",
      image: "https://s3-alpha-sig.figma.com/img/e59d/9f34/8cc24eeff489863523b63971c3ff8e4a?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=sFKmTovEsq09-BAykbFjSZiBdm5hl5JvucLPgDSjokbY~Rs9LBOTD4XSMveuPZXv04CrRygokh79Scibpgz2DCpX2O~Ruo5gJySWb-1ZH3ppopL3ofz41cfqn0cJVEwBmma4krju9Bk8dm9Cu0Nr1UiUBEcSlRQxs1copyNzdoFSHQOSyNykqaF4ZZhTvPkMnaCViSnrbumtpHhSa5ARRPRrg~EUpxCgOU22yAeMZTHPkmzsnZ~tIVXB8UXBialI9vwqY0QJ1pVlJmo6Z2pSAC7zyQQZEt7u4K3behdip9Ev1639Pk-xfCnaYz7lsPQ43-mvjwCws4XZvSHj41l-~w__",
      currentPrice: 960,
      originalPrice: 1160,
      discount: 35,
      rating: 4,
      reviewCount: 75,
    },
    {
      id: 3,
      name: "IPS LCD Gaming Monitor",
      image: "https://s3-alpha-sig.figma.com/img/5e63/4682/db5174aff99bb9337d2dc9598a0b44e4?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ST2kohAjKL9Ukazoj-8Oq3hNg238wr9EhJ7Cvy7kQcpqJMVbHp4WiL7RgbaGGM862CV6JJ0~HNoejZABFnCFq5gImHBe1u9Oa7t0~Fj9Gyx6Ti~i5nChmLDL2fNC0MCa09he6B1wCM8luAFqxQP2RFGVt7Cdd12zZVl2dd0cmwA1LLP0IpCjBiVo2gyhoGWIQx0tDjBINfzYXJjnq2XUmj8OS1dw-8oolF7g7dYdVf3V8l77hCMCS0p18LbDlZMSYIS6MelXXgRjGN3OmuzG7-uLKGlENRQyduEdlk0MvopCD8EmFX7~MdjRB-Lqfnw7Ki~PTgp37Mf1AWm6IwEosw__",
      currentPrice: 370,
      originalPrice: 400,
      discount: 30,
      rating: 5,
      reviewCount: 99,
    },
    {
      id: 4,
      name: "RGB liquid CPU Cooler",
      image: "https://s3-alpha-sig.figma.com/img/6739/d39d/c218c97b645d616c8188a4f2e6aaf84b?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=DQ-8alxumC2zzJ0q6LavSZEzgHaxspjyRxO38xEnY--TgPSP3cFYFZpHLqYsIQS7Du6TTcVGhPtGBzVJYOuERYdwBTlY~yRkuyx~3n4LmqGvLxiR3Vnt0S2akHOdRT1~BRfHrVc5kxz0kw1xmT8s3DbbOTskoMo-k7hwqtnsqCUrlJgMHnUeCtE~KqpZtAOXVJfL5CyEMiWFn31dwZZ7FlBNog8N538p3KBv-hZf7z5lbYfYiA0fMMkmEuHaLlN5DF7Y6fDHM6~Pu2Lku62XfznIgFpR81B3tTPqOUZDQ5F3WbpDA9~D1luR2n1VwMaT8aLiQ2sqRJiDtgrByXEqWQ__",
      currentPrice: 160,
      originalPrice: 170,
      discount: 0,
      rating: 4.5,
      reviewCount: 65,
    },
  ];

  return (
    <div className="product-detail-page">
      <div className="product-detail">
        <div className="image-gallery">
          {images.map((item, index) => (
            <img key={index} src={item} alt="Product Thumbnail" />
          ))}
        </div>
        <div className="main-image">
          <img
            src="https://s3-alpha-sig.figma.com/img/faa8/0b60/9e3950aed9181acb44510f859f50d850?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=DQ4VeKoLUASRGKGc7RTJk1QOVasejzJEyklokJndfNZHLBXIb1PUn31qkwyPA6QZr273ZoD1YgNqD6BRRADF2b2vtrxJRL-b2UX3AdQdf7ktd3yPbrNGtmesGvtB4DiXYJInYNXrmX93Oq-StHfU7Vd1~ljFjx3SspvWdNgb0LRl1WSWiiwS7492WXNJb~ynehQeatHCVGjbXdaZ9eLaobdpMhFaqNGwh2uW9yczw-ECz0uvSsrp6IG5LRPLG-4G8q-pf2KFLCEeFKzaQmbw~Vdfr-MIc7-nBeOBAl12CuiTGaulTRseJF6vfa8Z~9kYpUbEinJzE0s3jLblue-~dg__"
            alt="Main Product"
          />
        </div>
        <div className="product-info">
          <h1>Havic HV G-92 Gamepad</h1>
          <div className="rating-stock">
            <span>⭐ 4.5 (150 Reviews)</span>{" "}
            <span className="in-stock">In Stock</span>
          </div>
          <div className="price">$192.00</div>
          <p>
            PlayStation 5 Controller Skin High quality vinyl with air channel
            adhesive for easy bubble free install & mess free removal. Pressure
            sensitive.
          </p>

          <div className="options">
            <div className="colours">
              <span>Colours:</span>
              <div className="color-option red"></div>
              <div className="color-option black"></div>
            </div>
            <div className="sizes">
              <span>Size:</span>
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button key={size} className="size-btn">
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="quantity-control">
            <button onClick={() => handleQuantityChange(-1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange(1)}>+</button>
          </div>

          <button className="buy-now">Buy Now</button>

          <div className="delivery-info">
            <div>
              🚚 Free Delivery - Enter your postal code for Delivery
              Availability
            </div>
            <div>
              🔄 Return Delivery - Free 30 Days Delivery Returns. Details
            </div>
          </div>
        </div>
      </div>

      <div className="related-items">
  <h2>Related Items</h2>
  <div className="related-products">
    {relatedItems.map((item, index) => (
      <div key={index} className="related-product">
        <div className="image-wrapper">
          <img src={item.image} alt={item.name} />
          {item.discount > 0 && (
            <div className="discount-tag">-{item.discount}%</div>
          )}
        </div>
        <div className="product-details">
          <div className="product-name">{item.name}</div>
          <div className="product-price">
            <span className="current-price">${item.currentPrice}</span>
            {item.originalPrice > item.currentPrice && (
              <span className="original-price">${item.originalPrice}</span>
            )}
          </div>
          <div className="product-rating">
            {"★".repeat(item.rating)} <span>({item.reviewCount})</span>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
    </div>
  );
};

export default ProductDetailPage;
