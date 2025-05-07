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
                    <div key={item.id} className="shadow-md p-2 pb-2 md:ml-1">
                        <div className="grid grid-cols-3">
                            <h2 className="text-gray-700 font-bebas-neue text-2xl col-span-full flex justify-center pb-1">{currentGoal.content}</h2>
                            <h2 className="text-gray-700 font-bebas-neue flex justify-center">Type: <span className="pl-1" style={{ fontFamily: 'Arial' }}>{currentGoal.type}</span></h2>
                            <h2 className="text-gray-700 font-bebas-neue flex justify-center">Created On: <span className="pl-1" style={{ fontFamily: 'Arial' }}>{formatDate(currentGoal.dateCreated)}</span></h2>
                            {currentGoal.active ? (
                                <h2 className="text-gray-700 font-bebas-neue flex justify-center">Days Left: <span className="pl-1" style={{ fontFamily: 'Arial' }}>{daysLeft(currentGoal.targetCompletion)}</span></h2>
                            ) : (
                                <h2 className="text-gray-700 font-bebas-neue flex justify-center">Achieved: <span className="pl-1" style={{ fontFamily: 'Arial' }}></span></h2>
                            )}
                        </div>
                        {currentGoal.active && handleComplete &&(
                            <>
                                <button onClick={() => handleComplete(item.id)}>Mark as Complete</button>
                            </>
                        )}
                    </div>
                )
            })}
        </>
    ) 
}

export default Goal;