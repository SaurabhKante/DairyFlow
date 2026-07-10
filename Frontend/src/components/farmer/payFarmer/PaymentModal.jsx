import { useState } from "react";
import { X, Smartphone, Banknote } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../constants/baseUrl";

const PaymentModal = ({
  open,
  onClose,
  farmerId,
  startDate,
  endDate,
  totalAmount,
  onSuccess,
}) => {
  const [paymentMode, setPaymentMode] = useState("UPI");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handlePayment = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.post(
        `${BASE_URL}/admin/v1/pay-farmer/${farmerId}`,
        {
          startDate,
          endDate,
          paymentMode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Payment completed successfully.");

      onClose();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.MESSAGE || "Failed to complete payment."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center">
      <div className="w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Handle */}
        <div className="w-12 h-1.5 rounded-full bg-gray-300 mx-auto mb-6" />

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-700">
            Select Payment Method
          </h2>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            <X size={20} />
          </button>
        </div>

        {/* Payment Modes */}
        <div className="mt-8 space-y-4">
          <label
            className={`border rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition ${
              paymentMode === "UPI"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200"
            }`}
          >
            <input
              type="radio"
              value="UPI"
              checked={paymentMode === "UPI"}
              onChange={(e) => setPaymentMode(e.target.value)}
              className="hidden"
            />

            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Smartphone className="text-blue-700" />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold">UPI Payment</h3>

              <p className="text-sm text-gray-500">
                Google Pay, PhonePe, Paytm, BHIM
              </p>
            </div>
          </label>

          <label
            className={`border rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition ${
              paymentMode === "CASH"
                ? "border-green-600 bg-green-50"
                : "border-gray-200"
            }`}
          >
            <input
              type="radio"
              value="CASH"
              checked={paymentMode === "CASH"}
              onChange={(e) => setPaymentMode(e.target.value)}
              className="hidden"
            />

            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <Banknote className="text-green-700" />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold">Cash</h3>

              <p className="text-sm text-gray-500">
                Physical cash payment
              </p>
            </div>
          </label>
        </div>

        {/* Footer */}
        <div className="mt-8 space-y-3">
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-60"
          >
            {loading
              ? "Processing..."
              : `Pay Now (₹${totalAmount || "0.00"})`}
          </button>

          <button
            onClick={onClose}
            disabled={loading}
            className="w-full h-12 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;