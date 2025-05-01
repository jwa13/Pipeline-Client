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
                        return (<div className="flex flex-col flex-1 ml-6 pl-2 pt-1 shadow-md"><HittingReport key={report.reportId} report={report} accType={accInfo} /></div>)
                    case 'pitching':
                        return (<div className="flex flex-col flex-1 ml-6 pl-2 pt-1 shadow-md"><PitchingReport key={report.reportId} report={report} accType={accInfo} /></div>)
                    case 'strength':
                        return (<div className="flex flex-col flex-1 ml-6 pl-2 pt-1 shadow-md"><StrengthReport key={report.reportId} report={report} accType={accInfo} /></div>)
                    case 'skills':
                        return (<div className="flex flex-col flex-1 ml-6 pl-2 pt-1 shadow-md"><SkillsReport key={report.reportId} report={report} accType={accInfo} /></div>)
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
            <h3 className="text-gray-600 text-xl">Profile Info</h3>
            {seeMoreProfile && (
                <>
                    <h4 className="">Name {profileData.profileData.firstName}</h4>
                    <h4 className="">Age {getAge(profileData.profileData.DOB)}</h4>
                    <h4 className="">Height {profileData.profileData.height} inches</h4>
                    <h4 className="">Weight {profileData.profileData.weight} lbs</h4>
                    <h4 className="">Positions {profileData.profileData.positions.map(item => item.label).join(', ')}</h4>
                    <h4 className="">Throwing Hand {profileData.profileData.throwing.value}</h4>
                    <h4 className="">Bats {profileData.profileData.hitting.value}</h4>
                    <h4 className="">Email {profileData.profileData.email}</h4>
                    <h4 className="">Phone {profileData.profileData.phone}</h4>
                    <h3 className="text-gray-600 text-lg">Guardian Info</h3>
                    {seeGuardian && (
                        <>
                            <h4 className="">Name</h4>
                            <h4 className="">Phone</h4>
                        </>
                    )}
                    <h3 className="text-gray-600 text-lg">Health Info</h3>
                    {seeHealth && (
                        <>
                            <h4 className="">Emergency Contact Name</h4>
                            <h4 className="">Emergency Contact Phone</h4>
                            <h4 className="">Relationship to Athlete</h4>
                            <h4 className="">Current Conditions</h4>
                            <h4 className="">Past Conditions</h4>
                            <h4 className="">Surgery</h4>
                            <h4 className="">Injury</h4>
                            <h4 className="">Heart</h4>
                            <h4 className="">Past Restriction</h4>
                            <h4 className="">Shortness of Breath</h4>
                        </>
                    )}
                </>
            )}
            <h3 className="text-gray-600 text-xl">Goals</h3>
            <button className="" onClick={handleSeeGoals}>See Goals</button>
            {seeGoals && (
                <>
                    <Goal goals={profileData.goals.active} />
                    <Goal goals={profileData.goals.inactive} />
                </>
            )}
            <h3 className="text-gray-600 text-xl">Reports</h3>
            <button className="" onClick={handleSeeReports}>See Reports</button>
            {seeReports && (
                <>
                  <DisplayReports allReports={profileData.reports} accInfo={'coach'} />
                </>
            )}
        </>
    )
}

export default ProfileView;