import scholar from "../../assets/image/hocgia.png";
import master from "../../assets/image/bacthay.png";
import legend from "../../assets/image/huyenthoai.png";
import { Image } from "antd";


const StartModal = ({ onStart }) => {
  return (
    <div
      className="flex fixed inset-0 z-50 justify-center items-center p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg sm:text-xl font-bold text-[#FF8A00] text-center">
          📜 Luật Chơi
        </h2>

        <ul className="pl-4 space-y-2 text-sm list-disc text-gray-700 sm:pl-5 sm:space-y-3 sm:text-base">
          <li className="leading-relaxed">
            Trả lời đúng <strong>5 câu</strong> → 🎓 <strong>100 xu</strong> +
            danh hiệu <em className="text-[#FF8A00]">Học giả</em>
          </li>
          <li className="leading-relaxed">
            Trả lời đúng <strong>10 câu</strong> → 🧠 <strong>200 xu</strong> +
            danh hiệu <em className="text-[#FF8A00]">Bậc thầy</em>
          </li>
          <li className="leading-relaxed">
            Hoàn thành <strong>15 câu</strong> → 🏆 <strong>300 xu</strong> +
            danh hiệu <em className="text-[#FF8A00]">Huyền thoại</em>
          </li>
        </ul>

        <div className="flex flex-col gap-4 justify-center items-center py-2 sm:flex-row sm:justify-around sm:gap-2">
          <div className="flex flex-col items-center space-y-1">
            <Image
              src={scholar}
              alt="Học giả"
              width={64}
              height={64}
              className="object-cover w-12 h-12 rounded-lg shadow-md sm:w-14 sm:h-14 md:w-16 md:h-16"
            />
            <span className="text-xs font-medium text-gray-600 sm:text-sm">
              Học giả
            </span>
          </div>

          <div className="flex flex-col items-center space-y-1">
            <Image
              src={master}
              alt="Bậc thầy"
              width={64}
              height={64}
              className="object-cover w-12 h-12 rounded-lg shadow-md sm:w-14 sm:h-14 md:w-16 md:h-16"
            />
            <span className="text-xs font-medium text-gray-600 sm:text-sm">
              Bậc thầy
            </span>
          </div>

          <div className="flex flex-col items-center space-y-1">
            <Image
              src={legend}
              alt="Huyền thoại"
              width={64}
              height={64}
              className="object-cover w-12 h-12 rounded-lg shadow-md sm:w-14 sm:h-14 md:w-16 md:h-16"
            />
            <span className="text-xs font-medium text-gray-600 sm:text-sm">
              Huyền thoại
            </span>
          </div>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-[#FF8A00] hover:bg-[#e67a00] active:bg-[#cc6d00] transition-colors duration-200 !text-white py-3 sm:py-4 px-4 rounded-lg font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          Tôi đã hiểu! Bắt đầu quiz
        </button>
      </div>
    </div>
  );
};

export default StartModal;
