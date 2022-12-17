import { createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { API_URL } from '../../utils/constants';
import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { logout, setCredentials } from '../auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include'
});

const baseQueryWithReAuth = async(args: string | FetchArgs, api: BaseQueryApi, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);
    // @BR4INL3SS
    // This is a problem with redux toolkit typing
    // @ts-expect-error
    if ((result.error != null) && result.error.originalStatus === 403) {
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

        if (refreshResult.data) {
            const user = (api.getState() as RootState).auth.user;

            api.dispatch(setCredentials({ user }));

            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({})
});
