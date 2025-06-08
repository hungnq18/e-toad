import '../css/card.css';
import StatCard from "./StatCard";

function Card() {
  return (
    <div
      className="card-row flex flex-row justify-between items-center gap-6 mx-auto px-2"
      style={{
        marginTop: 10,
        zIndex: 20,
        position: "relative",
        width: "100%",
        maxWidth: 1272,
      }}
    >
      <StatCard
        icon={
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="#F97316" strokeWidth="2.67" fill="white"/>
            <text x="16" y="21" textAnchor="middle" fontSize="16" fill="#F97316" fontWeight="bold">₵</text>
          </svg>
        }
        label="Xu tích lũy"
        value="50"
      />
      <StatCard
        icon={
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="#F97316" strokeWidth="2" fill="white"/>
            <polygon points="16,6 20,22 12,22" fill="#F97316"/>
          </svg>
        }
        label="Cấp độ hiện tại"
        value="01"
      />
      <StatCard
        icon={
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="6" y="10" width="20" height="12" rx="2" stroke="#F97316" strokeWidth="2"/>
            <rect x="12" y="14" width="8" height="4" rx="1" fill="#F97316"/>
          </svg>
        }
        label="Phòng đã khám phá"
        value="0/3"
      />
      <StatCard
        icon={
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="#F97316" strokeWidth="2"/>
            <path d="M10 20 L16 12 L22 20" stroke="#F97316" strokeWidth="2" fill="none"/>
            <circle cx="16" cy="18" r="2" fill="#F97316"/>
          </svg>
        }
        label="Thành tích"
        value="01"
      />
    </div>
  );
}

export default Card;