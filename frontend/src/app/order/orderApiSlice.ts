import { apiSlice } from '../../app/api/apiSlice';
import { Order } from '../../utils/types';

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOneOrder: builder.query<Order, number>({
            query: () => ({ url: '/orders/:orderId' })
        })
    })
});

export const {
    useGetOneOrderQuery
} = orderApiSlice;
