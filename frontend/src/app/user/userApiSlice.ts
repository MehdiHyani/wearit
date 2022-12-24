import { apiSlice } from '../../app/api/apiSlice';
import { LoginResult, SignupBody, User } from '../../utils/types';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUser: builder.query<User, {}>({
            query: () => ({ url: '/users/me' })
        }),
        signup: builder.mutation<LoginResult, SignupBody>({
            query: (signupBody: SignupBody) => ({
                url: '/users',
                method: 'POST',
                body: { ...signupBody, passwordConfirmation: signupBody.password }
            })
        })
    })
});

export const {
    useLazyGetCurrentUserQuery,
    useSignupMutation
} = authApiSlice;
