import React, { useState } from "react";
import Goal from "./Goal";
import HittingReport from "./HittingReport";
import PitchingReport from "./PitchingReport";
import StrengthReport from "./StrengthReport";
import SkillsReport from "./SkillsReport";

function DisplayReports({allReports, accInfo}) {
    return (
        <>
            {allReports.map((report) => {
                switch (report.report.reportType) {
                    case 'hitting': 
                        return (<div className="flex flex-col flex-1 px-2 pt-1 shadow-md bg-gray-100 mb-2"><HittingReport key={report.reportId} report={report} accType={accInfo} /></div>)
                    case 'pitching':
                        return (<div className="flex flex-col flex-1 px-2 pt-1 shadow-md bg-gray-100 mb-2"><PitchingReport key={report.reportId} report={report} accType={accInfo} /></div>)
                    case 'strength':
                        return (<div className="flex flex-col flex-1 px-2 pt-1 shadow-md bg-gray-100 mb-2"><StrengthReport key={report.reportId} report={report} accType={accInfo} /></div>)
                    case 'skills':
                        return (<div className="flex flex-col flex-1 px-2 pt-1 shadow-md bg-gray-100 mb-2"><SkillsReport key={report.reportId} report={report} accType={accInfo} /></div>)
                }
            })}
        </>
    )
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

const ProfileView = ({profileData}) => {
    const [seeMoreProfile, setSeeMoreProfile] = useState(true);
    const [seeGuardian, setSeeGuardian] = useState(false);
    const [seeHealth, setSeeHealth] = useState(false);
    const [seeGoals, setSeeGoals] = useState(false);
    const [seeReports, setSeeReports] = useState(false);

    const handleSeeGoals = () => {
        setSeeGoals(true);
    }

    const handleSeeReports = () => {
        setSeeReports(true);
    }

    return (
        <>
            <h3 className="text-gray-600 text-xl cursor-pointer flex items-center pt-1" onClick={() => setSeeMoreProfile(!seeMoreProfile)}>Profile Info <span className={`text-gray-500 ml-2 transform transition-transform duration-200 ${seeMoreProfile ? 'rotate-0' : '-rotate-90'}`}>⏷</span></h3>
            {seeMoreProfile && (
                <>
                    <div className="shadow-md px-2 bg-gray-100 py-1">
                        <div className="grid grid-cols-2 gap-1">
                            <h4 className="text-black text-lg">{profileData.profileData.firstName} {profileData.profileData.lastName}</h4>
                            <h4 className="text-gray-500 pt-1">Age: <span className="text-black">{getAge(profileData.profileData.DOB)}</span></h4>
                            <h4 className="text-gray-500">Height: <span className="text-black">{profileData.profileData.height} inches</span></h4>
                            <h4 className="text-gray-500">Weight: <span className="text-black">{profileData.profileData.weight} lbs</span></h4>
                            <h4 className="text-gray-500">Positions: <span className="text-black">{profileData.profileData.positions.map(item => item.label).join(', ')}</span></h4>
                            <h4 className="text-gray-500">Throws: <span className="text-black">{profileData.profileData.throwing.value}</span></h4>
                            <h4 className="text-gray-500">Bats: <span className="text-black">{profileData.profileData.hitting.value}</span></h4>
                        </div>
                        <h4 className="text-gray-500 pt-1">Email: <span className="text-black">{profileData.profileData.email}</span></h4>
                        <h4 className="text-gray-500 pt-1">Phone: <span className="text-black">{profileData.profileData.phone}</span></h4>
                    </div>
                    {profileData.profileData.guardianFirstName && (
                        <>
                            <h3 className="text-gray-600 text-lg cursor-pointer flex items-center pt-1" onClick={() => setSeeGuardian(!seeGuardian)}>Guardian Info <span className={`text-gray-500 ml-2 transform transition-transform duration-200 ${seeGuardian ? 'rotate-0' : '-rotate-90'}`}>⏷</span></h3>
                            {seeGuardian && (
                                <>
                                    <div className="shadow-md px-2 bg-gray-100 py-1">
                                        <h4 className="text-gray-500 pb-1">Name: <span className="text-black">{profileData.profileData.guardianFirstName} {profileData.profileData.guardianLastName}</span></h4>
                                        <h4 className="text-gray-500">Phone: <span className="text-black">{profileData.profileData.guardianPhone}</span></h4>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                    {profileData.profileData.healthInfo && (
                        <>
                            <h3 className="text-gray-600 text-lg cursor-pointer flex items-center pt-1" onClick={() => setSeeHealth(!seeHealth)}>Health <span className={`text-gray-500 ml-2 transform transition-transform duration-200 ${seeHealth ? 'rotate-0' : '-rotate-90'}`}>⏷</span></h3>
                            {seeHealth && (
                                <>
                                    <div className="shadow-md px-2 bg-gray-100 py-1">
                                        <h4 className="text-gray-500">Emergency Contact: <span className="text-black">{profileData.profileData.healthInfo.emContact.name}</span></h4>
                                        <h4 className="text-gray-500">Emergency Contact Phone: <span className="text-black">{profileData.profileData.healthInfo.emContact.phone}</span></h4>
                                        <h4 className="text-gray-500">Relationship to Athlete: <span className="text-black">{profileData.profileData.healthInfo.emContact.relation}</span></h4>
                                        <h4 className="text-gray-500">Current Conditions: <span className="text-black">{profileData.profileData.healthInfo.currentConditions}</span></h4>
                                        <h4 className="text-gray-500">Past Conditions: <span className="text-black">{profileData.profileData.healthInfo.pastConditions}</span></h4>
                                        <div className="grid grid-cols-2">
                                            <h4 className="text-gray-500">Surgery: <span className="text-black">{profileData.profileData.healthInfo.surgery}</span></h4>
                                            <h4 className="text-gray-500">Injury: <span className="text-black">{profileData.profileData.healthInfo.injury}</span></h4>
                                            <h4 className="text-gray-500">Heart: <span className="text-black">{profileData.profileData.healthInfo.heart}</span></h4>
                                            <h4 className="text-gray-500">Past Restriction: <span className="text-black">{profileData.profileData.healthInfo.restricted}</span></h4>
                                            <h4 className="text-gray-500">Shortness of Breath: <span className="text-black">{profileData.profileData.healthInfo.breath}</span></h4>
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </>
            )}
            <h3 className="text-gray-600 text-xl cursor-pointer flex items-center" onClick={() => setSeeGoals(!seeGoals)}>Goals <span className={`text-gray-500 ml-2 transform transition-transform duration-200 ${seeGoals ? 'rotate-0' : '-rotate-90'}`}>⏷</span></h3>
            {seeGoals && (
                <>
                    {profileData?.goals ? (
                        <>
                            <h4 className="text-gray-500 underline">Active</h4>
                            {profileData?.goals?.active?.[0] ? (<Goal goals={profileData.goals.active} />) : (<p className="text-black">This athlete has no active goals</p>)}
                            <h4 className="text-gray-500 underline">Inactive</h4>
                            {profileData?.goals?.inactive?.[0] ? (<Goal goals={profileData.goals.inactive} />) : (<p className="text-black">This athlete has no inactive goals</p>)}
                        </>
                    ) : (
                        <>
                            <p className="text-black">This athlete has no goals set</p>
                        </>
                    )}
                </>
            )}
            <h3 className="text-gray-600 text-xl cursor-pointer flex items-center" onClick={() => setSeeReports(!seeReports)}>Reports <span className={`text-gray-500 ml-2 transform transition-transform duration-200 ${seeReports ? 'rotate-0' : '-rotate-90'}`}>⏷</span></h3>
            {seeReports && (
                <>
                    {profileData?.reports?.[0] ? (
                        <DisplayReports allReports={profileData.reports} accInfo={'coach'} />
                    ) : (
                        <p className="text-black">This athlete has no reports yet</p>
                    )}
                </>
            )}
        </>
    )
}

export default ProfileView;