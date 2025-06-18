import React from "react";
import logo from "../assets/image/logo-etoad.svg";
import mascot from "../assets/image/mascot-shopping.png";

const ItemShop = () => {
  return (
    <div className="relative w-full overflow-hidden max-w-max group !rounded-3xl">
      <img src={mascot} className="w-full h-full rounded-xl" alt="item-img" />

      <div className="absolute inset-0 z-30 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-black/40 group-hover:opacity-100">
        <div className="group/order md:w-30 md:h-30 w-20 h-20 bg-[#F97316] rounded-full flex items-center justify-center p-2 border cursor-pointer hover:bg-[#FEF4F0] border-[#F97316]">
          <span className="text-base font-medium !text-white whitespace-nowrap group-hover/order:!text-[#F97316]">
            Đặt hàng
          </span>
        </div>
      </div>

      {/* NỀN ĐEN NỬA DƯỚI ẢNH */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-1/2 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl" />

      {/* NỘI DUNG TRÊN NỀN ĐEN */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 text-center text-white">
        <h4 className="text-sm font-semibold">
          Linh vật ếch 3D – Truyền thống
        </h4>
        <div className="flex items-center justify-between px-3 pt-3 pb-1">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center border border-[#F97316] rounded-full w-8 h-8 p-1">
              <img className="object-cover w-full h-full" src={logo} alt="" />
            </div>
            <span className="text-sm">500 Xu</span>
          </div>
          <span className="text-sm">Còn: 20</span>
        </div>
      </div>
    </div>
  );
};

export default ItemShop;
