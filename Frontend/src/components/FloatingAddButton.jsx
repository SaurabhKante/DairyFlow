// src/components/farmer/FloatingAddButton.jsx

import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FloatingAddButton = ({ to }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="fixed bottom-24 right-5 z-40 w-14 h-14 rounded-full bg-blue-700 hover:bg-blue-800 text-white shadow-lg flex items-center justify-center transition-all duration-200 active:scale-95"
      aria-label="Add Farmer"
    >
      <Plus size={28} strokeWidth={2.5} />
    </button>
  );
};

export default FloatingAddButton;