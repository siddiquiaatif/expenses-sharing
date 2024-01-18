import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import expenseReducer from './slices/expenseSlice';

const store = configureStore({
  reducer: {
    users: userReducer,
    expenses: expenseReducer,
  },
});

export default store;
