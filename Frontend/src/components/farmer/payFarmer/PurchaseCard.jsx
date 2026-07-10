import { ReceiptText } from "lucide-react";

const PurchaseCard = ({ purchase }) => {
  const formatDate = (date) => {
    if (!date) return "-";

    const d = new Date(date.replace(" ", "T"));

    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const isPaid = purchase.paymentId !== null && purchase.paymentId !== undefined;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
      <ReceiptText className="text-blue-700" size={20} />
    </div>

    <div>
      <h4 className="text-base font-semibold text-gray-800">
        Purchase #{purchase.purchaseId}
      </h4>

      <p className="text-sm text-gray-500">
        {formatDate(purchase.createdAt)}
      </p>
    </div>
  </div>

  <div className="text-right">
    <p className="text-lg font-bold text-blue-700">
      ₹{purchase.totalAmount}
    </p>

    <span
      className={`inline-flex mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
        isPaid
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {isPaid ? "Paid" : "Pending"}
    </span>
  </div>
</div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Quantity
          </p>

          <p className="font-semibold text-gray-800">
            {purchase.quantity} L
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Rate
          </p>

          <p className="font-semibold text-gray-800">
            ₹{purchase.farmerRate}/L
          </p>
        </div>
      </div>

      {/* Remarks */}
      {purchase.remarks && (
        <div className="mt-3 pt-3 border-t border-dashed border-gray-200">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
            Remarks
          </p>

          <p className="text-sm text-gray-700">
            {purchase.remarks}
          </p>
        </div>
      )}
    </div>
  );
};

export default PurchaseCard;