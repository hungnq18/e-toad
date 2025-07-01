import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import productApi from "../api/productApi";
import rootshop from "../assets/image/shopsection.png";
import Button from "./Button.jsx";
import ImageCard from "./card/ImageCard";

function ShopSection() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    productApi.getAll().then(res => {
      setProducts(res.data.data || []);
    });
  }, []);

  // Hàm xử lý khi bấm 'Mua ngay'
  const handleBuy = (product) => {
    navigate('/shop');
  };

  // Hàm xử lý khi bấm 'Tìm hiểu thêm'
  const handleLearnMore = () => {
    navigate('/shop');
  };

  return (
    <div className="mx-auto w-full my-10 pt-15 relative" id="shop-section">
        <div className="w-3/4 mx-auto">
        <img src={rootshop} style={{paddingTop:"10px" }}/>
        <div className="w-5/6 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {products.map(product => (
            <ImageCard
              key={product._id}
              imageUrl={product.image}
              width="100%"
              height="100%"
              cardStyle={{ borderRadius: "0px", overflow: "hidden" }}
              imgStyle={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
              buttonText="ĐỔi NGAY"
              buttonOnClick={() => handleBuy(product)}
            />
          ))}
        </div>
        <div className="flex justify-center mt-8 h-13 w-full">
          <Button 
            style={{ backgroundColor: '#F97316', color: '#FFFFFF', fontWeight:"300"}} 
            onHover={(e) => e.currentTarget.style.color = '#FF8A00'} 
            onMouseOut={(e) => e.currentTarget.style.color = '#FFFFFF'}
            onClick={handleLearnMore}
          >Tìm hiểu thêm</Button>
        </div>
        </div>
    </div>
  )
}

export default ShopSection
