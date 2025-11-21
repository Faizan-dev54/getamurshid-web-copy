import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { logoutUser } from "../actions/common"; 
import { USER_TYPE } from "../../utils/appEnums";

export interface UserTypeState {
  userType: USER_TYPE | null;
}

const initialState: UserTypeState = {
  userType: USER_TYPE.FAN,
};

const userTypeSlice = createSlice({
  name: "userType",
  initialState,
  reducers: {
    setUserType: (state, action: PayloadAction<USER_TYPE>) => {
      state.userType = action.payload;
    },
    clearUserType: (state) => {
      state.userType = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(logoutUser, () => initialState);
  },
});

const persistConfig = {
  key: "userType_web",
  storage,
  whitelist: ["userType"],
};

export const { setUserType, clearUserType } = userTypeSlice.actions;

export default persistReducer(persistConfig, userTypeSlice.reducer);
