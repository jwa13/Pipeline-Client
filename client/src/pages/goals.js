import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";

export default function goals() {
    const router = useRouter();
    const [formVisible, setFormVisible] = useState(false);
    const [goalsData, setGoalsData] = useState(null);

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
                setGoalsData(data);
            } catch (error) {
                console.error(error);
            }
        }
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

    return (
        <div className="flex min-h-screen">
            <Navbar />
            <div className="flex flex-col flex-1 ml-64">
                <TopBar pageName={"Goals"} onLogout={handleLogout} />
                <div className="flex-1 p-4 bg-white">
                    <h2 className="text-gray-600 font-bebas-neue text-4xl underline px-6 pt-2 tracking-wider">Active Goals</h2>
                    <div className="flex flex-col flex-1 ml-6 pl-2 pt-1 shadow-md">
                        {goalsData === null && (<h2 className="text-gray-600 text-l pt-1 pb-2">No active goals</h2>)}
                    </div>

                    {!formVisible && (<button onClick={handleAddButton} className="text-gray-500 pl-8 pt-1 hover:underline">Add a Goal</button>)}
                    {formVisible && (
                        <>
                            <div className="bg-white shadow-md mx-6 p-1 mt-6 mx-auto border">
                                <h3 className="text-lg font-semibold mb-4 text-center">New Goal</h3>
                                <form>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">Type</label>
                                        <input className="shadow appearance-none border rounded w-full py2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="type" type="text" placeholder="Type of Goal"></input>
                                    </div>
                                    <button className="flex items-center justify-center" type="submit">Add Goal</button>
                                </form>
                            </div>
                        </>
                    )}
                    <h2 className="text-gray-600 font-bebas-neue text-4xl underline px-6 pt-4 tracking-wider">Completed Goals</h2>
                    <div className="flex flex-col flex-1 ml-6 pl-2 pt-1 shadow-md">
                        {goalsData === null && (<h2 className="text-gray-600 text-l pt-1 pb-2">No completed goals</h2>)}
                    </div>
                </div>
            </div>
        </div>
    )
} 