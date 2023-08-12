import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IBook } from '../../types/book.interface';

export const bookApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books',
      transformResponse: (response: { data: Array<IBook> }) => response.data
    }),
    getSingleBook: builder.query({
      query: (id) => `/books/${id}`,
      transformResponse: (response: { data: IBook }) => response.data
    })
  })
});

export const { useGetBooksQuery, useGetSingleBookQuery } = bookApi;
