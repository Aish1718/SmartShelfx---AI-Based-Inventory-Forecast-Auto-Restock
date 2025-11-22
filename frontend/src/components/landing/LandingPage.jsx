import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Cpu, Bell, ShieldCheck, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-[#0a0f1a] text-gray-200 font-sans">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-12 py-6 bg-[#0d1322]/80 backdrop-blur-md fixed top-0 left-0 w-full z-50 border-b border-white/10">
        <h1 className="text-3xl font-extrabold text-blue-400 tracking-wide">
          SmartShelfX
        </h1>

        <div className="hidden md:flex space-x-10 text-lg">
          <a href="#home" className="hover:text-blue-400 transition">Home</a>
          <a href="#features" className="hover:text-blue-400 transition">Features</a>
          <a href="#analytics" className="hover:text-blue-400 transition">Analytics</a>
          <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
        </div>

        <Link
          to="/login"
          className="px-6 py-2 bg-blue-500/20 border border-blue-400 rounded-full text-blue-300 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition"
        >
          Login
        </Link>
      </nav>

      {/* HERO SECTION */}
      <section
        id="home"
        className="pt-40 pb-32 px-10 text-center bg-gradient-to-br from-[#0d1322] to-[#0a0f1a]"
      >
        <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-8 drop-shadow-lg">
          AI-Powered Inventory Excellence
        </h2>

        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-gray-300">
          Predict demand, automate restocking, reduce shortages, and transform your business with SmartShelfX — the next-generation AI Inventory Management System.
        </p>

        <Link
          to="/register"
          className="inline-flex items-center px-10 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-blue-500 transition"
        >
          Start for Free <ArrowRight className="ml-3" size={22} />
        </Link>

        {/* Glass Effect */}
        <div className="mt-20 max-w-4xl mx-auto p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
          <p className="text-lg text-gray-300">
            “SmartShelfX helped us reduce stockouts by <span className="text-blue-400 font-bold">72%</span>
            and saved countless hours of manual forecasting.”
          </p>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-28 px-12 bg-[#0a0f1a]">
        <h3 className="text-4xl font-bold text-center mb-16 text-white">
          Powerful Features for Smart Businesses
        </h3>

        <div className="grid md:grid-cols-3 gap-12">

          <FeatureCard
            icon={<Cpu size={40} className="text-blue-400" />}
            title="AI Demand Forecasting"
            desc="Predict product demand with high accuracy using machine learning models."
          />

          <FeatureCard
            icon={<Bell size={40} className="text-purple-400" />}
            title="Smart Alerts"
            desc="Instant notifications for low stock, risk of shortage, or unusual sales patterns."
          />

          <FeatureCard
            icon={<BarChart3 size={40} className="text-pink-400" />}
            title="Live Analytics Dashboard"
            desc="Monitor sales, stock, patterns, supplier performance, and more."
          />

          <FeatureCard
            icon={<Zap size={40} className="text-yellow-400" />}
            title="Auto-Purchase Orders"
            desc="Let AI generate and approve restocking orders based on forecasts."
          />

          <FeatureCard
            icon={<ShieldCheck size={40} className="text-green-400" />}
            title="Secure & Reliable"
            desc="Enterprise-grade security with JWT authentication & RBAC."
          />

          <FeatureCard
            icon={<Cpu size={40} className="text-red-400" />}
            title="Vendor Management"
            desc="Manage vendors, pricing, delivery cycles, and performance."
          />
        </div>
      </section>

      {/* ANALYTICS PREVIEW */}
      <section id="analytics" className="py-28 bg-gradient-to-b from-[#0a0f1a] to-[#0d1322] px-12 text-center">
        <h3 className="text-4xl font-bold text-white mb-10">Real-Time Insights</h3>
        <p className="text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
          Get deep visibility into your inventory levels, stock movements, supplier performance, and demand trends.
        </p>

        <div className="max-w-5xl mx-auto p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1655722291834-e0a43d0b2de2"
            alt="Analytics"
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>


      {/* CONTACT */}
      <section id="contact" className="py-28 px-12 bg-[#0d1322] text-center">
        <h3 className="text-4xl font-bold mb-6 text-white">Contact Us</h3>
        <p className="text-gray-300 mb-10">We’d love to help you grow your business.</p>

        <form className="max-w-3xl mx-auto space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full bg-white/5 border border-white/10 text-gray-200 px-4 py-3 rounded-lg focus:ring focus:ring-blue-600"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full bg-white/5 border border-white/10 text-gray-200 px-4 py-3 rounded-lg focus:ring focus:ring-blue-600"
          />

          <textarea
            placeholder="Message"
            rows="5"
            className="w-full bg-white/5 border border-white/10 text-gray-200 px-4 py-3 rounded-lg focus:ring focus:ring-blue-600"
          />

          <button className="w-full bg-blue-600 py-3 rounded-lg text-white hover:bg-blue-500 transition text-lg">
            Send Message
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-black text-center text-gray-500">
        © 2025 SmartShelfX — All Rights Reserved.
      </footer>

    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl shadow-lg hover:scale-[1.03] hover:bg-white/10 transition duration-300 cursor-pointer">
      <div className="mb-4">{icon}</div>
      <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}
