import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import Select from "react-select";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";

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

    const [movementScreenChecked, setMovementScreenChecked] = useState(false);
    const [mechEvalChecked, setMechEvalChecked] = useState(false);
    const [pitchMetricsChecked, setPitchMetricsChecked] = useState(false);

    const [ratings, setRatings] = useState({
        Ankle: '',
        Hip: '',
        'Hip Rotation': '',
        'Cossack Lunge': '',
        Stability: '',
        Squat: '',
        'T-Spine': '',
        'Internal Shoulder': '',
        'External Shoulder': '',
        'Shoulder Arc': '',
        'Field Goal': '',
        Wrist: '',
        'Forearm Supination': '',
        'Forearm Pronation': '',
        Elbow: '',
        'Posterior Cuff': '',
        Pec: '',
        Lat: '',
        Trap: '',
    })


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

    const handleRatingChange = (id, value) => {
        setRatings((prevRatings) =>({
            ...prevRatings,
            [id]: value,
        }));
    }

    function AssesmentRating({label, id, rating, onRatingChange}) {
        const handleRadioChange = (e) => {
            onRatingChange(id, e.target.value)
        }
        return (
            <div className="pl-2 shadow-md">
                <label htmlFor={id} className="text-black">{label}</label>
                <div className="flex space-x-4">
                    <label className="text-green-500"><input type="radio" className="mr-1" name={id} value="good" checked={rating === 'good'} onChange={handleRadioChange}/>Good</label>
                    <label className="text-yellow-500"><input type="radio" className="mr-1" name={id} value="average" checked={rating === 'average'} onChange={handleRadioChange}/>Average</label>
                    <label className="text-red-500"><input type="radio" className="mr-1" name={id} value="needs improvement" checked={rating === 'needs improvement'} onChange={handleRadioChange}/>Needs Improvement</label>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen">
            <Navbar />
            <div className="flex flex-col flex-1 ml-64">
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
                                            {reportType.value === 'pitching' && (
                                                <>
                                                    <div className="col-span-full">
                                                        <label htmlFor="movementScreenCheckbox" className="text-black text-center pr-1 text-lg font-semibold underline">Movement Screen</label>
                                                        <input type="checkbox" id="movementScreenCheckbox" checked={movementScreenChecked} onChange={(e) => setMovementScreenChecked(e.target.checked)}></input>
                                                    </div>
                                                    {movementScreenChecked && (
                                                        <>
                                                            <AssesmentRating label="Ankle Inversion/Eversion" id="Ankle" rating={ratings.Ankle} onRatingChange={handleRatingChange}/>
                                                            <AssesmentRating label="Hip 90/90" id="Hip" rating={ratings.Hip} onRatingChange={handleRatingChange}/>
                                                            <AssesmentRating label="Prone Hip Rotation" id="Hip Rotation" rating={ratings["Hip Rotation"]} onRatingChange={handleRatingChange}/>
                                                            <AssesmentRating label="Cossack Lunge" id="Cossack Lunge" rating={ratings["Cossack Lunge"]} onRatingChange={handleRatingChange}/>
                                                            <AssesmentRating label="Single Leg Stability" id="Stability" rating={ratings.Stability} onRatingChange={handleRatingChange}/>
                                                            <AssesmentRating label="Overhead Squat" id="Squat" rating={ratings.Squat} onRatingChange={handleRatingChange}/>
                                                            <AssesmentRating label="T-Spine Rotation" id="T-Spine" rating={ratings["T-Spine"]} onRatingChange={handleRatingChange}/>
                                                            <AssesmentRating label="Internal Shoulder Rotation" id="Internal Shoulder" rating={ratings["Internal Shoulder"]} onRatingChange={handleRatingChange}/>
                                                            <AssesmentRating label="External Shoulder Rotation" id="External Shoulder" rating={ratings["External Shoulder"]} onRatingChange={handleRatingChange}/>
                                                            <AssesmentRating label="Shoulder Total Arc of Motion" id="Shoulder Arc" rating={ratings["Shoulder Arc"]} onRatingChange={handleRatingChange}/>
                                                            <AssesmentRating label="Field Goal" id="Field Goal" rating={ratings["Field Goal"]} onRatingChange={handleRatingChange}/>
                                                            <AssesmentRating label="Wrist Flexion/Extension" id="Wrist" rating={ratings.Wrist} onRatingChange={handleRatingChange}/>
                                                            <AssesmentRating label="Forearm Supination" id="Forearm Supination" rating={ratings["Forearm Supination"]} onRatingChange={handleRatingChange}/>
                                                            <AssesmentRating label="Forearm Pronation" id="Forearm Pronation" rating={ratings["Forearm Pronation"]} onRatingChange={handleRatingChange}/>
                                                            <AssesmentRating label="Elbow Flexion/Extension" id="Elbow" rating={ratings.Elbow} onRatingChange={handleRatingChange}/>
                                                            <AssesmentRating label="Posterior Cuff" id="Posterior Cuff" rating={ratings["Posterior Cuff"]} onRatingChange={handleRatingChange}/>
                                                            <AssesmentRating label="Pec major/minor" id="Pec" rating={ratings.Pec} onRatingChange={handleRatingChange}/>
                                                            <AssesmentRating label="Latissimus Dorsi/Subscapularis" id="Lat" rating={ratings.Lat} onRatingChange={handleRatingChange}/>
                                                            <AssesmentRating label="Upper Trapezius" id="Trap" rating={ratings.Trap} onRatingChange={handleRatingChange}/>
                                                        </>
                                                    )}

                                                    <div className="col-span-full">
                                                        <label htmlFor="mechanicalEvaluationCheckbox" className="text-black text-center pr-1 text-lg font-semibold underline">Mechanical Evaluation</label>
                                                        <input type="checkbox" id="mechanicalEvaluationCheckbox" checked={mechEvalChecked} onChange={(e) => setMechEvalChecked(e.target.checked)}></input>
                                                    </div>
                                                    {mechEvalChecked && (
                                                        <>
                                                            <label htmlFor="Hip Hinge" className="text-black">Hip Hinge</label>
                                                            <label htmlFor="Direction" className="text-black">Proper Direction</label>
                                                            <label htmlFor="Lead Leg" className="text-black">Lead Leg Block</label>
                                                            <label htmlFor="Seperation" className="text-black">Hip/Shoulder Seperation</label>
                                                            <label htmlFor="Gloveside" className="text-black">Gloveside Control</label>
                                                            <label htmlFor="Arm Path" className="text-black">Proper Arm Path</label>
                                                            <label htmlFor="Rotation" className="text-black">ER Rotation</label>
                                                            <label htmlFor="Notes" className="text-black">Addtional Notes</label>
                                                        </>
                                                    )}

                                                    <div className="col-span-full">
                                                        <label htmlFor="pitchMetricsCheckbox" className="text-black text-center pr-1 text-lg font-semibold underline">Pitch Metrics</label>
                                                        <input type="checkbox" id="pitchMetricsCheckbox" checked={pitchMetricsChecked} onChange={(e) => setPitchMetricsChecked(e.target.checked)}></input>
                                                    </div>
                                                    {pitchMetricsChecked && (
                                                        <>
                                                            <label htmlFor="FB" className="text-black">FB</label>
                                                            <label htmlFor="FB Average Velo" className="text-black">FB Average Velo</label>
                                                            <label htmlFor="FB Max Velo" className="text-black">FB Max Velo</label>
                                                            <label htmlFor="FB Max RPM" className="text-black">FB Max RPM</label>
                                                            <label htmlFor="FB Average RPM" className="text-black">FB Average RPM</label>
                                                            <label htmlFor="FB Spin Efficency" className="text-black">FB Spin Efficency Average</label>
                                                            <label htmlFor="FB Spin Axis" className="text-black">FB Spin Axis</label>
                                                            <label htmlFor="FB Average Release Height" className="text-black">FB Average Release Height</label>
                                                            <label htmlFor="FB Average Release Side" className="text-black">FB Average Release Side</label>
                                                        </>
                                                    )}
                                                </>
                                            )}
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