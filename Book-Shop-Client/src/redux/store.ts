import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";
import authReducer from "./features/auth/authSlice";
import productReducer from "./features/product/productSlice";

const persistConfig = {
  key: "auth",
  storage,
};

const persistProductConfig = {
  key: "product",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const persistedProductReducer = persistReducer(
  persistProductConfig,
  productReducer
);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    product: persistedProductReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
