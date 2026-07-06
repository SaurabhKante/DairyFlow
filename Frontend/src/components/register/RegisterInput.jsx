const RegisterInput = ({
  label,
  icon: Icon,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  rightIcon: RightIcon,
  onRightIconClick,
}) => {
  return (
    <div className="space-y-2">
      {/* Label */}
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-600"
      >
        {label}
      </label>

      {/* Input Container */}
      <div className="flex items-center h-12 px-4 bg-white border border-gray-300 rounded-lg transition-all duration-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100">
        {/* Left Icon */}
        {Icon && (
          <Icon
            size={20}
            className="text-gray-400 mr-3 flex-shrink-0"
          />
        )}

        {/* Input */}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="flex-1 bg-transparent outline-none text-gray-800 placeholder:text-gray-400"
        />

        {/* Right Icon (Optional) */}
        {RightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="text-gray-500 hover:text-blue-600 transition-colors"
          >
            <RightIcon size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default RegisterInput;