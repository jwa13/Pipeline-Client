import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import Select from "react-select";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import HittingAssesment from "../components/HittingAssesment";
import PitchingAssesment from "../components/PitchingAssesment";
import SkillsAssesment from "../components/SkillsAssesment";
import StrengthAssesment from "../components/StrengthAssesment";

export default function reports() {
    const router = useRouter();
    const [reportVisible, setReportVisible] = useState(false);
    const [accInfo, setAccInfo] = useState(null);
    const [recentReport, setRecentReport] = useState(null);

    const [athletes, setAthletes] = useState([]);
    const reportTypes = [
        {value: "pitching", label: "Pitching"},
        {value: "hitting", label: "Hitting"},
        {value: "strength", label: "Strength"},
        {value: "skills", label: "Skills"},
    ]

    const [athlete, setAthlete] = useState('');
    const [reportType, setReportType] = useState([]);

    useEffect(() => {
        if (typeof window != 'undefined') {
            const token = localStorage.getItem('jwt');
            const decodedToken = jwtDecode(token);
            setAccInfo(decodedToken.accType);
        }
        const GetAthletes = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await fetch("http://localhost:3001/api/athletes", {
                    method: "GET",
                    headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"},
                });
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

    const handleCreateButton = () => {
        setReportVisible(true);
    }

    return (
        <div className="flex min-h-screen">
            <Navbar />
            <div className="flex flex-col flex-1 md:ml-64">
                <TopBar pageName={"Reports"} onLogout={handleLogout} />
                <div className="flex-1 p-4 bg-white">
                    {accInfo && accInfo === 'coach' && (
                        <>
                            <h2 className="text-gray-600 font-bebas-neue text-4xl underline px-6 pt-2 tracking-wider">Most Recent Report</h2>
                            <div className="flex flex-col flex-1 ml-6 pl-2 pt-1 shadow-md">
                                {recentReport === null && (<h2 className="text-gray-600 text-l pt-1 pb-2">No Reports Found</h2>)}
                            </div>
                            {!reportVisible && (<button onClick={handleCreateButton} className="text-gray-500 pl-8 pt-1 hover:underline">Create Report</button>)}
                            {reportVisible && (
                                <>
                                    <div className="flex flex-col flex-1 ml-6 pl-2 pt-2 pr-2 pb-2 shadow-md">
                                        <h2 className="text-gray-600 text-center underline text-xl font-bebas-neue pb-1">New Report</h2>
                                        <form className="w-full grid grid-cols-2 md:grid-cols-2 gap-1 md:p-1 sm:grid-cols-1">
                                            <label htmlFor="Athlete Name" className="text-black text-center">Athlete</label>
                                            <label htmlFor="Report Type" className="text-black text-center">Report Type</label>
                                            <Select options={athletes} value={athlete} onChange={setAthlete} placeholder="Report For: " className="mr-2" classNamePrefix="react-select" styles={{ control: (base) => ({ ...base, borderRadius: "0px" }), option: (base, { isSelected }) => ({ ...base, color: isSelected ? "#555" : "#000" }) }} />
                                            <Select options={reportTypes} value={reportType} onChange={setReportType} placeholder="Report Type: " className="" classNamePrefix="react-select" styles={{ control: (base) => ({ ...base, borderRadius: "0px" }), option: (base, { isSelected }) => ({ ...base, color: isSelected ? "#555" : "#000" }) }} />
                                            {reportType.value === 'pitching' && ( <PitchingAssesment /> )}
                                            {reportType.value === 'hitting' && ( <HittingAssesment /> )}
                                            {reportType.value === 'strength' && ( <StrengthAssesment /> )}
                                            {reportType.value === 'skills' && ( <SkillsAssesment /> )}
                                        </form>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}