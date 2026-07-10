// src/components/farmer/SearchBar.jsx

import { Search } from "lucide-react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search by name or mobile number..."
        className="w-full h-12 pl-12 pr-4 bg-white border border-gray-300 rounded-xl
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   focus:border-blue-500 transition-all placeholder:text-gray-400"
      />
    </div>
  );
};

export default SearchBar;