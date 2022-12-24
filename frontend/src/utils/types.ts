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
