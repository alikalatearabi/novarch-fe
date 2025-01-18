/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import TextField from "@/components/ui/TextField";
import { Button } from "@/components/ui/button";

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
            className="w-45 rounded-lg"
            style={{borderRadius: '20px'}}
          />
        </div>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2 mr-1">
            ایمیل
          </label>
          <TextField
            type="email"
            id="email"
            value={email}
            size="3"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2 mr-1">
            رمز عبور
          </label>
          <TextField type="password" value={password} onChange={(e) => setPassword(e.target.value)} size="3" />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600"
          loading={loading}
        >
          {loading ? "در حال ورود" : "ورود"}
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
