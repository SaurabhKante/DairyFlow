import { User, Phone, Milk, IndianRupee } from "lucide-react";

const PendingPersonCard = ({
  name,
  mobileNo,
 pendingQuantity,
  pendingAmount,
  totalTransactions,
  transactionLabel = "Purchases",
  quantityLabel = "Pending Qty",
  amountLabel = "Pending Amount",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition cursor-pointer"
    >
      {/* Header */}

      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
            <User className="text-red-600" size={22} />
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              {name}
            </h3>

            <div className="flex items-center gap-2 mt-1 text-gray-500">
              <Phone size={14} />
              {mobileNo}
            </div>
          </div>
        </div>
      </div>

      {/* Details */}

      <div className="grid grid-cols-3 gap-4 border-t mt-5 pt-5">

        <div>
          <p className="text-xs uppercase text-gray-400">
            {transactionLabel}
          </p>

          <p className="text-xl font-semibold">
            {totalTransactions}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-gray-400">
            {quantityLabel}
          </p>

          <div className="flex items-center gap-1">
            <Milk size={16} className="text-blue-600" />
            <span className="font-semibold">
              {pendingQuantity} L
            </span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs uppercase text-gray-400">
            {amountLabel}
          </p>

          <div className="flex justify-end items-center gap-1">
            <IndianRupee size={16} />
            <span className="text-xl font-bold text-red-600">
              {pendingAmount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingPersonCard;