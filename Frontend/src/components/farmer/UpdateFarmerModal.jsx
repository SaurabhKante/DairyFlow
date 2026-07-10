import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../constants/baseUrl";

const UpdateFarmerModal = ({
  isOpen,
  onClose,
  selectedFarmer,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedFarmer) {
      setFormData({
        name: selectedFarmer.farmerName || "",
        mobile: selectedFarmer.mobileNo || "",
        address: selectedFarmer.address || "",
      });
    }
  }, [selectedFarmer]);

  if (!isOpen || !selectedFarmer) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const payload = {};

      if (formData.name.trim() !== "") {
        payload.name = formData.name;
      }

      if (formData.mobile.trim() !== "") {
        payload.mobile = formData.mobile;
      }

      if (formData.address.trim() !== "") {
        payload.address = formData.address;
      }

      await axios.post(
        `${BASE_URL}/farmer/v1/update-farmer/${selectedFarmer.farmerId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Farmer updated successfully.");

      onClose();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.MESSAGE ||
          "Failed to update farmer."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-xl">
        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
          <Pencil className="text-blue-600" size={28} />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Update Farmer
        </h2>

        <p className="text-center text-gray-500 mt-2">
          Modify farmer information below.
        </p>

        {/* Form */}
        <div className="space-y-4 mt-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Farmer Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter farmer name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Mobile Number
            </label>

            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter mobile number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Address
            </label>

            <textarea
              rows={3}
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter address"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 h-12 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateFarmerModal;