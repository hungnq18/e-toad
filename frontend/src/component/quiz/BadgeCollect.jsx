import { Button, Modal, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons"; // Don't forget to import CloseOutlined icon
import React from "react";

const { Title, Paragraph } = Typography;

const BadgeCollect = ({
  onClose,
  label,
  visible = true,
  image,
  getBadge,
}) => {
  return (
    <Modal
      open={visible}
      centered
      footer={null}
      onCancel={onClose}
      closeIcon={<CloseOutlined />}
      width={400}
      style={{
        padding: "24px",
        borderRadius: "8px",
      }}
    >
      <div className="space-y-4">
        {/* Image with rounded corners and shadow */}
        <img
          src={image}
          alt="badge"
          className="object-contain mx-auto w-48 h-48 rounded-full border-4 border-yellow-400 shadow-2xl"
        />
        
        {/* Title */}
        <Title level={4} style={{ marginTop: "16px", fontWeight: "bold" }}>
          {label}
        </Title>
        
        {/* Button with styling and responsiveness */}
        <Button
          type="primary"
          size="large"
          onClick={getBadge}
          style={{
            backgroundColor: "#FF8A00",
            borderColor: "#FF8A00",
            width: "100%",
            fontSize: "16px",
            padding: "12px",
            fontWeight: "bold",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
          block
        >
          Get Badge
        </Button>
        
        {/* Optional description or paragraph */}
        <Paragraph style={{ marginTop: "16px", color: "#666" }}>
          Collect this badge as a reward! Click the button to receive it.
        </Paragraph>
      </div>
    </Modal>
  );
};

export default BadgeCollect;
