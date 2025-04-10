import React, { useState, useEffect } from "react";

const StrengthReport = ({report, accType}) => {
    const [moreData, setMoreData] = useState(false);

    const formatDate = (unformattedDate) => {
        const date = new Date(unformattedDate);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
        return date.toLocaleDateString(undefined, options);
    }

    const handleSeeMore = () => {
        setMoreData(true);
    }

    const handleSeeLess = () => {
        setMoreData(false);
    }

    const getLowerRatings = (report, target) => {
        const ratings = report.report.lowerBody;
        const matchingKeys = Object.keys(ratings).filter(key => ratings[key] === target);
        if(matchingKeys.length == 0) {
            return "N/A";
        }
        return matchingKeys.join(", ");
    }

    const getUpperRatings = (report, target) => {
        const ratings = report.report.upperBody;
        const matchingKeys = Object.keys(ratings).filter(key => ratings[key] === target);
        if(matchingKeys.length == 0) {
            return "N/A";
        }
        return matchingKeys.join(", ");
    }

    const getROMRatings = (report, target) => {
        const ratings = report.report.fullBodyROM;
        const matchingKeys = Object.keys(ratings).filter(key => ratings[key] === target);
        if(matchingKeys.length == 0) {
            return "N/A";
        }
        return matchingKeys.join(", ");
    }

    return (
        <>
            {console.log(report)}
            {!moreData && (
                <div className="flex flex-wrap items-center p-1">
                    {accType === 'coach' && (<h2 className="mr-4 text-black">Athlete Name: <span className="text-gray-600">{report.athleteName}</span></h2>)}
                    {accType === 'athlete' && (<h2 className="mr-4 text-black">Coach: <span className="text-gray-600">{report.coachName}</span></h2>)}
                    <h2 className="mr-4 text-black">Type: <span className="text-gray-600">Pitching</span></h2>
                    <h2 className="mr-4 text-gray-600">{formatDate(report.report.dateCreated)}</h2>
                    <button className="mr-2 text-gray-600 hover:underline" onClick={handleSeeMore}>See More</button>
                </div>
            )}
            {moreData && (
                <div>
                    <div className="grid grid-cols-1">
                        <h2 className="text-gray-700 text-2xl col-span-1 text-center"><span className="font-bold">Strength</span> Report for <span className="font-bold">{report.athleteName}</span> {accType === 'athlete' && (<>by Coach <span className="font-bold">{report.coachName}</span></>)} on <span className="font-bold">{formatDate(report.report.dateCreated)}</span></h2>
                        <div className="grid grid-cols-3 gap-x-2">
                            <h3 className="col-span-3 text-xl text-gray-700 underline pl-1">Lower Body</h3>
                            <h4 className="text-center text-green-600 font-bold">Strength</h4>
                            <h4 className="text-center text-yellow-600 font-bold">Developing</h4>
                            <h4 className="text-center text-red-600 font-bold">Weakness</h4>
                            <p className="text-center text-gray-700">{getLowerRatings(report, "good")}</p>
                            <p className="text-center text-gray-700">{getLowerRatings(report, "average")}</p>
                            <p className="text-center text-gray-700">{getLowerRatings(report, "needs improvement")}</p>
                            <h3 className="col-span-3 text-xl text-gray-700 underline pl-1">Upper Body</h3>
                            <h4 className="text-center text-green-600 font-bold">Strength</h4>
                            <h4 className="text-center text-yellow-600 font-bold">Developing</h4>
                            <h4 className="text-center text-red-600 font-bold">Weakness</h4>
                            <p className="text-center text-gray-700">{getUpperRatings(report, "good")}</p>
                            <p className="text-center text-gray-700">{getUpperRatings(report, "average")}</p>
                            <p className="text-center text-gray-700">{getUpperRatings(report, "needs improvement")}</p>
                            <h3 className="col-span-3 text-xl text-gray-700 underline pl-1">Full Body Range of Motion</h3>
                            <h4 className="text-center text-green-600 font-bold">Strength</h4>
                            <h4 className="text-center text-yellow-600 font-bold">Developing</h4>
                            <h4 className="text-center text-red-600 font-bold">Weakness</h4>
                            <p className="text-center text-gray-700">{getROMRatings(report, "good")}</p>
                            <p className="text-center text-gray-700">{getROMRatings(report, "average")}</p>
                            <p className="text-center text-gray-700">{getROMRatings(report, "needs improvement")}</p>
                        </div>
                        <button className="text-gray-600 hover:underline" onClick={handleSeeLess}>See Less</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default StrengthReport;