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

export interface ProductImage {
    IMG_ID: number
    PRO_ID: number
    IMG_URL: string
    IMG_CREATED: Date
    IMG_UPDATED: Date
}

export interface ProductFeedback {
    FDB_ID: number
    FDB_COMMENT: string
    USR_ID: number
    PRO_ID: number
    FDB_CREATED: Date
    FDB_UPDATED: Date
}

export interface Product {
    PRO_ID: number
    PRO_NAME: string
    PRO_PRICE: number
    PRO_AVAILABLE_QUANTITY: number
    PRO_CREATED: Date
    PRO_UPDATED: Date
    PRO_IMAGES: ProductImage[]
    PRO_FEEDBACKS: ProductFeedback[]
}
export interface CardProps {
    product: Product
    generalStyle: string
    titleStyle: string
    ImgStyle: string
    btnStyle: string
    priceStyle: string
};

export type CartItem = Product & {
    quantity: number
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
