import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: null,
};

export const userSlice = createSlice({
  name: "User",
  initialState,

  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
