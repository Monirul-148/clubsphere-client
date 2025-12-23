import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth.jsx";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const { signInUser, loginWithGoogle, forgotPassword } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit } = useForm();

  // Email/Password Login
  const handleLogin = async (data) => {
    setLoading(true);
    setFirebaseError("");
    try {
      const result = await signInUser(data.email, data.password);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back, ${result.user.displayName || result.user.email}`,
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (err) {
      setFirebaseError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      Swal.fire("Success", "Google login successful!", "success");
      navigate("/");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  // Forgot Password
  const handleForgotPassword = async () => {
    const email = prompt("Enter your registered email:");
    if (!email) return;

    try {
      await forgotPassword(email);
      Swal.fire("Success", "Password reset email sent!", "success");
    } catch (err) {
      Swal.fire("Error", err.message || "Failed to send reset email", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow-xl rounded-2xl bg-white mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

      <form onSubmit={handleSubmit(handleLogin)}>
        <label className="label">Email</label>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
          className="input input-bordered w-full"
        />

        <label className="label mt-3">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password", { required: true })}
            className="input input-bordered w-full"
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {firebaseError && <p className="text-red-600 mt-2">{firebaseError}</p>}

        <button
          type="submit"
          className="btn btn-neutral w-full mt-4"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <button
        className="text-blue-600 underline mt-2"
        onClick={handleForgotPassword}
      >
        Forgot Password?
      </button>
      <p className="mt-3 text-center">
         Don't have an account?{" "}
        <Link className="text-blue-600 underline" to="/register">
          Register
        </Link>
      </p>

      <div className="divider">OR</div>

      {/* Google Login Button */}
      <button
        className="btn btn-outline w-full flex items-center justify-center gap-2 mt-4"
        onClick={handleGoogleLogin}
      >
        <svg
          className="w-6 h-6"
          viewBox="0 0 533.5 544.3"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M533.5 278.4c0-17.3-1.5-34.2-4.4-50.5H272v95.4h146.9c-6.3 34.1-25.1 62.9-53.5 82v68h86.3c50.4-46.4 81.8-114.9 81.8-195.9z"
            fill="#4285F4"
          />
          <path
            d="M272 544.3c72.6 0 133.5-24.1 178-65.5l-86.3-68c-24.1 16.2-55 25.6-91.7 25.6-70.7 0-130.6-47.8-152.1-112.2h-90.5v70.7C83.9 474.8 171.3 544.3 272 544.3z"
            fill="#34A853"
          />
          <path
            d="M119.9 314.9c-5.8-17.2-9.2-35.5-9.2-54.4s3.4-37.2 9.2-54.4v-70.7h-90.5C9.7 183.6 0 223.3 0 255c0 31.7 9.7 71.4 29.4 110.2l90.5-70.3z"
            fill="#FBBC05"
          />
          <path
            d="M272 107.7c39.4 0 74.9 13.6 102.7 40.3l77.1-77.1C399.5 24.1 338.6 0 272 0 171.3 0 83.9 69.5 29.4 183.5l90.5 70.7C141.4 155.5 201.3 107.7 272 107.7z"
            fill="#EA4335"
          />
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default Login;

