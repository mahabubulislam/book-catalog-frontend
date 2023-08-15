import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IBook } from '../../types/book.interface';

export const bookApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://book-catalog-server-production-b2fc.up.railway.app/api'
  }),
  tagTypes: ['Book'],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ searchBook, sortBy, genre, publicationDate }) =>
        `/books?searchTerm=${searchBook ? searchBook : ''}${
          genre ? `&genre=${genre}` : ''
        }${publicationDate ? `&publicationDate=${publicationDate}` : ''}${
          sortBy ? `&${sortBy}` : ''
        }`,
      transformResponse: (response: { data: Array<IBook> }) => response.data
    }),
    getSingleBook: builder.query({
      query: (id) => `/books/${id}`,
      transformResponse: (response: { data: IBook }) => response.data,
      providesTags: ['Book']
    }),
    deleteBook: builder.mutation({
      query: (id) => ({ url: `/books/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Book']
    }),
    editBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['Book']
    }),
    addReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/add-review/${id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['Book']
    }),
    createBook: builder.mutation({
      query: (data) => ({
        url: `/books/create-book`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Book']
    })
  })
});

export const {
  useGetBooksQuery,
  useGetSingleBookQuery,
  useDeleteBookMutation,
  useEditBookMutation,
  useAddReviewMutation,
  useCreateBookMutation
} = bookApi;
