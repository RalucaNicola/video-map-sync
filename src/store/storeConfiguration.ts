import { combineReducers, configureStore } from '@reduxjs/toolkit';
import countryReducer from './services/country-selection/countrySelectionSlice';
import loadingReducer from './services/app-loading/loadingSlice';
import errorReducer from './services/error-messaging/errorSlice';
import authenticationReducer from './services/authentication/authenticationSlice';
import modalOptionsReducer from './services/modal-options/modalSlice';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  error: errorReducer,
  loading: loadingReducer,
  country: countryReducer,
  infoModal: modalOptionsReducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
