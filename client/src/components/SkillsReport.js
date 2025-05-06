import React, { useState, useEffect } from "react";

const SkillsReport = ({report, accType}) => {
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

    function DisplayMetrics({pitchMetrics}) {
        const pitches = Object.entries(pitchMetrics);
        return (
            <>
                {pitches.map(([pitchType, metrics]) => {
                    <>
                        <h4 className="col-span-3 text-center text-md text-gray-700">{pitchType}</h4>
                        <div className="col-span-3 grid grid-cols-2">
                            <p className="text-gray-700 text-center">Max Velo: {metrics.MaxVelo}</p>
                            <p className="text-gray-700 text-center">Avg Velo: {metrics.AverageVelo}</p>
                            <p className="text-gray-700 text-center">Command: {metrics.Command}</p>
                            <p className="text-gray-700 text-center">Movement: {metrics.Movement}</p>
                        </div>
                    </>
                })}
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
                    <h2 className="mr-4 text-black">Type: <span className="text-gray-600">Skills</span></h2>
                    <h2 className="mr-4 text-gray-600">{formatDate(report.report.dateCreated)}</h2>
                    <button className="mr-2 text-gray-600 hover:underline" onClick={handleSeeMore}>See More</button>
                </div>
            )}
            {moreData && (
                <div>
                    <div className="grid grid-cols-1">
                        <h2 className="text-gray-700 text-2xl col-span-1 text-center"><span className="font-bold">Skills</span> Report for <span className="font-bold">{report.athleteName}</span> {accType === 'athlete' && (<>by Coach <span className="font-bold">{report.coachName}</span></>)} on <span className="font-bold">{formatDate(report.report.dateCreated)}</span></h2>
                        <div className="grid grid-cols-3 gap-x-2">
                            <h3 className="col-span-3 text-xl text-gray-700 underline pl-1">Infield</h3>
                            <p className="text-center text-gray-700">Footwork: {report.report.infieldRatings.Footwork}</p>
                            <p className="text-center text-gray-700">Glovework: {report.report.infieldRatings.Glovework}</p>
                            <p className="text-center text-gray-700">Arm Strength: {report.report.infieldRatings["Arm Strength"]}</p>
                            <p className="text-center text-gray-700">Range/Routes/Speed: {report.report.infieldRatings["Range/Routes/Speed"]}</p>
                            <h3 className="col-span-3 text-xl text-gray-700 underline pl-1">Outfield</h3>
                            <p className="text-center text-gray-700">Footwork: {report.report.outfieldRatings.Footwork}</p>
                            <p className="text-center text-gray-700">Glovework: {report.report.outfieldRatings.Glovework}</p>
                            <p className="text-center text-gray-700">Arm Strength: {report.report.outfieldRatings["Arm Strength"]}</p>
                            <p className="text-center text-gray-700">Range/Routes/Speed: {report.report.outfieldRatings["Range/Routes/Speed"]}</p>
                            <h3 className="col-span-3 text-xl text-gray-700 underline pl-1">Throwing</h3>
                            <p className="text-center text-gray-700">Mechanics: {report.report.throwingRatings.Mechanics}</p>
                            <p className="text-center text-gray-700">Arm Path: {report.report.throwingRatings["Arm Path"]}</p>
                            <p className="text-center text-gray-700">Arm Strength: {report.report.throwingRatings["Arm Strength"]}</p>
                            <p className="text-center text-gray-700">Accuracy: {report.report.throwingRatings.Accuracy}</p>
                            <p className="text-center text-gray-700">Velocity: {report.report.throwingRatings.Velocity}mph</p>
                            <h3 className="col-span-3 text-xl text-gray-700 underline pl-1">Hitting</h3>
                            <p className="text-center text-gray-700">Contact: {report.report.hittingRatings.Contact}</p>
                            <p className="text-center text-gray-700">Power: {report.report.hittingRatings.Power}</p>
                            <p className="text-center text-gray-700">Consistency: {report.report.hittingRatings.Consistency}</p>
                            <p className="text-center text-gray-700">Barrel Control: {report.report.hittingRatings["Barrel Control"]}</p>
                            <p className="text-center text-gray-700">Mechanics: {report.report.hittingRatings.Mechanics}</p>
                            <p className="text-center text-gray-700">Tee Exit Velo: {report.report.hittingRatings["Tee Exit Velo"]}mph</p>
                            {report.report.pitchingRatings && (
                                <>
                                    <h3 className="col-span-3 text-xl text-gray-700 underline pl-1">Pitching</h3>
                                    <p className="text-center text-gray-700">Upper Body Mechanics: {report.report.pitchingRatings["Upper Body Mechanics"]}</p>
                                    <p className="text-center text-gray-700">Lower Body Mechanics: {report.report.pitchingRatings["Lower Body Mechanics"]}</p>
                                    <p className="text-center text-gray-700">Arm Path: {report.report.pitchingRatings["Arm Path"]}</p>
                                    <DisplayMetrics pitchMetrics={report.report.pitchMetrics} />
                                </>
                            )}
                            {report.report.catchingRatings && (
                                <>
                                    <h3 className="col-span-3 text-xl text-gray-700 underline pl-1">Catching</h3>
                                    <p className="text-center text-gray-700">Receiving: {report.report.catchingRatings.Recieving}</p>
                                    <p className="text-center text-gray-700">Blocking: {report.report.catchingRatings.Blocking}</p>
                                    <p className="text-center text-gray-700">Ball Handling: {report.report.catchingRatings["Ball Handling"]}</p>
                                    <p className="text-center text-gray-700">Throwing Footwork: {report.report.catchingRatings["Throwing Footwork"]}</p>
                                    <p className="text-center text-gray-700">Pop Time: {report.report.catchingRatings["Pop Time"]}</p>
                                    <p className="text-center text-gray-700">Arm Strength: {report.report.catchingRatings["Arm Strength"]}</p>
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

export default SkillsReport;