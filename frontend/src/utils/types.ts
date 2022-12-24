export interface LoginBody {
    email: string
    password: string
};

export type userRole = 'customer' | 'manager';
export type orderStatus = 'canceled' | 'confirmed' | 'pending' | 'completed';

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

export interface SignupBody {
    firstName: string,
    lastName: string,
    email: string,
    password: string
  }

export interface Store {
    STR_ID: number;
    STR_NAME: string;
    STR_LATITUDE: number;
    STR_LONGITUDE: number;
    STR_HOURS: string;
    STR_PHONE: string;
    STR_CREATED: Date;
    STR_UPDATED: Date;
}

export interface Order {
    ORD_ID: number;
    ORD_STATUS: orderStatus;
    ORD_TOTAL: number;
    ORD_CREATED: Date;
    ORD_UPDATED: Date;
}