import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  captureActive: false,
};

const captureSlices = createSlice({
  name: "capture",
  initialState,
  reducers: {
    RsetCaptureActive: (state, { payload }) => {
      return { ...state, captureActive: payload };
    },
  },
});

export const { RsetCaptureActive } = captureSlices.actions;

export const selectCaptureActive = (state) => state.capture.captureActive;

export default captureSlices.reducer;
