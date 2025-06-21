function StatCard({
  icon,
  label,
  value,
  className = '',
  style = {},
  labelClassName = '',
  labelStyle = {},
  valueClassName = '',
  valueStyle = {},
  iconClassName = '',
  iconStyle = {},
}) {
  return (
    <div
      className={`bg-white border border-orange-200 rounded-[40px] h-[156px] flex flex-col items-center justify-center gap-2 shadow-sm w-full ${className}`}
      style={style}
    >
      <div className="flex flex-col items-center gap-1">
        <div className={`w-8 h-8 mb-1 flex items-center justify-center ${iconClassName}`} style={iconStyle}>
          {icon}
        </div>
        <span className={`font-semibold text-[20px] text-[#353535] ${labelClassName}`} style={labelStyle}>
          {label}
        </span>
      </div>
      <div className="flex justify-center items-center">
        <span className={`font-extrabold text-[49px] leading-[72px] text-[#F97316] ${valueClassName}`} style={valueStyle}>
          {value}
        </span>
      </div>
    </div>
  );
}

export default StatCard;