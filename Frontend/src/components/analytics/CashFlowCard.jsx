import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";

const CashFlowCard = ({
  totalPaidToFarmers,
  totalReceivedFromCustomers,
  onPaidFarmersClick,
  onReceivedCustomersClick,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
            Cash Flow
          </p>

          <h3 className="text-lg font-bold text-gray-800 mt-1">
            Money Movement
          </h3>
        </div>

        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
          <Wallet className="text-purple-600" size={24} />
        </div>
      </div>

      <div className="space-y-4">
        {/* Paid to Farmers */}
        <button
          onClick={onPaidFarmersClick}
          className="w-full flex items-center justify-between p-4 rounded-xl bg-red-50 hover:bg-red-100 border border-red-100 transition-all duration-200 hover:shadow-md active:scale-95"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm">
              <ArrowUpRight className="text-red-600" size={20} />
            </div>

            <div className="text-left">
              <p className="font-semibold text-gray-800">
                Paid to Farmers
              </p>

              <p className="text-sm text-gray-500">
                Total payments made
              </p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-red-600">
            ₹{Number(totalPaidToFarmers).toFixed(2)}
          </h3>
        </button>

        {/* Received from Customers */}
        <button
          onClick={onReceivedCustomersClick}
          className="w-full flex items-center justify-between p-4 rounded-xl bg-green-50 hover:bg-green-100 border border-green-100 transition-all duration-200 hover:shadow-md active:scale-95"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm">
              <ArrowDownLeft className="text-green-600" size={20} />
            </div>

            <div className="text-left">
              <p className="font-semibold text-gray-800">
                Received from Customers
              </p>

              <p className="text-sm text-gray-500">
                Total collections
              </p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-green-600">
            ₹{Number(totalReceivedFromCustomers).toFixed(2)}
          </h3>
        </button>
      </div>
    </div>
  );
};

export default CashFlowCard;