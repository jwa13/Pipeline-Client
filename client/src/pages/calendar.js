import React from "react";
import { EventCalendar } from "../components/calendar";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import { CalendarProvider } from "@/components/calendar/calendar-context";

export default function calendar() {
    const handleLogout = () => {
        if(typeof window != 'undefined') {
            localStorage.removeItem('jwt');
        }
        router.push("/login");
    }

    const mockEvents = [
        {
            id: "1",
            title: "Day 1",
            description: "Thowing",
            start: new Date("2025-08-05"),
            end: new Date("2025-08-09"),
            allDay: true,
            color: "gold"
        }
    ]

    return (
        <div className="flex min-h-screen">
            <Navbar />
            <div className="flex flex-col pb-16 md:pb-0 flex-1 md:ml-64">
                <TopBar pageName={"Calendar"} onLogout={handleLogout} />
                <div className="flex-1 p-4 bg-white">
                    <CalendarProvider>
                        <EventCalendar events={mockEvents}/>
                    </CalendarProvider>
                </div>
            </div>
        </div>
    )
}