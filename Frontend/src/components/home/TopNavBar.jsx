import { useEffect, useState } from "react";
import axios from "axios";
import { UserCircle } from "lucide-react";
import { BASE_URL } from "../../constants/baseUrl";


const TopNavbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${BASE_URL}/user/v1/get-profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.SUCCESS) {
        setUser(response.data.DATA);
      }
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/";
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 h-16 bg-white border-b border-gray-200 shadow-sm px-6 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
          <UserCircle
            size={34}
            className="text-blue-700"
          />
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-gray-500">
            {user?.role || "Loading..."}
          </p>

          <h1 className="text-xl font-bold text-blue-700">
            {user?.fullName || "Loading..."}
          </h1>
        </div>
      </div>

      <div className="text-right">
        <p className="text-sm text-gray-500">
          {user?.email}
        </p>

        <p className="text-sm font-medium text-gray-700">
          {user?.mobileNo}
        </p>
      </div>
    </header>
  );
};

export default TopNavbar;