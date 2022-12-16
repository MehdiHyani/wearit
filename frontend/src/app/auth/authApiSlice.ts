import { apiSlice } from '../../app/api/apiSlice';
import { LoginBody, LoginResult } from '../../utils/types';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResult, LoginBody>({
            query: (loginBody: LoginBody) => ({
                url: '/auth/login',
                method: 'POST',
                body: loginBody
            })
        }),
        logout: builder.mutation<{ success: boolean }, {}>({
            query: () => ({
                url: '/auth/logout',
                method: 'GET'
            })
        })
    })
});

export const {
    useLoginMutation,
    useLogoutMutation
} = authApiSlice;
