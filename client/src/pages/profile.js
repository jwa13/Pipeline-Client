import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import HealthAlert from "../components/HealthAlert";

export default function profile() {
    const router = useRouter();
    const [profileData, setProfileData] = useState(null);

    const handleLogout = () => {
        if(typeof window != 'undefined') {
            localStorage.removeItem('jwt');
        }
        router.push("/login");
    }

    useEffect(() => {
        const GetProfileInfo = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile`, {
                    method: "GET",
                    headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"},
                });
                const status = await response.status;
                if(status === 401) {
                    router.push("/login");
                }
                const data = await response.json();
                // console.log(data);
                setProfileData(data);
            } catch (error) {
                console.error(error);
            }
        }
        GetProfileInfo();
    }, []);


    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
        return date.toLocaleDateString(undefined, options);
    }

    const getAge = (birthday) => {
        const birthdate = new Date(birthday);
        const today = new Date();

        let age = today.getFullYear() - birthdate.getFullYear();
        const monthDiff = today.getMonth() - birthdate.getMonth();

        if(monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
            age--
        }
        return age;
    }

    const getHeight = (height) => {
        const feet = (height - (height % 12)) /12;
        const inches = (height - (feet * 12));
        return feet + "' " + inches + "''";
    }

    const populateProfile = (profileData) => {
        if(profileData.accType == 'coach') {
            return (
                <>
                    <h3 className="text-gray-500 font-bebas-neue text-xl md:pl-6 pt-2">Email - <span className="text-black pl-1 text-2xl font-semibold" style={{fontFamily: 'Arial'}}>{profileData.email}</span></h3>
                    <h3 className="text-gray-500 font-bebas-neue text-xl md:pl-6 pt-2">Phone - <span className="text-black pl-1 text-2xl font-semibold" style={{fontFamily: 'Arial'}}>{profileData.phone}</span></h3>
                    <h3 className="text-gray-500 font-bebas-neue text-xl md:pl-6 pt-2">Specialties - <span className="text-black pl-1 text-2xl font-semibold" style={{fontFamily: 'Arial'}}>{profileData.specialty.map(item => item.label).join(', ')}</span></h3>
                    <h3 className="text-gray-500 font-bebas-neue text-xl md:pl-6 pt-2">Joined - <span className="text-black pl-1 text-2xl font-semibold" style={{fontFamily: 'Arial'}}>{formatDate(profileData.createdAt)}</span></h3>
                </>
            )
        } else if(profileData.accType == 'athlete') {
            return (
                <>
                    <h3 className="text-gray-500 font-bebas-neue text-xl md:pl-6 pt-2">Age - <span className="text-black pl-1 text-2xl font-semibold" style={{ fontFamily: 'Arial' }}>{getAge(profileData.DOB)}</span></h3>
                    <h3 className="text-gray-500 font-bebas-neue text-xl md:pl-6 pt-2">Height - <span className="text-black pl-1 text-2xl font-semibold" style={{fontFamily: 'Arial'}}>{getHeight(profileData.height)}</span></h3>
                    <h3 className="text-gray-500 font-bebas-neue text-xl md:pl-6 pt-2">Weight - <span className="text-black pl-1 text-2xl font-semibold" style={{fontFamily: 'Arial'}}>{profileData.weight} lbs</span></h3>
                    <h3 className="text-gray-500 font-bebas-neue text-xl md:pl-6 pt-2">Positions - <span className="text-black pl-1 text-2xl font-semibold" style={{fontFamily: 'Arial'}}>{profileData.positions.map(item => item.label).join(', ')}</span></h3>
                    <h3 className="text-gray-500 font-bebas-neue text-xl md:pl-6 pt-2">Throwing Hand - <span className="text-black pl-1 text-2xl font-semibold" style={{fontFamily: 'Arial'}}>{profileData.throwing.value}</span></h3>
                    <h3 className="text-gray-500 font-bebas-neue text-xl md:pl-6 pt-2">Bats - <span className="text-black pl-1 text-2xl font-semibold" style={{fontFamily: 'Arial'}}>{profileData.hitting.value}</span></h3>
                    <h3 className="text-gray-500 font-bebas-neue text-xl md:pl-6 pt-2">Email - <span className="text-black pl-1 text-2xl font-semibold" style={{fontFamily: 'Arial'}}>{profileData.email}</span></h3>
                    <h3 className="text-gray-500 font-bebas-neue text-xl md:pl-6 pt-2">Phone - <span className="text-black pl-1 text-2xl font-semibold" style={{fontFamily: 'Arial'}}>{profileData.phone}</span></h3>
                </>
            )
        }
    }


    return (
        <div className="flex min-h-screen">
            <Navbar />
            <div className="flex flex-col flex-1 pb-16 md:pb-0 md:ml-64 min-h-screen">
                <TopBar pageName={"Profile"} onLogout={handleLogout}/>
                <div className="flex-1 p-4 bg-white">
                    <h2 className="text-gray-600 font-bebas-neue text-4xl underline md:md:pl-6 md:pt-2 tracking-wider">Account Information</h2>
                    {profileData && profileData.guardianFirstName && (<h3 className="text-gray-500 font-bebas-neue text-2xl md:pl-6 pt-2 underline">Athlete</h3>)}
                    <h3 className="text-gray-500 font-bebas-neue text-xl md:pl-6 pt-2">Name - <span className="text-black pl-1 text-2xl font-semibold" style={{fontFamily: 'Arial'}}>{profileData && profileData.firstName} {profileData && profileData.lastName}</span></h3>
                    {profileData && populateProfile(profileData)}
                    {profileData && profileData.guardianFirstName && (
                        <>
                            <h3 className="text-gray-500 font-bebas-neue text-2xl md:pl-6 pt-4 underline">Guardian</h3>
                            <h3 className="text-gray-500 font-bebas-neue text-xl md:pl-6 pt-2">Name - <span className="text-black pl-1 text-2xl font-semibold" style={{fontFamily: 'Arial'}}>{profileData && profileData.firstName} {profileData && profileData.lastName}</span></h3>
                            <h3 className="text-gray-500 font-bebas-neue text-xl md:pl-6 pt-2">Phone - <span className="text-black pl-1 text-2xl font-semibold" style={{fontFamily: 'Arial'}}>{profileData.guardianPhone}</span></h3>
                        </>
                    )}
                    {profileData && profileData.hasHealth &&  (
                        <>
                            <h3 className="text-gray-500 font-bebas-neue text-2xl md:pl-6 pt-4 underline">Health Information</h3>
                            <h3 className="text-gray-500 font-bebas-neue text-xl md:pl-6 pt-2">Emergency Contact Name - <span className="text-black pl-1 text-2xl font-semibold" style={{fontFamily: 'Arial'}}>{profileData.healthInfo.emContact.name}</span></h3>
                            <h3 className="text-gray-500 font-bebas-neue text-xl md:pl-6 pt-2">Emergency Contact Phone - <span className="text-black pl-1 text-2xl font-semibold" style={{fontFamily: 'Arial'}}>{profileData.healthInfo.emContact.phone}</span></h3>
                            <h3 className="text-gray-500 font-bebas-neue text-xl md:pl-6 pt-2">Emergency Contact Relationship - <span className="text-black pl-1 text-2xl font-semibold" style={{fontFamily: 'Arial'}}>{profileData.healthInfo.emContact.relation}</span></h3>
                            <h3 className="text-gray-500 font-bebas-neue text-xl md:pl-6 pt-2">Current Conditions - <span className="text-black pl-1 text-2xl font-semibold" style={{fontFamily: 'Arial'}}>{profileData.healthInfo.currentConditions}</span></h3>
                            <h3 className="text-gray-500 font-bebas-neue text-xl md:pl-6 pt-2">Past Conditions - <span className="text-black pl-1 text-2xl font-semibold" style={{fontFamily: 'Arial'}}>{profileData.healthInfo.pastConditions}</span></h3>
                            <h3 className="text-gray-500 font-bebas-neue text-xl md:pl-6 pt-2">Surgery - <span className="text-black pl-1 text-2xl font-semibold" style={{fontFamily: 'Arial'}}>{profileData.healthInfo.surgery}</span></h3>
                            <h3 className="text-gray-500 font-bebas-neue text-xl md:pl-6 pt-2">Injury - <span className="text-black pl-1 text-2xl font-semibold" style={{fontFamily: 'Arial'}}>{profileData.healthInfo.injury}</span></h3>
                            <h3 className="text-gray-500 font-bebas-neue text-xl md:pl-6 pt-2">Heart - <span className="text-black pl-1 text-2xl font-semibold" style={{fontFamily: 'Arial'}}>{profileData.healthInfo.heart}</span></h3>
                            <h3 className="text-gray-500 font-bebas-neue text-xl md:pl-6 pt-2">Past Restriction - <span className="text-black pl-1 text-2xl font-semibold" style={{fontFamily: 'Arial'}}>{profileData.healthInfo.restricted}</span></h3>
                            <h3 className="text-gray-500 font-bebas-neue text-xl md:pl-6 pt-2">Shortness of Breath - <span className="text-black pl-1 text-2xl font-semibold" style={{fontFamily: 'Arial'}}>{profileData.healthInfo.breath}</span></h3>
                        </>
                    )}
                    {profileData && (profileData.accType === 'athlete') && (profileData.hasGoals === false) && (
                        <>
                            <div className="bg-[hsl(43.3,46,64)] border-4 border-gray-500 text-green-700 mt-3 md:px-10 md:py-3 md:m-4 md:mx-10 md:my-5 rounded relative" role="alert">
                                <div className="grid grid-flow-col-dense items-center">
                                    <a href="/goals"><img src="/trophy.svg" className="md:mx-auto h-10 md:pr-10 pl-3 md:pl-0 pr-3 md:pr-0" alt="Trohy represents goals"></img></a>
                                    <strong className="font text-white text-md md:text-xl font-bebas-neue tracking-wide"><span className="text-lg md:text-2xl">{profileData && (profileData.firstName)}!</span> You have not set any goals yet, click the trophy or navigate to the goals tab to set new goals!</strong>
                                </div>
                            </div>
                        </>
                    )}
                    {profileData && (profileData.accType === 'athlete') && (profileData.hasHealth === false) && (
                        <>
                            <HealthAlert />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}