import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    add: (state, action) => {
      console.log(action.payload);

      return [...state, action.payload];
    },
    update: (state, action) => {
      const { id, x, y } = action.payload;
      const index = state.findIndex((item) => item.id === id);
      if (index !== -1) {
        state[index].x = x;
        state[index].y = y;
      }
    },
    removeAll: (state, action) => {
      return [];
    },
    merge: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const { add, update, removeAll } = workspaceSlice.actions;

export default workspaceSlice.reducer;
