import React from "react";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Select from "react-select";

export default function programs() {
    const router = useRouter();
    const [createVisible, setCreateVisible] = useState(true);
    const [templateName, setTemplateName] = useState("");
    const [numberOfWeeks, setNumberOfWeeks] = useState(null);
    const [templateType, setTemplateType] = useState(null);
    const [weeks, setWeeks] = useState([]);
    const [modalWeek, setModalWeek] = useState(null);
    const [modalDay, setModalDay] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalExIdx, setModalExIdx] = useState(null);

    const options = [
        {value: "throwing", label: "Throwing"},
        {value: "hitting", label: "Hitting"},
        {value: "strength", label: "Strength"}
    ];
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    useEffect(() => {
        const n = parseInt(numberOfWeeks) || 0;
        setWeeks(prev => {
            const newWeeks = prev.slice(0, n);
            while(newWeeks.length < n) {
                newWeeks.push(
                    daysOfWeek.reduce((acc, day) => {
                        acc[day] = [];
                        return acc;
                    }, {})
                );
            }
            return newWeeks;
        });
    }, [numberOfWeeks]);

    const addExercise = (weekIdx, day) => {
        setWeeks(ws => {
            const copy = [...ws];
            copy[weekIdx][day] = [
                ...copy[weekIdx][day],
                { name: '', reps: '' }
            ];
            return copy;
        });
    }

    const updateExercise = (weekIdx, day, exIdx, field, value) => {
        setWeeks(ws => {
            const copy = [...ws];
            copy[weekIdx][day] = copy[weekIdx][day].map((ex, i) => 
            i === exIdx
                ? {...ex, [field]: value}
                : ex
            );
            return copy;
        });
    }

    const handleLogout = () => {
        if(typeof window != 'undefined') {
            localStorage.removeItem('jwt');
        }
        router.push("/login")
    }

    const handleCreateTemplate = () => {
        setCreateVisible(true);
    }

    function OpenModal(weekIdx, day) {
        setWeeks(ws => {
            const copy = [...ws];
            const idx = copy[weekIdx][day].length;
            copy[weekIdx][day].push({type: '', name: '', reps: '', distance: ''});
            setModalWeek(weekIdx);
            setModalDay(day);
            setModalExIdx(idx);
            setModalOpen(true);
            return copy;
        });
    }

    function RemoveExercise(weekIdx, day, exIdx) {
        setWeeks(ws => {
            const copy = [...ws];
            copy[weekIdx][day] = copy[weekIdx][day].filter((_, i) => i !== exIdx);
            return copy;
        });
    }

    return (
        <div className="flex min-h-screen">
            <Navbar />
            <div className="flex flex-col pb-16 md:pb-0 flex-1 md:ml-64">
                <TopBar pageName={"Programs"} onLogout={handleLogout} />
                <div className="flex-1 p-4 bg-white">
                    <h2 className="text-gray-600 font-bebas-neue text-4xl underline md:px-6 md:pt-2 tracking-wider">Program Templates</h2>
                    {!createVisible && (
                        <button onClick={handleCreateTemplate} className="my-2 md:mx-6 bg-white border-[2px] border-gray-700 shadow-md p-1 text-gray-700 w-[150px]">Create Template</button>
                    )}
                    {createVisible && (
                        <>
                            <div className="grid grid-cols-2 md:mx-6 pt-1 gap-2">
                                <input type="text" id="templateName" placeholder="Name of Program" autoComplete="off" value={templateName} onChange={(e) => setTemplateName(e.target.value)} className="pl-2 border-[1.2px] border-zinc-300 rounded"></input>
                                <Select options={options} value={templateType} onChange={setTemplateType} placeholder="Type of Program" />
                                <div className="col-span-full flex justify-center">
                                    <input type="text" id="numberOfWeeks" placeholder="# of Weeks" autoComplete="off" value={numberOfWeeks} onChange={(e) => setNumberOfWeeks(e.target.value)} className="pl-2 border-[1.2px] border-zinc-300 rounded h-[35px]"></input>
                                </div>
                            </div>
                            {weeks.map((week, wi) => (
                                <div key={wi} className="border rounded p-4 my-2">
                                    <h3>Week {wi + 1}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                                        {daysOfWeek.map(day => (
                                            <div key={day} className="border rounded p-2">
                                                <h4>{day}</h4>
                                                <button onClick={() => OpenModal(wi, day)}>Add Exercise</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3">
                                <h2 className="text-xl font-semibold mb-4">
                                    Add Exercise — Week {modalWeek + 1}, {modalDay}
                                </h2>

                                {/* 1) Pick a type to drive which fields appear */}
                                <div className="mb-4">
                                    <label className="block text-sm">Exercise Type</label>
                                    <select
                                        value={weeks[modalWeek][modalDay][modalExIdx].type}
                                        onChange={e =>
                                            updateExercise(modalWeek, modalDay, modalExIdx, 'type', e.target.value)
                                        }
                                        className="w-full border rounded p-2"
                                    >
                                        <option value="">— Select —</option>
                                        <option value="strength">Strength</option>
                                        <option value="throwing">Throwing</option>
                                        {/* add more types as needed */}
                                    </select>
                                </div>

                                {/* 2) Common name field */}
                                <div className="mb-4">
                                    <label className="block text-sm">Name</label>
                                    <input
                                        type="text"
                                        value={weeks[modalWeek][modalDay][modalExIdx].name}
                                        onChange={e =>
                                            updateExercise(modalWeek, modalDay, modalExIdx, 'name', e.target.value)
                                        }
                                        className="w-full border rounded p-2"
                                    />
                                </div>

                                {/* 3) Conditionally render based on type */}
                                {weeks[modalWeek][modalDay][modalExIdx].type === 'strength' && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm">Reps / Sets</label>
                                            <input
                                                type="text"
                                                value={weeks[modalWeek][modalDay][modalExIdx].reps}
                                                onChange={e =>
                                                    updateExercise(modalWeek, modalDay, modalExIdx, 'reps', e.target.value)
                                                }
                                                className="w-full border rounded p-2"
                                            />
                                        </div>
                                    </div>
                                )}

                                {weeks[modalWeek][modalDay][modalExIdx].type === 'throwing' && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm">Distance (yards)</label>
                                            <input
                                                type="text"
                                                value={weeks[modalWeek][modalDay][modalExIdx].distance}
                                                onChange={e =>
                                                    updateExercise(modalWeek, modalDay, modalExIdx, 'distance', e.target.value)
                                                }
                                                className="w-full border rounded p-2"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* 4) Cancel vs Save */}
                                <div className="mt-6 flex justify-end space-x-3">
                                    <button onClick={() => { RemoveExercise(modalWeek, modalDay, modalExIdx); setModalOpen(false);}} className="px-4 py-2 border rounded">
                                        Cancel
                                    </button>
                                    <button onClick={() => setModalOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}