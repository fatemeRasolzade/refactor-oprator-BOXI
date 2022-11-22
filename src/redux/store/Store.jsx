import { configureStore,combineReducers  } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import HubList from "../HubData/HubData"
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['hub']
  }

  const reducers=combineReducers({
    hub:HubList
  })
  
  const persistedReducer = persistReducer(persistConfig, reducers)

export const store=configureStore({
    reducer:persistedReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export let persistor = persistStore(store)