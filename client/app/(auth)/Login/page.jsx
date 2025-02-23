"use client";
import React from "react";
import Link from "next/link";
import useAuthStore from "@/store/useAuthStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Login = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [user, setUser] = useState({
    role: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { role, email, password } = user;
      console.log("role:", role);
      console.log("email:", email);
      const { data } = await axios.post(
        "http://localhost:5000/login",
        {
          role,
          email,
          password,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      login(email, role);
      console.log("data stored");
      if (role === "user") {
        router.push("/patient");
      } else if (role === "doctor") {
        router.push("/doctor");
      } else if (role === "guardian") {
        console.log("role :", role);
        router.push("/guardian");
      } else {
        router.push("/caretaker");
      }
      console.log("page change");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="mt-20 flex min-h-screen items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-3xl px-5 py-6 w-full sm:w-[27rem]">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => handleChange(e)}
              placeholder="email"
              className="shadow-md rounded-md w-full  px-3 py-2 border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              onChange={(e) => handleChange(e)}
              className="shadow-md rounded-md w-full  px-3 py-2 border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role">Role:</label>
            <select
              name="role"
              onChange={(e) => handleChange(e)}
              className="shadow-md rounded-md w-full  px-3 py-2 border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            >
              <option value="">Select account type</option>
              <option value="user">user</option>
              <option value="caretaker">caretaker</option>
              <option value="doctor">doctor</option>
              <option value="guardian">guardian</option>
            </select>
          </div>
          <div className="flex items-center justify-end mb-4">
            <Link href="/Signup" className="text-xs text-black">
              Create a new account
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md shadow-md text-sm font-medium text-white bg-black"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
