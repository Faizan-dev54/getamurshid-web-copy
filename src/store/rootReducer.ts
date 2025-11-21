import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import uiReducer from './traditional/uiReducer';
import jwtToken from './reducers/jwtToken';
import userType from './reducers/userType';
// import { PersistPartial } from 'redux-persist/es/persistReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  token: jwtToken,
  userType: userType,
  ui: uiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
