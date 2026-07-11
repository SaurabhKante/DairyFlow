import {
  IndianRupee,
  ShoppingCart,
  BadgeIndianRupee,
} from "lucide-react";

const FinancialCard = ({
  totalPurchaseAmount,
  totalSellsAmount,
  onPurchaseClick,
  onSalesClick,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
            Financial Performance
          </p>

          <h3 className="text-lg font-bold text-gray-800 mt-1">
            Revenue & Expenses
          </h3>
        </div>

        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
          <IndianRupee className="text-green-600" size={24} />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* Purchase Amount */}
        <button
          onClick={onPurchaseClick}
          className="bg-green-50 hover:bg-green-100 border border-green-100 rounded-xl p-4 text-left transition-all duration-200 hover:shadow-md active:scale-95"
        >
          <div className="flex items-center gap-2 mb-3">
            <ShoppingCart className="text-orange-600" size={18} />

            <span className="text-sm font-medium text-gray-600">
              Purchase
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            ₹{Number(totalPurchaseAmount).toFixed(2)}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Purchase Amount
          </p>
        </button>

        {/* Sales Amount */}
        <button
          onClick={onSalesClick}
          className="bg-green-50 hover:bg-green-100 border border-green-100 rounded-xl p-4 text-left transition-all duration-200 hover:shadow-md active:scale-95"
        >
          <div className="flex items-center gap-2 mb-3">
            <BadgeIndianRupee className="text-green-600" size={18} />

            <span className="text-sm font-medium text-gray-600">
              Sales
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            ₹{Number(totalSellsAmount).toFixed(2)}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Sales Amount
          </p>
        </button>
      </div>
    </div>
  );
};

export default FinancialCard;