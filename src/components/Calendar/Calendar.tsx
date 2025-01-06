import React from 'react';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

const Calendar = () => {
    const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
        <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <div className="grid grid-cols-7 gap-2 text-center">
                {daysOfWeek.map((day) => (
                    <div key={day} className="font-bold text-gray-700">
                        {day}
                    </div>
                ))}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} className="text-gray-300">
                        {/* Пустые ячейки для выравнивания дней */}
                    </div>
                ))}
                {daysArray.map((day) => (
                    <div key={day} className="p-2 border rounded-lg hover:bg-gray-200">
                        {day}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;