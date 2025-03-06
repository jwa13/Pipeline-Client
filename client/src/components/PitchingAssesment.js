import React, { useState } from "react";

const PitchingAssesment = () => {
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

    const [fsfb, setfsfb] = useState(false);
    const [fsfbAvgVelo, setfsfbAvgVelo] = useState();
    const [fsfbMaxVelo, setfsfbMaxVelo] = useState();
    const [fsfbAvgRPM, setfsfbAvgRPM] = useState();
    const [fsfbMaxRPM, setfsfbMaxRPM] = useState();
    const [fsfbAvgSpin, setfsfbAvgSpin] = useState();
    const [fsfbSpinAxis, setfsfbSpinAxis] = useState();
    const [fsfbAvgReleaseHeight, setfsfbAvgReleaseHeight] = useState();
    const [fsfbAvgReleaseSide, setfsfbAvgReleaseSide] = useState();
    const [fsfbAvgHBreak, setfsfbAvgHBreak] = useState();
    const [fsfbAvgVBreak, setfsfbAvgVBreak] = useState();

    const [tsfb, settsfb] = useState(false);
    const [tsfbAvgVelo, settsfbAvgVelo] = useState();
    const [tsfbMaxVelo, settsfbMaxVelo] = useState();
    const [tsfbAvgRPM, settsfbAvgRPM] = useState();
    const [tsfbMaxRPM, settsfbMaxRPM] = useState();
    const [tsfbAvgSpin, settsfbAvgSpin] = useState();
    const [tsfbSpinAxis, settsfbSpinAxis] = useState();
    const [tsfbAvgReleaseHeight, settsfbAvgReleaseHeight] = useState();
    const [tsfbAvgReleaseSide, settsfbAvgReleaseSide] = useState();
    const [tsfbAvgHBreak, settsfbAvgHBreak] = useState();
    const [tsfbAvgVBreak, settsfbAvgVBreak] = useState();

    const [ctfb, setctfb] = useState(false);
    const [ctfbAvgVelo, setctfbAvgVelo] = useState();
    const [ctfbMaxVelo, setctfbMaxVelo] = useState();
    const [ctfbAvgRPM, setctfbAvgRPM] = useState();
    const [ctfbMaxRPM, setctfbMaxRPM] = useState();
    const [ctfbAvgSpin, setctfbAvgSpin] = useState();
    const [ctfbSpinAxis, setctfbSpinAxis] = useState();
    const [ctfbAvgReleaseHeight, setctfbAvgReleaseHeight] = useState();
    const [ctfbAvgReleaseSide, setctfbAvgReleaseSide] = useState();
    const [ctfbAvgHBreak, setctfbAvgHBreak] = useState();
    const [ctfbAvgVBreak, setctfbAvgVBreak] = useState();

    const [cb, setcb] = useState(false);
    const [cbAvgVelo, setcbAvgVelo] = useState();
    const [cbMaxVelo, setcbMaxVelo] = useState();
    const [cbAvgRPM, setcbAvgRPM] = useState();
    const [cbMaxRPM, setcbMaxRPM] = useState();
    const [cbAvgSpin, setcbAvgSpin] = useState();
    const [cbSpinAxis, setcbSpinAxis] = useState();
    const [cbAvgReleaseHeight, setcbAvgReleaseHeight] = useState();
    const [cbAvgReleaseSide, setcbAvgReleaseSide] = useState();
    const [cbAvgHBreak, setcbAvgHBreak] = useState();
    const [cbAvgVBreak, setcbAvgVBreak] = useState();

    const [sl, setsl] = useState(false);
    const [slAvgVelo, setslAvgVelo] = useState();
    const [slMaxVelo, setslMaxVelo] = useState();
    const [slAvgRPM, setslAvgRPM] = useState();
    const [slMaxRPM, setslMaxRPM] = useState();
    const [slAvgSpin, setslAvgSpin] = useState();
    const [slSpinAxis, setslSpinAxis] = useState();
    const [slAvgReleaseHeight, setslAvgReleaseHeight] = useState();
    const [slAvgReleaseSide, setslAvgReleaseSide] = useState();
    const [slAvgHBreak, setslAvgHBreak] = useState();
    const [slAvgVBreak, setslAvgVBreak] = useState();

    const [ch, setch] = useState(false);
    const [chAvgVelo, setchAvgVelo] = useState();
    const [chMaxVelo, setchMaxVelo] = useState();
    const [chAvgRPM, setchAvgRPM] = useState();
    const [chMaxRPM, setchMaxRPM] = useState();
    const [chAvgSpin, setchAvgSpin] = useState();
    const [chSpinAxis, setchSpinAxis] = useState();
    const [chAvgReleaseHeight, setchAvgReleaseHeight] = useState();
    const [chAvgReleaseSide, setchAvgReleaseSide] = useState();
    const [chAvgHBreak, setchAvgHBreak] = useState();
    const [chAvgVBreak, setchAvgVBreak] = useState();

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

    function AssesmentRating({ label, id, rating, onRatingChange }) {
        const handleRadioChange = (e) => {
            onRatingChange(id, e.target.value)
        }
        return (
            <div className="pl-2 shadow-md">
                <label htmlFor={id} className="text-black">{label}</label>
                <div className="flex space-x-4">
                    <label className="text-green-500"><input type="radio" className="mr-1" name={id} value="good" checked={rating === 'good'} onChange={handleRadioChange} />Good</label>
                    <label className="text-yellow-500"><input type="radio" className="mr-1" name={id} value="average" checked={rating === 'average'} onChange={handleRadioChange} />Average</label>
                    <label className="text-red-500"><input type="radio" className="mr-1" name={id} value="needs improvement" checked={rating === 'needs improvement'} onChange={handleRadioChange} />Needs Improvement</label>
                </div>
            </div>
        );
    }

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
                    <label htmlFor="Notes" className="text-black col-span-2 pl-2">Notes</label>
                    <input type="text" placeholder="Additional Notes" id="Notes" value={mechComments} onChange={setMechComments} className="col-span-2 shadow-md pl-2 pt-2 pb-2"></input>
                </>
            )}

            <div className="col-span-full">
                <label htmlFor="pitchMetricsCheckbox" className="text-black text-center pr-1 text-lg font-semibold underline">Pitch Metrics</label>
                <input type="checkbox" id="pitchMetricsCheckbox" checked={pitchMetricsChecked} onChange={(e) => setPitchMetricsChecked(e.target.checked)}></input>
            </div>
            {pitchMetricsChecked && (
                <>
                    <div className="col-span-2 grid grid-cols-6 shadow-md pl-2 py-1">
                        <div>
                            <label htmlFor="4SFB" className="text-black mr-1">4SFB</label>
                            <input type="checkbox" id="4FBChecked" checked={fsfb} onChange={(e) => setfsfb(e.target.checked)}></input>
                        </div>
                        <div>
                            <label htmlFor="2SFB" className="text-black mr-1">2SFB</label>
                            <input type="checkbox" id="2FBChecked" checked={tsfb} onChange={(e) => settsfb(e.target.checked)}></input>
                        </div>
                        <div>
                            <label htmlFor="CT" className="text-black mr-1">CT</label>
                            <input type="checkbox" id="CTFBChecked" checked={ctfb} onChange={(e) => setctfb(e.target.checked)}></input>
                        </div>
                        <div>
                            <label htmlFor="CB" className="text-black mr-1">CB</label>
                            <input type="checkbox" id="CBChecked" checked={cb} onChange={(e) => setcb(e.target.checked)}></input>
                        </div>
                        <div>
                            <label htmlFor="SL" className="text-black mr-1">SL</label>
                            <input type="checkbox" id="SLChecked" checked={sl} onChange={(e) => setsl(e.target.checked)}></input>
                        </div>
                        <div>
                            <label htmlFor="CH" className="text-black mr-1">CH</label>
                            <input type="checkbox" id="CHChecked" checked={ch} onChange={(e) => setch(e.target.checked)}></input>
                        </div>
                    </div>
                    {fsfb && (
                        <>
                            <div className="col-span-2 grid grid-cols-3 shadow-md pt-1 pl-2 pb-1">
                                <div>
                                    <label htmlFor="4SFB Average Velo" className="text-black mr-2">4SFB Average Velo</label>
                                    <input type="number" name="4SFB Average Velo" placeholder="75" value={fsfbAvgVelo} onChange={(e) => setfsfbAvgVelo(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="4SFB Max Velo" className="text-black mr-2">4SFB Max Velo</label>
                                    <input type="number" name="4SFB Max Velo" placeholder="80" value={fsfbMaxVelo} onChange={(e) => setfsfbMaxVelo(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="4SFB Max RPM" className="text-black mr-2">4SFB Max RPM</label>
                                    <input type="number" name="4SFB Max RPM" placeholder="3000" value={fsfbMaxRPM} onChange={(e) => setfsfbMaxRPM(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="4SFB Average RPM" className="text-black mr-2">4SFB Average RPM</label>
                                    <input type="number" name="4SFB Average RPM" placeholder="2750" value={fsfbAvgRPM} onChange={(e) => setfsfbAvgRPM(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="4SFB Spin Efficency" className="text-black mr-2">4SFB Spin Efficency Average</label>
                                    <input type="number" name="4SFB Spin Efficency" placeholder="97" value={fsfbAvgSpin} onChange={(e) => setfsfbAvgSpin(e.target.value)} className="text-black pl-1 w-[50px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="4SFB Spin Axis" className="text-black mr-2">4SFB Spin Axis</label>
                                    <input type="number" name="4SFB Spin Axis" placeholder="12:00" value={fsfbSpinAxis} onChange={(e) => setfsfbSpinAxis(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="4SFB Horizontal Break" className="text-black mr-2">4SFB Horizontal Break</label>
                                    <input type="number" name="4SFB Horizontal Break" placeholder="5" value={fsfbAvgHBreak} onChange={(e) => setfsfbAvgHBreak(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="4SFB Vertical Break" className="text-black mr-2">4SFB Vertical Break</label>
                                    <input type="number" name="4SFB Vertical Break" placeholder="5" value={fsfbAvgVBreak} onChange={(e) => setfsfbAvgVBreak(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="4SFB Average Release Height" className="text-black mr-2">4SFB Average Release Height</label>
                                    <input type="number" name="4SFB Average Release Height" placeholder="4.5" value={fsfbAvgReleaseHeight} onChange={(e) => setfsfbAvgReleaseHeight(e.target.value)} className="text-black pl-1 w-[50px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="4SFB Average Release Side" className="text-black mr-2">4SFB Average Release Side</label>
                                    <input type="number" name="4SFB Average Release Side" placeholder="4" value={fsfbAvgReleaseSide} onChange={(e) => setfsfbAvgReleaseSide(e.target.value)} className="text-black pl-1 w-[50px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                            </div>
                        </>
                    )}
                    {tsfb && (
                        <>
                            <div className="col-span-2 grid grid-cols-3 shadow-md pt-1 pl-2 pb-1">
                                <div>
                                    <label htmlFor="2SFB Average Velo" className="text-black mr-2">2SFB Average Velo</label>
                                    <input type="number" name="2SFB Average Velo" placeholder="75" value={tsfbAvgVelo} onChange={(e) => settsfbAvgVelo(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="2SFB Max Velo" className="text-black mr-2">2SFB Max Velo</label>
                                    <input type="number" name="2SFB Max Velo" placeholder="80" value={tsfbMaxVelo} onChange={(e) => settsfbMaxVelo(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="2SFB Max RPM" className="text-black mr-2">2SFB Max RPM</label>
                                    <input type="number" name="2SFB Max RPM" placeholder="3000" value={tsfbMaxRPM} onChange={(e) => settsfbMaxRPM(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="2SFB Average RPM" className="text-black mr-2">2SFB Average RPM</label>
                                    <input type="number" name="2SFB Average RPM" placeholder="2750" value={tsfbAvgRPM} onChange={(e) => settsfbAvgRPM(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="2SFB Spin Efficency" className="text-black mr-2">2SFB Spin Efficency Average</label>
                                    <input type="number" name="2SFB Spin Efficency" placeholder="97" value={tsfbAvgSpin} onChange={(e) => settsfbAvgSpin(e.target.value)} className="text-black pl-1 w-[50px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="2SFB Spin Axis" className="text-black mr-2">2SFB Spin Axis</label>
                                    <input type="number" name="2SFB Spin Axis" placeholder="12:00" value={tsfbSpinAxis} onChange={(e) => settsfbSpinAxis(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="2SFB Horizontal Break" className="text-black mr-2">2SFB Horizontal Break</label>
                                    <input type="number" name="2SFB Horizontal Break" placeholder="5" value={tsfbAvgHBreak} onChange={(e) => settsfbAvgHBreak(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="2SFB Vertical Break" className="text-black mr-2">2SFB Vertical Break</label>
                                    <input type="number" name="2SFB Vertical Break" placeholder="5" value={tsfbAvgVBreak} onChange={(e) => settsfbAvgVBreak(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="2SFB Average Release Height" className="text-black mr-2">2SFB Average Release Height</label>
                                    <input type="number" name="2SFB Average Release Height" placeholder="4.5" value={tsfbAvgReleaseHeight} onChange={(e) => settsfbAvgReleaseHeight(e.target.value)} className="text-black pl-1 w-[50px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="2SFB Average Release Side" className="text-black mr-2">2SFB Average Release Side</label>
                                    <input type="number" name="2SFB Average Release Side" placeholder="4" value={tsfbAvgReleaseSide} onChange={(e) => settsfbAvgReleaseSide(e.target.value)} className="text-black pl-1 w-[50px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                            </div>
                        </>
                    )}
                    {ctfb && (
                        <>
                            <div className="col-span-2 grid grid-cols-3 shadow-md pt-1 pl-2 pb-1">
                                <div>
                                    <label htmlFor="CTFB Average Velo" className="text-black mr-2">CTFB Average Velo</label>
                                    <input type="number" name="CTFB Average Velo" placeholder="75" value={ctfbAvgVelo} onChange={(e) => setctfbAvgVelo(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CTFB Max Velo" className="text-black mr-2">CTFB Max Velo</label>
                                    <input type="number" name="CTFB Max Velo" placeholder="80" value={ctfbMaxVelo} onChange={(e) => setctfbMaxVelo(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CTFB Max RPM" className="text-black mr-2">CTFB Max RPM</label>
                                    <input type="number" name="CTFB Max RPM" placeholder="3000" value={ctfbMaxRPM} onChange={(e) => setctfbMaxRPM(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CTFB Average RPM" className="text-black mr-2">CTFB Average RPM</label>
                                    <input type="number" name="CTFB Average RPM" placeholder="2750" value={ctfbAvgRPM} onChange={(e) => setctfbAvgRPM(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CTFB Spin Efficency" className="text-black mr-2">CTFB Spin Efficency Average</label>
                                    <input type="number" name="CTFB Spin Efficency" placeholder="97" value={ctfbAvgSpin} onChange={(e) => setctfbAvgSpin(e.target.value)} className="text-black pl-1 w-[50px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CTFB Spin Axis" className="text-black mr-2">CTFB Spin Axis</label>
                                    <input type="number" name="CTFB Spin Axis" placeholder="12:00" value={ctfbSpinAxis} onChange={(e) => setctfbSpinAxis(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CTFB Horizontal Break" className="text-black mr-2">CTFB Horizontal Break</label>
                                    <input type="number" name="CTFB Horizontal Break" placeholder="5" value={ctfbAvgHBreak} onChange={(e) => setctfbAvgHBreak(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CTFB Vertical Break" className="text-black mr-2">CTFB Vertical Break</label>
                                    <input type="number" name="CTFB Vertical Break" placeholder="5" value={ctfbAvgVBreak} onChange={(e) => setctfbAvgVBreak(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CTFB Average Release Height" className="text-black mr-2">CTFB Average Release Height</label>
                                    <input type="number" name="CTFB Average Release Height" placeholder="4.5" value={ctfbAvgReleaseHeight} onChange={(e) => setctfbAvgReleaseHeight(e.target.value)} className="text-black pl-1 w-[50px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CTFB Average Release Side" className="text-black mr-2">CTFB Average Release Side</label>
                                    <input type="number" name="CTFB Average Release Side" placeholder="4" value={ctfbAvgReleaseSide} onChange={(e) => setctfbAvgReleaseSide(e.target.value)} className="text-black pl-1 w-[50px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                            </div>
                        </>
                    )}
                    {cb && (
                        <>
                            <div className="col-span-2 grid grid-cols-3 shadow-md pt-1 pl-2 pb-1">
                                <div>
                                    <label htmlFor="CB Average Velo" className="text-black mr-2">CB Average Velo</label>
                                    <input type="number" name="CB Average Velo" placeholder="75" value={cbAvgVelo} onChange={(e) => setcbAvgVelo(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CB Max Velo" className="text-black mr-2">CB Max Velo</label>
                                    <input type="number" name="CB Max Velo" placeholder="80" value={cbMaxVelo} onChange={(e) => setcbMaxVelo(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CB Max RPM" className="text-black mr-2">CB Max RPM</label>
                                    <input type="number" name="CB Max RPM" placeholder="3000" value={cbMaxRPM} onChange={(e) => setcbMaxRPM(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CB Average RPM" className="text-black mr-2">CB Average RPM</label>
                                    <input type="number" name="CB Average RPM" placeholder="2750" value={cbAvgRPM} onChange={(e) => setcbAvgRPM(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CB Spin Efficency" className="text-black mr-2">CB Spin Efficency Average</label>
                                    <input type="number" name="CB Spin Efficency" placeholder="97" value={cbAvgSpin} onChange={(e) => setcbAvgSpin(e.target.value)} className="text-black pl-1 w-[50px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CB Spin Axis" className="text-black mr-2">CB Spin Axis</label>
                                    <input type="number" name="CB Spin Axis" placeholder="12:00" value={cbSpinAxis} onChange={(e) => setcbSpinAxis(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CB Horizontal Break" className="text-black mr-2">CB Horizontal Break</label>
                                    <input type="number" name="CB Horizontal Break" placeholder="5" value={cbAvgHBreak} onChange={(e) => setcbAvgHBreak(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CB Vertical Break" className="text-black mr-2">CB Vertical Break</label>
                                    <input type="number" name="CB Vertical Break" placeholder="5" value={cbAvgVBreak} onChange={(e) => setcbAvgVBreak(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CB Average Release Height" className="text-black mr-2">CB Average Release Height</label>
                                    <input type="number" name="CB Average Release Height" placeholder="4.5" value={cbAvgReleaseHeight} onChange={(e) => setcbAvgReleaseHeight(e.target.value)} className="text-black pl-1 w-[50px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CB Average Release Side" className="text-black mr-2">CB Average Release Side</label>
                                    <input type="number" name="CB Average Release Side" placeholder="4" value={cbAvgReleaseSide} onChange={(e) => setcbAvgReleaseSide(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                            </div>
                        </>
                    )}
                    {sl && (
                        <>
                            <div className="col-span-2 grid grid-cols-3 shadow-md pt-1 pl-2 pb-1">
                                <div>
                                    <label htmlFor="SL Average Velo" className="text-black mr-2">SL Average Velo</label>
                                    <input type="number" name="SL Average Velo" placeholder="75" value={slAvgVelo} onChange={(e) => setslAvgVelo(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="SL Max Velo" className="text-black mr-2">SL Max Velo</label>
                                    <input type="number" name="SL Max Velo" placeholder="80" value={slMaxVelo} onChange={(e) => setslMaxVelo(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="SL Max RPM" className="text-black mr-2">SL Max RPM</label>
                                    <input type="number" name="SL Max RPM" placeholder="3000" value={slMaxRPM} onChange={(e) => setslMaxRPM(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="SL Average RPM" className="text-black mr-2">SL Average RPM</label>
                                    <input type="number" name="SL Average RPM" placeholder="2750" value={slAvgRPM} onChange={(e) => setslAvgRPM(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="SL Spin Efficency" className="text-black mr-2">SL Spin Efficency Average</label>
                                    <input type="number" name="SL Spin Efficency" placeholder="97" value={slAvgSpin} onChange={(e) => setslAvgSpin(e.target.value)} className="text-black pl-1 w-[50px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="SL Spin Axis" className="text-black mr-2">SL Spin Axis</label>
                                    <input type="number" name="SL Spin Axis" placeholder="12:00" value={slSpinAxis} onChange={(e) => setslSpinAxis(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="SL Horizontal Break" className="text-black mr-2">SL Horizontal Break</label>
                                    <input type="number" name="SL Horizontal Break" placeholder="5" value={slAvgHBreak} onChange={(e) => setslAvgHBreak(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="SL Vertical Break" className="text-black mr-2">SL Vertical Break</label>
                                    <input type="number" name="SL Vertical Break" placeholder="5" value={slAvgVBreak} onChange={(e) => setslAvgVBreak(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="SL Average Release Height" className="text-black mr-2">SL Average Release Height</label>
                                    <input type="number" name="SL Average Release Height" placeholder="4.5" value={slAvgReleaseHeight} onChange={(e) => setslAvgReleaseHeight(e.target.value)} className="text-black pl-1 w-[50px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="SL Average Release Side" className="text-black mr-2">SL Average Release Side</label>
                                    <input type="number" name="SL Average Release Side" placeholder="4" value={slAvgReleaseSide} onChange={(e) => setslAvgReleaseSide(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                            </div>
                        </>
                    )}
                    {ch && (
                        <>
                            <div className="col-span-2 grid grid-cols-3 shadow-md pt-1 pl-2 pb-1">
                                <div>
                                    <label htmlFor="CH Average Velo" className="text-black mr-2">CH Average Velo</label>
                                    <input type="number" name="CH Average Velo" placeholder="75" value={chAvgVelo} onChange={(e) => setchAvgVelo(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CH Max Velo" className="text-black mr-2">CH Max Velo</label>
                                    <input type="number" name="CH Max Velo" placeholder="80" value={chMaxVelo} onChange={(e) => setchMaxVelo(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CH Max RPM" className="text-black mr-2">CH Max RPM</label>
                                    <input type="number" name="CH Max RPM" placeholder="3000" value={chMaxRPM} onChange={(e) => setchMaxRPM(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CH Average RPM" className="text-black mr-2">CH Average RPM</label>
                                    <input type="number" name="CH Average RPM" placeholder="2750" value={chAvgRPM} onChange={(e) => setchAvgRPM(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CH Spin Efficency" className="text-black mr-2">CH Spin Efficency Average</label>
                                    <input type="number" name="CH Spin Efficency" placeholder="97" value={chAvgSpin} onChange={(e) => setchAvgSpin(e.target.value)} className="text-black pl-1 w-[50px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CH Spin Axis" className="text-black mr-2">CH Spin Axis</label>
                                    <input type="number" name="CH Spin Axis" placeholder="12:00" value={chSpinAxis} onChange={(e) => setchSpinAxis(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CH Horizontal Break" className="text-black mr-2">CH Horizontal Break</label>
                                    <input type="number" name="CH Horizontal Break" placeholder="5" value={chAvgHBreak} onChange={(e) => setchAvgHBreak(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CH Vertical Break" className="text-black mr-2">CH Vertical Break</label>
                                    <input type="number" name="CH Vertical Break" placeholder="5" value={chAvgVBreak} onChange={(e) => setchAvgVBreak(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CH Average Release Height" className="text-black mr-2">CH Average Release Height</label>
                                    <input type="number" name="CH Average Release Height" placeholder="4.5" value={chAvgReleaseHeight} onChange={(e) => setchAvgReleaseHeight(e.target.value)} className="text-black pl-1 w-[50px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CH Average Release Side" className="text-black mr-2">CH Average Release Side</label>
                                    <input type="number" name="CH Average Release Side" placeholder="4" value={chAvgReleaseSide} onChange={(e) => setchAvgReleaseSide(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    )
}

export default PitchingAssesment;