import React from "react";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Select from "react-select";

export default function programs() {
    const router = useRouter();

    const [templateName, setTemplateName] = useState("");
    const [numberOfWeeks, setNumberOfWeeks] = useState(null);
    const [templateType, setTemplateType] = useState(null);
    const [weeks, setWeeks] = useState([]);

    const [modalWeek, setModalWeek] = useState(null);
    const [modalDay, setModalDay] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalExIdx, setModalExIdx] = useState(null);

    const [exerciseType, setExerciseType] = useState("");
    const [exerciseName, setExerciseName] = useState("");
    const [videoLink, setVideoLink] = useState("");
    const [exerciseDesc, setExerciseDesc] = useState("");

    const [selectedType, setSelectedType] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoadingExercises, setIsLoadingExercises] = useState(false);
    const [filteredExercises, setFilteredExercises] = useState("");
    const [selectedExercise, setSelectedExercise] = useState("");

    const options = [
        {value: "throwing", label: "Throwing"},
        {value: "hitting", label: "Hitting"},
        {value: "strength", label: "Strength"},
        {value: "warmup", label: "Warm-Up"},
        {value: "drill", label: "Drill"}
    ];
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    useEffect(() => {
        const n = parseInt(numberOfWeeks, 10) || 0;
        setWeeks((prev) => {
            const next = prev.slice(0,n);
            while(next.length < n) {
                next.push(
                    daysOfWeek.reduce((acc, day) => {
                        acc[day] = [];
                        return acc;
                    }, {})
                );
            }
            return next;
        });
    }, [numberOfWeeks]);

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

    const clearExerciseForm = () => {
        setExerciseType(null);
        setExerciseName("");
        setExerciseDesc("");
        setVideoLink("");
    }

    const handleCreateTemplate = () => {
        setCreateVisible(true);
        setHideExercise(true);
        setHideTemplate(true);
    }

    const handleCreateExercise = () => {
        setNewExercise(true);
        setHideTemplate(true);
        setHideTemplate(true);
    }

    const handleCancelExercise = () => {
        setExerciseType("");
        setExerciseName("");
        setExerciseDesc("");
        setVideoLink("");
        setNewExercise(false);
        setHideExercise(false);
        setHideTemplate(false);
    }

    const handleSaveExercise = async (e) => {
        e.preventDefault();

        const exercise = {};
        exercise.type = exerciseType.value;
        exercise.name = exerciseName;
        exercise.desc = exerciseDesc;
        exercise.video = videoLink;

        try {
            const token = localStorage.getItem("jwt");
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/newExercise`, {
                method: "POST",
                headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"},
                body: JSON.stringify(exercise)
            });
            const status = await response.status;
            if(status === 200) {
                clearExerciseForm();
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleGetExercises = async (opt) => {
        setSelectedType(opt);
        try {
            const token = localStorage.getItem("jwt");
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/exercise/${opt.value}`, {
                method: "GET",
                headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"}
            });
            const status = await response.status;
            if(status === 401) {
                router.push("/login");
            } else if(status === 500) {
                // Server error please refresh and try again message
            }
            const data = await response.json();
            console.log(data);
            setFilteredExercises(data);
        } catch(error) {
            console.error(error);
        }
    }

    const openTemplateDayModal = (weekIdx, day) => {
        setWeeks((ws) => {
            const copy = [...ws];
            const idx = copy[weekIdx][day].length;

            copy[weekIdx][day].push({
                type: "",
                name: "",
                sets: "",
                reps: "",
                distance: "",
            });

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
                <div className="flex-1 p-4 bg-white p-4 min-h-0">
                    <div className="flex flex-col lg:flex-row gap-4 h-full min-h-0">
                        <section className="w-full lg:w-1/2 bg-stone-100 border border-zinc-200 rounded-xl shadow-sm flex flex-col min-h-0">
                            <div className="p-4 border-b border-zinc-200">
                                <h2 className="text-gray-700 font-bebas-neue text-3xl tracking-wider">
                                    Template Creation
                                </h2>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                <div className="grid grid-cols-2 gap-2">
                                    <input type="text" id="templateName" placeholder="Name of Program" autoComplete="off" value={templateName} onChange={(e) => setTemplateName(e.target.value)} className="pl-2 border-[1.2px] border-zinc-300 rounded h-[38px]"/>
                                    <Select options={options} value={templateType} onChange={setTemplateType} placeholder="Type of Program" />

                                    <div className="col-span-full flex justify-center">
                                        <input type="text" id="numberOfWeeks" placeholder="# of Weeks" autoComplete="off" value={numberOfWeeks} onChange={(e) => setNumberOfWeeks(e.target.value)} className="pl-2 border-[1.2px] border-zinc-300 rounded h-[38px] w-full"/>
                                    </div>
                                </div>

                                {weeks.length === 0 ? (
                                    <div className="text-sm text-gray-500">
                                        Enter a number of weeks to start building the template.
                                    </div>
                                ) : (
                                    weeks.map((week, wi) => (
                                        <div key={wi} className="border rounded-lg p-4 bg-white">
                                            <h3 className="font-semibold text-gray-700 mb-3">
                                                Week {wi + 1}
                                            </h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                                                {daysOfWeek.map((day) => (
                                                    <div key={day} className="border rounded-lg p-3 bg-stone-100">
                                                        <div className="flex items-center justify-between">
                                                            <h4 className="text-gray-700 font-medium">
                                                                {day}
                                                            </h4>

                                                            <button onClick={() => openTemplateDayModal(wi, day)} className="text-sm px-2 py-1 border rounded bg-white hover:bg-zinc-100">
                                                                Add
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>

                        <section className="w-full lg:w-1/2 bg-stone-100 border border-zinc-200 rounded-xl shadow-sm flex flex-col min-h-0">
                            <div className="p-4 border-b border-zinc-200">
                                <h2 className="text-gray-700 font-bebas-neue text-3xl tracking-wider">
                                    Exercise Creation
                                </h2>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                <div className="bg-white border border-zinc-200 rounded-lg p-4">
                                    <h3 className="text-lg font-semibold mb-4">
                                        Exercise Builder
                                    </h3>

                                    <div className="mb-4">
                                        <input className="w-full border rounded p-2" type="text" id="exerciseName" placeholder="Exercise Name" autoComplete="off" value={exerciseName} onChange={(e) => setExerciseName(e.target.value)}/>
                                    </div>

                                    <div className="mb-4">
                                        <Select options={options} value={exerciseType} onChange={setExerciseType} placeholder="Exercise Type" classNamePrefix="react-select" />
                                    </div>

                                    <div className="mb-4">
                                        <textarea value={exerciseDesc} onChange={(e) => setExerciseDesc(e.target.value)} className="w-full border rounded py-1 pl-2 min-h-[90px]" placeholder="Exercise Description"/>
                                        <input className="w-full border rounded py-1 pl-2" type="text" id="video" placeholder="Video Link" autoComplete="off" value={videoLink} onChange={(e) => setVideoLink(e.target.value)}/>
                                    </div>

                                    <div className="mt-6 flex justify-end space-x-3">
                                        <button type="button" onClick={clearExerciseForm} className="px-4 py-2 border rounded">
                                            Clear
                                        </button>
                                        <button onClick={handleSaveExercise} className="px-4 py-2 bg-blue-600 text-white rounded" disabled={!exerciseName || !exerciseType} title={!exerciseName || !exerciseType ? "Name + Type required" : ""}>
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    
                    {isModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center">
                            <div className="absolute inset-0 bg-black/50" onClick={() => {setModalOpen(false)}}/>
                            <div className="relative w-[92%] max-w-xl rounded-2xl bg-white shadow-xl border border-zinc-200 overflow-hidden">
                                {/* Header */}
                                <div className="p-5 border-b border-zinc-200">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h2 className="text-xl font-semibold text-zinc-900">
                                                Add Exercise
                                            </h2>
                                            <p className="text-sm text-zinc-500 mt-1">
                                                Week {modalWeek + 1} • {modalDay}
                                            </p>
                                        </div>

                                        <button type="button" className="rounded-lg p-2 text-zinc-500 hover:bg-slate-100 hover:text-zinc-700" onClick={() => {setModalOpen(false)}} aria-label="close">
                                            x
                                        </button>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-5 space-y-5">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-zinc-800">
                                            Exercise Type
                                        </label>

                                        <Select options={options} className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-400" value={selectedType} onChange={handleGetExercises} />

                                        <p className="text-xs text-zinc-500">
                                            After selecting a type, you'll choose an exercise from your library.
                                        </p>
                                    </div>

                                    <div className="h-px bg-slate-100"/>

                                    {!selectedType ? (
                                        <div className="rounded-xl border border-dashed border-zinc-300 bg-slate-100 p-5 text-center">
                                            <div className="text-sm font-medium text-zinc-700">
                                                Choose a type to load exercises
                                            </div>
                                            <div className="text-xs text-zinc-500 mt-1">
                                                This template only stores the exercise reference (no sets/reps yet).
                                            </div>
                                        </div> 
                                    ) : (
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-sm font-semibold text-zinc-800">
                                                    Choose Exercise
                                                </h3>

                                                <span className="text-xs text-zinc-500">
                                                    {/* {exerciseOptions.length} results */}
                                                </span>
                                            </div>

                                            <div className="relative">
                                                <input type="text" value={searchTerm} placeholder="Search exercises..." className="w-full rounded-lg border border-zinc-300 px-3 py-2 pr-10 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-400"/>
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
                                                    ⌕
                                                </span>
                                            </div>

                                            {isLoadingExercises ? (
                                                <div className="rounded-xl border border-zinc-200 bg-white p-4">
                                                    <div className="animate-pulse space-y-3">
                                                        <div className="h-4 w-1/3 bg-slate-100 rounded"/>
                                                        <div className="h-10 w-full bg-slate-100 rounded"/>
                                                        <div className="h-10 w-full bg-slate-100 rounded"/>
                                                        <div className="h-10 w-full bg-slate-100 rounded"/>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    {filteredExercises.length === 0 ? (
                                                        <div className="rounded-xl border border-zinc-200 bg-white p-5 text-center">
                                                            <div className="text-sm font-medium text-zinc-800">
                                                                No exercises found
                                                            </div>
                                                            <div className="text-xs text-zinc-500 mt-1">
                                                                Try a different type or adjust your search.
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="max-h-64 overflow-y-auto rounded-xl border border-zinc-200 bg-white">
                                                            <ul className="divide-y divide-zinc-200">
                                                                {filteredExercises.map((ex) => {
                                                                    const isSelected = selectedExercise?.id === ex.id;
                                                                    return (
                                                                        <li key={ex.id}>
                                                                            <button type="button" className={["w-full text-left px-4 py-3 flex items-start justify-between gap-3", "hover:bg-slate-50", isSelected ? "bg-slate-100" : "bg-white",].join("")}>
                                                                                <div>
                                                                                    <div className="text-sm font-medium text-zinc-900">
                                                                                        {ex.name}
                                                                                    </div>
                                                                                    <div className="text-xs text-zinc-500 mt-0.5">
                                                                                        {ex.subtitle || "Exercise"}
                                                                                    </div>
                                                                                </div>

                                                                                <div className={["mt-1 h-5 w-5 rounded-full border flex items-center justify-center text-xs", isSelected ? "border-zinc-700 bg-slate-700 text-white" : "border-zinc-300 bg-white text-zinc-400",].join("")}>
                                                                                    {isSelected ? "✓" : ""}
                                                                                </div>
                                                                            </button>
                                                                        </li>
                                                                    );
                                                                })}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </>
                                            )}

                                            <p className="text-xs text-zinc-500">
                                                You're adding a reference to an exercise. Sets/reps/distance can be configured later when assigning this template.
                                            </p>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Footer */}
                                <div className="p-5 border-t border-zinc-200 flex items-center justify-between">
                                    <button type="button" className="px-4 py-2 rounded-lg border border-zinc-300 text-zinc-700 hover:bg-slate-50" onClick={() => {setModalOpen(false)}}>
                                        Cancel
                                    </button>

                                    <button type="button" disabled={!selectedType || !selectedExercise} className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed" onClick={() => {setModalOpen(false)}}>
                                        Add to Day
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