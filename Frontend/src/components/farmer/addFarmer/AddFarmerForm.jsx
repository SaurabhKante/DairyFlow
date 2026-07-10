import { useState } from "react";
import axios from "axios";
import {
  User,
  Phone,
  MapPin,
  Info,
  UserPlus,
} from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../constants/baseUrl";


const AddFarmerForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return toast.error("Farmer name is required.");
    }

    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      return toast.error("Enter a valid 10 digit mobile number.");
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${BASE_URL}/farmer/v1/add-farmer`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.MESSAGE);

      navigate("/farmer-list");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.MESSAGE ||
          "Unable to add farmer."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Name */}

      <div>
        <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">
          Full Name
        </label>

        <div className="flex items-center border rounded-xl px-4 h-12 bg-white">
          <User size={18} className="text-gray-500 mr-3" />

          <input
            type="text"
            name="name"
            placeholder="Enter Farmer Name"
            value={formData.name}
            onChange={handleChange}
            className="flex-1 outline-none"
          />
        </div>
      </div>

      {/* Mobile */}

      <div>
        <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">
          Mobile Number
        </label>

        <div className="flex items-center border rounded-xl px-4 h-12 bg-white">
          <Phone size={18} className="text-gray-500 mr-3" />

          <input
            type="tel"
            name="mobile"
            maxLength={10}
            value={formData.mobile}
            onChange={handleChange}
            placeholder="9999999999"
            className="flex-1 outline-none"
          />
        </div>
      </div>

      {/* Address */}

      <div>
        <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">
          Address
        </label>

        <div className="flex border rounded-xl px-4 py-3 bg-white">
          <MapPin
            size={18}
            className="text-gray-500 mt-1 mr-3"
          />

          <textarea
            rows={3}
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter Address"
            className="flex-1 outline-none resize-none"
          />
        </div>
      </div>

      {/* Info */}

      <div className="flex gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
        <Info
          className="text-blue-600 mt-1"
          size={20}
        />

        <p className="text-sm text-gray-600">
          A unique farmer ID will automatically be generated after registration.
        </p>
      </div>

      <button
        disabled={loading}
        className="w-full h-12 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold flex justify-center items-center gap-2 transition"
      >
        <UserPlus size={20} />

        {loading ? "Adding Farmer..." : "Add Farmer"}
      </button>
    </form>
  );
};

export default AddFarmerForm;