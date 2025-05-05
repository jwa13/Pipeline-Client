import React from "react";
import { HeartIcon } from "@heroicons/react/24/solid";

const HealthAlert = () => {
    return (
        <>
            <div className="bg-white border-4 border-red-600 text-red-400 mt-3 md:px-10 md:py-3 md:m-4 md:mx-10 md:my-5 rounded relative" role="alert">
                <div className="grid grid-flow-col-dense items-center">
                    <a href="/health"><HeartIcon className="md:mx-auto h-10 md:pr-10 pl-3 md:pl-0 pr-1 md:pr-0" /></a>
                    <strong className="font text-gray-500 text-md md:text-xl font-bebas-neue tracking-wide pl-2 pt-1">You have not filled out your health report yet, please click on the heart to be directed to the health form!</strong>
                </div>
            </div>
        </>
    );
}

export default HealthAlert;