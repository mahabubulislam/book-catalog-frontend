import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IUser {
  name: string;
  email: string;
}
const initialState: IUser = {
  name: '',
  email: ''
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<IUser>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    }
  }
});
export const { saveUser } = userSlice.actions;
export default userSlice.reducer;
