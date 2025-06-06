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
import HittingReport from "../components/HittingReport";
import PitchingReport from "../components/PitchingReport";
import StrengthReport from "../components/StrengthReport";
import SkillsReport from "../components/SkillsReport";

export default function reports() {
    const router = useRouter();
    const [reportVisible, setReportVisible] = useState(false);
    const [accInfo, setAccInfo] = useState(null);
    const [uid, setUid] = useState(null);
    const [recentReport, setRecentReport] = useState(null);
    const [allReports, setAllReports] = useState(null);

    const [athletes, setAthletes] = useState([]);
    const reportTypes = [
        {value: "pitching", label: "Pitching"},
        {value: "hitting", label: "Hitting"},
        {value: "strength", label: "Strength"},
        {value: "skills", label: "Skills"},
    ]

    const [athlete, setAthlete] = useState(null);
    const [reportType, setReportType] = useState([]);

    const [reportData, setReportData] = useState(null);

    const handleReportData = (data) => {
        setReportData(data);
        setReportData((prevData) => ({
            ...prevData,
            athleteUid: athlete.value,
            reportType: reportType.value,
        }));
    }

    useEffect(() => {
        if (typeof window != 'undefined') {
            const token = localStorage.getItem('jwt');
            const decodedToken = jwtDecode(token);
            setAccInfo(decodedToken.accType);
            setUid(decodedToken.uid);
        }
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
        const GetRecentReport = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/recentReport`, {
                    method: "GET",
                    headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"},
                });
                const status = await response.status;
                if(status === 401) {
                    router.push("/login");
                }
                const data = await response.json();
                setRecentReport(data.recentReport);
            } catch (error) {
                console.error(error);
            }
        }
        const GetAllReports = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/allReports`, {
                    method: "GET",
                    headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"},
                });
                const status = await response.status;
                if(status === 401) {
                    router.push("/login");
                }
                const data = await response.json();
                setAllReports(data);
            } catch (error) {
                console.error(error);
            }
        }
        if(accInfo === 'coach') {
            GetAthletes();
            GetRecentReport();
        }
        if(accInfo === 'athlete') {
            GetAllReports();
        }
    }, [accInfo]);

    const handleLogout = () => {
        if(typeof window != 'undefined') {
            localStorage.removeItem('jwt');
        }
        router.push("/login");
    }

    const handleCreateButton = () => {
        setReportVisible(true);
    }

    function SubmitButton() {
        if(athlete && reportType.value) {
            return <button onClick={handleSubmit} className="col-span-full mt-2 justify-self-center mb-2 bg-white border-[2px] border-gray-700 shadow-md p-1 text-gray-700 w-[150px]">Create Report</button>
        } else {
            return <button onClick={handleSubmit} disabled className="col-span-full mt-2 justify-self-center mb-2 bg-white border-[2px] border-gray-700 shadow-md p-1 text-gray-700 w-[150px]">Create Report</button>
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(reportData);
        try{
            const token = localStorage.getItem("jwt");
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/newReport`, {
                method: "POST",
                headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"},
                body: JSON.stringify(reportData)
            });
            const status = await response.status;
            router.reload("/reports");
        } catch (error) {
            console.error(error);
        }
    }

    function DisplayReports({allReports, accInfo}) {
        return (
            <>
                {allReports.map((report) => {
                    switch (report.report.reportType) {
                        case 'hitting': 
                            return (<div className="flex flex-col flex-1 md:ml-6 pl-2 pt-1 shadow-md bg-gray-100 mb-2"><HittingReport key={report.reportId} report={report} accType={accInfo} /></div>)
                        case 'pitching':
                            return (<div className="flex flex-col flex-1 md:ml-6 pl-2 pt-1 shadow-md bg-gray-100 mb-2"><PitchingReport key={report.reportId} report={report} accType={accInfo} /></div>)
                        case 'strength':
                            return (<div className="flex flex-col flex-1 md:ml-6 pl-2 pt-1 shadow-md bg-gray-100 mb-2"><StrengthReport key={report.reportId} report={report} accType={accInfo} /></div>)
                        case 'skills':
                            return (<div className="flex flex-col flex-1 md:ml-6 pl-2 pt-1 shadow-md bg-gray-100 mb-2"><SkillsReport key={report.reportId} report={report} accType={accInfo} /></div>)
                    }
                })}
            </>
        )
    }

    return (
        <div className="flex min-h-screen">
            <Navbar />
            <div className="flex flex-col pb-16 md:pb-0 flex-1 md:ml-64">
                <TopBar pageName={"Reports"} onLogout={handleLogout} />
                <div className="flex-1 p-4 bg-white">
                    {accInfo && accInfo === 'coach' && (
                        <>
                            <h2 className="text-gray-600 font-bebas-neue text-4xl underline md:px-6 md:pt-2 tracking-wider">Most Recent Report</h2>
                            <div className="flex flex-col flex-1 md:ml-6 pl-2 py-2 shadow-md bg-gray-100">
                                {recentReport === null && (<h2 className="text-gray-600 text-l pt-1 pb-2">No Reports Found</h2>)}
                                {recentReport && recentReport.report.reportType === 'hitting' && (<HittingReport report={recentReport} accType={accInfo} />)}
                                {recentReport && recentReport.report.reportType === 'pitching' && (<PitchingReport report={recentReport} accType={accInfo} />)}
                                {recentReport && recentReport.report.reportType === 'skills' && (<SkillsReport report={recentReport} accType={accInfo} />)}
                                {recentReport && recentReport.report.reportType === 'strength' && (<StrengthReport report={recentReport} accType={accInfo} />)}
                            </div>
                            {!reportVisible && (<button onClick={handleCreateButton} className="text-gray-500 pl-2 md:pl-8 pt-1 hover:underline">Create Report</button>)}
                            {reportVisible && (
                                <>
                                    <div className="flex flex-col flex-1 md:ml-6 pl-2 pt-2 pr-2 pb-2 shadow-md">
                                        <h2 className="text-gray-600 text-center underline text-xl font-bebas-neue pb-1">New Report</h2>
                                        <form className="w-full grid grid-cols-2 md:grid-cols-2 gap-1 md:p-1 sm:grid-cols-1">
                                            <label htmlFor="Athlete Name" className="text-black text-center">Athlete</label>
                                            <label htmlFor="Report Type" className="text-black text-center">Report Type</label>
                                            <Select options={athletes} value={athlete} onChange={setAthlete} placeholder="Report For: " className="mr-2" classNamePrefix="react-select" styles={{ control: (base) => ({ ...base, borderRadius: "0px" }), option: (base, { isSelected }) => ({ ...base, color: isSelected ? "#555" : "#000" }) }} />
                                            <Select options={reportTypes} value={reportType} onChange={setReportType} placeholder="Report Type: " isDisabled={!athlete} className="" classNamePrefix="react-select" styles={{ control: (base) => ({ ...base, borderRadius: "0px" }), option: (base, { isSelected }) => ({ ...base, color: isSelected ? "#555" : "#000" }) }} />
                                            <div className="col-span-2 grid grid-cols-1 md:grid-cols-2">
                                                {reportType.value === 'pitching' && (<PitchingAssesment ready={handleReportData} />)}
                                                {reportType.value === 'hitting' && (<HittingAssesment ready={handleReportData} />)}
                                                {reportType.value === 'strength' && (<StrengthAssesment ready={handleReportData} />)}
                                                {reportType.value === 'skills' && (<SkillsAssesment ready={handleReportData} />)}
                                            </div>
                                            <SubmitButton />
                                        </form>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                    {accInfo && (accInfo === 'athlete') && allReports && (
                        <>
                            <h2 className="text-gray-600 font-bebas-neue text-4xl underline md:px-6 md:pt-2 tracking-wider">All Reports</h2>
                            <DisplayReports allReports={allReports} accInfo={accInfo} />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}