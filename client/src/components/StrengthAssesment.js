import React, { useEffect, useState } from "react";

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

const StrengthAssesment = ({ ready }) => {
    const [lowerBodyRatings, setLowerBodyRatings] = useState({
        'Overhead Squat': '',
        Lunge: '',
    });

    const [upperBodyRatings, setUpperBodyRatings] = useState({
        'Push-Up': '',
    });

    const [fullBodyROM, setFullBodyROM] = useState({
        'Cervical Spine': '',
        'L Shoulder': '',
        'R Shoulder': '',
        'L Elbow': '',
        'R Elbow': '',
        'L Wrist': '',
        'R Wrist': '',
        'L Hip': '',
        'R Hip': '',
        'L Knee': '',
        'R Knee': '',
        'L Ankle': '',
        'R Ankle': '',
    });

    const [posturalAssesment, setPosturalAssesment] = useState({});

    const handleLowerChange = (id, value) => {
        setLowerBodyRatings((prevRatings) => ({
            ...prevRatings,
            [id]: value,
        }));
    }

    const handleUpperChange = (id, value) => {
        setUpperBodyRatings((prevRatings) => ({
            ...prevRatings,
            [id]: value,
        }));
    }

    const handleROMChange = (id, value) => {
        setFullBodyROM((prevRatings) => ({
            ...prevRatings,
            [id]: value,
        }));
    }

    const handlePosturalChange = (id, value) => {
        setPosturalAssesment((prevRatings) => ({
            ...prevRatings,
            [id]: value,
        }));
    }

    useEffect(() => {
        const data = {
            lowerBodyRatings, upperBodyRatings, fullBodyROM, posturalAssesment
        }
        ready(data);
    }, [lowerBodyRatings, upperBodyRatings, fullBodyROM, posturalAssesment]);

    return (
        <>
            <div className="col-span-full">
                <h3 className="text-black underline text-lg font-semibold">Lower Body</h3>
            </div>
            <AssesmentRating label="Overhead Squat" id="Overhead Squat" rating={lowerBodyRatings["Overhead Squat"]} onRatingChange={handleLowerChange} />
            <AssesmentRating label="Lunge" id="Lunge" rating={lowerBodyRatings.Lunge} onRatingChange={handleLowerChange} />
            <div className="col-span-full">
                <h3 className="text-black underline text-lg font-semibold">Upper Body</h3>
            </div>
            <AssesmentRating label="Push-Up" id="Push-Up" rating={upperBodyRatings["Push-Up"]} onRatingChange={handleUpperChange} />
            <div className="col-span-full">
                <h3 className="text-black underline text-lg font-semibold">Full Body Range of Motion</h3>
            </div>
            <AssesmentRating label="Cervical Spine" id="Cervical Spine" rating={fullBodyROM["Cervical Spine"]} onRatingChange={handleROMChange} />
            <AssesmentRating label="L Shoulder" id="L Shoulder" rating={fullBodyROM["L Shoulder"]} onRatingChange={handleROMChange} />
            <AssesmentRating label="R Shoulder" id="R Shoulder" rating={fullBodyROM["R Shoulder"]} onRatingChange={handleROMChange} />
            <AssesmentRating label="L Elbow" id="L Elbow" rating={fullBodyROM["L Elbow"]} onRatingChange={handleROMChange} />
            <AssesmentRating label="R Elbow" id="R Elbow" rating={fullBodyROM["R Elbow"]} onRatingChange={handleROMChange} />
            <AssesmentRating label="L Wrist" id="L Wrist" rating={fullBodyROM["L Wrist"]} onRatingChange={handleROMChange} />
            <AssesmentRating label="R Wrist" id="R Wrist" rating={fullBodyROM["R Wrist"]} onRatingChange={handleROMChange} />
            <AssesmentRating label="L Hip" id="L Hip" rating={fullBodyROM["L Hip"]} onRatingChange={handleROMChange} />
            <AssesmentRating label="R Hip" id="R Hip" rating={fullBodyROM["R Hip"]} onRatingChange={handleROMChange} />
            <AssesmentRating label="L Knee" id="L Knee" rating={fullBodyROM["L Knee"]} onRatingChange={handleROMChange} />
            <AssesmentRating label="R Knee" id="R Knee" rating={fullBodyROM["R Knee"]} onRatingChange={handleROMChange} />
            <AssesmentRating label="L Ankle" id="L Ankle" rating={fullBodyROM["L Ankle"]} onRatingChange={handleROMChange} />
            <AssesmentRating label="R Ankle" id="R Ankle" rating={fullBodyROM["R Ankle"]} onRatingChange={handleROMChange} />
            {/* <div className="col-span-full">
                <h3 className="text-black underline text-lg font-semibold">Postural Assesment</h3>
            </div> */}
        </>
    )
}

export default StrengthAssesment;