import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function DarkLogin() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0f1a] flex justify-center items-center px-4">

      <div className="absolute top-6 left-6">
        <Link
          to="/"
          className="flex items-center text-gray-300 hover:text-blue-400 transition"
        >
          <ArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>

      <div className="w-full max-w-md bg-white/5 backdrop-blur-lg p-10 rounded-2xl border border-white/10 shadow-xl">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>

        <p className="text-gray-400 text-center mb-8">
          Welcome back! Continue to your dashboard.
        </p>

        <form className="space-y-6">

          {/* Email */}
          <div>
            <label className="text-gray-300">Email</label>
            <input
              type="email"
              className="w-full bg-white/5 border border-white/10 text-gray-200 p-3 rounded-lg mt-1 focus:ring focus:ring-blue-600"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-300">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full bg-white/5 border border-white/10 text-gray-200 p-3 rounded-lg mt-1 focus:ring focus:ring-blue-600"
                placeholder="•••••••"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-4 right-3 text-gray-400 hover:text-blue-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button className="w-full bg-blue-600 py-3 rounded-lg text-white hover:bg-blue-500 transition text-lg">
            Login
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:text-blue-300">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
