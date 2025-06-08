
function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white border border-orange-200 rounded-[40px] w-[300px] h-[156px] flex flex-col items-center justify-center gap-2 shadow-sm">
      <div className="flex flex-col items-center gap-1">
        <div className="w-8 h-8 mb-1 flex items-center justify-center">
          {icon}
        </div>
        <span className="font-semibold text-[20px] text-[#353535]">{label}</span>
      </div>
      <div className="flex justify-center items-center">
        <span className="font-extrabold text-[49px] leading-[72px] text-[#F97316]">{value}</span>
      </div>
    </div>
  );
}

export default StatCard;