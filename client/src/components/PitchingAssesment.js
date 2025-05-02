import React, { useState, useEffect, memo, useRef, useCallback } from "react";

function PitchMix({ label, id, value, onChange }) {
    const handleChange = (e) => {
        onChange(id, e.target.checked);
    }
    return (
        <div>
            <label className="text-black mr-1">{label}</label>
            <input type="checkbox" name={id} value={true} checked={value == true} onChange={handleChange}></input>
        </div>
    )
}

function AssesmentRating({ label, id, rating, onRatingChange }) {
    const handleRadioChange = (e) => {
        onRatingChange(id, e.target.value)
    }
    return (
        <div className="pl-2 shadow-md py-2 md:py-0">
            <label htmlFor={id} className="text-black">{label}</label>
            <div className="flex space-x-4">
                <label className="text-green-500"><input type="radio" className="mr-1" name={id} value="good" checked={rating === 'good'} onChange={handleRadioChange} />Good</label>
                <label className="text-yellow-500"><input type="radio" className="mr-1" name={id} value="average" checked={rating === 'average'} onChange={handleRadioChange} />Average</label>
                <label className="text-red-500"><input type="radio" className="mr-1" name={id} value="needs improvement" checked={rating === 'needs improvement'} onChange={handleRadioChange} />Needs Improvement</label>
            </div>
        </div>
    );
}

const MetricInput = React.memo(({ pitchTypeAbrev, metricsConfig, value, onChange }) => {
    const { key, label, placeholder, width } = metricsConfig;
    const inputId = `${pitchTypeAbrev}-${key}`

    const handleChange = (e) => {
        onChange(key, e.target.value)
    };

    return (
        <div>
            <label htmlFor={inputId} className="text-black mr-2 text-sm">{`${label}`}</label>
            <input type="text" id={inputId} name={inputId} placeholder={placeholder} value={value} onChange={handleChange} className={`text-black pl-1 ${width} [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none border border-gray-300 rounded`} />
        </div>
    )
});

const PitchDataInputGroup = React.memo(({ pitchType, pitchTypeAbrev, pitchData, metricsConfig, onMetricChange }) => {
    const handleInputChange = useCallback((metricKey, value) => {
        onMetricChange(pitchType, metricKey, value);
    }, [onMetricChange, pitchType]);

    return (
        <div className="col-span-2 grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 shadow-md pt-2 pl-3 pb-3 pr-2 mb-4 border border-gray-200 rounded">
            <h3 className="col-span-2 md:col-span-3 text-black text-lg font-semibold">{pitchType}</h3>
            {metricsConfig.map((metricsConf) => (
                <MetricInput key={metricsConf.key} pitchTypeAbrev={pitchTypeAbrev} metricsConfig={metricsConf} value={pitchData[metricsConf.key]} onChange={handleInputChange} />
            ))}
        </div>
    )
});

const PitchingAssesment = ({ ready }) => {
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
    });

    const [mechRatings, setMechRatings] = useState({
        'Hip Hinge': '',
        Direction: '',
        'Lead Leg Block': '',
        Seperation: '',
        Gloveside: '',
        'Arm Path': '',
        'ER Rotation': '',
    });

    const [mechComments, setMechComments] = useState("");

    const [arsenal, setArsenal] = useState({
        FourSeamFastball: false,
        TwoSeamFastball: false,
        Cutter: false,
        Slider: false,
        Curveball: false,
        ChangeUp: false,
    });

    const initialPitchMetrics = {
        FourSeamFastball: {
            AverageVelo: '',
            MaxVelo: '',
            AverageRPM: '',
            MaxRPM: '',
            SpinEfficencyAvg: '',
            SpinAxis: '',
            HorizontalBreak: '',
            VerticalBreak: '',
            AverageReleaseHeight: '',
            AverageReleaseSide: ''
        }, TwoSeamFastball: {
            AverageVelo: '',
            MaxVelo: '',
            AverageRPM: '',
            MaxRPM: '',
            SpinEfficencyAvg: '',
            SpinAxis: '',
            HorizontalBreak: '',
            VerticalBreak: '',
            AverageReleaseHeight: '',
            AverageReleaseSide: ''
        }, Cutter: {
            AverageVelo: '',
            MaxVelo: '',
            AverageRPM: '',
            MaxRPM: '',
            SpinEfficencyAvg: '',
            SpinAxis: '',
            HorizontalBreak: '',
            VerticalBreak: '',
            AverageReleaseHeight: '',
            AverageReleaseSide: ''
        }, Slider: {
            AverageVelo: '',
            MaxVelo: '',
            AverageRPM: '',
            MaxRPM: '',
            SpinEfficencyAvg: '',
            SpinAxis: '',
            HorizontalBreak: '',
            VerticalBreak: '',
            AverageReleaseHeight: '',
            AverageReleaseSide: ''
        }, Curveball: {
            AverageVelo: '',
            MaxVelo: '',
            AverageRPM: '',
            MaxRPM: '',
            SpinEfficencyAvg: '',
            SpinAxis: '',
            HorizontalBreak: '',
            VerticalBreak: '',
            AverageReleaseHeight: '',
            AverageReleaseSide: ''
        }, ChangeUp: {
            AverageVelo: '',
            MaxVelo: '',
            AverageRPM: '',
            MaxRPM: '',
            SpinEfficencyAvg: '',
            SpinAxis: '',
            HorizontalBreak: '',
            VerticalBreak: '',
            AverageReleaseHeight: '',
            AverageReleaseSide: ''
        }
    };

    const metricsConfig = [
        { key: 'AverageVelo', label: 'Average Velo', placeholder: '75', width: 'w-[40px]' },
        { key: 'MaxVelo', label: 'Max Velo', placeholder: '80', width: 'w-[40px]' },
        { key: 'AverageRPM', label: 'Average RPM', placeholder: '2750', width: 'w-[50px]' },
        { key: 'MaxRPM', label: 'Max RPM', placeholder: '3000', width: 'w-[50px]' },
        { key: 'SpinEfficencyAvg', label: 'Spin Eff Avg', placeholder: '97', width: 'w-[30px]' },
        { key: 'SpinAxis', label: 'Spin Axis', placeholder: '12:00', width: 'w-[55px]' },
        { key: 'HorizontalBreak', label: 'Horizontal Break', placeholder: '5', width: 'w-[30px]' },
        { key: 'VerticalBreak', label: 'Vertical Break', placeholder: '5', width: 'w-[30px]' },
        { key: 'AverageReleaseHeight', label: 'Avg Rel Height', placeholder: '4.5', width: 'w-[35px]' },
        { key: 'AverageReleaseSide', label: 'Avg Rel Side', placeholder: '4', width: 'w-[35px]' }
    ]

    const [pitchMetrics, setPitchMetrics] = useState(initialPitchMetrics);

    const handleMetricChange = useCallback((pitchType, metricKey, value) => {
        setPitchMetrics(prevMetrics => ({
            ...prevMetrics,
            [pitchType]: {
                ...prevMetrics[pitchType],
                [metricKey]: value
            }
        }));
    }, []);

    const handleRatingChange = (id, value) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [id]: value,
        }));
    }

    const handleMechRatingChange = (id, value) => {
        setMechRatings((prevRatings) => ({
            ...prevRatings,
            [id]: value,
        }));
    }

    const handleArsenalChange = (id, value) => {
        setArsenal((prevArsenal) => ({
            ...prevArsenal,
            [id]: value,
        }));
    }

    useEffect(() => {
        let data = {};
        if (movementScreenChecked) {
            data = { ...data, ratings }
        }
        if (mechEvalChecked) {
            data = { ...data, mechRatings, mechComments }
        }
        if (pitchMetricsChecked) {
            const activePitchData = {};
            for (const pitchType in arsenal) {
                if (arsenal[pitchType]) {
                    activePitchData[pitchType] = pitchMetrics[pitchType];
                }
            }
            data = { ...data, pitchMetrics: activePitchData };
        }
        ready(data);
    }, [ratings, mechRatings, mechComments, pitchMetrics, arsenal]);

    return (
        <>
            <div className="col-span-full">
                <label htmlFor="movementScreenCheckbox" className="text-black text-center pr-1 text-lg font-semibold underline">Movement Screen</label>
                <input type="checkbox" id="movementScreenCheckbox" checked={movementScreenChecked} onChange={(e) => setMovementScreenChecked(e.target.checked)}></input>
            </div>
            {movementScreenChecked && (
                <>
                    <AssesmentRating label="Ankle Inversion/Eversion" id="Ankle" rating={ratings.Ankle} onRatingChange={handleRatingChange} />
                    <AssesmentRating label="Hip 90/90" id="Hip" rating={ratings.Hip} onRatingChange={handleRatingChange} />
                    <AssesmentRating label="Prone Hip Rotation" id="Hip Rotation" rating={ratings["Hip Rotation"]} onRatingChange={handleRatingChange} />
                    <AssesmentRating label="Cossack Lunge" id="Cossack Lunge" rating={ratings["Cossack Lunge"]} onRatingChange={handleRatingChange} />
                    <AssesmentRating label="Single Leg Stability" id="Stability" rating={ratings.Stability} onRatingChange={handleRatingChange} />
                    <AssesmentRating label="Overhead Squat" id="Squat" rating={ratings.Squat} onRatingChange={handleRatingChange} />
                    <AssesmentRating label="T-Spine Rotation" id="T-Spine" rating={ratings["T-Spine"]} onRatingChange={handleRatingChange} />
                    <AssesmentRating label="Internal Shoulder Rotation" id="Internal Shoulder" rating={ratings["Internal Shoulder"]} onRatingChange={handleRatingChange} />
                    <AssesmentRating label="External Shoulder Rotation" id="External Shoulder" rating={ratings["External Shoulder"]} onRatingChange={handleRatingChange} />
                    <AssesmentRating label="Shoulder Total Arc of Motion" id="Shoulder Arc" rating={ratings["Shoulder Arc"]} onRatingChange={handleRatingChange} />
                    <AssesmentRating label="Field Goal" id="Field Goal" rating={ratings["Field Goal"]} onRatingChange={handleRatingChange} />
                    <AssesmentRating label="Wrist Flexion/Extension" id="Wrist" rating={ratings.Wrist} onRatingChange={handleRatingChange} />
                    <AssesmentRating label="Forearm Supination" id="Forearm Supination" rating={ratings["Forearm Supination"]} onRatingChange={handleRatingChange} />
                    <AssesmentRating label="Forearm Pronation" id="Forearm Pronation" rating={ratings["Forearm Pronation"]} onRatingChange={handleRatingChange} />
                    <AssesmentRating label="Elbow Flexion/Extension" id="Elbow" rating={ratings.Elbow} onRatingChange={handleRatingChange} />
                    <AssesmentRating label="Posterior Cuff" id="Posterior Cuff" rating={ratings["Posterior Cuff"]} onRatingChange={handleRatingChange} />
                    <AssesmentRating label="Pec major/minor" id="Pec" rating={ratings.Pec} onRatingChange={handleRatingChange} />
                    <AssesmentRating label="Latissimus Dorsi/Subscapularis" id="Lat" rating={ratings.Lat} onRatingChange={handleRatingChange} />
                    <AssesmentRating label="Upper Trapezius" id="Trap" rating={ratings.Trap} onRatingChange={handleRatingChange} />
                </>
            )}

            <div className="col-span-full">
                <label htmlFor="mechanicalEvaluationCheckbox" className="text-black text-center pr-1 text-lg font-semibold underline">Mechanical Evaluation</label>
                <input type="checkbox" id="mechanicalEvaluationCheckbox" checked={mechEvalChecked} onChange={(e) => setMechEvalChecked(e.target.checked)}></input>
            </div>
            {mechEvalChecked && (
                <>
                    <AssesmentRating label="Hip Hinge" id="Hip Hinge" rating={mechRatings["Hip Hinge"]} onRatingChange={handleMechRatingChange} />
                    <AssesmentRating label="Proper Direction" id="Direction" rating={mechRatings.Direction} onRatingChange={handleMechRatingChange} />
                    <AssesmentRating label="Lead Leg Block" id="Lead Leg Block" rating={mechRatings["Lead Leg Block"]} onRatingChange={handleMechRatingChange} />
                    <AssesmentRating label="Hip/Shoulder Seperation" id="Seperation" rating={mechRatings.Seperation} onRatingChange={handleMechRatingChange} />
                    <AssesmentRating label="Gloveside Control" id="Gloveside" rating={mechRatings.Gloveside} onRatingChange={handleMechRatingChange} />
                    <AssesmentRating label="Proper Arm Path" id="Arm Path" rating={mechRatings["Arm Path"]} onRatingChange={handleMechRatingChange} />
                    <AssesmentRating label="ER Rotation" id="ER Rotation" rating={mechRatings["ER Rotation"]} onRatingChange={handleMechRatingChange} />
                    <label htmlFor="Notes" className="text-black col-span-1 md:col-span-2 pl-2">Notes</label>
                    <input type="text" placeholder="Additional Notes" id="Notes" autoComplete="off" value={mechComments} onChange={(e) => setMechComments(e.target.value)} className="col-span-1 md:col-span-2 shadow-md pl-2 pt-2 pb-2 text-black"></input>
                </>
            )}

            <div className="col-span-full">
                <label htmlFor="pitchMetricsCheckbox" className="text-black text-center pr-1 text-lg font-semibold underline">Pitch Metrics</label>
                <input type="checkbox" id="pitchMetricsCheckbox" checked={pitchMetricsChecked} onChange={(e) => setPitchMetricsChecked(e.target.checked)}></input>
            </div>
            {pitchMetricsChecked && (
                <>
                <div className="grid grid-cols-2 md:col-span-full">
                    <div className="col-span-2 grid grid-cols-3 md:grid-cols-6 shadow-md pl-2 py-1">
                        <PitchMix label="4SFB" id="FourSeamFastball" value={arsenal.FourSeamFastball} onChange={handleArsenalChange} />
                        <PitchMix label="2SFB" id="TwoSeamFastball" value={arsenal.TwoSeamFastball} onChange={handleArsenalChange} />
                        <PitchMix label="CT" id="Cutter" value={arsenal.Cutter} onChange={handleArsenalChange} />
                        <PitchMix label="CB" id="Curveball" value={arsenal.Curveball} onChange={handleArsenalChange} />
                        <PitchMix label="SL" id="Slider" value={arsenal.Slider} onChange={handleArsenalChange} />
                        <PitchMix label="CH" id="ChangeUp" value={arsenal.ChangeUp} onChange={handleArsenalChange} />
                    </div>
                    {arsenal.FourSeamFastball && (
                        <>
                            <PitchDataInputGroup pitchType="FourSeamFastball" pitchTypeAbrev="4SFB" pitchData={pitchMetrics.FourSeamFastball} metricsConfig={metricsConfig} onMetricChange={handleMetricChange} />
                        </>
                    )}
                    {arsenal.TwoSeamFastball && (
                        <>
                            <PitchDataInputGroup pitchType="TwoSeamFastball" pitchTypeAbrev="2SFB" pitchData={pitchMetrics.TwoSeamFastball} metricsConfig={metricsConfig} onMetricChange={handleMetricChange} />
                        </>
                    )}
                    {arsenal.Cutter && (
                        <>
                            <PitchDataInputGroup pitchType="Cutter" pitchTypeAbrev="CTFB" pitchData={pitchMetrics.Cutter} metricsConfig={metricsConfig} onMetricChange={handleMetricChange} />
                        </>
                    )}
                    {arsenal.Curveball && (
                        <>
                            <PitchDataInputGroup pitchType="Curveball" pitchTypeAbrev="CB" pitchData={pitchMetrics.Curveball} metricsConfig={metricsConfig} onMetricChange={handleMetricChange} />
                        </>
                    )}
                    {arsenal.Slider && (
                        <>
                            <PitchDataInputGroup pitchType="Slider" pitchTypeAbrev="SL" pitchData={pitchMetrics.Slider} metricsConfig={metricsConfig} onMetricChange={handleMetricChange} />
                        </>
                    )}
                    {arsenal.ChangeUp && (
                        <>
                            <PitchDataInputGroup pitchType="ChangeUp" pitchTypeAbrev="CH" pitchData={pitchMetrics.ChangeUp} metricsConfig={metricsConfig} onMetricChange={handleMetricChange} />
                        </>
                    )}
                    </div>
                </>
            )}
        </>
    )
}

export default PitchingAssesment;