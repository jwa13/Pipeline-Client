import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";


export default function home() {
    const router = useRouter();

    const handleLogout = () => {
        if(typeof window != 'undefined') {
            localStorage.removeItem('jwt');
        }
        router.push("/login");
    }

    return (
        <div className="flex min-h-screen">
            <Navbar />
            <div className="flex flex-col flex-1 md:ml-64">
                <TopBar pageName={"Home"} onLogout={handleLogout}/>
                <div className="flex-1 p-4 bg-white">

                </div>
            </div>
        </div>
    )
}