"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Both fields are required.");
      setLoading(false);
      return;
    }
    try {
      const authRes = await auth.signin(email, password);
      if (authRes.status) {
        router.push("/");
      } else {
        setError(authRes.message || "Invalid login credentials.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated()) {
      router.replace("/");
    }
  }, []);

  return (
    <div
      className="flex justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/login_back.jpg')",
        height: "100vh",
        width: "100vw",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg w-96"
        style={{borderRadius: '20px'}}
      >
        <div className="flex justify-center mb-6">
          <img
            src="/images/logo.jpg"
            alt="Logo"
            className="w-45 h-32 rounded-lg"
            style={{borderRadius: '20px'}}
          />
        </div>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2 mr-1">
            ایمیل
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2 mr-1">
            رمز عبور
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 text-white rounded-lg ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "در حال ورود" : "ورود"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
