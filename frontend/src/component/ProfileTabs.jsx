import { useState } from "react";

const TABS = [
  { label: "Thành tích" },
  { label: "Hoạt động" },
  { label: "Phần thưởng" },
];

function ProfileTabs({ onChange }) {
  const [active, setActive] = useState(0);

  const handleTabClick = (idx) => {
    setActive(idx);
    if (onChange) onChange(idx);
  };

  return (
    <div className="w-full bg-gray-200 flex p-1 rounded-xl">
      {TABS.map((tab, idx) => (
        <button
          key={tab.label}
          onClick={() => handleTabClick(idx)}
          className={`flex-1 text-center py-2 font-semibold transition rounded-xl
            ${active === idx
              ? "bg-white text-black shadow"
              : "bg-transparent text-black"
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default ProfileTabs;