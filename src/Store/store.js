import { configureStore } from '@reduxjs/toolkit';
import authAdminReducer from './authAdminSlice';
import adminReducer from './adminSlice';

const store = configureStore({
  reducer: {
    authAdmin: authAdminReducer,
    admin: adminReducer,
  },
});

export default store;
