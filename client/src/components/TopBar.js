import React, { useState, useEffect} from "react";

const TopBar = ({pageName, onLogout}) => {
    const [isVisible, setIsVisible] = useState(true);
    const [prevScrollPosition, setPrevScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPosition = window.scrollY;
            const visible = prevScrollPosition > currentScrollPosition || currentScrollPosition < 10;

            setIsVisible(visible);
            setPrevScrollPosition(currentScrollPosition);
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPosition]);

    return (
        <div className={`bg-white p-4 shadow-lg transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className="flex justify-between items-center">
                <h1 className="text-4xl text-black font-bebas-neue font-semibold tracking-widest pl-2">{pageName}</h1>
                <h2 className="text-xl text-white font-bebas-neue tracking-wide bg-black p-2 rounded">Give 100% to be the 1%</h2>
                <button onClick={onLogout} className="text-black hover:underline bg-gray-200 rounded p-1">Logout</button>
            </div>
        </div>
    );
}

export default TopBar;