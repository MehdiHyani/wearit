import { apiSlice } from '../../app/api/apiSlice';
import { User } from '../../utils/types';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUser: builder.query<User, {}>({
            query: () => ({ url: '/users/me' })
        })
    })
});

export const {
    useLazyGetCurrentUserQuery
} = authApiSlice;
