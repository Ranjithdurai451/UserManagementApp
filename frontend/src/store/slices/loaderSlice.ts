import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    isAuthLoading: false,
    innitialLoader: true,
  },
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isAuthLoading = action.payload;
    },
    setInnitialLoader: (state, action: PayloadAction<boolean>) => {
      state.innitialLoader = action.payload;
    },
  },
});

export const { setIsLoading, setInnitialLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
