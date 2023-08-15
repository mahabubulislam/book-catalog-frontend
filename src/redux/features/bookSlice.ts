import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IBook } from '../../types/book.interface';
type IBooks = {
  books: Array<IBook>;
  searchBook: string;
  wishlist: Array<IBook>;
  readingList: Array<IBook>;
};
const initialState: IBooks = {
  books: [],
  searchBook: '',
  wishlist: [],
  readingList: []
};
const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    saveBooks: (state, action: PayloadAction<Array<IBook>>) => {
      state.books = action.payload;
    },
    saveSearchBook: (state, action: PayloadAction<string>) => {
      state.searchBook = action.payload;
    },
    saveWishlist: (state, action: PayloadAction<IBook>) => {
      if (!state.wishlist.find((book) => book?._id === action.payload._id)) {
        state.wishlist.push(action.payload);
      }
    },
    removeWishlist: (state, action: PayloadAction<string>) => {
      state.wishlist = state.wishlist.filter(
        (book) => book._id !== action.payload
      );
    },
    saveReadingList: (state, action: PayloadAction<IBook>) => {
      if (!state.readingList.find((book) => book?._id === action.payload._id)) {
        state.readingList.push(action.payload);
      }
      state.wishlist = state.wishlist.filter(
        (book) => book._id !== action.payload._id
      );
    },
    removeReadingList: (state, action: PayloadAction<string>) => {
      state.readingList = state.readingList.filter(
        (book) => book._id !== action.payload
      );
    }
  }
});
export const {
  saveBooks,
  saveSearchBook,
  saveWishlist,
  removeWishlist,
  saveReadingList,
  removeReadingList
} = bookSlice.actions;
export default bookSlice.reducer;
