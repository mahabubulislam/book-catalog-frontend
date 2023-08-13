import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IBook } from '../../types/book.interface';

export const bookApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ book, sortBy }) =>
        `/books?searchTerm=${book ? book : ''}${sortBy ? `&${sortBy}` : ''}`,
      transformResponse: (response: { data: Array<IBook> }) => response.data
    }),
    getSingleBook: builder.query({
      query: (id) => `/books/${id}`,
      transformResponse: (response: { data: IBook }) => response.data
    }),
    deleteBook: builder.mutation({
      query: (id) => ({ url: `/books/${id}`, method: 'DELETE' })
    })
  })
});

export const {
  useGetBooksQuery,
  useGetSingleBookQuery,
  useDeleteBookMutation
} = bookApi;
