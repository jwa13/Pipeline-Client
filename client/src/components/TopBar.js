import React, { useState, useEffect} from "react";

const TopBar = ({ pageName, onLogout }) => {
    return (
        <div className="bg-white p-4 shadow-xl border-b-2 border-gray-500 w-full">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl text-black font-bebas-neue font-semibold tracking-widest md:pl-2">{pageName}</h1>
                <h2 className="text-lg md:text-xl text-white font-bebas-neue tracking-wide bg-black p-2 rounded">Give 100% to be the 1%</h2>
                <button onClick={onLogout} className="text-black hover:underline bg-gray-200 rounded p-1">Logout</button>
            </div>
        </div>
    );
}

export default TopBar;