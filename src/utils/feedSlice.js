import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeedData: (state, action) => {
      return action.payload;
    },
    removeFeedData: () => null,
    removeFeedUser: (state, action) => {
      const newArray = state.filter((user) => user._id !== action.payload);
      return newArray;
    },
  },
});

export const { addFeedData, removeFeedData, removeFeedUser } =
  feedSlice.actions;

export default feedSlice.reducer;
