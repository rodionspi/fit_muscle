import Calendar from './CalendarType';

interface User {
    email?: string;
    password?: string;
    id?: string;
    name?: string;
    calendar?: Calendar;
}

export default User;