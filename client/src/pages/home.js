import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import { jwtDecode } from "jwt-decode";
import HealthAlert from "../components/HealthAlert";
import Goal from "../components/Goal";
import HittingReport from "../components/HittingReport";
import PitchingReport from "../components/PitchingReport";
import StrengthReport from "../components/StrengthReport";
import SkillsReport from "../components/SkillsReport";

export default function home() {
    const router = useRouter();

    const [profileData, setProfileData] = useState(null);
    const [accType, setAccType] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleLogout = () => {
        if(typeof window != 'undefined') {
            localStorage.removeItem('jwt');
        }
        router.push("/login");
    }

    useEffect(() => {
        if (typeof window != 'undefined') {
            const token = localStorage.getItem('jwt');
            const decodedToken = jwtDecode(token);
            setAccType(decodedToken.accType);
        }
        const getHomePageInfo = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/home`, {
                    method: "GET",
                    headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"},
                });
                const status = await response.status;
                if(status === 401) {
                    router.push("/login");
                    return;
                } else if(status === 303) {
                    router.push("/newUserForm");
                    return;
                } else if (status === 200) {
                    const data = await response.json();
                    // console.log(data);
                    setProfileData(data);
                    setLoading(false);
                }    
            } catch (error) {
                console.error(error);
            }
        }
        getHomePageInfo();
    }, []);

    return (
        <div className="flex min-h-screen">
            <Navbar />
            <div className="flex flex-col pb-16 md:pb-0 flex-1 md:ml-64">
                <TopBar pageName={"Home"} onLogout={handleLogout} />
                <div className="flex-1 p-4 bg-white">
                    {accType && accType === 'athlete' && (
                        <>
                            <h2 className="text-gray-600 font-bebas-neue text-4xl underline md:px-6 md:pt-2 tracking-wider">Active Goals</h2>
                            {loading ? (
                                <div className="md:ml-6 pt-1">
                                    <p className="text-gray-500">Loading goals...</p>
                                </div>
                            ) : (
                                <div className="flex flex-col flex-1 md:ml-6 pt-1 xl:grid xl:grid-cols-3">
                                    {profileData?.data?.goals?.[0] ? (
                                        <Goal goals={profileData.data.goals} />
                                    ) : (
                                        <p className="text-black">You have no active goals right now, to set a new goal navigate to the goals page or click <a href="/goals" className="underline">here</a></p>
                                    )}
                                </div>
                            )}
                            <h2 className="text-gray-600 font-bebas-neue text-4xl underline md:px-6 md:pt-2 tracking-wider">Most Recent Report</h2>
                            {loading ? (
                                <div className="md:ml-6 md:pl-2 pt-1">
                                    <p className="text-gray-500">Loading report...</p>
                                </div>
                            ) : (
                                <>
                                    {profileData?.data?.recentReport ? (
                                        <div className="flex flex-col flex-1 md:ml-6 md:pl-2 pt-1 shadow-md">
                                            {profileData.data.recentReport.report.reportType === 'hitting' && (
                                                <HittingReport report={profileData.data.recentReport} accType={accType} />
                                            )}
                                            {profileData.data.recentReport.report.reportType === 'pitching' && (
                                                <PitchingReport report={profileData.data.recentReport} accType={accType} />
                                            )}
                                            {profileData.data.recentReport.report.reportType === 'strength' && (
                                                <StrengthReport report={profileData.data.recentReport} accType={accType} />
                                            )}
                                            {profileData.data.recentReport.report.reportType === 'skills' && (
                                                <SkillsReport report={profileData.data.recentReport} accType={accType} />
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-black">No reports available, schedule an evaluation!</p>
                                    )}
                                </>
                            )}
                            {/* {profileData && (console.log(profileData.data.recentReport))} */}
                            {profileData && !profileData.data.health && (<HealthAlert />)}
                        </>
                    )}
                    {accType === 'coach' && (
                        <>
                            <h2 className="text-gray-600 font-bebas-neue text-4xl underline md:px-6 md:pt-2 tracking-wider">Most Recent Report</h2>
                            {loading ? (
                                <div className="md:ml-6 md:pl-2 pt-1">
                                    <p className="text-gray-500">Loading report...</p>
                                </div>
                            ) : (
                                <>
                                    {profileData?.responseData?.recentReport ? (
                                        <div className="flex flex-col flex-1 md:ml-6 md:pl-2 pt-1 shadow-md">
                                            {profileData.responseData.recentReport.report.reportType === 'hitting' && (
                                                <HittingReport report={profileData.responseData.recentReport} accType={accType} />
                                            )}
                                            {profileData.responseData.recentReport.report.reportType === 'pitching' && (
                                                <PitchingReport report={profileData.responseData.recentReport} accType={accType} />
                                            )}
                                            {profileData.responseData.recentReport.report.reportType === 'strength' && (
                                                <StrengthReport report={profileData.responseData.recentReport} accType={accType} />
                                            )}
                                            {profileData.responseData.recentReport.report.reportType === 'skills' && (
                                                <SkillsReport report={profileData.responseData.recentReport} accType={accType} />
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-black">You haven't created any reports yet. When you fill out a player report it will appear here.</p>
                                    )}
                                </>
                            )}
                            <h3 className="text-gray-600 text-2xl md:px-6 pt-2">Current Number of Athletes: {loading ? (<>Loading athlete count...</>) : (<>{profileData.responseData.numberOfAthletes}</>)}</h3>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}