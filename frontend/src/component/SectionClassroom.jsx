import class1 from "../assets/image/class1.png"
import class3 from "../assets/image/class3.png"
import class2 from "../assets/image/libraryclass.png"
import ImageCard from "./card/ImageCard"

function SectionClassroom() {
    return (
      <div className="mx-auto w-full my-10 pt-15 relative">
        <div className="w-3/4 mx-auto">
          <h1 className="class-title text-right" 
          style={{ 
            color: '#F97316',
            display: 'flex',
            justifyContent: 'flex-end',
            fontSize: '50px',
            fontWeight: '800'
          }}>
            Lớp Học ảo
          </h1>
          <div className="flex justify-between mt-10 gap-2">
            <ImageCard 
              imageUrl={class1}
              width={400}
              height={500}
            />
            <ImageCard 
              imageUrl={class2}
              width={400}
              height={500}
            />
            <ImageCard 
              imageUrl={class3}
              width={400}
              height= {500}
            />
          </div>
        </div>
      </div>
    )
  }
  
  export default SectionClassroom