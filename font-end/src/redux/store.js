import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./authSlice"
import courseReducer from "./courseSlice"
import lectureReducer from "./lectureSlice"
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";

const syncMiddleware = createStateSyncMiddleware()

export const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    lecture: lectureReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(syncMiddleware),
})

initMessageListener(store);