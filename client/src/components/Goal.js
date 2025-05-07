import React, { useState, useEffect } from "react";

const Goal = ({ goals, handleComplete }) => {
    const formatDate = (unformattedDate) => {
        const date = new Date(unformattedDate);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
        return date.toLocaleDateString(undefined, options);
    }

    const daysLeft = (end) => {
        const now = new Date();
        const future = new Date(end);
        const diff = future - now;
        const daysLeft = Math.ceil(diff / (1000*60*60*24));
        return daysLeft;
    }

    return (
        <>
            {goals.map((item) => {
                const currentGoal = item.goal;
                return (
                    <div key={item.id} className={`shadow-md p-2 pb-2 mb-2 md:ml-1 ${(currentGoal.active === false && currentGoal.status === 'expired') ? 'shadow-red-500 bg-red-100' : 'bg-gray-200'} ${(currentGoal.active === false && currentGoal.status === 'achieved') ? 'shadow-green-500 bg-green-100' : ''}`}>
                        <div className="grid grid-cols-2 md:grid-cols-3">
                            <h2 className={`text-gray-700 font-bebas-neue text-xl md:text-2xl col-span-full flex justify-center md:pb-1`}>{currentGoal.content}</h2>
                            <h2 className={`text-gray-700 font-bebas-neue flex justify-center md:text-lg ${handleComplete || currentGoal.active === false ? 'hidden md:block' : ''}`}>Type: <span className="pl-1" style={{ fontFamily: 'Arial' }}>{currentGoal.type}</span></h2>
                            <h2 className={`text-gray-700 font-bebas-neue flex justify-center text-sm md:text-lg ${currentGoal.active === true ? 'hidden md:block' : ''}`}>Created: <span className="pl-1" style={{ fontFamily: 'Arial' }}>{formatDate(currentGoal.dateCreated)}</span></h2>
                            {currentGoal.active ? (
                                <h2 className="text-gray-700 font-bebas-neue flex justify-center text-sm md:text-lg">Days Left: <span className="pl-1" style={{ fontFamily: 'Arial' }}>{daysLeft(currentGoal.targetCompletion)}</span></h2>
                            ) : (
                                <>
                                    {currentGoal.status === 'expired' && (
                                        <h2 className="text-gray-700 font-bebas-neue flex justify-center text-sm md:text-lg">Expired: <span className="pl-1" style={{ fontFamily: 'Arial' }}>{formatDate(currentGoal.achieved)}</span></h2>
                                    )}
                                    {currentGoal.status === 'achieved' && (
                                        <h2 className="text-gray-700 font-bebas-neue flex justify-center text-sm md:text-lg">Achieved: <span className="pl-1" style={{ fontFamily: 'Arial' }}>{formatDate(currentGoal.achieved)}</span></h2>
                                    )}
                                </>
                            )}
                            {currentGoal.active && handleComplete &&(
                                  <button onClick={() => handleComplete(item.id)} className="bg-[hsl(43.3,46,64)] mx-2 md:mx-0 md:p-1 text-white border-2 border-white text-xs md:col-span-full md:flex md:justify-center">Mark as Complete</button>
                            )}
                        </div>
                    </div>
                )
            })}
        </>
    ) 
}

export default Goal;