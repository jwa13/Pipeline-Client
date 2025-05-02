import React, { useEffect, useState } from "react";

const HittingAssesment = ({ ready }) => {
    const [loadRatings, setLoadRatings] = useState({
        'Weight Transfer': '',
        'Hip Hinge': '',
        'Seperation': '',
        'Barrel Position': '',
        'Posture': '',
        'Shoulder Plane': '',
        'Smooth/On Time': '',
    });

    const [swingRatings, setSwingRatings] = useState({
        'Front Arm': '',
        'Back Arm': '',
        Head: '',
        'Back Leg': '',
        'Front Leg': '',
    });

    const [evTee, setEvTee] = useState(null);
    const [distanceTee, setDistanceTee] = useState(null);
    const [evFrontToss, setEvFrontToss] = useState(null);
    const [distanceFrontToss, setDistanceFrontToss] = useState(null);

    const [swingNotes, setSwingNotes] = useState("");

    const handleLoadChange = (id, value) => {
        setLoadRatings((prevRatings) => ({
            ...prevRatings,
            [id]: value,
        }));
    }

    const handleSwingChange = (id, value) => {
        setSwingRatings((prevRatings) => ({
            ...prevRatings,
            [id]: value,
        }));
    }

    function AssesmentRating({label, id, rating, onRatingChange}) {
        const handleRadioChange = (e) => {
            onRatingChange(id, e.target.value)
        }
        return (
            <div className="pl-2 py-2 shadow-md">
                <label htmlFor={id} className="text-black">{label}</label>
                <div className="flex space-x-4">
                    <label className="text-green-500"><input type="radio" className="mr-1" name={id} value="good" checked={rating === 'good'} onChange={handleRadioChange}/>Good</label>
                    <label className="text-yellow-500"><input type="radio" className="mr-1" name={id} value="average" checked={rating === 'average'} onChange={handleRadioChange}/>Average</label>
                    <label className="text-red-500"><input type="radio" className="mr-1" name={id} value="needs improvement" checked={rating === 'needs improvement'} onChange={handleRadioChange}/>Needs Improvement</label>
                </div>
            </div>
        );
    }

    function SwingRating({label, id, rating, onRatingChange}) {
        const handleRadioChange = (e) => {
            onRatingChange(id, e.target.value);
        }
        return (
            <div className="pl-2 py-2 shadow-md">
                <label htmlFor={id} className="text-black">{label}</label>
                <div className="flext space-x-2">
                    <label className="text-green-500"><input type="radio" className="mr-1" name={id} value="good" checked={rating === 'good'} onChange={handleRadioChange}/>Good</label>
                    <label className="text-red-500"><input type="radio" className="mr-1" name={id} value="bad" checked={rating === 'bad'} onChange={handleRadioChange}/>Bad</label>
                </div>
            </div>
        )
    }

    useEffect(() => {
        const data = {
            loadRatings, swingRatings, evTee, distanceTee, evFrontToss, distanceFrontToss, swingNotes, loadRatings, swingRatings
        }
        ready(data);
    }, [loadRatings, swingRatings, evTee, distanceTee, evFrontToss, distanceFrontToss, swingNotes, loadRatings, swingRatings]);

    return (
        <>
            <div className="col-span-full">
                <div className="col-span-full">
                    <h3 className="text-black underline text-lg font-semibold">Load</h3>
                </div>
                <div className="md:grid md:grid-cols-2">
                    <AssesmentRating label="Proper Weight Transfer" id="Weight Transfer" rating={loadRatings["Weight Transfer"]} onRatingChange={handleLoadChange} />
                    <AssesmentRating label="Hip Hinge" id="Hip Hinge" rating={loadRatings["Hip Hinge"]} onRatingChange={handleLoadChange} />
                    <AssesmentRating label="Creates Seperation" id="Seperation" rating={loadRatings.Seperation} onRatingChange={handleLoadChange} />
                    <AssesmentRating label="Barrel Position at 45 Degrees" id="Barrel Position" rating={loadRatings["Barrel Position"]} onRatingChange={handleLoadChange} />
                    <AssesmentRating label="Proper Posture" id="Posture" rating={loadRatings.Posture} onRatingChange={handleLoadChange} />
                    <AssesmentRating label="Shoulder Plane" id="Shoulder Plane" rating={loadRatings["Shoulder Plane"]} onRatingChange={handleLoadChange} />
                    <AssesmentRating label="Smooth and On Time" id="Smooth/On Time" rating={loadRatings["Smooth/On Time"]} onRatingChange={handleLoadChange} />
                </div>
                <div className="col-span-full">
                    <h3 className="text-black underline text-lg font-semibold">Swing</h3>
                </div>
                <div className="md:grid md:grid-cols-2">
                    <SwingRating label="Front Arm" id="Front Arm" rating={swingRatings["Front Arm"]} onRatingChange={handleSwingChange} />
                    <SwingRating label="Back Arm" id="Back Arm" rating={swingRatings["Back Arm"]} onRatingChange={handleSwingChange} />
                    <SwingRating label="Head" id="Head" rating={swingRatings.Head} onRatingChange={handleSwingChange} />
                    <SwingRating label="Front Leg" id="Front Leg" rating={swingRatings["Front Leg"]} onRatingChange={handleSwingChange} />
                    <SwingRating label="Back Leg" id="Back Leg" rating={swingRatings["Back Leg"]} onRatingChange={handleSwingChange} />
                </div>
                <div className="grid grid-cols-2">
                    <label htmlFor="Notes" className="text-black col-span-2 pl-2 pt-1">Notes</label>
                    <input type="text" autoComplete="off" placeholder="Additional Notes" id="Notes" value={swingNotes} onChange={(e) => setSwingNotes(e.target.value)} className="col-span-2 shadow-md pl-2 pt-2 pb-2 text-black"></input>
                </div>
                <div className="col-span-full">
                    <h3 className="text-black underline text-lg font-semibold">Metrics</h3>
                </div>
                <div className="col-span-full grid grid-cols-2">
                    <div>
                        <label htmlFor="EV Tee" className="text-black mr-2 mb-1">Tee EV</label>
                        <input type="number" placeholder="65" value={evTee} onChange={(e) => setEvTee(e.target.value)} className="text-black pl-1 w-[40px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none border border-gray-300 rounded"></input>
                    </div>
                    <div>
                        <label htmlFor="Distance Tee" className="text-black mr-2 mb-1">Tee Dist</label>
                        <input type="number" placeholder="105" value={distanceTee} onChange={(e) => setDistanceTee(e.target.value)} className="text-black pl-1 w-[40px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none border border-gray-300 rounded"></input>
                    </div>
                    <div>
                        <label htmlFor="EV Front Toss" className="text-black mr-2">Front Toss EV</label>
                        <input type="number" placeholder="65" value={evFrontToss} onChange={(e) => setEvFrontToss(e.target.value)} className="text-black pl-1 w-[40px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none border border-gray-300 rounded"></input>
                    </div>
                    <div>
                        <label htmlFor="Distance Front Toss" className="text-black mr-2">Front Toss Dist</label>
                        <input type="number" placeholder="105" value={distanceFrontToss} onChange={(e) => setDistanceFrontToss(e.target.value)} className="text-black pl-1 w-[40px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none border border-gray-300 rounded"></input>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HittingAssesment;