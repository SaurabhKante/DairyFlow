import {
  House,
  ChartColumn,
  User,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNavbar = ({ role }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg z-50">
      <div
        className={`grid ${
          role === "ADMIN" ? "grid-cols-3" : "grid-cols-2"
        } h-16`}
      >
        {/* Home */}
        <Link
          to="/home"
          className={`flex flex-col items-center justify-center transition ${
            isActive("/home")
              ? "text-blue-700 bg-blue-100"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          <House size={22} />
          <span className="text-xs mt-1">Home</span>
        </Link>

        {/* Only ADMIN can see Data */}
        {role === "ADMIN" && (
          <Link
            to="/data"
            className={`flex flex-col items-center justify-center transition ${
              isActive("/data")
                ? "text-blue-700 bg-blue-100"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <ChartColumn size={22} />
            <span className="text-xs mt-1">Data</span>
          </Link>
        )}

        {/* Profile */}
        <Link
          to="/profile"
          className={`flex flex-col items-center justify-center transition ${
            isActive("/profile")
              ? "text-blue-700 bg-blue-100"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          <User size={22} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavbar;