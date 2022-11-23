import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import HubList from "../HubData/HubData";
import RolesData from "../RolsData/RolesData";
import PageNumber from "../PaginationAction/PaginationAction"
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["hub",'paginate'],
};

const reducers = combineReducers({
  hub: HubList,
  role: RolesData,
  paginate:PageNumber
});


const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export let persistor = persistStore(store);
