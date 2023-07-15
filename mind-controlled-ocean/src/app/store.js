import { createStore, combineReducers } from 'redux';
import neurosityReducer from '../reducers/neurositySlice';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, combineReducers({neurosity: neurosityReducer}));

let store = createStore(persistedReducer);
let persistor = persistStore(store);

export default { store, persistor };
