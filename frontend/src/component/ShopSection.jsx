import rootshop from "../assets/image/shopsection.png"
import winbolt from "../assets/image/winbolt.png"
import Button from "./Button.jsx"
import ImageCard from "./card/ImageCard"
function ShopSection() {
  return (
    <div className="mx-auto w-full my-10 pt-15 relative" id="shop-section">
      <img src={rootshop} style={{paddingTop:"10px" }}/>
        <div className="w-5/6 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <ImageCard imageUrl={winbolt} width="100%" height={350} cardStyle ={{borderRadius:"0px"}} buttonText="Mua ngay"/>
          <ImageCard imageUrl={winbolt} width="100%" height={350} cardStyle ={{borderRadius:"0px"}} buttonText="Mua ngay"/>
          <ImageCard imageUrl={winbolt} width="100%" height={350} cardStyle ={{borderRadius:"0px"}} buttonText="Mua ngay"/>
          <ImageCard imageUrl={winbolt} width="100%" height={350} cardStyle ={{borderRadius:"0px"}} buttonText="Mua ngay"/>
          <ImageCard imageUrl={winbolt} width="100%" height={350} cardStyle ={{borderRadius:"0px"}} buttonText="Mua ngay"/>
          <ImageCard imageUrl={winbolt} width="100%" height={350} cardStyle ={{borderRadius:"0px"}} buttonText="Mua ngay"/>
          <ImageCard imageUrl={winbolt} width="100%" height={350} cardStyle ={{borderRadius:"0px"}} buttonText="Mua ngay"/>
          <ImageCard imageUrl={winbolt} width="100%" height={350} cardStyle ={{borderRadius:"0px"}} buttonText="Mua ngay"/>
          <ImageCard imageUrl={winbolt} width="100%" height={350} cardStyle ={{borderRadius:"0px"}} buttonText="Mua ngay"/>
          <ImageCard imageUrl={winbolt} width="100%" height={350} cardStyle ={{borderRadius:"0px"}} buttonText="Mua ngay"/>
        </div>
        <div className="flex justify-center mt-8 h-13 w-full">
          <Button style={{ backgroundColor: '#F97316', color: '#FFFFFF', fontWeight:"300"}} 
          onHover={(e) => e.currentTarget.style.color = '#FF8A00'} 
          onMouseOut={(e) => e.currentTarget.style.color = '#FFFFFF'}>Tìm hiểu thêm</Button>
        </div>
        </div>
    </div>
  )
}

export default ShopSection
