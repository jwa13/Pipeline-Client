import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import signup from "./signup";

function index() {
  const router = useRouter();

  const login = (e) => {
    e.preventDefault();
    router.push("/login");
  }

  const signup = (e) => {
    e.preventDefault();
    router.push("/signup")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-[url('/astro-bg-2.png')] bg-repeat rounded-2xl border-[5px] border-solid border-gray-500 shadow-lg p-8 w-96 h-[500px] flex flex-col justify-center">
        <div className="mb-2 pt-10">
          <img src="/image.png" alt="Logo" className="mx-auto w-[140px] h-[140]"></img>
        </div>
        <div>
          <img src="/theVault.png" alt="Logo" className="mx-auto w-auto h-auto ml-1"></img>
        </div>
        <div className="space-y-4 py-10 flex flex-col items-center">
        <button onClick={login} className="w-3/4 px-6 py-4 bg-[hsl(43.3,46,64)] text-black font-bebas-neue text-2xl rounded-none font-bold text-white hover:bg-gray-400 transition border-[3px] border-solid border-white">
          Login
        </button>
        <button onClick={signup} className="w-3/4 px-6 py-4 bg-[hsl(43.3,46,64)] text-black font-bebas-neue text-2xl rounded-none font-bold text-white hover:bg-gray-400 transition border-[3px] border-solid border-white">
          Sign Up
        </button>
      </div>
      </div>
    </div>
  )
}

export default index;