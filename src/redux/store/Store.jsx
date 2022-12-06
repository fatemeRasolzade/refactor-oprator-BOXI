import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import HubList from "../HubData/HubData";
import RolesList from "../RolsData/RolesData";
import PageNumber from "../PaginationAction/PaginationAction";
import PersonnelList from "../PersonData/PersonsData";
import ProductDefineList from '../ProductDefineData/ProductDefineData'
import ServiceData from "../ServiceDefine/ServiceDefineReducer";
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["hub", "paginate"],
};


const reducers = combineReducers({
  hub: HubList,
  role: RolesList,
  paginate: PageNumber,
  personnel: PersonnelList,
  serviceDefine: ServiceData,
  productDefine:ProductDefineList
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
