import { AlertTriangle, ChevronRight } from "lucide-react";

const PendingSettlementCard = ({
  pendingFarmerAmount,
  pendingCustomerAmount,
  onFarmerClick,
  onCustomerClick,
}) => {
  return (
    <div className="bg-white rounded-2xl border-l-4 border border-gray-200 shadow-sm p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-red-600">
            Settlements Pending
          </p>

          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
        </div>

        <AlertTriangle size={22} className="text-red-500" />
      </div>

      {/* Farmer Dues */}
      <button
        onClick={onFarmerClick}
        className="w-full flex items-center justify-between p-4 rounded-xl bg-red-50 hover:bg-red-100 transition mb-3"
      >
        <div className="text-left">
          <p className="text-sm text-gray-500">Farmer Dues</p>

          <h3 className="text-2xl font-bold text-red-600">
            ₹{Number(pendingFarmerAmount || 0).toFixed(2)}
          </h3>
        </div>

        <ChevronRight size={22} className="text-red-500" />
      </button>

      {/* Customer Dues */}
      <button
        onClick={onCustomerClick}
        className="w-full flex items-center justify-between p-4 rounded-xl bg-red-50 hover:bg-red-100 transition"
      >
        <div className="text-left">
          <p className="text-sm text-gray-500">Customer Dues</p>

          <h3 className="text-2xl font-bold text-red-600">
            ₹{Number(pendingCustomerAmount || 0).toFixed(2)}
          </h3>
        </div>

        <ChevronRight size={22} className="text-red-500" />
      </button>
    </div>
  );
};

export default PendingSettlementCard;