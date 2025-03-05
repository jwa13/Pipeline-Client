import Link from "next/link"
import { jwtDecode } from "jwt-decode";
import { React, useEffect, useState } from "react";
import { HomeIcon, UserIcon, ChartBarSquareIcon, FolderIcon, CalendarDaysIcon, TrophyIcon, UserGroupIcon, DocumentTextIcon } from "@heroicons/react/24/solid"

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

    function IconViews() {
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
                {accType === 'athlete' && (
                    <Link className="block hover:bg-gray-700 p-2 rounded" href="/goals"><TrophyIcon className="h-6 w-6"/></Link>
                )}
                {accType === 'coach' && (
                    <>
                        <Link href="/" className="block hover:bg-gray-700 p-2 rounded"><UserGroupIcon className="h-6 w-6"/></Link>
                        <Link href="/" className="block hover:bg-gray-700 p-2 rounded"><DocumentTextIcon className="h-6 w-6"/></Link>
                    </>
                )}
            </>
        )
    }

    return (
        <>
            <aside className="fixed top-0 left-0 h-screen w-64 bg-[hsl(43.3,46,64)] text-white font-bebas-neue text-2xl p-4 hidden md:block">
                <div className="space-y-4">
                    <img src="/wordsLogo.png" alt="wordsLogo" className="mx-auto"></img>
                    <Link href="/home" className="block hover:bg-gray-700 p-2 rounded">Home</Link>
                    <Link href="/profile" className="block hover:bg-gray-700 p-2 rounded">Profile</Link>
                    <Views />
                    <Link href="/reports" className="block hover:bg-gray-700 p-2 rounded">Reports</Link>
                    <Link href="/" className="block hover:bg-gray-700 p-2 rounded">Data</Link>
                    <Link href="/" className="block hover:bg-gray-700 p-2 rounded">Calendar</Link>
                </div>
            </aside>

            <nav className="fixed bottom-0 left-0 w-full bg-gray-700 p-4 flex justify-around md:hidden">
                <Link href="/home" className="block hover:bg-gray-700 p-2 rounded"><HomeIcon className="h-6 w-6" /></Link>
                <Link href="/profile" className="block hover:bg-gray-700 p-2 rounded"><UserIcon className="h-6 w-6" /></Link>
                <IconViews />
                <Link href="/reports" className="block hover:bg-gray-700 p-2 rounded"><FolderIcon className="h-6 w-6"/></Link>
                <Link href="/" className="block hover:bg-gray-700 p-2 rounded"><ChartBarSquareIcon className="h-6 w-6" /></Link>
                <Link href="/" className="block hover:bg-gray-700 p-2 rounded"><CalendarDaysIcon className="h-6 w-6"/></Link>
            </nav>
        </>
    );
}

export default Navbar;