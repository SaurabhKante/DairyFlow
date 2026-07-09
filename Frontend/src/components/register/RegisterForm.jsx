import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  User,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import RegisterInput from "./RegisterInput";
import { BASE_URL } from "../../constants/baseUrl";


const RegisterForm = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        fullName,
        mobile,
        email,
        password,
      };
const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/user/v1/sign-up`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = response.data;

      if (result.SUCCESS) {
        alert(result.MESSAGE || "Registration Successful");

        navigate("/users");
      } else {
        alert(result.MESSAGE);
      }
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.MESSAGE);
      } else {
        alert("Unable to connect to server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="space-y-5 mt-6"
    >
      <RegisterInput
        label="Full Name"
        name="fullName"
        icon={User}
        placeholder="John Doe"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />

      <RegisterInput
        label="Mobile Number"
        name="mobile"
        icon={Phone}
        placeholder="+91 9876543210"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        required
      />

      <RegisterInput
        label="Email Address"
        name="email"
        type="email"
        icon={Mail}
        placeholder="john@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <RegisterInput
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        icon={Lock}
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        rightIcon={showPassword ? EyeOff : Eye}
        onRightIconClick={() =>
          setShowPassword(!showPassword)
        }
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full h-12 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-700 hover:bg-blue-800 active:scale-95"
        }`}
      >
        {loading ? (
          "Creating Account..."
        ) : (
          <>
            Create Account
            <ArrowRight size={18} />
          </>
        )}
      </button>

      <div className="text-center pt-3">
        <span className="text-gray-500">
          Already have an account?
        </span>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="ml-2 text-blue-700 font-semibold hover:underline"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;