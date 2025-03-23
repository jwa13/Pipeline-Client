import React, { useState, useEffect } from "react";

const Goal = ({ goals }) => {
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
    if(goals[0].active) {
        return (
            <>
                {goals.map((item, index) => {
                    return (
                        <div key={index} className="shadow-md p-2 grid grid-cols-3 pb-2 ml-1">
                            <h2 className="text-gray-700 font-bebas-neue text-2xl col-span-full flex justify-center pb-1">{item.content}</h2>
                            <h2 className="text-gray-700 font-bebas-neue flex justify-center">Type: <span className="pl-1" style={{ fontFamily: 'Arial' }}>{item.type}</span></h2>
                            <h2 className="text-gray-700 font-bebas-neue flex justify-center">Created On: <span className="pl-1" style={{ fontFamily: 'Arial' }}>{formatDate(item.dateCreated)}</span></h2>
                            <h2 className="text-gray-700 font-bebas-neue flex justify-center">Days Left: <span className="pl-1"  style={{ fontFamily: 'Arial' }}>{daysLeft(item.targetCompletion)}</span></h2>
                        </div>
                    )
                })}
            </>
        );
    }
    if(goals[0].active == false) {
        return (
            <>
                {goals.map((item, index) => {
                    return (
                        <div key={index} className="shadow-md p-2 grid grid-cols-3 pb-2 ml-1">
                            <h2 className="text-gray-700 font-bebas-neue text-2xl col-span-full flex justify-center pb-1">{item.content}</h2>
                            <h2 className="text-gray-700 font-bebas-neue flex justify-center">Type: <span className="pl-1" style={{ fontFamily: 'Arial' }}>{item.type}</span></h2>
                            <h2 className="text-gray-700 font-bebas-neue flex justify-center">Created On: <span className="pl-1" style={{ fontFamily: 'Arial' }}>{formatDate(item.dateCreated)}</span></h2>
                            <h2 className="text-gray-700 font-bebas-neue flex justify-center">Achieved: <span className="pl-1" style={{ fontFamily: 'Arial' }}></span></h2>
                        </div>
                    )
                })}
            </>
        )
    }
    
}

export default Goal;