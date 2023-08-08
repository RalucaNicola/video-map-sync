import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loadingReducer from './services/app-loading/loadingSlice';
import errorReducer from './services/error-messaging/errorSlice';
import authenticationReducer from './services/authentication/authenticationSlice';
import modalOptionsReducer from './services/modal-options/modalSlice';
import videoModeReducer from './services/videoMode';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  error: errorReducer,
  loading: loadingReducer,
  infoModal: modalOptionsReducer,
  videoMode: videoModeReducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
