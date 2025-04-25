import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSliceReducer from "./redux/slice/authSlice";
import { apiSlice } from "./redux//apiSlice/apiSlice";

const persistConfig = {
  key: "root",
  storage,
};

// Wrap the auth reducer in persistReducer with typed configuration
const persistedAuthReducer = persistReducer(persistConfig, authSliceReducer);

// Configure the store with the typed reducers and middlewares
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
  devTools: true,
});

// Export the persistor and store
export const persistor = persistStore(store);
export default store;
