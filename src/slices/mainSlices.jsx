import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  test: false,
};

// export const handleUserIp = createAsyncThunk(
//   "auth/handleUserIp",
//   async (obj, { dispatch, getState }) => {
//     try {
//       const getUserIpRes = await getUserIp();
//       if (getUserIpRes.data.code === 200) {
//         dispatch(RsetUserIp(getUserIpRes.data.ip));
//       } else {
//         errorMessage("خطا!");
//       }
//     } catch (ex) {
//       console.log(ex);
//     }
//   }
// );

const mainSlices = createSlice({
  name: "main",
  initialState,
  reducers: {
    RsetTest: (state, { payload }) => {
      return { ...state, test: payload };
    },
  },
});

export const { RsetCustomerLogginPage, RsetTest } = mainSlices.actions;

export const selectCustomerPannel = (state) => state.main.customerPannel;
export const selectTest = (state) => state.main.test;

export default mainSlices.reducer;
