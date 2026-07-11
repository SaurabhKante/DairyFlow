import axios from "axios";
import { AlertTriangle } from "lucide-react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../constants/baseUrl";

const DeleteCustomerModal = ({
  isOpen,
  onClose,
  selectedCustomer,
  onSuccess,
}) => {
  if (!isOpen || !selectedCustomer) return null;

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${BASE_URL}/customer/v1/delete-customer/${selectedCustomer.customerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Customer deleted successfully.");

      onClose();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.MESSAGE ||
          "Failed to delete customer."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="text-red-600" size={30} />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Delete Customer?
        </h2>

        {/* Description */}
        <p className="text-center text-gray-500 mt-3">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-800">
            {selectedCustomer.customerName}
          </span>
          ?
        </p>

        <p className="text-center text-sm text-red-500 mt-2">
          This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 h-12 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="flex-1 h-12 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCustomerModal;