export interface LoginBody {
    email: string
    password: string
};

export type userRole = 'customer' | 'manager';

export interface User {
    USR_ID: string
    USR_EMAIL: string
    USR_FIRST_NAME: string
    USR_LAST_NAME: string
    USR_ROLE: userRole
};

export interface LoginResult {
    user: User
};
