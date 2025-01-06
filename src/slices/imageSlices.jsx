import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageExpandMinimap: false,
  imageBrightness: 50,
  imageShadow: 0,
  imagesharpness: 50,
  //------------------
  imageCapturePathVisibility: 100,
  imageCapturePathWidth: 50,
  //------------------
  imageZoomLevel: 1,
  //------------------
  imageSplitView: false,
  imageSplitViewLock: false,
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

const imageSlices = createSlice({
  name: "image",
  initialState,
  reducers: {
    RsetImageExpandMinimap: (state, { payload }) => {
      return { ...state, imageExpandMinimap: payload };
    },
    RsetImageBrightness: (state, { payload }) => {
      return { ...state, imageBrightness: payload };
    },
    RsetImageSharpness: (state, { payload }) => {
      return { ...state, imageSharpness: payload };
    },
    RsetImageShadow: (state, { payload }) => {
      return { ...state, imageShadow: payload };
    },
    RsetImageCapturePathVisibility: (state, { payload }) => {
      return { ...state, imageCapturePathVisibility: payload };
    },
    RsetImageCapturePathWidth: (state, { payload }) => {
      return { ...state, imageCapturePathWidth: payload };
    },
    RsetImageZoomLevel: (state, { payload }) => {
      return { ...state, imageZoomLevel: payload };
    },
    RsetImageSplitView: (state, { payload }) => {
      return { ...state, imageSplitView: payload };
    },
    RsetImageSplitViewLock: (state, { payload }) => {
      return { ...state, imageSplitViewLock: payload };
    },
  },
});

export const {
  RsetImageExpandMinimap,
  RsetImageBrightness,
  RsetImageShadow,
  RsetImageSharpness,
  RsetImageCapturePathVisibility,
  RsetImageCapturePathWidth,
  RsetImageZoomLevel,
  RsetImageSplitView,
  RsetImageSplitViewLock,
} = imageSlices.actions;

export const selectImageExpandMinimap = (state) => state.image.imageExpandMinimap;
export const selectImageBrightness = (state) => state.image.imageBrightness;
export const selectImageSharpness = (state) => state.image.imageSharpness;
export const selectImageShadow = (state) => state.image.imageShadow;
export const selectImageCapturePathVisibility = (state) => state.image.imageCapturePathVisibility;
export const selectImageCapturepathWidth = (state) => state.image.imageCapturePathWidth;
export const selectImageZoomLevel = (state) => state.image.imageZoomLevel;
export const selectImageSplitView = (state) => state.image.imageSplitView;
export const selectImageSplitViewLock = (state) => state.image.imageSplitViewLock;

export default imageSlices.reducer;
