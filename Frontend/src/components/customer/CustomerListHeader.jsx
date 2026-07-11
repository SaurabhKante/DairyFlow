// src/components/farmer/FarmerListHeader.jsx

import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CustomerListHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 flex items-center justify-between px-4 h-14 shadow-sm">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
      >
        <ArrowLeft size={22} className="text-blue-700" />
      </button>

      {/* Title */}
      <h1 className="text-xl font-bold text-blue-700">
        Select Customer
      </h1>

      {/* Empty div for alignment */}
      <div className="w-10" />
    </header>
  );
};

export default CustomerListHeader;