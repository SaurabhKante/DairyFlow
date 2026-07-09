import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserPen, Users } from "lucide-react";

import ProfileHeader from "../components/profile/ProfileHeader";
import PreferenceCard from "../components/profile/PreferenceCard";
import LogoutButton from "../components/profile/LogoutButton";
import BottomNavbar from "../components/home/BottomNavbar";
import { BASE_URL } from "../constants/baseUrl";


const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

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

      localStorage.removeItem("token");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Profile Header */}
        <ProfileHeader user={user} />

        {/* Preferences */}
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
            Preferences
          </h3>

          <div className="space-y-3">
            <PreferenceCard
              icon={UserPen}
              title="Update Profile"
              description="Personal information & preferences"
              onClick={() => navigate("/update-profile")}
            />

            {user?.role === "ADMIN" && (
              <PreferenceCard
                icon={Users}
                title="All Users"
                description="Manage users & permissions"
                badge="Restricted"
                onClick={() => navigate("/users")}
              />
            )}
          </div>
        </section>

        {/* Logout */}
        <LogoutButton />
      </main>

      {/* Bottom Navigation */}
      <BottomNavbar role={user?.role} />
    </div>
  );
};

export default Profile;