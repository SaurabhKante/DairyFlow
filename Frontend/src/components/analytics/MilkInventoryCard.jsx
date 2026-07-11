import { Droplets, ArrowDownCircle, ArrowUpCircle } from "lucide-react";

const MilkInventoryCard = ({
  totalPurchasedMilk,
  totalSoldMilk,
  onPurchasedClick,
  onSoldClick,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
            Milk Inventory
          </p>

          <h3 className="text-lg font-bold text-gray-800 mt-1">
            Milk Overview
          </h3>
        </div>

        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
          <Droplets className="text-blue-600" size={24} />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* Purchased */}
        <button
          onClick={onPurchasedClick}
          className="bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-xl p-4 text-left transition-all duration-200 hover:shadow-md active:scale-95"
        >
          <div className="flex items-center gap-2 mb-3">
            <ArrowDownCircle className="text-green-600" size={18} />

            <span className="text-sm font-medium text-gray-600">
              Purchased
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            {Number(totalPurchasedMilk).toFixed(2)}
          </h2>

          <p className="text-sm text-gray-500 mt-1">Litres</p>
        </button>

        {/* Sold */}
        <button
          onClick={onSoldClick}
          className="bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-xl p-4 text-left transition-all duration-200 hover:shadow-md active:scale-95"
        >
          <div className="flex items-center gap-2 mb-3">
            <ArrowUpCircle className="text-blue-600" size={18} />

            <span className="text-sm font-medium text-gray-600">
              Sold
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            {Number(totalSoldMilk).toFixed(2)}
          </h2>

          <p className="text-sm text-gray-500 mt-1">Litres</p>
        </button>
      </div>
    </div>
  );
};

export default MilkInventoryCard;