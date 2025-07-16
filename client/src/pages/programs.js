import React from "react";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function programs() {
    const router = useRouter();

    const handleLogout = () => {
        if(typeof window != 'undefined') {
            localStorage.removeItem('jwt');
        }
        router.push("/login")
    }

    return (
        <div className="flex min-h-screen">
            <Navbar />
            <div className="flex flex-col pb-16 md:pb-0 flex-1 md:ml-64">
                <TopBar pageName={"Programs"} onLogout={handleLogout} />
                <div className="flex-1 p-4 bg-white">
                    
                </div>
            </div>
        </div>
    )
}