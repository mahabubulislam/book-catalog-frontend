import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUser {
  name: string;
  email: string;
}

interface IUserState {
  user: IUser;
}

const initialState: IUserState = {
  user: {
    name: '',
    email: ''
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    }
  }
});

export const { saveUser } = userSlice.actions;
export default userSlice.reducer;
