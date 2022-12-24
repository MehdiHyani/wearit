import { apiSlice } from '../../app/api/apiSlice';
import { Store } from '../../utils/types';

export const storeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStores: builder.query<Store[], {}>({
            query: () => ({ url: '/stores' })
        })
    })
});

export const {
    useGetStoresQuery,
    useLazyGetStoresQuery
} = storeApiSlice;
