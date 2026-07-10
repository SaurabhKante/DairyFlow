import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddFarmerHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 flex items-center px-4 h-14 shadow-sm">
      <button
        onClick={() => navigate(-1)}
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
      >
        <ArrowLeft size={22} className="text-blue-700" />
      </button>

      <h1 className="flex-1 text-center text-xl font-bold text-blue-700 mr-10">
        Add New Farmer
      </h1>
    </header>
  );
};

export default AddFarmerHeader;