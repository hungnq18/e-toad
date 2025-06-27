import abe2 from '../assets/image/abe2.png';
import Button from '../component/Button';
import "../component/css/aboutEtoad.css";
function Abe2() {
  return (
    <div className="w-full">
     <img src={abe2} alt="E-Toad" className="mx-auto w-5/6" /> 
     <div className="flex justify-center my-10 w-full h-13">
          <Button style={{ backgroundColor: '#F97316', color: '#FFFFFF', fontWeight:"300"}} 
          onHover={(e) => e.currentTarget.style.color = '#FF8A00'} 
          onMouseOut={(e) => e.currentTarget.style.color = '#FFFFFF'}>Hoàn thành</Button>
        </div>
    </div>
  );
}

export default Abe2;