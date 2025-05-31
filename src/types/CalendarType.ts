interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
}

interface CalendarDay {
    tasks: Task[];
}

interface Calendar {
    [date: string]: CalendarDay;
}
export default Calendar;