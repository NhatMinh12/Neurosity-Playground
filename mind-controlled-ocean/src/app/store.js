import { configureStore } from '@reduxjs/toolkit';
import neurosityReducer from '../reducers/neurositySlice';

export default configureStore({
  reducer: {
    neurosity: neurosityReducer,
  },
});