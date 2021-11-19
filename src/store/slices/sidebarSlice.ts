import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = {
  showSidebar: "show-sidebar",
};

export const sidebarSlice = createSlice({
  name: "userSession",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      if (state.showSidebar === "show-sidebar") {
        state.showSidebar = "";
      } else {
        state.showSidebar = "show-sidebar";
      }
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
