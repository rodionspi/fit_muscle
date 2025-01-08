import React from 'react';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

const Calendar = () => {
    const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
        <div className='grid grid-cols-2 gap-4 m-auto justify-items-center'>
            <div className="p-4 max-w-md bg-white rounded-lg shadow-md">
                <div className="grid grid-cols-7 gap-2 text-center">
                    {daysOfWeek.map((day) => (
                        <div key={day} className="font-bold text-gray-700">
                            {day}
                        </div>
                    ))}
                    {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                        <div key={`empty-${i}`} className="text-gray-300">
                        </div>
                    ))}
                    {daysArray.map((day) => (
                        <div key={day} className="p-2 border rounded-lg bg-gray-700 hover:bg-gray-200">
                            {day}
                        </div>
                    ))}
                </div>
            </div>
            <div className="p-4 max-w-md bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-700 mb-4">Today's Schedule</h2>
                <ul className="space-y-2">
                    <li className="p-2 border rounded-lg bg-gray-100 hover:bg-gray-200">
                        <span className="font-semibold">09:00 AM:</span> Meeting with team
                    </li>
                    <li className="p-2 border rounded-lg bg-gray-100 hover:bg-gray-200">
                        <span className="font-semibold">11:00 AM:</span> Code review
                    </li>
                    <li className="p-2 border rounded-lg bg-gray-100 hover:bg-gray-200">
                        <span className="font-semibold">01:00 PM:</span> Lunch break
                    </li>
                    <li className="p-2 border rounded-lg bg-gray-100 hover:bg-gray-200">
                        <span className="font-semibold">03:00 PM:</span> Project work
                    </li>
                    <li className="p-2 border rounded-lg bg-gray-100 hover:bg-gray-200">
                        <span className="font-semibold">05:00 PM:</span> Wrap up
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Calendar;