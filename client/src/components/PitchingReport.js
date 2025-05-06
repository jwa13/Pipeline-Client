import React, { useState, useEffect } from "react";

const PitchingReport = ({report, accType}) => {
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

    const getScreenRatings = (report, target) => {
        const ratings = report.report.ratings;
        const matchingKeys = Object.keys(ratings).filter(key => ratings[key] === target);
        if(matchingKeys.length == 0) {
            return "N/A";
        }
        return matchingKeys.join(", ");
    }

    const getMechanicsRatings = (report, target) => {
        const ratings = report.report.mechRatings;
        const matchingKeys = Object.keys(ratings).filter(key => ratings[key] === target);
        if(matchingKeys.length == 0) {
            return "N/A";
        }
        return matchingKeys.join(", ");
    }

    function DisplayMetrics({pitchMetrics}) {
        const pitches = Object.entries(pitchMetrics);

        return (
            <>
                {pitches.map(([pitchType, metrics]) => (
                    <>
                        <h4 className="col-span-3 text-center text-md text-gray-700">{pitchType}</h4>
                        <div className="col-span-3 grid grid-cols-2">
                            <p className="text-gray-700 text-center">Max Velo: {metrics.MaxVelo}</p>
                            <p className="text-gray-700 text-center">Avg Velo: {metrics.AverageVelo}</p>
                            <p className="text-gray-700 text-center">Max RPM: {metrics.MaxRPM}</p>
                            <p className="text-gray-700 text-center">Average RPM: {metrics.AverageRPM}</p>
                            <p className="text-gray-700 text-center">Average Spin Efficiency: {metrics.SpinEfficencyAvg}</p>
                            <p className="text-gray-700 text-center">Spin Axis: {metrics.SpinAxis}</p>
                            <p className="text-gray-700 text-center">Average Horizontal Break: {metrics.HorizontalBreak}</p>
                            <p className="text-gray-700 text-center">Average Vertical Break: {metrics.VerticalBreak}</p>
                            <p className="text-gray-700 text-center">Average Release Height: {metrics.AverageReleaseHeight}</p>
                            <p className="text-gray-700 text-center">Average Release Side: {metrics.AverageReleaseSide}</p>
                        </div>
                    </>
                ))}
            </>
        )
    }

    return (
        <>
        {/* {console.log(report)} */}
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
                        <h2 className="text-gray-700 text-2xl col-span-1 text-center"><span className="font-bold">Pitching</span> Report for <span className="font-bold">{report.athleteName}</span> {accType === 'athlete' && (<>by Coach <span className="font-bold">{report.coachName}</span></>)} on <span className="font-bold">{formatDate(report.report.dateCreated)}</span></h2>
                        <div className="grid grid-cols-3 gap-x-2">
                            {report.report.ratings && (
                                <>
                                    <h3 className="col-span-3 text-xl text-gray-700 underline pl-1">Movement Screen</h3>
                                    <h4 className="text-center text-green-600 font-bold">Strength</h4>
                                    <h4 className="text-center text-yellow-600 font-bold">Developing</h4>
                                    <h4 className="text-center text-red-600 font-bold">Weakness</h4>
                                    <p className="text-center text-gray-700">{getScreenRatings(report, "good")}</p>
                                    <p className="text-center text-gray-700">{getScreenRatings(report, "average")}</p>
                                    <p className="text-center text-gray-700">{getScreenRatings(report, "needs improvement")}</p>
                                </>
                            )}
                            {report.report.mechRatings && (
                                <>
                                    <h3 className="col-span-3 text-xl text-gray-700 underline pl-1">Mechanical Evaluation</h3>
                                    <h4 className="text-center text-green-600 font-bold">Strength</h4>
                                    <h4 className="text-center text-yellow-600 font-bold">Developing</h4>
                                    <h4 className="text-center text-red-600 font-bold">Weakness</h4>
                                    <p className="text-center text-gray-700">{getMechanicsRatings(report, "good")}</p>
                                    <p className="text-center text-gray-700">{getMechanicsRatings(report, "average")}</p>
                                    <p className="text-center text-gray-700">{getMechanicsRatings(report, "needs improvement")}</p>
                                </>
                            )}
                            {report.report.pitchMetrics && (
                                <>
                                    <h3 className="col-span-3 text-xl text-gray-700 underline pl-1">Pitch Metrics</h3>
                                    <DisplayMetrics pitchMetrics={report.report.pitchMetrics} />
                                </>
                            )}
                        </div>
                        <button className="text-gray-600 hover:underline" onClick={handleSeeLess}>See Less</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default PitchingReport;