import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import Select from "react-select";
import Goal from "../components/Goal";

export default function goals() {
    const router = useRouter();
    const [formVisible, setFormVisible] = useState(false);
    const [activeGoals, setActiveGoals] = useState(null);
    const [completedGoals, setCompletedGoals] = useState(null);

    const types = [
        {value: "Throwing", label: "Throwing"},
        {value: "Hitting", label: "Hitting"},
        {value: "Strength", label: "Strength"},
        {value: "Speed", label: "Speed"},
        {value: "Body", label: "Body"},
    ];

    const [goalType, setGoalType] = useState("");
    const [goalContent, setGoalContent] = useState("");
    const [target, setTarget] = useState("");

    useEffect(() => {
        const GetGoalsInfo = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await fetch("http://localhost:3001/api/goals", {
                    method: "GET",
                    headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"},
                });

                const data = await response.json();
                console.log(data);
                console.log(data.inactive.length);

                if(data.active.length > 0) {
                    setActiveGoals(data.active);
                }
                if(data.inactive.length > 0) {
                    setCompletedGoals(data.inactive);
                }
            } catch (error) {
                console.error(error);
            }
        }
        GetGoalsInfo();
    }, []);

    const handleAddButton = () => {
        setFormVisible(true);
    }
    
    const handleLogout = () => {
        if(typeof window != 'undefined') {
            localStorage.removeItem('jwt');
        }
        router.push("/login");
    }

    function SubmitButton() {
        if(goalType != "" && goalContent != "" && target) {
            return <button onClick={submit} className="justify-self-center mb-2 bg-white border-[2px] border-gray-700 shadow-md p-1 text-gray-700 w-[150px]">Add Goal</button>
        } else {
            return <button onClick={submit} disabled className="justify-self-center mb-2 bg-white border-[2px] border-gray-700 shadow-md p-1 text-gray-700 w-[150px]">Add Goal</button>
        }
    }

    const submit = async (e) => {
        e.preventDefault();
        console.log("submitted");

        const goal = {};
        goal.type = goalType;
        goal.content = goalContent;
        goal.targetCompletion = target;

        const now = new Date();
        const formattedDate = now.toISOString();

        goal.dateCreated = formattedDate;
        console.log(JSON.stringify(goal));

        try {
            const token = localStorage.getItem("jwt");
            const response = await fetch("http://localhost:3001/api/newGoal", {
                method: "POST",
                headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"},
                body: JSON.stringify(goal)
            });
            const status = await response.status;
            router.reload("/goals");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex min-h-screen">
            <Navbar />
            <div className="flex flex-col flex-1 md:ml-64">
                <TopBar pageName={"Goals"} onLogout={handleLogout} />
                <div className="flex-1 p-4 bg-white">
                    <h2 className="text-gray-600 font-bebas-neue text-4xl underline px-6 pt-2 tracking-wider">Active Goals</h2>
                    <div className="flex flex-col flex-1 ml-6 pt-1 xl:grid xl:grid-cols-3">
                        {activeGoals === null && (<h2 className="text-gray-600 text-l pt-1 pb-2">No active goals</h2>)}
                        {activeGoals && (
                            <>
                                <Goal goals={activeGoals}/>
                            </>
                        )}
                    </div>

                    {!formVisible && (<button onClick={handleAddButton} className="text-gray-500 pl-8 pt-1 hover:underline">Add a Goal</button>)}
                    {formVisible && (
                        <>
                            <div className="bg-white shadow-md mx-6 p-1 mt-6 mx-auto border">
                                <h3 className="text-lg font-semibold mb-4 text-center text-gray-700">New Goal</h3>
                                <form className="grid grid-cols-1">
                                    <div className="mb-1 mx-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">Type</label>
                                        <Select options={types} value={goalType} onChange={setGoalType} placeholder="Type of Goal" className="" classNamePrefix="react-select" styles={{ control: (base) => ({ ...base, borderRadius: "0px" }), option: (base, { isSelected }) => ({ ...base, color: isSelected ? "#555" : "#000" }) }}/>
                                        <div className="mb-2">
                                            <h3 className="text-md font-semibold my-1 text-center text-gray-700">Tips</h3>
                                            <ul className="text-gray-700 list-disc ml-4">
                                                <li>Make sure your goal is challenging but attainable</li>
                                                <li>Ask yourself where you want to be and how you can get there</li>
                                                <li>Your goal should be measureable</li>
                                                <li>A clear and specific focus is usually better</li>
                                            </ul>
                                        </div>
                                        <div className="border-t border-gray-700 pt-2">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="goalContent">Goal</label>
                                            <textarea id="goalContent" value={goalContent} onChange={(e) => setGoalContent(e.target.value)} placeholder="85mph fastball velo" className="w-full pl-1 py-1 text-black shadow-md"/>
                                        </div>
                                        <div>
                                            <label className="pr-2 text-gray-700 text-sm font-bold mb-2" htmlFor="targetCompletion">Target Completion Date</label>
                                            <input type="date" id="targetCompletion" value={target} onChange={(e) => setTarget(e.target.value)} className="text-black"/>
                                        </div>
                                    </div>
                                    <input type="hidden" id="creationDate" value=""/>
                                    <SubmitButton/>
                                </form>
                            </div>
                        </>
                    )}
                    <h2 className="text-gray-600 font-bebas-neue text-4xl underline px-6 pt-4 tracking-wider">Inactive Goals</h2>
                    <div className="flex flex-col flex-1 ml-6 pt-1">
                        {completedGoals === null && (<h2 className="text-gray-600 text-l pt-1 pb-2">No completed goals</h2>)}
                        {completedGoals && (
                            <>
                                <Goal goals={completedGoals}/>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
} 