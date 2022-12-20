import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import HubList from "../HubData/HubData";
import RolesList from "../RolsData/RolesData";
import PageNumber from "../PaginationAction/PaginationAction";
import PersonnelList from "../PersonData/PersonsData";
import ProductDefineList from "../ProductDefineData/ProductDefineData";
import CustomerList from "../CustomerManagement/CustomerManagementData";
import ThirdPartyList from "../ThirdParty/ThirdPartyData";
import ADMVehicleList from "../ADMVehicle/ADMVehicleData";
import ServiceTimeList from "../ServiceTimeData/ServiceTimeData";
import PriceList from "../PriceData/PriceData";
import ServiceProvision from "../ServiceProvision/ServiceProvision";
import ServiceData from "../ServiceDefine/ServiceDefineReducer";
import EditHubTable from "../HubData/EditData";
import selectRowTable from "../selectRowTable/selectRowTable";

import VendorList from "../Transportation/vendor/VendorData";
import VehicleModelLists from "../Transportation/vehicleModel/VehicleModel";
import HubTypeTable from "../HubData/TypeHub";
import userInfoReducer from "../userInfo/userInfoReducer";
import customGeoReducer from "../customGeo/customGeoReducer";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["editHub"],
};

const reducers = combineReducers({
  userInfo: userInfoReducer,
  hub: HubList,
  role: RolesList,
  paginate: PageNumber,
  personnel: PersonnelList,
  serviceDefine: ServiceData,
  productDefine: ProductDefineList,
  customer: CustomerList,
  thirdParty: ThirdPartyList,
  ADMVehicle: ADMVehicleList,
  serviceTime: ServiceTimeList,
  price: PriceList,
  serviceProvision: ServiceProvision,
  editHub: EditHubTable,
  selectRowTable: selectRowTable,
  vendor: VendorList,
  vehicleModel: VehicleModelLists,
  HubType: HubTypeTable,
  customGeo: customGeoReducer,
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
