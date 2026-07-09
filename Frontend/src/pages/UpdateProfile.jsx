import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { BASE_URL } from "../constants/baseUrl";
import ProfileForm from "../components/profile/update_profile/ProfileForm";


const UpdateProfile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${BASE_URL}/user/v1/get-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = res.data.DATA;

      setFormData({
        name: user.fullName,
        mobile: user.mobileNo,
        email: user.email,
        password: "",
        role: user.role,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const payload = {
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
      };

      if (formData.password.trim() !== "") {
        payload.password = formData.password;
      }

      const res = await axios.put(
        `${BASE_URL}/user/v1/update-user`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.MESSAGE);
      navigate("/profile");
    } catch (error) {
      alert(error.response?.data?.MESSAGE || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50 pb-28">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white border-b h-16 flex items-center justify-between px-5">
          <button
            onClick={() => navigate("/profile")}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={22} />
          </button>

          <h1 className="text-xl font-bold text-blue-700">
            Update Profile
          </h1>

          <div className="w-8" />
        </header>

        {/* Body */}
        <div className="max-w-md mx-auto px-5 py-6">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
              <User size={46} className="text-blue-700" />
            </div>

            <p className="mt-4 text-sm uppercase tracking-widest text-blue-600 font-semibold">
              {formData.role}
            </p>

            <h2 className="text-2xl font-bold mt-1">
              {formData.name}
            </h2>
          </div>

          {/* Form */}
          <ProfileForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={updateProfile}
            loading={loading}
          />
        </div>
      </div>

    </>
  );
};

export default UpdateProfile;