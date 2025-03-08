import React, { useEffect, useState } from "react";

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

    const [fsfb, setfsfb] = useState(false);
    const [fsfbMax, setfsfbMax] = useState("");
    const [fsfbAvg, setfsfbAvg] = useState("");
    const [fsfbCommand, setfsfbCommand] = useState("");
    const [fsfbMovement, setfsfbMovement] = useState("");

    const [tsfb, settsfb] = useState(false);
    const [tsfbMax, settsfbMax] = useState(false);
    const [tsfbAvg, settsfbAvg] = useState(false);
    const [tsfbCommand, settsfbCommand] = useState(false);
    const [tsfbMovement, settsfbMovement] = useState(false);

    const [ctfb, setctfb] = useState(false);
    const [ctfbMax, setctfbMax] = useState(false);
    const [ctfbAvg, setctfbAvg] = useState(false);
    const [ctfbCommand, setctfbCommand] = useState(false);
    const [ctfbMovement, setctfbMovement] = useState(false);

    const [cb, setcb] = useState(false);
    const [cbMax, setcbMax] = useState(false);
    const [cbAvg, setcbAvg] = useState(false);
    const [cbCommand, setcbCommand] = useState(false);
    const [cbMovement, setcbMovement] = useState(false);

    const [sl, setsl] = useState(false);
    const [slMax, setslMax] = useState(false);
    const [slAvg, setslAvg] = useState(false);
    const [slCommand, setslCommand] = useState(false);
    const [slMovement, setslMovement] = useState(false);

    const [ch, setch] = useState(false);
    const [chMax, setchMax] = useState(false);
    const [chAvg, setchAvg] = useState(false);
    const [chCommand, setchCommand] = useState(false);
    const [chMovement, setchMovement] = useState(false);

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
        let data = {infieldRatings, infieldNotes, outfieldRatings, outfieldNotes, throwingRatings, throwingNotes, hittingRatings, hittingNotes};
        if(pitchingChecked) {
            data = {...data, pitchingRatings, pitchingNotes}
            if(fsfb) {
                data = {...data, fsfbAvg, fsfbMax, fsfbCommand, fsfbMovement}
            }
            if(tsfb) {
                data = {...data, tsfbAvg, tsfbMax, tsfbCommand, tsfbMovement}
            }
            if(ctfb) {
                data = {...data, ctfbAvg, ctfbMax, ctfbCommand, ctfbMovement}
            }
            if(sl) {
                data = {...data, slAvg, slMax, slCommand, slMovement}
            }
            if(cb) {
                data = {...data, cbAvg, cbMax, cbCommand, cbMovement}
            }
            if(ch) {
                data = {...data, chAvg, chMax, chCommand, chMovement}
            }
        }
        if(catchingChecked) {
            data = {...data, catchingRatings, catchingNotes}
        }
        ready(data);
    }, [infieldRatings, infieldNotes, outfieldRatings, outfieldRatings, throwingRatings, throwingNotes, hittingRatings, hittingNotes,
        pitchingRatings, pitchingNotes, fsfbAvg, fsfbMax, fsfbCommand, fsfbMovement, tsfbAvg, tsfbMax, tsfbCommand, tsfbMovement,
        ctfbAvg, ctfbMax, ctfbCommand, ctfbMovement, slAvg, slMax, slCommand, slMovement, cbAvg, cbMax, cbCommand, cbMovement, 
        chAvg, chMax, chCommand, chMovement, catchingRatings, catchingNotes]);

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
                        <input type="number" placeholder="mph" className="text-black pl-1 w-[75px] shadow-md [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" name={"Tee Exit Velocity"} value={hittingRatings["Tee Exit Velo"]} onChange={(e) => setThrowingRatings((prevRatings) => ({ ...prevRatings, ["Tee Exit Velo"]: e.target.value, }))} />
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
                            <div className="col-span-full grid md:grid-cols-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="4SFB Average Velo" className="text-black mr-2">4SFB Average Velo</label>
                                    <input type="number" name="4SFB Average Velo" placeholder="75" value={fsfbAvg} onChange={(e) => setfsfbAvg(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="4SFB Max Velo" className="text-black mr-2">4SFB Max Velo</label>
                                    <input type="number" name="4SFB Max Velo" placeholder="80" value={fsfbMax} onChange={(e) => setfsfbMax(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="4SFB Command" className="text-black mr-2">4SFB Command</label>
                                    <input type="number" name="4SFB Command" placeholder="1-10" value={fsfbCommand} onChange={(e) => setfsfbCommand(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="4SFB Movement" className="text-black mr-2">4SFB Movement</label>
                                    <input type="number" name="4SFB Movement" placeholder="1-10" value={fsfbMovement} onChange={(e) => setfsfbMovement(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                            </div>
                        </>
                    )}
                    {tsfb && (
                        <>
                            <div className="col-span-full grid md:grid-cols-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="2SFB Average Velo" className="text-black mr-2">2SFB Average Velo</label>
                                    <input type="number" name="2SFB Average Velo" placeholder="75" value={tsfbAvg} onChange={(e) => settsfbAvg(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="2SFB Max Velo" className="text-black mr-2">2SFB Max Velo</label>
                                    <input type="number" name="2SFB Max Velo" placeholder="80" value={tsfbMax} onChange={(e) => settsfbMax(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="2SFB Command" className="text-black mr-2">2SFB Command</label>
                                    <input type="number" name="2SFB Command" placeholder="1-10" value={tsfbCommand} onChange={(e) => settsfbCommand(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="2SFB Movement" className="text-black mr-2">2SFB Movement</label>
                                    <input type="number" name="2SFB Movement" placeholder="1-10" value={tsfbMovement} onChange={(e) => settsfbMovement(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                            </div>
                        </>
                    )}
                    {ctfb && (
                        <>
                            <div className="col-span-full grid md:grid-cols-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="CTFB Average Velo" className="text-black mr-2">CTFB Average Velo</label>
                                    <input type="number" name="CTFB Average Velo" placeholder="75" value={ctfbAvg} onChange={(e) => setctfbAvg(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CTFB Max Velo" className="text-black mr-2">CTFB Max Velo</label>
                                    <input type="number" name="CTFB Max Velo" placeholder="80" value={ctfbMax} onChange={(e) => setctfbMax(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CTFB Command" className="text-black mr-2">CTFB Command</label>
                                    <input type="number" name="CTFB Command" placeholder="1-10" value={ctfbCommand} onChange={(e) => setctfbCommand(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CTFB Movement" className="text-black mr-2">CTFB Movement</label>
                                    <input type="number" name="CTFB Movement" placeholder="1-10" value={ctfbMovement} onChange={(e) => setctfbMovement(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                            </div>
                        </>
                    )}
                    {cb && (
                        <>
                            <div className="col-span-full grid md:grid-cols-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="CB Average Velo" className="text-black mr-2">CB Average Velo</label>
                                    <input type="number" name="CB Average Velo" placeholder="75" value={cbAvg} onChange={(e) => setcbAvg(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CB Max Velo" className="text-black mr-2">CB Max Velo</label>
                                    <input type="number" name="CB Max Velo" placeholder="80" value={cbMax} onChange={(e) => setcbMax(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CB Command" className="text-black mr-2">CB Command</label>
                                    <input type="number" name="CB Command" placeholder="1-10" value={cbCommand} onChange={(e) => setcbCommand(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CB Movement" className="text-black mr-2">CB Movement</label>
                                    <input type="number" name="CB Movement" placeholder="1-10" value={cbMovement} onChange={(e) => setcbMovement(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                            </div>
                        </>
                    )}
                    {sl && (
                        <>
                            <div className="col-span-full grid md:grid-cols-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="SL Average Velo" className="text-black mr-2">SL Average Velo</label>
                                    <input type="number" name="SL Average Velo" placeholder="75" value={slAvg} onChange={(e) => setslAvg(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="SL Max Velo" className="text-black mr-2">SL Max Velo</label>
                                    <input type="number" name="SL Max Velo" placeholder="80" value={slMax} onChange={(e) => setslMax(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="SL Command" className="text-black mr-2">SL Command</label>
                                    <input type="number" name="SL Command" placeholder="1-10" value={slCommand} onChange={(e) => setslCommand(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="SL Movement" className="text-black mr-2">SL Movement</label>
                                    <input type="number" name="SL Movement" placeholder="1-10" value={slMovement} onChange={(e) => setslMovement(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                            </div>
                        </>
                    )}
                    {ch && (
                        <>
                            <div className="col-span-full grid md:grid-cols-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="CH Average Velo" className="text-black mr-2">CH Average Velo</label>
                                    <input type="number" name="CH Average Velo" placeholder="75" value={chAvg} onChange={(e) => setchAvg(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CH Max Velo" className="text-black mr-2">CH Max Velo</label>
                                    <input type="number" name="CH Max Velo" placeholder="80" value={chMax} onChange={(e) => setchMax(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CH Command" className="text-black mr-2">CH Command</label>
                                    <input type="number" name="CH Command" placeholder="1-10" value={chCommand} onChange={(e) => setchCommand(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                                <div>
                                    <label htmlFor="CH Movement" className="text-black mr-2">CH Movement</label>
                                    <input type="number" name="CH Movement" placeholder="1-10" value={chMovement} onChange={(e) => setchMovement(e.target.value)} className="text-black pl-1 w-[75px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                </div>
                            </div>
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