import React from "react";
import { HeartIcon } from "@heroicons/react/24/solid";

const HealthAlert = () => {
    return (
        <>
            <div className="bg-white border-4 border-red-600 text-red-400 px-10 py-3 m-4 md:mx-10 md:my-10 rounded relative" role="alert">
                <div className="grid grid-flow-col-dense items-center">
                    <a href="/health"><HeartIcon className="h-10 w-10 " /></a>
                    <strong className="font text-gray-500 text-xl font-bebas-neue tracking-wide pl-2">You have not filled out your health report yet, please click on the heart to be directed to the health form!</strong>
                </div>
            </div>
        </>
    );
}

export default HealthAlert;