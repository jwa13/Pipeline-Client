import React, { useCallback, useEffect, useState } from "react";

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

const MetricInput = React.memo(({ pitchTypeAbbrev, metricsConfig, value, onChange }) => {
    const { key, label, placeholder, width } = metricsConfig;
    const inputId = `${pitchTypeAbbrev}-${key}`;

    const handleChange = (e) => {
        onChange(key, e.target.value)
    };

    return (
        <div>
            <label htmlFor={inputId} className="text-black mr-2 text-sm">{`${pitchTypeAbbrev} ${label}`}</label>
            <input type="text" id={inputId} name={inputId} placeholder={placeholder} value={value} onChange={handleChange} className={`text-black pl-1 ${width} [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none border border-gray-300 rounded`} />
        </div>
    )
});

const PitchDataInputGroup = React.memo(({ pitchType, pitchTypeAbbrev, pitchData, metricsConfig, onMetricChange }) => {
    const handleInputChange = useCallback((metricKey, value) => {
        onMetricChange(pitchType, metricKey, value);
    }, [onMetricChange, pitchType]);

    return (
        <div className="col-span-2 grid grid-cols-3 gap-y-2 gap-x-4 shadow-md pt-2 pl-3 pb-3 pr-2 mb-4 border border-gray-200 rounded">
            <h3 className="col-span-3 text-black text-lg font-semibold">{pitchType}</h3>
            {metricsConfig.map((metricConfig) => (
                <MetricInput key={metricConfig.key} pitchTypeAbbrev={pitchTypeAbbrev} metricsConfig={metricConfig} value={pitchData[metricConfig.key]} onChange={handleInputChange} />
            ))}
        </div>
    )
});

const SkillsAssesment = ({ ready }) => {
    const [pitchingChecked, setPitchingChecked] = useState(false);
    const [catchingChecked, setCatchingChecked] = useState(false);

    const [infieldRatings, setInfieldRatings] = useState({
        'Footwork': '',
        'Glovework': '',
        'Arm Strength': '',
        'Range/Routes/Speed': '',
    });

    const [outfieldRatings, setOutfieldRatings] = useState({
        'Footwork': '',
        'Glovework': '',
        'Arm Strength': '',
        'Range/Routes/Speed': '',
    });

    const [throwingRatings, setThrowingRatings] = useState({
        Mechanics: '',
        'Arm Path': '',
        'Arm Strength': '',
        Accuracy: '',
        Velocity: '',
    });

    const [hittingRatings, setHittingRatings] = useState({
        Contact: '',
        Consistency: '',
        'Barrel Control': '',
        Power: '',
        Mechanics: '',
        'Tee Exit Velo': '',
    });

    const [pitchingRatings, setPitchingRatings] = useState({
        'Upper Body Mechanics': '',
        'Lower Body Mechanics': '',
        'Arm Path': '',
    });

    const [catchingRatings, setCatchingRatings] = useState({
        Recieving: '',
        Blocking: '',
        'Ball Handling': '',
        'Throwing Footwork': '',
        'Pop Time': '',
        'Arm Strength': '',
    });

    const [arsenal, setArsenal] = useState({
        FourSeamFastball: false,
        TwoSeamFastball: false,
        Cutter: false,
        Slider: false,
        Curveball: false,
        ChangeUp: false,
    });

    const initialPitchMetrics = {
        FourSeamFastball: { MaxVelo: '', AverageVelo: '', Command: '', Movement: '' },
        TwoSeamFastball: { MaxVelo: '', AverageVelo: '', Command: '', Movement: '' },
        Cutter: { MaxVelo: '', AverageVelo: '', Command: '', Movement: '' },
        Slider: { MaxVelo: '', AverageVelo: '', Command: '', Movement: '' },
        Curveball: { MaxVelo: '', AverageVelo: '', Command: '', Movement: '' },
        ChangeUp: { MaxVelo: '', AverageVelo: '', Command: '', Movement: '' },
    }

    const metricsConfig = [
        { key: 'MaxVelo', label: 'Max Velo', placeholder: '75', width: 'w-[75px]' },
        { key: 'AverageVelo', label: 'Average Velo', placeholder: '80', width: 'w-[75px]' },
        { key: 'Command', label: 'Command', placeholder: '5', width: 'w-[75px]' },
        { key: 'Movement', label: 'Movement', placeholder: '5', width: 'w-[75px]' }
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

    const handleArsenalChange = (id, value) => {
        setArsenal((prevArsenal) => ({
            ...prevArsenal,
            [id]: value,
        }));
    }

    const [infieldNotes, setInfieldNotes] = useState("");
    const [outfieldNotes, setOutfieldNotes] = useState("");
    const [throwingNotes, setThrowingNotes] = useState("");
    const [hittingNotes, setHittingNotes] = useState("");
    const [pitchingNotes, setPitchingNotes] = useState("");
    const [catchingNotes, setCatchingNotes] = useState("");

    const handleSkillScore = (id, value, subset) => {
        if (subset == 'infield') {
            setInfieldRatings((prevRatings) => ({
                ...prevRatings,
                [id]: value,
            }));
        } else if (subset == 'outfield') {
            setOutfieldRatings((prevRatings) => ({
                ...prevRatings,
                [id]: value,
            }));
        } else if (subset == 'throwing') {
            setThrowingRatings((prevRatings) => ({
                ...prevRatings,
                [id]: value,
            }));
        } else if (subset == 'hitting') {
            setHittingRatings((prevRatings) => ({
                ...prevRatings,
                [id]: value,
            }));
        } else if (subset == 'pitching') {
            setPitchingRatings((prevRatings) => ({
                ...prevRatings,
                [id]: value,
            }))
        } else if (subset == 'catching') {
            setCatchingRatings((prevRatings) => ({
                ...prevRatings,
                [id]: value,
            }));
        }
    }

    function SkillScore({ label, id, rating, onRatingChange, subset }) {
        const handleSkillRating = (e) => {
            onRatingChange(id, e.target.value, subset);
        }
        return (
            <div className="pl-2">
                <div className="py-1">
                    <label htmlFor={id} className="text-black pr-2">{label}</label>
                    <input type="number" placeholder="1-10" className="text-black pl-1 w-[75px] shadow-md [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" name={id} value={rating} onChange={handleSkillRating} />
                </div>
            </div>
        )
    }

    useEffect(() => {
        let data = { infieldRatings, infieldNotes, outfieldRatings, outfieldNotes, throwingRatings, throwingNotes, hittingRatings, hittingNotes };
        if (pitchingChecked) {
            const activePitchData = {};
            for (const pitchType in arsenal) {
                if (arsenal[pitchType]) {
                    activePitchData[pitchType] = pitchMetrics[pitchType];
                }
            }
            data = { ...data, pitchMetrics: activePitchData, pitchingRatings, pitchingNotes }
        }
        if (catchingChecked) {
            data = { ...data, catchingRatings, catchingNotes }
        }
        ready(data);
    }, [infieldRatings, infieldNotes, outfieldRatings, throwingRatings, throwingNotes, hittingRatings, hittingNotes,
        pitchingRatings, pitchingNotes, pitchMetrics, arsenal, catchingRatings, catchingNotes]);

    return (
        <>
            <div className="col-span-full">
                <h3 className="text-black underline text-lg font-semibold">Infield</h3>
            </div>
            <div className="col-span-full grid md:grid-cols-4 sm:grid-cols-2">
                <SkillScore label="Footwork" id="Footwork" rating={infieldRatings.Footwork} onRatingChange={handleSkillScore} subset="infield" />
                <SkillScore label="Glovework" id="Glovework" rating={infieldRatings.Glovework} onRatingChange={handleSkillScore} subset="infield" />
                <SkillScore label="Arm Strength" id="Arm Strength" rating={infieldRatings["Arm Strength"]} onRatingChange={handleSkillScore} subset="infield" />
                <SkillScore label="Range/Routes/Speed" id="Range/Routes/Speed" rating={infieldRatings["Range/Routes/Speed"]} onRatingChange={handleSkillScore} subset="infield" />
            </div>
            <label htmlFor="infieldNotes" className="text-black col-span-2 pl-2">Notes</label>
            <input type="text" placeholder="Additional Notes" id="infieldNotes" value={infieldNotes} onChange={(e) => setInfieldNotes(e.target.value)} className="col-span-2 shadow-md pl-2 pt-2 pb-2"></input>

            <div className="col-span-full">
                <h3 className="text-black underline text-lg font-semibold">Outfield</h3>
            </div>
            <div className="col-span-full grid md:grid-cols-4 sm:grid-cols-2">
                <SkillScore label="Footwork" id="Footwork" rating={outfieldRatings.Footwork} onRatingChange={handleSkillScore} subset="outfield" />
                <SkillScore label="Glovework" id="Glovework" rating={outfieldRatings.Glovework} onRatingChange={handleSkillScore} subset="outfield" />
                <SkillScore label="Arm Strength" id="Arm Strength" rating={outfieldRatings["Arm Strength"]} onRatingChange={handleSkillScore} subset="outfield" />
                <SkillScore label="Range/Routes/Speed" id="Range/Routes/Speed" rating={outfieldRatings["Range/Routes/Speed"]} onRatingChange={handleSkillScore} subset="outfield" />
            </div>
            <label htmlFor="outfieldNotes" className="text-black col-span-2 pl-2">Notes</label>
            <input type="text" placeholder="Additional Notes" id="outfieldNotes" value={outfieldNotes} onChange={(e) => setOutfieldNotes(e.target.value)} className="col-span-2 shadow-md pl-2 pt-2 pb-2"></input>

            <div className="col-span-full">
                <h3 className="text-black underline text-lg font-semibold">Throwing</h3>
            </div>
            <div className="col-span-full grid md:grid-cols-4 sm:grid-cols-2">
                <SkillScore label="Mechanics" id="Mechanics" rating={throwingRatings.Mechanics} onRatingChange={handleSkillScore} subset="throwing" />
                <SkillScore label="Arm Path" id="Arm Path" rating={throwingRatings["Arm Path"]} onRatingChange={handleSkillScore} subset="throwing" />
                <SkillScore label="Arm Strength" id="Arm Strength" rating={throwingRatings["Arm Strength"]} onRatingChange={handleSkillScore} subset="throwing" />
                <SkillScore label="Accuracy" id="Accuracy" rating={throwingRatings.Accuracy} onRatingChange={handleSkillScore} subset="throwing" />
                <div className="pl-2">
                    <div className="py-1">
                        <label htmlFor="Velocity" className="text-black pr-2">Velocity</label>
                        <input type="number" placeholder="mph" className="text-black pl-1 w-[75px] shadow-md [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" name={"Velocity"} value={throwingRatings.Velocity} onChange={(e) => setThrowingRatings((prevRatings) => ({ ...prevRatings, ["Velocity"]: e.target.value, }))} />
                    </div>
                </div>
            </div>
            <label htmlFor="throwingNotes" className="text-black col-span-2 pl-2">Notes</label>
            <input type="text" placeholder="Additional Notes" id="throwingNotes" value={throwingNotes} onChange={(e) => setThrowingNotes(e.target.value)} className="col-span-2 shadow-md pl-2 pt-2 pb-2"></input>

            <div className="col-span-full">
                <h3 className="text-black underline text-lg font-semibold">Hitting</h3>
            </div>
            <div className="col-span-full grid md:grid-cols-4 sm:grid-cols-2">
                <SkillScore label="Contact" id="Contact" rating={hittingRatings.Contact} onRatingChange={handleSkillScore} subset="hitting" />
                <SkillScore label="Consistency" id="Consistency" rating={hittingRatings.Consistency} onRatingChange={handleSkillScore} subset="hitting" />
                <SkillScore label="Barrel Control" id="Barrel Control" rating={hittingRatings["Barrel Control"]} onRatingChange={handleSkillScore} subset="hitting" />
                <SkillScore label="Power" id="Power" rating={hittingRatings.Power} onRatingChange={handleSkillScore} subset="hitting" />
                <SkillScore label="Mechanics" id="Mechanics" rating={hittingRatings.Mechanics} onRatingChange={handleSkillScore} subset="hitting" />
                <div className="pl-2">
                    <div className="py-1">
                        <label htmlFor="Tee Exit Velocity" className="text-black pr-2">Velocity</label>
                        <input type="number" placeholder="mph" className="text-black pl-1 w-[75px] shadow-md [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" name={"Tee Exit Velocity"} value={hittingRatings["Tee Exit Velo"]} onChange={(e) => setHittingRatings((prevRatings) => ({ ...prevRatings, ["Tee Exit Velo"]: e.target.value, }))} />
                    </div>
                </div>
            </div>
            <label htmlFor="hittingNotes" className="text-black col-span-2 pl-2">Notes</label>
            <input type="text" placeholder="Additional Notes" id="hittingNotes" value={hittingNotes} onChange={(e) => setHittingNotes(e.target.value)} className="col-span-2 shadow-md pl-2 pt-2 pb-2"></input>

            <div className="col-span-full">
                <label htmlFor="pitchingCheckbox" className="text-black text-center pr-1 text-lg font-semibold underline">Pitching</label>
                <input type="checkbox" id="pitchingCheckbox" checked={pitchingChecked} onChange={(e) => setPitchingChecked(e.target.checked)}></input>
            </div>
            {pitchingChecked && (
                <>
                    <div className="col-span-full grid md:grid-cols-4 sm:grid-cols-2">
                        <SkillScore label="Upper Body Mechanics" id="Upper Body Mechanics" rating={pitchingRatings["Upper Body Mechanics"]} onRatingChange={handleSkillScore} subset="pitching" />
                        <SkillScore label="Lower Body Mechanics" id="Lower Body Mechanics" rating={pitchingRatings["Lower Body Mechanics"]} onRatingChange={handleSkillScore} subset="pitching" />
                        <SkillScore label="Arm Path" id="Arm Path" rating={pitchingRatings["Arm Path"]} onRatingChange={handleSkillScore} subset="pitching" />
                    </div>
                    <div className="col-span-2 grid grid-cols-6 shadow-md pl-2 py-1">
                        <PitchMix label="4SFB" id="FourSeamFastball" value={arsenal.FourSeamFastball} onChange={handleArsenalChange} />
                        <PitchMix label="2SFB" id="TwoSeamFastball" value={arsenal.TwoSeamFastball} onChange={handleArsenalChange} />
                        <PitchMix label="CT" id="Cutter" value={arsenal.Cutter} onChange={handleArsenalChange} />
                        <PitchMix label="CB" id="Curveball" value={arsenal.Curveball} onChange={handleArsenalChange} />
                        <PitchMix label="SL" id="Slider" value={arsenal.Slider} onChange={handleArsenalChange} />
                        <PitchMix label="CH" id="ChangeUp" value={arsenal.ChangeUp} onChange={handleArsenalChange} />
                    </div>
                    {arsenal.FourSeamFastball && (
                        <>
                            <PitchDataInputGroup pitchType="FourSeamFastball" pitchTypeAbbrev="4SFB" pitchData={pitchMetrics.FourSeamFastball} metricsConfig={metricsConfig} onMetricChange={handleMetricChange} />
                        </>
                    )}
                    {arsenal.TwoSeamFastball && (
                        <>
                            <PitchDataInputGroup pitchType="TwoSeamFastball" pitchTypeAbbrev="2SFB" pitchData={pitchMetrics.TwoSeamFastball} metricsConfig={metricsConfig} onMetricChange={handleMetricChange} />
                        </>
                    )}
                    {arsenal.Cutter && (
                        <>
                            <PitchDataInputGroup pitchType="Cutter" pitchTypeAbbrev="CTFB" pitchData={pitchMetrics.Cutter} metricsConfig={metricsConfig} onMetricChange={handleMetricChange} />
                        </>
                    )}
                    {arsenal.Curveball && (
                        <>
                            <PitchDataInputGroup pitchType="Curveball" pitchTypeAbbrev="CB" pitchData={pitchMetrics.Curveball} metricsConfig={metricsConfig} onMetricChange={handleMetricChange} />
                        </>
                    )}
                    {arsenal.Slider && (
                        <>
                            <PitchDataInputGroup pitchType="Slider" pitchTypeAbbrev="SL" pitchData={pitchMetrics.Slider} metricsConfig={metricsConfig} onMetricChange={handleMetricChange} />
                        </>
                    )}
                    {arsenal.ChangeUp && (
                        <>
                            <PitchDataInputGroup pitchType="ChangeUp" pitchTypeAbbrev="CH" pitchData={pitchMetrics.ChangeUp} metricsConfig={metricsConfig} onMetricChange={handleMetricChange} />
                        </>
                    )}
                    <label htmlFor="pitchingNotes" className="text-black col-span-2 pl-2">Notes</label>
                    <input type="text" placeholder="Additional Notes" id="pitchingNotes" value={pitchingNotes} onChange={(e) => setPitchingNotes(e.target.value)} className="col-span-2 shadow-md pl-2 pt-2 pb-2"></input>
                </>
            )}

            <div className="col-span-full">
                <label htmlFor="catchingCheckbox" className="text-black text-center pr-1 text-lg font-semibold underline">Catching</label>
                <input type="checkbox" id="catchingCheckbox" checked={catchingChecked} onChange={(e) => setCatchingChecked(e.target.checked)}></input>
            </div>
            {catchingChecked && (
                <>
                    <div className="col-span-full grid md:grid-cols-4 sm:grid-cols-2">
                        <SkillScore label="Recieving" id="Recieving" rating={catchingRatings.Recieving} onRatingChange={handleSkillScore} subset={"catching"} />
                        <SkillScore label="Blocking" id="Blocking" rating={catchingRatings.Blocking} onRatingChange={handleSkillScore} subset={"catching"} />
                        <SkillScore label="Ball Handling" id="Ball Handling" rating={catchingRatings["Ball Handling"]} onRatingChange={handleSkillScore} subset={"catching"} />
                        <SkillScore label="Throwing Footwork" id="Throwing Footwork" rating={catchingRatings["Throwing Footwork"]} onRatingChange={handleSkillScore} subset={"catching"} />
                        <SkillScore label="Pop Time" id="Pop Time" rating={catchingRatings["Pop Time"]} onRatingChange={handleSkillScore} subset={"catching"} />
                        <SkillScore label="Arm Strength" id="Arm Strength" rating={catchingRatings["Arm Strength"]} onRatingChange={handleSkillScore} subset={"catching"} />
                    </div>
                    <label htmlFor="catchingNotes" className="text-black col-span-2 pl-2">Notes</label>
                    <input type="text" placeholder="Additional Notes" id="catchingNotes" value={catchingNotes} onChange={(e) => setCatchingNotes(e.target.value)} className="col-span-2 shadow-md pl-2 pt-2 pb-2"></input>
                </>
            )}
        </>
    )
}

export default SkillsAssesment;