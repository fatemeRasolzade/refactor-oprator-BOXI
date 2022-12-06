import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import HubList from "../HubData/HubData";
import RolesList from "../RolsData/RolesData";
import PageNumber from "../PaginationAction/PaginationAction";
import PersonnelList from "../PersonData/PersonsData";
import ProductDefineList from "../ProductDefineData/ProductDefineData";
import CustomerDefineList from "../CustomerManagement/CustomerManagementData";

import ServiceData from "../ServiceDefine/ServiceDefineReducer";
import { serviceProvisionData } from "../../pages/ServiceManagement/ProductDefine/view/serviceProvisionData";
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
  productDefine: ProductDefineList,
  customerDefine: CustomerDefineList,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  [serviceProvisionData.reducerPath]:serviceProvisionData.reducer,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(serviceProvisionData.middleware),
  // getDefaultMiddleware({
  //   serializableCheck: false,

  // }),
});

export let persistor = persistStore(store);
