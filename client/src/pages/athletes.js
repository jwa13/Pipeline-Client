import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Select from "react-select";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import ProfileView from "../components/ProfileView";

export default function athletes() {
    const router = useRouter();
    const [athletes, setAthletes] = useState([]);
    const [selectedAthlete, setSelectedAthlete] = useState(null);
    const [athleteInfo, setAthleteInfo] = useState(null);

    useEffect(() => {
        const GetAthletes = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/athletes`, {
                    method: "GET",
                    headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"},
                });
                const status = await response.status;
                if(status === 401) {
                    router.push("/login");
                }
                const data = await response.json();
                setAthletes(data.athletes);
            } catch (error) {
                console.error(error);
            }
        }
        GetAthletes();
    }, []);

    const handleLogout = () => {
        if(typeof window != 'undefined') {
            localStorage.removeItem('jwt');
        }
        router.push("/login");
    }

    const handleSelectedAthlete = async (athlete) => {
        setSelectedAthlete(athlete);
        console.log(athlete.value);
        // setLoading(true); - allows for the page to display a loading message
        // setAtheteInfo(null); - clears out previous athlete information if this is the n+1th selection
        try {
            const token = localStorage.getItem('jwt');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${athlete.value}`, {
                method: "GET",
                headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"},
            });
            const status = await response.status;
            if(status === 401) {
                router.push("/login");
            } else if(status === 500) {
                // Server error please refresh and try again message
            }
            const data = await response.json();
            setAthleteInfo(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex min-h-screen">
            <Navbar />
            <div className="flex flex-col flex-1 md:ml-64">
                <TopBar pageName={"Athletes"} onLogout={handleLogout} />
                <div className="flex-1 p-4 bg-white">
                    <h2 className="text-gray-600 font-bebas-neue text-4xl underline px-6 pt-2 tracking-wider">Select Athlete</h2>
                    {athletes && (<><Select options={athletes} value={selectedAthlete} onChange={handleSelectedAthlete} placeholder="View _____'s Profile: " className="mr-2 px-6 pt-1" classNamePrefix="react-select" styles={{ control: (base) => ({ ...base, borderRadius: "0px" }), option: (base, { isSelected }) => ({ ...base, color: isSelected ? "#555" : "#000" }) }} /></>)}
                    {athleteInfo && (
                        <><ProfileView profileData={athleteInfo}/></>
                    )}
                </div>
            </div>
        </div>
    )
} 