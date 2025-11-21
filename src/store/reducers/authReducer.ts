import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { logoutUser } from '../actions/common'; 

export interface AuthState {
  isSignedIn: boolean;
  sessionData: any | null; 
}

const initialState: AuthState = {
  isSignedIn: false,
  sessionData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onSessionChange: (state, action: PayloadAction<any>) => {
      state.isSignedIn = !!action.payload?.authentication?.jwt_token;
      if (action.payload?.authentication) {
        delete action.payload.authentication;
      }
      state.sessionData = action.payload || null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(logoutUser, () => initialState);
  },
});

const persistConfig = {
  key: 'auth_web',
  storage,
  whitelist: ['isSignedIn', 'sessionData'],
};

export const { onSessionChange } = authSlice.actions;

export default persistReducer(persistConfig, authSlice.reducer);
