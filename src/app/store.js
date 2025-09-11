import { configureStore } from "@reduxjs/toolkit";
import workspaceReducer from "../slice/workspaceSlice";

export const store = configureStore({
  reducer: {
    workspace: workspaceReducer,
  },
});
