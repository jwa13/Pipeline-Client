import React, { useState } from "react";
import { useRouter } from "next/router";
import Select from "react-select"

export default function newUserForm() {
    const [accoutType, setAccType] = useState("athlete");
    const [firstName, setFirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [DOB, setDOB] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [positions, setPositions] = useState([]);
    const [throwing, setThrowing] = useState("");
    const [hitting, setHitting] = useState("");
    const [guardianFirstName, setGaurdianFirstName] = useState("");
    const [guardianLastName, setGaurdianLastName] = useState("");
    const [gaurdianDOB, setGaurdianDOB] = useState("");
    const [gaurdianPhone, setGaurdianPhone] = useState("");
    const [phone, setPhone] = useState("");
    const [specialty, setSpecialty] = useState([]);

    const [requiresGuardian, setRequiresGuardian] = useState(false);
    const router = useRouter();

    const handleAccType = (e) => {
        setAccType(e.target.value);
    }

    const handleDOB = (e) => {
        const selectedDate = new Date(e.target.value);
        const cutoffDate = new Date("2010-02-01");

        setDOB(e.target.value);
        if(accoutType == "athlete") {
            setRequiresGuardian(selectedDate > cutoffDate);
        }
    }

    const submit = async (e) => {
        e.preventDefault();
        console.log("submitted");
        router.push("/login")
    }

    function SubmitButton() {
        if((accoutType == "athlete") && requiresGuardian) {
            if(firstName && lastName && DOB && height && weight && positions && throwing && hitting && guardianFirstName && guardianLastName && gaurdianDOB && gaurdianPhone) {
                return <button onClick={submit} className="col-span-full bg-gray-500 text-black font-bebas-neue text-2xl rounded-none font-bold text-white hover:bg-gray-400 transition border-[3px] border-solid border-white">Submit</button>
            } else {
                return <button onClick={submit} disabled className="col-span-full bg-gray-500 text-black font-bebas-neue text-2xl rounded-none font-bold text-white hover:bg-gray-400 transition border-[3px] border-solid border-white">Submit</button> 
            }
        } else if(accoutType == "athlete" && firstName && lastName && DOB && height && weight && positions && throwing && hitting){
            return <button onClick={submit} className="col-span-full bg-gray-500 text-black font-bebas-neue text-2xl rounded-none font-bold text-white hover:bg-gray-400 transition border-[3px] border-solid border-white">Submit</button>
        }else if(accoutType == "coach" && firstName && lastName && DOB && phone && specialty) {
            return <button onClick={submit} className="col-span-full bg-gray-500 text-black font-bebas-neue text-2xl rounded-none font-bold text-white hover:bg-gray-400 transition border-[3px] border-solid border-white">Submit</button>
        } else {
            return <button onClick={submit} disabled className="col-span-full bg-gray-500 text-black font-bebas-neue text-2xl rounded-none font-bold text-white hover:bg-gray-400 transition border-[3px] border-solid border-white">Submit</button>
        }
    }

    const options = [
        { value: "P", label: "P" },
        { value: "C", label: "C" },
        { value: "1B", label: "1B" },
        { value: "2B", label: "2B" },
        { value: "3B", label: "3B" },
        { value: "SS", label: "SS" },
        { value: "LF", label: "LF" },
        { value: "CF", label: "CF" },
        { value: "RF", label: "RF" }
    ]

    const hOptions = [
        { value: "Right", label: "Right" },
        { value: "Left", label: "Left" },
        { value: "Switch", label: "Switch" }
    ]

    const tOptions = [
        { value: "Right", label: "Right" },
        { value: "Left", label: "Left" }
    ]

    const coachSpecialties = [
        {value: "hitting", label: "Hitting"},
        {value: "pitching", label: "Pitching"},
        {value: "catching", label: "Catching"},
        {value: "infield", label: "Infield"},
        {value: "outfield", label: "Outfield"},
        {value: "strength", label: "Strength"},
        {value: "speed", label: "Speed"}
    ]

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="bg-[hsl(43.3,46,64)] rounded-2xl border-[5px] border-solid border-gray-500 shadow-lg p-8 w-96 flex flex-col justify-center" style={{ height: requiresGuardian ? "750px" : "550px"}}>
                <div className="pt-2 mt-4">
                    <img src="/image.png" alt="Logo" className="mx-auto w-[80px] h-[80px]"></img>
                </div>
                <div className="space-y-4 pt-1 pb-6 flex flex-col items-center">
                    <form className="w-full grid grid-cols-2 md:grid-cols-2">
                        <label htmlFor="Account Type" className="text-black font-bebas-neue text-m mr-[10px]">Account Type</label>
                        <select value={accoutType} onChange={handleAccType} className="col-span-full mb-2 py-1 text-black border-[2px] border-solid border-gray-500">
                            <option value={"athlete"}>Athlete</option>
                            <option value={"coach"}>Coach</option>
                        </select>
                        <label htmlFor="First Name" className="text-black font-bebas-neue text-m">First Name*</label>
                        <label htmlFor="Last Name" className="text-black font-bebas-neue text-m">Last Name*</label>
                        <input type="text" placeholder="First" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="mb-2 mr-2 pl-1 text-black border-[2px] border-solid border-gray-500"></input>
                        <input type="text" placeholder="Last" value={lastName} onChange={(e) => setlastName(e.target.value)} className="mb-2 pl-1 text-black text-black border-[2px] border-solid border-gray-500"></input>
                        <label htmlFor="Date of Birth" className="text-black font-bebas-neue text-m">Date of Birth*</label>
                        <label htmlFor="Phone Number" className="text-black font-bebas-neue text-m">Phone{accoutType === 'coach' && <span>*</span>}</label>
                        <input type="date" name="dateofbirth" value={DOB} onChange={handleDOB} className="mr-2 mb-2 pl-1 text-black border-[2px] border-solid border-gray-500"></input>
                        <input type="tel" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="000-000-0000" className="mb-2 pl-1 text-black border-[2px] border-solid border-gray-500"></input>
                        {accoutType === 'athlete' && (
                            <>
                                <label htmlFor="Height" className="text-black font-bebas-neue text-m">Height*</label>
                                <label htmlFor="Weight" className="text-black font-bebas-neue text-m">Weight*</label>
                                <input type="number" name="height" placeholder="inches" value={height} onChange={(e) => setHeight(e.target.value)} className="mb-2 mr-2 pl-1 text-black appearance-none border-[2px] border-solid border-gray-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                <input type="number" name="weight" placeholder="Lbs" value={weight} onChange={(e) => setWeight(e.target.value)} className="mb-2 pl-1 text-black appearance-none border-[2px] border-solid border-gray-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                                <label htmlFor="Positions" className="text-black font-bebas-neue text-m">Positions*</label>
                                <Select options={options} isMulti value={positions} onChange={setPositions} placeholder="Select all Positions" className="col-span-full w-full mb-2 border-[2px] border-solid border-gray-500" classNamePrefix="react-select" styles={{ control: (base) => ({ ...base, borderRadius: "0px" }), option: (base, { isSelected }) => ({ ...base, color: isSelected ? "#555" : "#000" }) }} />
                                <label htmlFor="Throwing Hand" className="text-black font-bebas-neue text-m">Throwing Hand*</label>
                                <label htmlFor="Hitting Side" className="text-black font-bebas-neue text-m pl-2">Hitting Side*</label>
                                <div className="grid grid-cols-2 gap-2 col-span-full">
                                    <Select options={tOptions} value={throwing} onChange={setThrowing} placeholder="Throws" className="w-full mb-2 border-[2px] border-solid border-gray-500" classNamePrefix="react-select" styles={{ control: (base) => ({ ...base, borderRadius: "0px" }), option: (base, { isSelected }) => ({ ...base, color: isSelected ? "#555" : "#000" }) }} />
                                    <Select options={hOptions} value={hitting} onChange={setHitting} placeholder="Bats" className="w-full mb-2 border-[2px] border-solid border-gray-500" classNamePrefix="react-select" styles={{ control: (base) => ({ ...base, borderRadius: "0px" }), option: (base, { isSelected }) => ({ ...base, color: isSelected ? "#555" : "#000" }) }} />
                                </div>
                                {requiresGuardian && (
                                    <>
                                        <h2 className="text-2xl font-bebas-neue text-center text-black col-span-full">Guardian Info</h2>
                                        <label htmlFor="First Name" className="text-black font-bebas-neue text-m">First Name*</label>
                                        <label htmlFor="Last Name" className="text-black font-bebas-neue text-m">Last Name*</label>
                                        <input type="text" placeholder="First" value={guardianFirstName} onChange={(e) => setGaurdianFirstName(e.target.value)} className="mb-2 mr-2 pl-1 text-black border-[2px] border-solid border-gray-500"></input>
                                        <input type="text" placeholder="Last" value={guardianLastName} onChange={(e) => setGaurdianLastName(e.target.value)} className="mb-2 pl-1 text-black text-black border-[2px] border-solid border-gray-500"></input>
                                        <label htmlFor="Date of Birth" className="text-black font-bebas-neue text-m">Date of Birth*</label>
                                        <label htmlFor="Phone Number" className="text-black font-bebas-neue text-m">Phone*</label>
                                        <input type="date" name="dateOfBirth" value={gaurdianDOB} onChange={(e) => setGaurdianDOB(e.target.value)} className="mr-2 mb-2 pl-1 text-black border-[2px] border-solid border-gray-500"></input>
                                        <input type="tel" name="phone" value={gaurdianPhone} onChange={(e) => setGaurdianPhone(e.target.value)} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="000-000-0000" className="mb-2 pl-1 text-black border-[2px] border-solid border-gray-500"></input>
                                    </>
                                )}
                            </>
                        )}
                        {accoutType === 'coach' && (
                            <>
                                <label htmlFor="Areas of Expertise" className="text-black font-bebas-neue text-m col-span-2">Specialties (select all that apply)*</label>
                                <Select options={coachSpecialties} isMulti value={specialty} onChange={setSpecialty} placeholder="Specialty" className="col-span-full w-full mb-2 border-[2px] border-solid border-gray-500" classNamePrefix="react-select" styles={{control: (base) => ({...base, borderRadius: "0px"}), option: (base, {isSelected}) => ({...base, color: isSelected ? "#555" : "#000"})}}/>
                            </>
                        )}
                        {/* {requiresGuardian && (
                            <>
                                <h2 className="text-2xl font-bebas-neue text-center text-black col-span-full">Guardian Info</h2>
                                <label htmlFor="First Name" className="text-black font-bebas-neue text-m">First Name*</label>
                                <label htmlFor="Last Name" className="text-black font-bebas-neue text-m">Last Name*</label>
                                <input type="text" placeholder="First" value={guardianFirstName} onChange={(e) => setGaurdianFirstName(e.target.value)} className="mb-2 mr-2 pl-1 text-black border-[2px] border-solid border-gray-500"></input>
                                <input type="text" placeholder="Last" value={guardianLastName} onChange={(e) => setGaurdianLastName(e.target.value)} className="mb-2 pl-1 text-black text-black border-[2px] border-solid border-gray-500"></input>
                                <label htmlFor="Date of Birth" className="text-black font-bebas-neue text-m">Date of Birth*</label>
                                <label htmlFor="Phone Number" className="text-black font-bebas-neue text-m">Phone*</label>
                                <input type="date" name="dateOfBirth" value={gaurdianDOB} onChange={(e) =>setGaurdianDOB(e.target.value)} className="mr-2 mb-2 pl-1 text-black border-[2px] border-solid border-gray-500"></input>
                                <input type="tel" name="phone" value={gaurdianPhone} onChange={(e) => setGaurdianPhone(e.target.value)} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="000-000-0000" className="mb-2 pl-1 text-black border-[2px] border-solid border-gray-500"></input>
                            </>
                        )} */}
                        <SubmitButton/>
                    </form>
                </div>
            </div>
        </div>
    )
}