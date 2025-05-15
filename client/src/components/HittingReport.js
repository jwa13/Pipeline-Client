import React, { useState, useEffect } from "react";

const HittingReport = ({ report, accType }) => {
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

    const getGoodLoad = (report) => {
        const good = [];
        for(const key in report.report.loadRatings) {
            if(report.report.loadRatings[key] === "good") {
                good.push(key);
            }
        }
        if(good.length == 0) {
            return "N/A";
        }
        return good.join(", ");
    }
    const getAvgLoad = (report) => {
        const avg = [];
        for(const key in report.report.loadRatings) {
            if(report.report.loadRatings[key] === "average") {
                avg.push(key);
            }
        }
        if(avg.length == 0) {
            return "N/A"
        }
        return avg.join(", ");
    }
    const getImprovementLoad = (report) => {
        const nI = [];
        for(const key in report.report.loadRatings) {
            if(report.report.loadRatings[key] === "needs improvement") {
                nI.push(key);
            }
        }
        if(nI.length == 0) {
            return "N/A";
        }
        return nI.join(", ");
    }

    const getGoodSwing = (report) => {
        const good = [];
        for(const key in report.report.swingRatings) {
            if(report.report.swingRatings[key] === "good") {
                good.push(key);
            }
        }
        if(good.length == 0){
            return "N/A";
        }
        return good.join(", ");
    }
    const getBadSwing = (report) => {
        const bad = [];
        for(const key in report.report.swingRatings) {
            if(report.report.swingRatings[key] === "bad") {
                bad.push(key);
            }
        }
        if(bad.length == 0) {
            return "N/A";
        }
        return bad.join(", ");
    }

    return (
        <>
            {!moreData && (
                <div className="flex flex-wrap items-center p-1">
                    {accType === 'coach' && (<h2 className="mr-4 text-black">Athlete Name: <span className="text-gray-600">{report.athleteName}</span></h2>)}
                    {accType === 'athlete' && (<h2 className="mr-4 text-black">Coach: <span className="text-gray-600">{report.coachName}</span></h2>)}
                    <h2 className="mr-4 text-black">Type: <span className="text-gray-600">Hitting</span></h2>
                    <h2 className="mr-4 text-gray-600">{formatDate(report.report.dateCreated)}</h2>
                    <button className="mr-2 text-gray-600 hover:underline" onClick={handleSeeMore}>See More</button>
                </div>
            )}
            {moreData && (
                <div>
                    <div className="grid grid-cols-1">
                        <h2 className="text-gray-700 text-2xl col-span-1 text-center"><span className="font-bold">Hitting</span> Report for <span className="font-bold">{report.athleteName}</span> {accType === 'athlete' && (<>by Coach <span className="font-bold">{report.coachName}</span></>)} on <span className="font-bold">{formatDate(report.report.dateCreated)}</span></h2>
                        <div className="bg-gray-500 rounded-full h-0.5"></div>
                        <div className="grid grid-cols-3 gap-x-2">
                            <h3 className="col-span-3 text-2xl text-gray-700 pl-1 flex items-center justify-center pt-2 font-bebas-neue">Load</h3>
                            <h4 className="text-center text-green-600 font-bold">Strength</h4>
                            <h4 className="text-center text-yellow-600 font-bold">Developing</h4>
                            <h4 className="text-center text-red-600 font-bold">Weakness</h4>
                            <p className="text-center text-gray-700">{getGoodLoad(report)}</p>
                            <p className="text-center text-gray-700">{getAvgLoad(report)}</p>
                            <p className="text-center text-gray-700">{getImprovementLoad(report)}</p>
                            <h3 className="col-span-3 text-2xl text-gray-700 pl-1 flex items-center justify-center pt-2 font-bebas-neue">Swing</h3>
                            <div className="col-span-3 grid grid-cols-2 gap-x-2">
                                <h4 className="text-center text-green-600 font-bold">Good</h4>
                                <h4 className="text-center text-red-600 font-bold">Needs Work</h4>
                                <p className="text-center text-gray-700">{getGoodSwing(report)}</p>
                                <p className="text-center text-gray-700">{getBadSwing(report)}</p>
                            </div>
                            <h3 className="col-span-3 text-2xl text-gray-700 pl-1 flex items-center justify-center pt-2 font-bebas-neue">Metrics</h3>
                            <div className="col-span-3 grid grid-cols-2 gap-x-2">
                                <h4 className="text-center text-gray-700 font-bold">Tee</h4>
                                <h4 className="text-center text-gray-700 font-bold">Front Toss</h4>
                                <p className="text-center text-gray-700">Exit Velo: {report.report.evTee}</p>
                                <p className="text-center text-gray-700">Exit Velo: {report.report.evFrontToss}</p>
                                <p className="text-center text-gray-700">Distance: {report.report.distanceTee}</p>
                                <p className="text-center text-gray-700">Distance: {report.report.distanceFrontToss}</p>
                            </div>
                        </div>
                        <button className="text-gray-600 hover:underline" onClick={handleSeeLess}>See Less</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default HittingReport;