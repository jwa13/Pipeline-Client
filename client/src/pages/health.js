import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function health() {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
    const router = useRouter();
    const [emContactName, setEmContactName] = useState('');
    const [emContactPhone, setEmContactPhone] = useState('');
    const [emContactRelation, setEmContactRelation] = useState('');
    const [pastConditions, setPastConditions] = useState('');
    const [currentConditions, setCurrentConditions] = useState('');
    const [surgery, setSurgery] = useState('');
    const [surgeryDetails, setSurgeryDetails] = useState('');
    const [injury, setInjury] = useState('');
    const [heart, setHeart] = useState('');
    const [restricted, setRestricted] = useState('');
    const [breath, setBreath] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        console.log('health submitted');

        const healthInfo = {};
        healthInfo.name = emContactName;
        healthInfo.phone = emContactPhone;
        healthInfo.relation = emContactRelation;
        healthInfo.surgery = surgery;
        healthInfo.injury = injury;
        healthInfo.heart = heart;
        healthInfo.restricted = restricted;
        healthInfo.breath = breath;

        if(surgery === 'Yes') {
            healthInfo.surgeryDetails = surgeryDetails;
        }
        if(pastConditions) {
            healthInfo.pastConditions = pastConditions;
        } else {
            healthInfo.pastConditions = 'None';
        }
        if(currentConditions) {
            healthInfo.currentConditions = currentConditions; 
        } else {
            healthInfo.currentConditions = 'None';
        }

        try {
            const token = localStorage.getItem("jwt");
            const response = await fetch(`${baseURL}/api/newHealth`, {
                method: "POST",
                headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"},
                body: JSON.stringify(healthInfo),
            });
            const status = await response.status;
            if(status === 200) {
                router.push("/profile");
            } else if(status === 401) {
                router.push("/login");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleSurgery = (e) => {
        setSurgery(e.target.value);
    }

    const handleInjury = (e) => {
        setInjury(e.target.value);
    }

    const handleHeart = (e) => {
        setHeart(e.target.value);
    }

    const handleRestricted = (e) => {
        setRestricted(e.target.value);
    }

    const handleBreath = (e) => {
        setBreath(e.target.value);
    }

    function SubmitButton() {
        if(emContactName && emContactPhone && emContactRelation && surgery && injury && heart && restricted && breath) {
            if((surgery === 'Yes' && surgeryDetails) || surgery === 'No') {
                return <button onClick={submit} className="py-1 px-2 bg-gray-500 text-black font-bebas-neue text-2xl rounded-none font-bold text-white hover:bg-gray-400 transition border-[3px] border-solid border-white">Submit</button>
            } else {
                return <button onClick={submit} disabled className="py-1 px-2 bg-gray-500 text-black font-bebas-neue text-2xl rounded-none font-bold text-white border-[3px] border-solid border-white">Submit</button>
            }
        } else {
            return <button onClick={submit} disabled className="py-1 px-2 bg-gray-500 text-black font-bebas-neue text-2xl rounded-none font-bold text-white border-[3px] border-solid border-white">Submit</button>
        }
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-2">
            <div className="border border-gray-600 border-4 rounded-lg w-[80vw] max-w-2xl h-[70vh] max-h-[80vh] p-4 bg-white">
                <h2 className="text-2xl font-semibold mb-4 text-center text-gray-600">Health Screening</h2>

                <form className="overflow-y-auto h-[calc(100%-3rem)]">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Person to Contact in Case of Emergency</label>
                        <input value={emContactName} onChange={(e) => setEmContactName(e.target.value)} type="text" className="mt-1 pl-2 block w-full border-gray-300 text-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Relationship to Athlete</label>
                        <input value={emContactRelation} onChange={(e) => setEmContactRelation(e.target.value)} type="text" className="mt-1 pl-2 block w-full border-gray-300 text-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Emergency Contact Cell Phone</label>
                        <input value={emContactPhone} onChange={(e) => setEmContactPhone(e.target.value)} type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="000-000-0000" className="mt-1 pl-2 block w-full border-gray-300 text-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">List past medical conditions: <span className="text-gray-500">(if you haven't had any relevant conditions leave blank)</span></label>
                        <textarea value={pastConditions} onChange={(e) => setPastConditions(e.target.value)} className="mt-1 block pl-1 w-full border-gray-300 text-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">List current medical conditions: <span className="text-gray-500">(if you don't have any relevant conditions leave blank)</span></label>
                        <textarea value={currentConditions} onChange={(e) => setCurrentConditions(e.target.value)} className="mt-1 block pl-1 w-full border-gray-300 text-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Have you ever had surgery? If yes, please list all surgical procedures and dates:</label>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                                <input type="radio" name="details" value="Yes" className="form-radio" checked={surgery === 'Yes'} onChange={handleSurgery} />
                                <span className="ml-2">Yes</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="details" value="No" className="form-radio" checked={surgery === 'No'} onChange={handleSurgery} />
                                <span className="ml-2">No</span>
                            </label>
                        </div>
                        {surgery === 'Yes' && (
                            <textarea value={surgeryDetails} onChange={(e) => setSurgeryDetails(e.target.value)} id="detailsTextarea" className="mt-1 block pl-1 w-full border-gray-300 text-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Did you ever injure a bone, muscle, ligament, joint, or tendon that caused you to miss a practice or game?</label>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                                <input type="radio" name="option1" value="Yes" className="form-radio" checked={injury === 'Yes'} onChange={handleInjury} />
                                <span className="ml-2">Yes</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="option1" value="No" className="form-radio" checked={injury === 'No'} onChange={handleInjury} />
                                <span className="ml-2">No</span>
                            </label>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Has a doctor ever requested a test for your heart? For example, electrocardiography (ECG) or echocardiography (ECHO)</label>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                                <input type="radio" name="option2" value="Yes" className="form-radio" checked={heart === 'Yes'} onChange={handleHeart} />
                                <span className="ml-2">Yes</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="option2" value="No" className="form-radio" checked={heart === 'No'} onChange={handleHeart} />
                                <span className="ml-2">No</span>
                            </label>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Has a provider ever denied or restricted your participation in sports for any reason? </label>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                                <input type="radio" name="option3" value="Yes" className="form-radio" checked={restricted === 'Yes'} onChange={handleRestricted} />
                                <span className="ml-2">Yes</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="option3" value="No" className="form-radio" checked={restricted === 'No'} onChange={handleRestricted} />
                                <span className="ml-2">No</span>
                            </label>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Do you get light-headed or feel shorter of breath than your friends during exercise?</label>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                                <input type="radio" name="option4" value="Yes" className="form-radio" checked={breath === 'Yes'} onChange={handleBreath} />
                                <span className="ml-2">Yes</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="option4" value="No" className="form-radio" checked={breath === 'No'} onChange={handleBreath} />
                                <span className="ml-2">No</span>
                            </label>
                        </div>
                    </div>
                    <SubmitButton />
                </form>
            </div>
        </div>
    )
}