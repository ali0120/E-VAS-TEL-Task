import { configureStore } from '@reduxjs/toolkit'
import engineersReducer from './engineersSlice';

const store = configureStore({
  reducer: {
    engineers: engineersReducer,
  },
});

export default store;
