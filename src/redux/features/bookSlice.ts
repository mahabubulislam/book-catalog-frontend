import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IBook } from '../../types/book.interface';
type IBooks = {
  books: Array<IBook>;
  searchBook?: '';
};
const initialState: IBooks = {
  books: [],
  searchBook: ''
};
const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    saveBooks: (state, action: PayloadAction<IBooks>) => {
      state.books = action.payload.books;
    },
    saveSearchBook: (state, action) => {
      state.searchBook = action.payload;
    }
  }
});
export const { saveBooks, saveSearchBook } = bookSlice.actions;
export default bookSlice.reducer;
