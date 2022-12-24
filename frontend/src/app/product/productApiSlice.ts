import { apiSlice } from '../api/apiSlice';
import { Product } from '../../utils/types';

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFeaturedProducts: builder.query<Product[], {}>({
            query: () => ({
                url: '/products/featured',
                method: 'GET'
            })
        })
    })
});

export const {
    useGetFeaturedProductsQuery
} = productApiSlice;
