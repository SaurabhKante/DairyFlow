import { useState } from "react";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import LoginInput from "./LoginInput";
import { BASE_URL } from "../../constants/baseUrl";

const LoginForm = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const payload = {
      email,
      password,
    };

    const response = await axios.post(
      `${BASE_URL}/user/v1/login-user`,
      payload
    );

    const result = response.data;

    if (result.SUCCESS) {
      // Save token
      localStorage.setItem("token", result.DATA.token);
      localStorage.setItem("role", result.DATA.role);

      // Save logged-in user details
      localStorage.setItem("user", JSON.stringify(result.DATA));

      // Redirect to Home page
      navigate("/home");
    } else {
      alert(result.MESSAGE);
    }
  } catch (error) {
    console.error(error);

    if (error.response) {
      alert(error.response.data.MESSAGE);
    } else {
      alert("Unable to connect to the server.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="bg-white/90 backdrop-blur-lg border rounded-xl p-8 shadow-lg">

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Email */}

        <div>

          <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
            Email Address
          </label>

          <LoginInput
            icon={Mail}
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        {/* Password */}

        <div>

          <div className="flex justify-between mb-1">

            <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
              Security Code
            </label>

            <button
              type="button"
              className="text-blue-600 text-sm"
            >
              Forgot?
            </button>

          </div>

          <LoginInput
            icon={Lock}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rightIcon={showPassword ? EyeOff : Eye}
            rightAction={() =>
              setShowPassword(!showPassword)
            }
          />

        </div>

        <div className="flex items-center gap-2">

          <input
            type="checkbox"
            className="w-5 h-5"
          />

          <span className="text-gray-700">
            Remember this device
          </span>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-blue-700 hover:bg-blue-800 rounded-xl text-white font-semibold flex justify-center items-center gap-2 transition active:scale-95"
        >
          {loading ? (
            <>
              Validating...
            </>
          ) : (
            <>
              Login to Dashboard

              <ArrowRight size={18} />
            </>
          )}
        </button>


      </form>

    </div>
  );
};

export default LoginForm;