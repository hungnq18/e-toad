import React from "react";
import { Modal, Button, Progress } from "antd";
import {
  CloseOutlined,
  ReloadOutlined,
  HomeOutlined,
  FrownOutlined,
} from "@ant-design/icons";

const FailureModal = ({
  onClose,
  correctAnswers = 0,
  totalQuestions = 15,
  message,
  clearData,
  visible = true,
}) => {
  const getEncouragementMessage = () => {
    if (correctAnswers === 0) {
      return "Đừng nản lòng! Mọi chuyên gia đều từng là người mới bắt đầu 💪";
    } else if (correctAnswers <= 3) {
      return "Bạn đã có khởi đầu tốt! Hãy thử lại để cải thiện nhé 🌟";
    } else if (correctAnswers <= 7) {
      return "Không tệ! Bạn đã trả lời đúng khá nhiều câu rồi 👍";
    } else {
      return "Rất tiếc! Bạn đã gần đạt được mục tiêu rồi 🎯";
    }
  };

  const getScoreColor = () => {
    if (correctAnswers <= 3) return "#f5222d"; // red
    if (correctAnswers <= 7) return "#faad14"; // yellow
    return "#fa8c16"; // orange
  };

  return (
    <Modal
      open={visible}
      centered
      footer={null}
      onCancel={onClose}
      closeIcon={<CloseOutlined />}
      width={400}
      style={{ padding: 24 }}
    >
      <div className="space-y-3 text-center">
        <div className="text-4xl text-red-500">
          <FrownOutlined />
        </div>
        <h2 className="text-xl font-bold text-[#FF8A00]">Ôi không! 😅</h2>
        <p className="text-gray-600">{message || "Bạn chưa đạt được mục tiêu lần này"}</p>

        <div className="mt-4 mb-2">
          <div className="text-2xl font-semibold">
            <span style={{ color: getScoreColor() }}>{correctAnswers}</span>
            <span className="text-gray-400">/{totalQuestions}</span>
          </div>
          <p className="text-sm text-gray-500">Câu trả lời đúng</p>
          <Progress
            percent={Math.round((correctAnswers / totalQuestions) * 100)}
            showInfo={false}
            strokeColor={{
              from: "#FF8A00",
              to: "#FF4D4F",
            }}
            className="mt-2"
          />
        </div>

        <div className="p-3 text-sm text-[#FF8A00] bg-blue-50 rounded border-l-4 border-blue-400">
          💡 {getEncouragementMessage()}
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={clearData}
            block
            className="!bg-[#FF8A00] hover:!bg-[#e67a00]"
          >
            Thử lại ngay! 🔥
          </Button>
        </div>

        <p className="mt-4 text-xs italic text-gray-400">
          "Thất bại là mẹ của thành công" 🌟
        </p>
      </div>
    </Modal>
  );
};

export default FailureModal;
