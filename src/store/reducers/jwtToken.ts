import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export interface TokenState {
  jwt: string | null;
}

const initialState: TokenState = {
  jwt: null,
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.jwt = action.payload;
    },
    clearToken: (state) => {
      state.jwt = null;
    },
  },
});

const persistConfig = {
  key: "token_web",
  storage,
  whitelist: ["jwt"],
};

export const { setToken, clearToken } = tokenSlice.actions;

export default persistReducer(persistConfig, tokenSlice.reducer);
