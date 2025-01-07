"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const apiAddress = process.env.NEXT_PUBLIC_API_ADDRESS;

const LoginPage = () => {
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
      const response = await fetch(new URL("/api/auth/login", apiAddress).href, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { accessToken, refreshToken } = data
        localStorage.setItem("accessToken", accessToken); // Save token to localStorage
        localStorage.setItem("refreshToken", refreshToken); // Save token to localStorage
        router.push("/"); // Redirect to home page
      } else {
        setError(data.message || "Invalid login credentials.");
      }
    } catch (err) {
      console.log({ err })
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

return (
    <div className="flex justify-center items-center bg-gray-100" style={{ height: "88vh" }}>
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md w-96"
        >
            <h2 className="text-2xl font-semibold text-center mb-6">ورود</h2>
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
