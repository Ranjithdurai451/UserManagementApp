import { authSliceType } from '@/utils/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: authSliceType = {
  isAuthenticated: false,
  user: {
    email: '',
    username: '',
    id: '',
    role: "",
    profileImg: ""
  },
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ email: string; username: string; id: string, profileImg: string, role: string }>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    clearUser: (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state.isAuthenticated = false;
      state.user = {
        email: '',
        username: '',
        id: '',
        profileImg: "",
        role: ""
      };
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
