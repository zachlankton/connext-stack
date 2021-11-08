import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "src/store/index";

interface UserProfile {
  firstName?: string;
  lastName?: string;
  username?: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  roles?: Array<string>;
  id?: string;
  image?: string | null | undefined;
}

// Define a type for the slice state
interface UserSessionState {
  expires: string;
  user?: UserProfile | undefined;
}

export type { UserSessionState };

// Define the initial state using that type
const initialState: UserSessionState = {
  expires: "",
  user: {
    name: "",
    email: "",
    image: "",
  },
};

export const userSlice = createSlice({
  name: "userSession",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserLoggedIn: (state, action: PayloadAction<UserSessionState>) =>
      action.payload,
    setUserLoggedOut: () => initialState,
  },
});

export const { setUserLoggedIn, setUserLoggedOut } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getUser = (state: RootState) => state.userSession.user;

export default userSlice.reducer;
