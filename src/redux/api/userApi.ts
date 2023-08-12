import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: '/auth/create-user',
        method: 'POST',
        body: user
      })
    })
  })
});

export const { useRegisterUserMutation } = userApi;
