import { User, Phone, Calendar } from "lucide-react";

const PaymentPersonCard = ({
  name,
  mobileNo,
  totalPayments,
  totalAmount,
  lastPaymentDate,
  amountLabel = "Total Paid",
  paymentLabel = "Payments",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-2xl p-5 hover:bg-blue-50 transition cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <User className="text-blue-600" size={22} />
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              {name}
            </h3>

            <div className="flex items-center gap-2 text-gray-500 mt-1">
              <Phone size={14} />
              {mobileNo}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 border-t mt-5 pt-4">
        <div>
          <p className="text-xs uppercase text-gray-400">
            {paymentLabel}
          </p>

          <p className="text-xl font-semibold">
            {totalPayments}
          </p>
        </div>

        <div className="col-span-2 text-right">
          <p className="text-xs uppercase text-gray-400">
            {amountLabel}
          </p>

          <p className="text-2xl font-bold text-blue-700">
            ₹{totalAmount}
          </p>
        </div>
      </div>

      <div className="flex items-center mt-5 text-gray-500">
        <Calendar size={15} />

        <span className="ml-2">
          Last : {lastPaymentDate}
        </span>
      </div>
    </div>
  );
};

export default PaymentPersonCard;