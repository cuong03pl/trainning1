import { configureStore } from "@reduxjs/toolkit";
import workspaceReducer from "../slice/workspaceSlice";
import libraryReducer from "../slice/librarySlice";

export const store = configureStore({
  reducer: {
    workspace: workspaceReducer,
    library: libraryReducer,
  },
});
