import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  timelapsSortAsc: false,
};

const timelapsSlices = createSlice({
  name: "timelaps",
  initialState,
  reducers: {
    RsetTimelapsSortAsc: (state, { payload }) => {
      return { ...state, timelapsSortAsc: payload };
    },
  },
});

export const { RsetTimelapsSortAsc } = timelapsSlices.actions;

export const selectTimelapsSortAsc = (state) => state.timelaps.timelapsSortAsc;

export default timelapsSlices.reducer;
