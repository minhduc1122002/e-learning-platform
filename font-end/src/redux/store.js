import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./authSlice"
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";

const syncMiddleware = createStateSyncMiddleware()

export const store = configureStore({
  reducer: {
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(syncMiddleware),
})

initMessageListener(store);