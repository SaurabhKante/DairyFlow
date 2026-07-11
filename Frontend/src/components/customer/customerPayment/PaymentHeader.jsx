// src/components/payment/PaymentHeader.jsx

import { ArrowLeft, User, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentHeader = ({ customer }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      {/* Top Bar */}
      <div className="flex items-center h-14 px-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
        >
          <ArrowLeft size={22} className="text-blue-700" />
        </button>

        <h1 className="ml-3 text-xl font-bold text-blue-700">
          Customer Payment
        </h1>
      </div>

      {/* Customer Details */}
      {customer && (
        <div className="px-4 pb-4">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-4">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
              {customer.customerName
                ?.split(" ")
                .map((word) => word[0])
                .join("")
                .substring(0, 2)
                .toUpperCase()}
            </div>

            {/* Customer Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <User size={16} className="text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-800">
                  {customer.customerName}
                </h2>
              </div>

              <div className="flex items-center gap-2 mt-1">
                <Phone size={15} className="text-gray-500" />
                <span className="text-sm text-gray-600">
                  {customer.mobileNo}
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-2">
                {customer.address || "Address not available"}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default PaymentHeader;