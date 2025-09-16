import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { newElement } from "../data/newElement";
import { addToLibrary } from "./librarySlice";

const initialState = [];

export const mergeAndAddToLibrary = createAsyncThunk(
  "workspace/mergeAndAddToLibrary",
  async ({ A, B }, { dispatch }) => {
    const newOId = A.OId + B.OId;
    const found = newElement.find((el) => el.OId === newOId);

    if (found) {
      dispatch(
        addToLibrary({
          image: found.image,
          name: found.name,
          OId: found.OId,
          width: 50,
          height: 50,
        })
      );

      return { A, B, found };
    }

    throw new Error("Element not found for merge");
  }
);

export const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    add: (state, action) => {
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
    removeAll: () => {
      return [];
    },
    remove: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    // merge: (state, action) => {
    //   const { A, B } = action.payload;

    //   const newOId = A.OId + B.OId;

    //   const found = newElement.find((el) => el.OId === newOId);

    //   if (found) {
    //     const newState = state.filter(
    //       (item) => item.id !== A.id && item.id !== B.id
    //     );
    //     const newItem = {
    //       id: Date.now(),
    //       x: B.x,
    //       y: B.y,
    //       name: found.name,
    //       image: found.image,
    //       OId: found.OId,
    //     };
    //     return [...newState, newItem];
    //   }
    //   return state;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(mergeAndAddToLibrary.fulfilled, (state, action) => {
      const { A, B, found } = action.payload;

      const newState = state.filter(
        (item) => item.id !== A.id && item.id !== B.id
      );
      const newItem = {
        id: Date.now(),
        x: B.x,
        y: B.y,
        name: found.name,
        image: found.image,
        OId: found.OId,
      };
      return [...newState, newItem];
    });
  },
});

// Action creators are generated for each case reducer function
export const { add, update, removeAll, remove } = workspaceSlice.actions;

export default workspaceSlice.reducer;
