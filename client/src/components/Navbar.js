import Link from "next/link"
import { jwtDecode } from "jwt-decode";
import { React, useEffect, useState } from "react";
import { HomeIcon, UserIcon, ChartBarSquareIcon, FolderIcon, CalendarDaysIcon, TrophyIcon, UserGroupIcon, DocumentTextIcon } from "@heroicons/react/24/solid"

export default function Navbar() {
    const [accType, setAccType] = useState("");

    useEffect(() => {
        if(typeof window === "undefined") return;

        const token = localStorage.getItem("jwt");
        if(!token) return;

        try {
            const decoded = jwtDecode(token);
            setAccType(decoded.accType || "");
        } catch(e) {
            console.error("Invalid token", e);
        }
    }, []);

    return (
        <>
            <aside className="fixed top-0 left-0 h-screen w-64 bg-[hsl(43.3,46,64)] text-white font-bebas-neue text-2xl p-4 hidden md:block">
                <div className="space-y-4">
                    <img src="/wordsLogo.png" alt="wordsLogo" className="mx-auto"/>
                    <Link href="/home" className="block hover:bg-gray-700 p-2 rounded">Home</Link>
                    <Link href="/profile" className="block hover:bg-gray-700 p-2 rounded">Profile</Link>

                    {accType === "athlete" && (
                        <Link className="block hover:bg-gray-700 p-2 rounded" href="/goals">Goals</Link>
                    )}

                    {accType === "coach" && (
                        <>
                            <Link href="/athletes" className="block hover:bg-gray-700 p-2 rounded">Athletes</Link>
                            <Link href="/programs" className="block hover:bg-gray-700 p-2 rounded">Programs</Link>
                        </>
                    )}

                    <Link href="/reports" className="block hover:bg-gray-700 p-2 rounded">Reports</Link>
                    <Link href="/calendar" className="block hover:bg-gray-700 p-2 rounded">Calendar</Link>
                </div>
            </aside>

            <nav className="fixed bottom-0 left-0 w-full bg-gray-700 p-4 z-50 flex justify-around md:hidden">
                <Link href="/home" className="block hover:bg-gray-700 p-2 rounded"><HomeIcon className="h-6 w-6" /></Link>
                <Link href="/profile" className="block hover:bg-gray-700 p-2 rounded"><UserIcon className="h-6 w-6" /></Link>

                {accType === "athlete" && (
                    <Link className="block hover:bg-gray-700 p-2 rounded" href="/goals"><TrophyIcon className="h-6 w-6"/></Link>
                )}

                {accType === "coach" && (
                    <>
                        <Link href="/athletes" className="block hover:bg-gray-700 p-2 rounded"><UserGroupIcon className="h-6 w-6"/></Link>
                        <Link href="/programs" className="block hover:bg-gray-700 p-2 rounded"><DocumentTextIcon className="h-6 w-6"/></Link>
                    </>
                )}

                <Link href="/reports" className="block hover:bg-gray-700 p-2 rounded"><FolderIcon className="h-6 w-6"/></Link>
                <Link href="/home" className="block hover:bg-gray-700 p-2 rounded"><ChartBarSquareIcon className="h-6 w-6" /></Link>
                <Link href="/calendar" className="block hover:bg-gray-700 p-2 rounded"><CalendarDaysIcon className="h-6 w-6"/></Link>
            </nav>
        </>
    );
}