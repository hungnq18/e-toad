import React from "react";
import Button from '../component/Button'
import "../component/css/AboutEToad.css";
const Story = () => (
  <div >
    <h2 className="story-title">Câu chuyện</h2>
    <p className="story-desc">
      E-Toad sinh ra từ ý tưởng tạo ra một người bạn thân thiện, thông minh để đồng hành cùng sinh viên FPT trong hành trình học tập. Với hình dáng chú ếch xanh đáng yêu, E-Toad mang trong mình tinh thần năng động và sự thông minh.<br /><br />
      Tên “E-Toad“ kết hợp giữa “E“ (Electronic/Education) và “Toad“ (cóc), thể hiện sự kết hợp hoàn hảo giữa công nghệ và giáo dục.<br /><br />
      <b>Đặc điểm nổi bật:</b>
      <ul>
        <li>Màu xanh tượng trưng cho sự tươi mới và phát triển</li>
        <li>Đôi mắt to tròn thể hiện sự tò mò và ham học hỏi</li>
        <li>Nụ cười thân thiện tạo cảm giác gần gũi</li>
        <li>Khả năng giao tiếp thông minh với sinh viên</li>
      </ul>
    </p>
    <Button >Hoàn thành</Button>
  </div>
);

export default Story;
