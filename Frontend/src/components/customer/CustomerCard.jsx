import { Edit, Trash2, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CustomerCard = ({ customer, onUpdate, onDelete, isAdmin, onPayment }) => {
  const navigate = useNavigate();

  const initials = customer.customerName
    ? customer.customerName
        .split(" ")
        .map((word) => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "NA";

  return (
    <div
      onClick={() =>
        navigate(`/record-deliver/${customer.customerId}`, {
          state: customer,
        })
      }
      className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      {/* customer Info */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
          {initials}
        </div>

        {/* Details */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">
            {customer.customerName}
          </h3>

          <p className="text-sm text-gray-600">📞 {customer.mobileNo}</p>

          <p className="text-sm text-gray-500 mt-1">
            📍 {customer.address || "N/A"}
          </p>
        </div>
      </div>

      {/* Admin Actions */}
      {isAdmin && (
        <div className="flex gap-3 mt-5 pt-4 border-t border-gray-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpdate();
            }}
            className="flex-1 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center justify-center gap-2 transition"
          >
            <Edit size={18} />
            Update
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/customer-bill/${customer.customerId}`, {
                state: customer,
              });
            }}
            className="flex-1 h-11 rounded-xl bg-green-100 hover:bg-green-200 text-green-700 font-medium flex items-center justify-center gap-2 transition"
          >
            <IndianRupee size={18} />
            Payment
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="flex-1 h-11 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 font-medium flex items-center justify-center gap-2 transition"
          >
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerCard;
