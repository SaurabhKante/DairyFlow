const QuickActionCard = ({
  title,
  description,
  icon: Icon,
  bgColor,
  iconBg,
  iconColor,
  borderColor,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col justify-between items-start h-40 rounded-2xl p-5 shadow-sm border transition-all duration-200 hover:shadow-lg hover:-translate-y-1 active:scale-95 ${bgColor} ${borderColor}`}
    >
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}
      >
        <Icon size={24} className={iconColor} />
      </div>

      {/* Content */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          {title}
        </h3>

        <p className="text-sm text-gray-600 mt-1">
          {description}
        </p>
      </div>
    </button>
  );
};

export default QuickActionCard;