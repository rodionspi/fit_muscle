'use client';

import { useUser } from '@/contexts/UserContext';
import React from 'react';
import CalendarType from '@/types/CalendarType';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

const Calendar = () => {
    const {userData, setUserData} = useUser();
    const [calendar, setCalendar] = React.useState<CalendarType>({});

    const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);



    return (
        <div>
            <div className='grid grid-cols-2 gap-4 m-auto justify-items-center w-4/6'>
                <section className="p-4 max-w-md rounded-lg shadow-md bg-gray-500">
                <div className="grid grid-cols-7 gap-2 text-center">
                    {daysOfWeek.map((day) => (
                    <header key={day} className="font-bold">
                        {day}
                    </header>
                    ))}
                    {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} className="text-gray-300">
                    </div>
                    ))}
                    {daysArray.map((day) => (
                    <time key={day} className="p-2 border rounded-lg bg-gray-700 hover:bg-gray-200 hover:text-gray-700">
                        {day}
                    </time>
                    ))}
                </div>
                </section>
                <aside className="p-4 w-96 rounded-lg shadow-md bg-gray-500">
                    <h2 className="text-xl font-bold mb-4">Today's Schedule</h2>
                    {/* <ul className="space-y-2">
                        <li className="p-2 border rounded-lg bg-gray-700 hover:bg-gray-200 hover:text-gray-700">
                        <time className="font-semibold">09:00 AM:</time> Meeting with team
                        </li>
                    </ul> */}
                </aside>
            </div>
            <div className='flex justify-center mt-4'>
                <button 
                    className='py-2 px-4 bg-slate-500 text-white font-semibold rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2'
                    onClick={() => setUserData({...userData, calendar: calendar})}
                >Submit</button>
            </div>
        </div>
    );
};

export default Calendar;