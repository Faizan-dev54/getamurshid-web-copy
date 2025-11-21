import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './rootReducer';
import type { RootState } from './rootReducer';
import rootSaga from "./sagas/index";

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'ui'],
};

const sagaMiddleware = createSagaMiddleware();
const rootReduce: any = rootReducer
const persistedReducer = persistReducer<RootState>(rootPersistConfig, rootReduce);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredActionPaths: ['payload', 'onSuccess', 'onError'],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
