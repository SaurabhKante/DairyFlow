const LoginInput = ({
  icon: Icon,
  type,
  placeholder,
  value,
  onChange,
  rightIcon: RightIcon,
  rightAction,
}) => {
  return (
    <div className="flex items-center border rounded-lg bg-white h-12 px-4 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 transition">

      <Icon
        size={20}
        className="text-gray-400"
      />

      <input
        className="flex-1 outline-none bg-transparent px-3"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      {RightIcon && (
        <button
          type="button"
          onClick={rightAction}
        >
          <RightIcon
            size={20}
            className="text-gray-500"
          />
        </button>
      )}

    </div>
  );
};

export default LoginInput;