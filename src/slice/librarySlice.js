import { createSlice } from "@reduxjs/toolkit";
import airImg from "@/assets/air.png";
import earthImg from "@/assets/earth.png";
import fireImg from "@/assets/fire.png";
const initialState = [
  {
    image: airImg,
    name: "air",
    OId: 1,
    width: 50,
    height: 50,
  },
  {
    image: earthImg,
    name: "earth",
    OId: 2,
    width: 50,
    height: 50,
  },
  {
    image: fireImg,
    name: "fire",
    OId: 3,
    width: 50,
    height: 50,
  },
];

export const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    addToLibrary: (state, action) => {
      const newElement = action.payload;
      const exists = state.some((item) => item.OId === newElement.OId);
      if (!exists) {
        return [...state, newElement];
      }
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, update, addToLibrary } = librarySlice.actions;

export default librarySlice.reducer;
