import { useEffect, useState } from "react";
import axios from "axios";
import { Tractor, Truck } from "lucide-react";

import TopNavbar from "../components/home/TopNavBar";
import QuickActionCard from "../components/home/QuickActionCard";
import BottomNavbar from "../components/home/BottomNavBar";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/baseUrl";


const Home = () => {
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

        window.location.href = "/";
      }
    }
  };
const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 pb-20">

      {/* Top Navigation */}
      <TopNavbar />

      {/* Main Content */}
      <main className="px-5 py-6">

        {/* Welcome Section */}
        <div className="mb-8">
          <p className="text-sm text-gray-500">
            Welcome Back,
          </p>

          <h2 className="text-3xl font-bold text-blue-700">
            {user?.fullName || "Loading..."}
          </h2>
        </div>

        {/* Quick Actions */}
        <section>

          <h3 className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-5">
            Quick Actions
          </h3>

          <div className="grid grid-cols-2 gap-4">

            <QuickActionCard
              title="Intake from Farmer"
              description="Log daily collection"
              icon={Tractor}
              bgColor="bg-green-100"
              iconBg="bg-green-200"
              iconColor="text-green-700"
              borderColor="border-green-300"
              onClick={() => {
                navigate("/farmer-list")
              }}
            />

            <QuickActionCard
              title="Deliver to Customer"
              description="Confirm drop-off"
              icon={Truck}
              bgColor="bg-blue-100"
              iconBg="bg-blue-200"
              iconColor="text-blue-700"
              borderColor="border-blue-300"
              onClick={() => {
                navigate("/customer-list")
              }}
            />

          </div>

        </section>

      </main>

      {/* Bottom Navigation */}
      <BottomNavbar role={user?.role} />

    </div>
  );
};

export default Home;