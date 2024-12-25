interface User {
    email: string;
    password?: string;
    id?: string;
    name?: string;
    [key: string]: any;
}

export default User;