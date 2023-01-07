import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import HubList from "../HubData/HubData";
import RolesList from "../RolsData/RolesData";
import PageNumber from "../PaginationAction/PaginationAction";
import PersonnelList from "../PersonData/PersonsData";
import ProductDefineList from "../ProductDefineData/ProductDefineData";
import CustomerList from "../CustomerManagement/CustomerManagementData";
import PickupList from "../PickupData/PickupData";
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
import RouteLists from "../Transportation/route/RouteData";
import HubTypeTable from "../HubData/TypeHub";
import userInfoReducer from "../userInfo/userInfoReducer";
import VehicleLists from "../Transportation/VehicleData/VehicleData";
import BagsLists from "../Transportation/bags/Bags";
import GateLists from "../Transportation/gate/GateData";
import DockLists from "../Transportation/dock/DockData";
import ExceptionLists from "../Transportation/exception/ExceptionData";
import SalesChannelList from "../SaleChannel/SalesChannelReducer";
import customGeoReducer from "../customGeo/customGeoReducer";
import ProductGroupsData from "../ProductGroup/ProductGroup";
import CRMCustomerGroupReducer from "../CRMCustomerGroup/CRMCustomerGroupReducer";
import consignmentReducer from "../Consignment/consignmentReducer";
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
  pickup: PickupList,
  thirdParty: ThirdPartyList,
  ADMVehicle: ADMVehicleList,
  serviceTime: ServiceTimeList,
  price: PriceList,
  serviceProvision: ServiceProvision,
  editHub: EditHubTable,
  selectRowTable: selectRowTable,
  vendor: VendorList,
  vehicleModel: VehicleModelLists,
  route: RouteLists,
  HubType: HubTypeTable,
  Vehicle: VehicleLists,
  bags: BagsLists,
  gate: GateLists,
  dock: DockLists,
  exception: ExceptionLists,
  saleChannel: SalesChannelList,
  crmCustomer: CRMCustomerGroupReducer,
  customGeo: customGeoReducer,
  productG: ProductGroupsData,
  consignment: consignmentReducer,
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
