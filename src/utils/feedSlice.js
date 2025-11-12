import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeedData: (state, action) => {
      return action.payload;
    },
    removeFeedData: () => null,
  },
});

export const { addFeedData, removeFeedData } = feedSlice.actions;

export default feedSlice.reducer;
