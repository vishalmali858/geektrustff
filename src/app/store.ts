import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cacheReducer from '../features/cache/cacheSlice';
import { saveState, loadState } from '../features/cache/sessionStorage';

const persistedState = loadState() || {};

export const store = configureStore({
  reducer: {
    cache: cacheReducer
  },
  preloadedState: persistedState
});

store.subscribe(()=> {
  const storeData = store.getState();
  saveState(storeData);
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
