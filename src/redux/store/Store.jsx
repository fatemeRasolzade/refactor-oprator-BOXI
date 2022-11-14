import { configureStore,combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    
  }

  const reducers=combineReducers({})
  
  const persistedReducer = persistReducer(persistConfig, reducers)

export const store=configureStore({
    reducer:persistedReducer
})

export let persistor = persistStore(store)