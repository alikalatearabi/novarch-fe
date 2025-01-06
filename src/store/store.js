import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import mainSlices from "../slices/mainSlices";
import sheetsSlices from "@/slices/sheetsSlices";
import imageSlices from "@/slices/imageSlices";
import timelapsSlices from "@/slices/timelapsSlices";
import captureSlices from "@/slices/captureSlices";

const rootReducer = {
  main: mainSlices,
  sheets: sheetsSlices,
  image: imageSlices,
  timelaps: timelapsSlices,
  capture: captureSlices,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
