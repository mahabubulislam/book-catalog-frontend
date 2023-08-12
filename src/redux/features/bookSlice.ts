import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IBook } from '../../types/book.interface';
type IBooks = {
  books: Array<IBook>;
};
const initialState: IBooks = {
  books: []
};
const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    saveBooks: (state, action: PayloadAction<IBooks>) => {
      state.books = action.payload.books;
    }
  }
});
export const { saveBooks } = bookSlice.actions;
export default bookSlice.reducer;
