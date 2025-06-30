import React from "react";
import { Modal, Button } from "antd";
import { CloseOutlined, HomeOutlined } from "@ant-design/icons";

const FinishQuizModal = ({
  onClose,
  message = "Chúc mừng bạn đã hoàn thành bài quiz!",
  onHome,
  visible = true,
}) => {
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
        <h2 className="text-2xl font-bold text-[#FF8A00]">Chúc mừng bạn! 🎉</h2>
        <p className="text-gray-600">{message}</p>

        <div className="mt-4 mb-2">
          <p className="text-sm text-gray-500">Bạn đã hoàn thành tất cả câu hỏi trong bài quiz.</p>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <Button
            type="primary"
            icon={<HomeOutlined />}
            onClick={onHome}
            block
            className="!bg-[#FF8A00] hover:!bg-[#e67a00]"
          >
            Quay về trang chủ 🏠
          </Button>
        </div>

        <p className="mt-4 text-xs italic text-gray-400">
          "Mỗi ngày là một cơ hội để phát triển!" 🌟
        </p>
      </div>
    </Modal>
  );
};

export default FinishQuizModal;
