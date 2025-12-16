import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { db } from "../../../firebase/firebase.init";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const { registerUser } = useAuth(); 

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [firebaseError, setFirebaseError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Email/Password Registration
  const handleRegistration = async (data) => {
    setFirebaseError("");
    setLoading(true);

    const { name, email, password, photo } = data;

    try {
      const result = await registerUser(email, password);
      const user = result.user;

      // Update firebase profile
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
          default:
            msg = err.message || msg;
        }
      }
      setFirebaseError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow-xl rounded-2xl bg-white mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">Create an Account</h2>
       <p className='text-center'>Please Register</p>
      <form onSubmit={handleSubmit(handleRegistration)}>
        <label className="label">Name</label>
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
          className="input input-bordered w-full"
          placeholder="Your Name"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <label className="label mt-3">Email</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className="input input-bordered w-full"
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <label className="label mt-3">Photo URL</label>
        <input
          type="text"
          {...register("photo", {
            pattern: {
              value:
                /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$|^(https?:\/\/)/i,
              message: "Enter a valid image URL (or leave empty).",
            },
          })}
          className="input input-bordered w-full"
          placeholder="https://example.com/photo.jpg (optional)"
        />
        {errors.photo && <p className="text-red-500">{errors.photo.message}</p>}

        <label className="label mt-3">Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "At least 6 characters" },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
              message:
                "Must include uppercase, lowercase and a number (min 6 chars).",
            },
          })}
          className="input input-bordered w-full"
          placeholder="Password"
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

        <p className="mt-3 text-center">
          Already have an account?
          <Link className="text-blue-600 underline ml-1" to="/login">
            Login
          </Link>
        </p>
      </form>

      {/* Social Logins */}
      <SocialLogin />
    </div>
  );
};

export default Register;
