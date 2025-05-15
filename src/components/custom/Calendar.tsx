'use client';

import { useUser } from '@/contexts/UserContext';
import React, {useState, useEffect} from 'react';
import CalendarType from '@/types/CalendarType';
import { nanoid } from 'nanoid';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = Array.from({ length: 12 }, (_, i) => 
    new Date(0, i).toLocaleString('default', { month: 'long' })
);
const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();


const Calendar = () => {
    const {userData, setUserData} = useUser();
    const [calendar, setCalendar] = React.useState<CalendarType>({});
    const [selectedYear, setSelectedYear] = React.useState<number>();
    const [selectedMonth, setSelectedMonth] = React.useState<string>('');
    const [selectedDate, setSelectedDate] = React.useState<number | null>();
    const [taskDescription, setTaskDescription] = useState<string>('');

    const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    useEffect(() => {
        setSelectedMonth(months[new Date().getMonth()]);
        setSelectedYear(new Date().getFullYear());
    }, []);

    return (
        <div>
            <div className='grid grid-cols-2 gap-4 m-auto justify-items-center w-4/6'>
                <section className="p-4 max-w-md rounded-lg shadow-md bg-gray-500">
                <div className="flex justify-between items-center mb-4">
                    <button 
                        className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() => {
                            const currentMonthIndex = months.indexOf(selectedMonth);
                            const prevMonthIndex = (currentMonthIndex - 1 + months.length) % months.length;
                            setSelectedMonth(months[prevMonthIndex]);
                            if (prevMonthIndex === 11 && selectedYear !== undefined) {
                                setSelectedYear(selectedYear - 1);
                            }
                        }}
                    >
                        &lt;
                    </button>
                    <h2 className="text-xl font-bold">
                        {selectedMonth} {selectedYear}
                    </h2>
                    <button 
                        className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() => {
                            const currentMonthIndex = months.indexOf(selectedMonth);
                            const nextMonthIndex = (currentMonthIndex + 1 + months.length) % months.length;
                            setSelectedMonth(months[nextMonthIndex]);
                            if (nextMonthIndex === 0 && selectedYear !== undefined) {
                                setSelectedYear(selectedYear + 1);
                            }
                        }}
                    >
                        &gt;
                    </button>
                </div>
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
                        <time 
                            key={day} 
                            className="p-2 border rounded-lg bg-gray-700 hover:bg-gray-200 hover:text-gray-700"
                            onClick={() => {
                                setSelectedDate(day);
                            }}
                            >
                            {day}
                        </time>
                    ))}
                </div>
                </section>
                <aside className="p-4 w-96 rounded-lg shadow-md bg-gray-500">
                    <h2 className="text-xl font-bold mb-4">Today&apos;s Schedule</h2>
                    <ul className="space-y-2">
                        {/* <li className="p-2 border rounded-lg bg-gray-700 hover:bg-gray-200 hover:text-gray-700">
                        <time className="font-semibold">09:00 AM:</time> Meeting with team
                        </li> */}
                        <li className="p-2 border rounded-lg bg-gray-700">
                            <div className="text-lg font-semibold text-white">
                                {selectedDate ? `${selectedDate} ${selectedMonth} ${selectedYear}` : 'Select a date'}
                            </div>
                            <textarea 
                                className="w-5/6 p-2 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                placeholder="Add new task"
                                rows={3}
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                            />
                            <button 
                                className="ml-2 p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                                onClick={() => {
                                    setCalendar((prevCalendar: CalendarType)=> ({
                                        ...prevCalendar,
                                        [`${selectedYear}-${months.indexOf(selectedMonth) + 1}-${selectedDate}`]: {
                                            tasks: [
                                                {
                                                    id: nanoid(),
                                                    title: 'New Task',
                                                    description: taskDescription,
                                                    completed: false,
                                                    priority: 'low'
                                                }
                                            ]
                                        }
                                    }));
                                    setTaskDescription('');
                                }}
                            >
                                +
                            </button>
                        </li>
                    </ul>
                    <div className='flex justify-center mt-4'>
                        <button 
                            className='py-2 px-4 bg-slate-500 text-white font-semibold rounded-lg hover:bg-slate-800 border focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2'
                            onClick={
                                () => {
                                    setUserData({...userData, calendar: calendar})
                                    console.log({...userData, calendar: calendar})
                                }
                            }
                        >Submit</button>
                    </div>
                </aside>
            </div>
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
            <aside className="p-4 max-w-md rounded-lg shadow-md bg-gray-500">
            <h2 className="text-xl font-bold mb-4">Today&apos;s Schedule</h2>
            {/* TODO: Redo this with a list and map method */}
            <ul className="space-y-2">
                <li className="p-2 border rounded-lg bg-gray-700 hover:bg-gray-200 hover:text-gray-700">
                <time className="font-semibold">09:00 AM:</time> Meeting with team
                </li>
                <li className="p-2 border rounded-lg bg-gray-700 hover:bg-gray-200 hover:text-gray-700">
                <time className="font-semibold">11:00 AM:</time> Code review
                </li>
                <li className="p-2 border rounded-lg bg-gray-700 hover:bg-gray-200 hover:text-gray-700">
                <time className="font-semibold">01:00 PM:</time> Lunch break
                </li>
                <li className="p-2 border rounded-lg bg-gray-700 hover:bg-gray-200 hover:text-gray-700">
                <time className="font-semibold">03:00 PM:</time> Project work
                </li>
                <li className="p-2 border rounded-lg bg-gray-700 hover:bg-gray-200 hover:text-gray-700">
                <time className="font-semibold">05:00 PM:</time> Wrap up
                </li>
            </ul>
            </aside>
        </div>
    </div>
    );
};

export default Calendar;