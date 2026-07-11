import { User, Phone } from "lucide-react";

const ContributionCard = ({
  name,
  mobileNo,
  quantity,
  amount,
  status = "Completed",
  // onClick,
}) => {
  return (
    <div
      // onClick={onClick}
      className="bg-white border border-gray-200 rounded-2xl p-5 cursor-pointer
      hover:shadow-lg hover:-translate-y-1 transition-all duration-200 active:scale-95"
    >
      <div className="flex justify-between items-start">
        {/* Left */}
        <div className="flex gap-3">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <User size={22} className="text-blue-700" />
          </div>

          <div>
            <h2 className="font-bold text-lg text-gray-900">
              {name}
            </h2>

            <div className="flex items-center gap-1 text-gray-500 mt-1">
              <Phone size={14} />
              <span className="text-sm">
                {mobileNo}
              </span>
            </div>
          </div>
        </div>

        {/* Status */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            status === "Completed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="grid grid-cols-2 mt-5 border-t pt-4">
        <div>
          <p className="text-xs uppercase text-gray-500">
            Quantity
          </p>

          <p className="font-bold text-lg">
            {quantity} L
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs uppercase text-gray-500">
            Amount
          </p>

          <p className="font-bold text-xl text-blue-700">
            ₹{amount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContributionCard;