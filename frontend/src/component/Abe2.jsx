import abe2 from '../assets/image/abe2.png'
import Button from '../component/Button'
import "../component/css/AboutEToad.css";
function Abe2() {
  return (
    <div className="w-full">
     <img src={abe2} alt="E-Toad" className="mx-auto w-5/6" /> 
      <Button className="button1">Hoàn thành</Button>
    </div>
  );
}

export default Abe2;