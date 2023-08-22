import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { gimApi } from '../services/gim';
import { rtkQueryErrorLogger } from './middlewares/rtkQueryErrorLogger';
import userReducer from './features/user/userSlice';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reducers = combineReducers({
    user: userReducer
})

const persistedReducer = persistReducer(
  {
      key: 'root',
      storage: AsyncStorage,
  },
  reducers,
);

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [gimApi.reducerPath]: gimApi.reducer,
    user: userReducer,
    persistedReducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          serializableCheck: false,
      },
  }).concat(gimApi.middleware, rtkQueryErrorLogger),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

const persistor = persistStore(store)

export default store;
export {persistor}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type
export type AppDispatch = typeof store.dispatch;
