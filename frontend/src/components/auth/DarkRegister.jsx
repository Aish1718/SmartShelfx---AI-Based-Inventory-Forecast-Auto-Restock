import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function DarkRegister() {
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
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Account
        </h2>

        <p className="text-gray-400 text-center mb-8">
          Join SmartShelfX and start managing your inventory smarter.
        </p>

        <form className="space-y-6">

          <div>
            <label className="text-gray-300">Full Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full bg-white/5 border border-white/10 text-gray-200 p-3 rounded-lg mt-1 focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-gray-300">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full bg-white/5 border border-white/10 text-gray-200 p-3 rounded-lg mt-1 focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-gray-300">Password</label>
            <input
              type="password"
              placeholder="•••••••"
              className="w-full bg-white/5 border border-white/10 text-gray-200 p-3 rounded-lg mt-1 focus:ring focus:ring-blue-500"
            />
          </div>

          <button className="w-full bg-blue-600 py-3 rounded-lg text-white hover:bg-blue-500 transition text-lg">
            Register
          </button>

        </form>

        <p className="text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-300">
            Login
          </Link>
        </p>
      </div>

    </div>
  );
}
