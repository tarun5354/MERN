import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null // Initialize with null
  },
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload; // Directly set user object
    }
  }
});

export const { getUser } = userSlice.actions;
export default userSlice.reducer;
