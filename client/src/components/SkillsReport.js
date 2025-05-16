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

    const getColor = (metric) => {
        if(metric >= 1 && metric <= 3) {
            return 'bg-red-400';
        } else if(metric >=4 && metric <= 7) {
            return 'bg-yellow-400';
        } else if(metric >= 8) {
            return 'bg-green-400';
        }
        return 'bg-gray-400';
    }

    function DisplayMetrics({pitchMetrics}) {
        const pitches = Object.entries(pitchMetrics);
        // console.log(pitchMetrics);
        return (
            <>
                {pitches.map(([pitchType, metrics]) => (
                    <>
                        <div className="pb-2 shadow-md bg-gray-200 mb-2">
                            <h4 className="text-center text-md text-gray-700 py-1">{pitchType}</h4>
                            <div className="grid grid-cols-2">
                                <p className="text-gray-700 text-center">Max Velo: {metrics.MaxVelo}</p>
                                <p className="text-gray-700 text-center">Avg Velo: {metrics.AverageVelo}</p>
                                <p className="text-gray-700 text-center">Command: <span className={`${getColor(metrics.Command)} p-1 rounded text-white`}>{metrics.Command}</span></p>
                                <p className="text-gray-700 text-center">Movement: <span className={`${getColor(metrics.Movement)} p-1 rounded text-white`}>{metrics.Movement}</span></p>
                            </div>
                        </div>
                    </>
                ))}
            </>
        )
    }

    const VisualRating = ({value, label, max = 10}) => {
        const clampedValue = Math.max(1, Math.min(value, max));
        const percentage = max > 1 ? ((clampedValue - 0.75) / (max - 0.6)) * 100 : 50;

        const getColor = (val, maxValue) => {
            const ratio = maxValue > 1 ? (val - 1) / (maxValue - 1) : 0.5;
            if(ratio < 0.1) return 'bg-red-600';
            if(ratio < 0.2) return 'bg-red-500';
            if(ratio < 0.3) return 'bg-orange-500';
            if(ratio < 0.4) return 'bg-amber-500';
            if(ratio < 0.5) return 'bg-yellow-400';
            if(ratio < 0.6) return 'bg-yellow-300';
            if(ratio < 0.7) return 'bg-lime-400';
            if(ratio < 0.8) return 'bg-green-400';
            if(ratio < 0.9) return 'bg-green-500';
            return 'bg-green-600';
        }

        const dotColor = getColor(clampedValue, max);
        const dotSize = 1.5;
        const dotOffset = dotSize / 2;

        return (
            <div className="mb-6 w-full px-2">
                {label && <p className="text-sm font-medium text-gray-700 mb-1.5">{label}</p>}
                <div className="relative w-full h-6 flex items-center">
                    <div className="h-2.5 w-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 rounded-full shadow-inner"></div>
                    <div className="absolute top-1/2 transform -translate-y-1/2" style={{left: `calc(${percentage}% - ${dotOffset}rem)`,}}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg transition-all duration-300 ease-in-out ${dotColor}`} title={`Value: ${clampedValue}`}>{clampedValue}</div>
                    </div>
                </div>
            </div>
        )
    }

    const metricAgeData = {
        pitchingVelocity: {
            9: {minDisplayValue: 37, maxDisplayValue: 58, ranges: {belowUpper: 42, averageUpper: 46}},
            10: {minDisplayValue: 37, maxDisplayValue: 58, ranges: {belowUpper: 42, averageUpper: 46}},
            11: {minDisplayValue: 43, maxDisplayValue: 65, ranges: {belowUpper: 46, averageUpper: 59}},
            12: {minDisplayValue: 43, maxDisplayValue: 65, ranges: {belowUpper: 46, averageUpper: 59}},
            13: {minDisplayValue: 54, maxDisplayValue: 78, ranges: {belowUpper: 57, averageUpper: 68}},
            14: {minDisplayValue: 62, maxDisplayValue: 80, ranges: {belowUpper: 64, averageUpper: 72}},
            15: {minDisplayValue: 65, maxDisplayValue: 85, ranges: {belowUpper: 69, averageUpper: 78}},
            16: {minDisplayValue: 68, maxDisplayValue: 90, ranges: {belowUpper: 73, averageUpper: 78}},
            17: {minDisplayValue: 70, maxDisplayValue: 99, ranges: {belowUpper: 73, averageUpper: 82}},
            18: {minDisplayValue: 70, maxDisplayValue: 99, ranges: {belowUpper: 75, averageUpper: 85}},
        },
        exitVelocity: {
            8: {minDisplayValue: 40, maxDisplayValue: 65, ranges: {belowUpper: 45, averageUpper: 55}},
            9: {minDisplayValue: 40, maxDisplayValue: 65, ranges: {belowUpper: 45, averageUpper: 55}},
            10: {minDisplayValue: 40, maxDisplayValue: 65, ranges: {belowUpper: 45, averageUpper: 55}},
            11: {minDisplayValue: 46, maxDisplayValue: 70, ranges: {belowUpper: 55, averageUpper: 60}},
            12: {minDisplayValue: 46, maxDisplayValue: 70, ranges: {belowUpper: 55, averageUpper: 60}},
            13: {minDisplayValue: 56, maxDisplayValue: 74, ranges: {belowUpper: 60, averageUpper: 70}},
            14: {minDisplayValue: 56, maxDisplayValue: 81, ranges: {belowUpper: 66, averageUpper: 73}},
            15: {minDisplayValue: 60, maxDisplayValue: 85, range: {belowUpper: 66, averageUpper: 76}},
            16: {minDisplayValue: 65, maxDisplayValue: 90, range: {belowUpper: 70, averageUpper: 79}},
            17: {minDisplayValue: 70, maxDisplayValue: 105, range: {belowUpper: 77, averageUpper: 85}},
            18: {minDisplayValue: 75, maxDisplayValue: 120, range: {belowUpper: 80, averageUpper: 88}},

        }
    }

    const VelocityRange = ({label, value, age, metric}) => {
        const metricConfig = metricAgeData[metric]?.[age];
        const {minDisplayValue, maxDisplayValue, ranges} = metricConfig;

        const clampedGaugeValue = Math.max(minDisplayValue, Math.min(value, maxDisplayValue));
        const totalRange = maxDisplayValue - minDisplayValue;
        const belowWidthPercent = totalRange > 0 ? ((ranges.belowUpper - minDisplayValue) / totalRange) * 100 : 0;
        const averageWidthPercent = totalRange > 0 ? ((ranges.averageUpper - ranges.belowUpper) / totalRange) * 100 : 0;
        const aboveWidthPercent = totalRange > 0 ? ((maxDisplayValue - ranges.averageUpper) / totalRange) * 100 : 0;
        const dotPositionPercent = totalRange > 0 ? ((clampedGaugeValue - minDisplayValue) / totalRange) * 100 : 50;
        const dotSize = 2;
        const dotOffset = dotSize / 2;

        return (
            <div className="mb-2 w-full px-2">
                {label && <p className="text-sm font-medium text-gray-700 mb-2">{label}: <span className="font-semibold">{value}mph</span></p>}
                <div className="relative w-full h-8 flex items-center">
                    <div className="h-3 w-full flex rounded-full overflow-hidden shadow-inner">
                        <div className="bg-red-400 h-full" style={{width: `${belowWidthPercent}%`}} title={`Below Average (Up to ${ranges.belowUpper}mph)`}></div>
                        <div className="bg-yellow-400 h-full" style={{width: `${averageWidthPercent}%`}} title={`Average (${ranges.belowUpper}mph - ${ranges.averageUpper}mph)`}></div>
                        <div className="bg-green-400 h-full" style={{width: `${aboveWidthPercent}%`}} title={`Above Average (Over ${ranges.averageUpper}mph)`}></div>
                    </div>
                    <div className="absolute top-1/2 transform -translate-y-1/2" style={{left: `calc(${dotPositionPercent}% - ${dotOffset}rem)`, zIndex: 10}}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg bg-slate-700 hover:bg-slate-800 transition-colors duration-150`} title={`Current: ${value}mph`}>{value}</div>
                    </div>
                </div>
                <div className="flex justify-between text-xs text-gray-600 mt-1 px-1"><span>{minDisplayValue}mph</span><span>{maxDisplayValue}mph</span></div>
            </div>
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
                        <div className="bg-gray-500 rounded-full h-0.5"></div>
                        <div className="grid grid-cols-2 gap-x-2">
                            <h3 className="col-span-2 text-2xl text-gray-700 pl-1 flex items-center justify-center pt-2 font-bebas-neue">Infield</h3>
                            <VisualRating label={"Footwork"} value={report.report.infieldRatings.Footwork} />
                            <VisualRating label={"Glovework"} value={report.report.infieldRatings.Glovework} />
                            <VisualRating label={"Arm Strength"} value={report.report.infieldRatings["Arm Strength"]} />
                            <VisualRating label={"Range/Routes/Speed"} value={report.report.infieldRatings["Range/Routes/Speed"]} />
                            <div className="col-span-2">
                                <VisualRating label={"Overall"} value={report.report.infieldAverage} />
                            </div>
                            <div className="col-span-2">
                                <p className="text-gray-700 pl-2 pb-1 font-semibold">Notes: {report.report.infieldNotes}</p>
                            </div>

                            <div className="col-span-2 bg-gray-500 rounded-full h-0.5"></div>
                            <h3 className="col-span-2 text-2xl text-gray-700 pl-1 flex items-center justify-center pt-2 font-bebas-neue">Outfield</h3>
                            <VisualRating label={"Footwork"} value={report.report.outfieldRatings.Footwork} />
                            <VisualRating label={"Glovework"} value={report.report.outfieldRatings.Glovework} />
                            <VisualRating label={"Arm Strength"} value={report.report.outfieldRatings["Arm Strength"]} />
                            <VisualRating label={"Range/Routes/Speed"} value={report.report.outfieldRatings["Range/Routes/Speed"]} />
                            <div className="col-span-2">
                                <VisualRating label={"Overall"} value={report.report.outfieldAverage} />
                            </div>
                            <div className="col-span-2">
                                <p className="text-gray-700 pl-2 pb-1 font-semibold">Notes: {report.report.outfieldNotes}</p>
                            </div>

                            <div className="col-span-2 bg-gray-500 rounded-full h-0.5"></div>
                            <h3 className="col-span-2 text-2xl text-gray-700 pl-1 flex items-center justify-center pt-2 font-bebas-neue">Throwing</h3>
                            <VisualRating label={"Mechanics"} value={report.report.throwingRatings.Mechanics} />
                            <VisualRating label={"Arm Path"} value={report.report.throwingRatings["Arm Path"]} />
                            <VisualRating label={"Arm Strength"} value={report.report.throwingRatings["Arm Strength"]} />
                            <VisualRating label={"Accuracy"} value={report.report.throwingRatings.Accuracy} />
                            {/* <p className="text-center text-gray-700">Velocity: {report.report.throwingRatings.Velocity}mph</p> */}
                            <VelocityRange label={'Velocity'} value={report.report.throwingRatings.Velocity} age={report.report.athleteAge} metric={'pitchingVelocity'} />
                            <div className="col-span-2">
                                <VisualRating label={"Overall"} value={report.report.throwingAverage} />
                            </div>
                            <div className="col-span-2">
                                <p className="text-gray-700 pl-2 pb-1 font-semibold">Notes: {report.report.throwingNotes}</p>
                            </div>

                            <div className="col-span-2 bg-gray-500 rounded-full h-0.5"></div>
                            <h3 className="col-span-2 text-2xl text-gray-700 pl-1 flex items-center justify-center pt-2 font-bebas-neue">Hitting</h3>
                            <VisualRating label={"Contact"} value={report.report.hittingRatings.Contact} />
                            <VisualRating label={"Power"} value={report.report.hittingRatings.Power} />
                            <VisualRating label={"Consistency"} value={report.report.hittingRatings.Consistency} />
                            <VisualRating label={"Barrel Control"} value={report.report.hittingRatings["Barrel Control"]} />
                            <VisualRating label={"Mechanics"} value={report.report.hittingRatings.Mechanics} />
                            {/* <p className="text-center text-gray-700">Tee Exit Velo: {report.report.hittingRatings["Tee Exit Velo"]}mph</p> */}
                            <VelocityRange label={'Tee Exit Velo'} value={report.report.hittingRatings['Tee Exit Velo']} age={report.report.athleteAge} metric={'exitVelocity'} />
                            <div className="col-span-2">
                                <VisualRating label={"Overall"} value={report.report.hittingAverage} />
                            </div>
                            <div className="col-span-2">
                                <p className="text-gray-700 pl-2 pb-1 font-semibold">Notes: {report.report.hittingNotes}</p>
                            </div>
                            {report.report.pitchingRatings && (
                                <>
                                    <div className="col-span-2 bg-gray-500 rounded-full h-0.5"></div>
                                    <h3 className="col-span-2 text-2xl text-gray-700 pl-1 flex items-center justify-center pt-2 font-bebas-neue">Pitching</h3>
                                    <VisualRating label={"Upper Mech"} value={report.report.pitchingRatings["Upper Body Mechanics"]} />
                                    <VisualRating label={"Lower Mech"} value={report.report.pitchingRatings["Lower Body Mechanics"]} />
                                    <VisualRating label={"Arm Path"} value={report.report.pitchingRatings["Arm Path"]} />
                                    <div className="col-span-2">
                                        <VisualRating label={"Overall"} value={report.report.pitchingAverage} />
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-gray-700 pl-2 pb-1 font-semibold">Notes: {report.report.pitchingNotes}</p>
                                    </div>
                                    {/* {console.log(report.report.pitchMetrics)} */}
                                    <DisplayMetrics pitchMetrics={report.report.pitchMetrics} />
                                </>
                            )}
                            {report.report.catchingRatings && (
                                <>
                                    <div className="col-span-2 bg-gray-500 rounded-full h-0.5"></div>
                                    <h3 className="col-span-2 text-2xl text-gray-700 pl-1 flex items-center justify-center pt-2 font-bebas-neue">Catching</h3>
                                    <VisualRating label={"Receiving"} value={report.report.catchingRatings.Recieving} />
                                    <VisualRating label={"Blocking"} value={report.report.catchingRatings.Blocking} />
                                    <VisualRating label={"Ball Handling"} value={report.report.catchingRatings["Ball Handling"]} />
                                    <VisualRating label={"Throwing Footwork"} value={report.report.catchingRatings["Throwing Footwork"]} />
                                    <VisualRating label={"Arm Strength"} value={report.report.catchingRatings["Arm Strength"]} />
                                    <p className="text-center text-gray-700">Pop Time: {report.report.catchingRatings["Pop Time"]}</p>
                                    <div className="col-span-2">
                                        <VisualRating label={"Overall"} value={report.report.catchingAverage} />
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-gray-700 pl-2 pb-1 font-semibold">Notes: {report.report.catchingNotes}</p>
                                    </div>
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