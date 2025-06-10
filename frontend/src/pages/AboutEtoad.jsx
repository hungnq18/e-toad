
import Abe1 from '../component/Abe1';
import Abe2 from '../component/Abe2';
import Abe3 from '../component/Abe3';
import Abe4 from '../component/Abe4';
import Mascot from '../component/Mascot'
import Story from '../component/Story'
import "../component/css/AboutEToad.css";
function AboutEtoad() {
  return (
<div>
  <Abe1/>   
    <div className="card-container ">    
    <div className="card-mascot ">
      <Mascot />
    </div>
    <div className="card-story">
      <Story />
    </div>
    </div>
    <div className='story-dess'>
  <Abe3/></div>
   <div className='story-dess'><Abe4/>  </div>
  <Abe2/>
</div>    
  )
}

export default AboutEtoad
