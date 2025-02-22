"use client";
import React from "react";
import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Signup = () => {
  return (
    <div className="mt-20 flex min-h-screen items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-3xl px-5 py-6 w-full sm:w-[27rem]">
        <h1 className="text-2xl font-bold text-center mb-4">Let's connect!</h1>
        {/* onSubmit={(e) => handleSubmit(e)} */}
        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              //   onChange={(e) => handleChange(e)}
              placeholder="username"
              className="shadow-md rounded-md w-full  px-3 py-2 border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email id
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="email"
              //   onChange={(e) => handleChange(e)}
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
              //   onChange={(e) => handleChange(e)}
              className="shadow-md rounded-md w-full  px-3 py-2 border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="roles">Role:</label>
            <select
              name="roles"
              className="shadow-md rounded-md w-full  px-3 py-2 border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            >
              <option value="patient">patient</option>
              <option value="caretaker">caretaker</option>
              <option value="doctor">doctor</option>
            </select>
          </div>
          <div className="mb-4"></div>
          <div className="flex items-center justify-end mb-4">
            <Link href="/Login" className="text-xs text-black">
              Login with Account
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md shadow-md text-sm font-medium text-white bg-black"
          >
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
