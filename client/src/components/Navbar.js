import Link from "next/link"
import { jwtDecode } from "jwt-decode";
import { React, useEffect, useState } from "react";

const Navbar = () => {
    function Views() {
        const [accType, setAccType] = useState("");

        useEffect(() => {
            if(typeof window !== "undefined") {
                const token = localStorage.getItem("jwt");
                if(token) {
                    try {
                        const decodedToken = jwtDecode(token);
                        setAccType(decodedToken.accType);
                    } catch(error) {
                        console.error("Invalid token", error);
                    }
                }
            }
        }, []);

        if(!accType) return null;

        return (
            <>
                {accType === "athlete" && (
                    <Link className="block hover:bg-gray-700 p-2 rounded" href="/goals">Goals</Link>
                )}
                {accType === "coach" && (
                    <>
                        <Link href="/" className="block hover:bg-gray-700 p-2 rounded">Athletes</Link>
                        <Link href="/" className="block hover:bg-gray-700 p-2 rounded">Programs</Link>
                    </>
                )}
            </>
        );
    }

    return (
        <aside className="fixed top-0 left-0 h-screen w-64 bg-[hsl(43.3,46,64)] text-white font-bebas-neue text-2xl p-4 hidden md:block">
            <div className="space-y-4">
                <img src="/wordsLogo.png" alt="wordsLogo" className="mx-auto"></img>
                <Link href="/home" className="block hover:bg-gray-700 p-2 rounded">Home</Link>
                <Link href="/profile" className="block hover:bg-gray-700 p-2 rounded">Profile</Link>
                <Views/>
                <Link href="/reports" className="block hover:bg-gray-700 p-2 rounded">Reports</Link>
                <Link href="/" className="block hover:bg-gray-700 p-2 rounded">Data</Link>
                <Link href="/" className="block hover:bg-gray-700 p-2 rounded">Calendar</Link>
            </div>
        </aside>
    );
}

export default Navbar;