import { Droplets, IndianRupee } from "lucide-react";

const PaymentSummaryCard = ({ summary }) => {
    
  return (
    <section className="grid grid-cols-2 gap-4">
      {/* Total Quantity */}
      <div className="bg-blue-600 text-white rounded-2xl p-5 shadow-sm">
        <div className="flex justify-between items-start">
          <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
            <Droplets size={22} />
          </div>

          <span className="text-[10px] font-semibold bg-white/20 px-2 py-1 rounded-full tracking-wide">
            TOTAL VOL
          </span>
        </div>

        <div className="mt-8">
          <h2 className="text-3xl font-bold">
            {summary?.totalQuantity || "0.00"}
          </h2>

          <p className="text-sm text-blue-100 mt-1">Liters</p>
        </div>
      </div>

      {/* Total Amount */}
      <div className="bg-green-100 border border-green-200 rounded-2xl p-5 shadow-sm">
        <div className="flex justify-between items-start">
          <div className="w-11 h-11 rounded-xl bg-green-200 flex items-center justify-center">
            <IndianRupee size={22} className="text-green-700" />
          </div>

          <span className="text-[10px] font-semibold bg-green-200 text-green-800 px-2 py-1 rounded-full tracking-wide">
            UNPAID
          </span>
        </div>

        <div className="mt-8">
          <h2 className="text-3xl font-bold text-green-700">
            ₹{summary?.totalAmount || "0.00"}
          </h2>

          <p className="text-sm text-green-700 mt-1">Pending Amount</p>
        </div>
      </div>
    </section>
  );
};

export default PaymentSummaryCard;