import Calendar from './CalendarType';

interface User {
    email?: string;
    id?: string;
    name?: string;
    /** Chosen avatar as "style:seed" (see src/lib/avatars.ts); null or missing means initials. */
    avatar?: string | null;
    calendar?: Calendar;
}

export default User;