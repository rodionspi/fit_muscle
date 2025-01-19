import Calendar from './Calendar';

interface User {
    email: string;
    password?: string;
    id?: string;
    name?: string;
    [key: string]: any;
    calendar?: Calendar;
}

export default User;