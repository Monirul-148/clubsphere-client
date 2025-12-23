import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth.jsx";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { db } from "../../../firebase/firebase.init.js";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { registerUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [loading, setLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Email/Password Registration
  const handleRegistration = async (data) => {
    setLoading(true);
    setFirebaseError("");
    const { name, email, password, photo } = data;

    try {
      const result = await registerUser(email, password);
      const user = result.user;

      // Update Firebase profile
      await updateProfile(user, {
        displayName: name,
        photoURL: photo || null,
      });

      // Firestore user data
      const userDoc = {
        uid: user.uid,
        name,
        email,
        photo: photo || null,
        role: "member",
        createdAt: serverTimestamp(),
      };

      await setDoc(doc(db, "users", user.uid), userDoc);

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Welcome — registration complete.",
        timer: 1500,
        showConfirmButton: false,
      });

      reset();
      navigate(from, { replace: true });
    } catch (err) {
      let msg = err?.message || "Registration failed. Try again.";
      if (err.code) {
        switch (err.code) {
          case "auth/email-already-in-use":
            msg = "Email already in use. Try logging in.";
            break;
          case "auth/invalid-email":
            msg = "Invalid email address.";
            break;
          case "auth/weak-password":
            msg = "Weak password. Use at least 6 characters.";
            break;
        }
      }
      setFirebaseError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Google Registration/Login
  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      const user = result.user;

      // Check if user exists in Firestore, if not add
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(
        userDocRef,
        {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL || null,
          role: "member",
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );

      Swal.fire("Success", "Google login successful!", "success");
      navigate(from, { replace: true });
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow-xl rounded-2xl bg-white mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">Create an Account</h2>
      <p className="text-center mb-4">Please Register</p>

      <form onSubmit={handleSubmit(handleRegistration)}>
        {/* Name */}
        <label className="label">Name</label>
        <input
          type="text"
          placeholder="Your Name"
          className="input input-bordered w-full"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        {/* Email */}
        <label className="label mt-3">Email</label>
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        {/* Photo URL */}
        <label className="label mt-3">Photo URL</label>
        <input
          type="text"
          placeholder="https://example.com/photo.jpg (optional)"
          className="input input-bordered w-full"
          {...register("photo", {
            pattern: {
              value:
                /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$|^(https?:\/\/)/i,
              message: "Enter a valid image URL or leave empty",
            },
          })}
        />
        {errors.photo && <p className="text-red-500">{errors.photo.message}</p>}

        {/* Password */}
        <label className="label mt-3">Password</label>
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "At least 6 characters" },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
              message:
                "Must include uppercase, lowercase, and a number (min 6 chars).",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        {firebaseError && (
          <p className="text-red-600 font-medium mt-2">{firebaseError}</p>
        )}

        <button
          type="submit"
          className="btn btn-neutral w-full mt-4"
          disabled={loading}
        >
          {loading ? "Processing..." : "Register"}
        </button>
      </form>

      <p className="mt-3 text-center">
        Already have an account?{" "}
        <Link className="text-blue-600 underline" to="/login">
          Login
        </Link>
      </p>

      <div className="divider">OR</div>

      {/* Google Login */}
      <button
        className="btn btn-outline w-full flex items-center justify-center gap-2"
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
        Register with Google
      </button>
    </div>
  );
};

export default Register;

