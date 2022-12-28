import axios from "axios";

export const CORE_API = `${process.env.REACT_APP_BASE_URL}core-api`;
export const RESOURCE_API = `${process.env.REACT_APP_BASE_URL}resource-api`;
export const CONSIGNMENT_API = `${process.env.REACT_APP_BASE_URL}consignment-api`;

const createUrl = (base: any, dir: any) => {
  return base + dir;
};

export const apiRoute = () => {
  return {
    get: {
      
      get_city: createUrl(CORE_API, "/countryDevision/city/2/loc?filter="),
      get_province: createUrl(CORE_API, "/countryDevision/province/1/city?filter="),
      get_province_city: createUrl(CORE_API, "/countryDevision/province/1/city?filter="),
      get_province_loc: createUrl(CORE_API, "/countryDevision/city/2/loc?filter="),
      get_select_province: createUrl(CORE_API, "/countryDevision?filter="),
      login_Url: createUrl(CORE_API, "/auth/login"),
      user_url: createUrl(CORE_API, "/users/all"),
      filter_hub: createUrl(CORE_API, "/hub/filter"),
      get_hub_type: createUrl(CORE_API, "/hubCategory/selectHubTypes"),
      get_hub_category: createUrl(CORE_API, "/hubCategory/select"),
      selectFleetType:createUrl(CORE_API,"/vehicle/selectFleetTypes"),
      selectVehicleMake:createUrl(CORE_API,'/vehicleMake/select?filter='),
      selectVehicleCategory:createUrl(CORE_API,"/vehicleCategory/select?filter="),
      selectfuelTypes:createUrl(CORE_API,"/vehicleMake/selectFuelTypes"),
      selectVendor:createUrl(CORE_API,'/vendor/select?filter='),
      selectBagTypes:createUrl(CORE_API,'/bag/selectBagTypes'),
      selectException:createUrl(CORE_API,'/exception/exceptiontype'),
      selectPriceLists:createUrl(CORE_API,'/pricelist/select?filter='),
      selectProducts:createUrl(CORE_API,'/product/select?filter='),
      //hub_category
      filter_hub_category: createUrl(CORE_API, "/hubCategory/filter"),
      //select hub category
      select_hub_category: createUrl(CORE_API, "/hubCategory/select?filter"),
      //select hub
      select_hub: createUrl(CORE_API, "/hub/select?filter="),
      //CUSTOM_GEOGRAPHIC
      get_custom_geographics: createUrl(CORE_API, "/customcountrydevision/filter"),
      //VENDOR
      get_venders: createUrl(CORE_API, "/vendor/filter"),
      //VEHICLE_MODEL
      GET_VEHICLE_MODEL: createUrl(CORE_API, "/vehicleMake/filter"),
      //VEHICLE
      GET_VEHICLE: createUrl(CORE_API, "/vehicle/filter"),
      //ROUTE
      GET_ROUTE: createUrl(CORE_API, "/route/filter"),
      //Gate
      GET_GATE: createUrl(CORE_API, "/gate/filter"),
      //Dock
      GET_DOCKS: createUrl(CORE_API, "/dock/filter"),
      //BAG
      GET_BAGS: createUrl(CORE_API, "/bag/filter"),
      //CONNECTION
      GET_CONNECTION: createUrl(CORE_API, "/connection/filter"),
      //PRODUCT
      GET_PRODUCT: createUrl(CORE_API, "/vendor/select?filter="),
      //PRODUCT_GROUP
      GET_PRODUCT_GROUPS: createUrl(CORE_API, "/productGroup/select?filter="),
      //SERVICE_TIME
      GET_SERVICE_TIME: createUrl(CORE_API, "/timecommitment/filter"),
      //ADM_VEHICLE
      GET_ADM_VEHICLE: createUrl(CORE_API, "/admVehicle/filter"),
      //Service
      GET_SERVICES: createUrl(CORE_API, `/service/select?fliter=`),
    },
    post: {
      salesChannel:createUrl(CORE_API,'/saleschannel'),
      bags:createUrl(CORE_API,'/bag'),
      route:createUrl(CORE_API,"/route"),
      gate:createUrl(CORE_API,"/gate"),
      dock:createUrl(CORE_API,"/dock"),
      exception:createUrl(CORE_API,'/exception'),
      // create
      hub: createUrl(CORE_API, "/hub"),
      createProduct: createUrl(CORE_API, "/product"),
      createVendor: createUrl(CORE_API, "/vendor"),
      VehicleModel: createUrl(CORE_API, "/vehicleMake"),
      Vehicle: createUrl(CORE_API, "/vehicle"),

      // filter
      filterRole: createUrl(RESOURCE_API, "/role"),
      // employee,
      service_provision: createUrl(CORE_API, "/servicedeliveryservice"),
      filterVendor: createUrl(CORE_API, "/vendor"),
      Type_Hub_table: createUrl(CORE_API, "/hubCategory"),
      filterPersonnel: createUrl(RESOURCE_API, "/employee"),
      serviceDefine: createUrl(CORE_API, "/service"),
      product: createUrl(CORE_API, "/product"),
    },
    postExcel: {
      exception: createUrl(CORE_API, "/exception"),
    },
    delete: {
      salesChannel:createUrl(CORE_API,'/saleschannel'),
      exception:createUrl(CORE_API,'/exception'),
      gate:createUrl(CORE_API,"/gate"),
      dock:createUrl(CORE_API,"/dock"),
      route:createUrl(CORE_API,"/route"),
      bags:createUrl(CORE_API,'/bag'),
      role: createUrl(RESOURCE_API, "/role"),
      Vehicle: createUrl(CORE_API, "/vehicle"),
      personnel: createUrl(RESOURCE_API, "/employee"),
      VehicleModel: createUrl(CORE_API, "/vehicleMake"),
      vendor: createUrl(CORE_API, "/vendor"),
      serviceDefine: createUrl(CORE_API, "/service"),
      productDefine: createUrl(CORE_API, "/product"),
      hubTable: createUrl(CORE_API, "/hub"),
      deleteConnections: createUrl(CORE_API, "/connection"),
    },
    edit: {
      salesChannel:createUrl(CORE_API,'/saleschannel'),
      exception:createUrl(CORE_API,'/exception'),
      gate:createUrl(CORE_API,"/gate"),
      dock:createUrl(CORE_API,"/dock"),
      bags:createUrl(CORE_API,'/bag'),
      route:createUrl(CORE_API, "/route"),
      Vehicle: createUrl(CORE_API, "/vehicle"),
      EditVendor: createUrl(CORE_API, "/vendor"),
      VehicleModel: createUrl(CORE_API, "/vehicleMake"),
      productDefine: createUrl(CORE_API, "/product"),
      Edithub_category:createUrl(CORE_API,"/hubCategory"),
      serviceDefine: createUrl(CORE_API, "/service"),
    },
  };
};

//Gloobal
export const GET_PROVINCES = `${CORE_API}/countryDevision/province/1/city?filter=`;
export const GET_CITIES = `${CORE_API}/countryDevision/province/1/city?filter=`;
export const GET_REGIONS = `${CORE_API}/countryDevision/city/2/loc?filter=`;
export const GET_ADDRESS_TYPE = `${RESOURCE_API}/address/addressType`;
export const GET_PHONETYPE = `${RESOURCE_API}/telephone/phoneType`;
export const DEL_ADDRESS = `${RESOURCE_API}/address/`;
export const DEL_TELEPHONE = `${RESOURCE_API}/telephone/`;

//Customer
export const GET_CUSTOMER_TYPE = `${RESOURCE_API}/customer/customerType`;
export const GET_CUSTOMER_PARENT = `${RESOURCE_API}/customer/select?filter=`;
export const CREATE_CUSTOMER = `${RESOURCE_API}/customer`;
export const EDIT_CUSTOMER = `${RESOURCE_API}/customer`;
export const DELETE_CUSTOMER = `${RESOURCE_API}/customer/`;

//ThirdParty
export const GET_THIRDPARTY_TYPE = `${RESOURCE_API}/thirdParty/thirdPartyType`;
export const GET_THIRDPARTY_PARENT = `${RESOURCE_API}/thirdParty/select?filter=`;
export const CREATE_THIRDPARTY = `${RESOURCE_API}/thirdParty`;
export const EDIT_THIRDPARTY = `${RESOURCE_API}/thirdParty`;
export const DELETE_THIRDPARTY = `${RESOURCE_API}/thirdParty/`;
export const GET_THIRDPARTY_CATEGORY = `${RESOURCE_API}/thirdParty/thirdPartyCategory`;

//ADMVehicle
export const CREATE_ADMVEHICLE = `${CORE_API}/admVehicle`;
export const EDIT_ADMVEHICLE = `${CORE_API}/admVehicle`;
export const DELETE_ADMVEHICLE = `${CORE_API}/admVehicle/`;
export const GET_VEHICLEMAKE = `${CORE_API}/vehicleMake/select?filter=`;

//Route
export const GET_ROUTE = `${CORE_API}/route/select?filter=`;
export const DELETE_ROUTE = `${CORE_API}/route/`;
export const deleteConnections = (data: any) => axios.delete(`${CORE_API}/connection`, data);

//hub
export const HUB_SELECT = `${CORE_API}/hub/select`;

//ServiceTime
export const CREATE_SERVICETIME = `${CORE_API}/timecommitment`;
export const EDIT_SERVICETIME = `${CORE_API}/timecommitment`;
export const DELETE_SERVICETIME = `${CORE_API}/timecommitment/`;
export const GET_TIMEUNITTIPES = `${CORE_API}/timecommitment/selectTimeUnitTypes`;

//Price
export const PRICE_API = `${CORE_API}/pricelist`;
export const GET_CONSIGNMENT_TYPE = `${CORE_API}/pricelist/consignmenttype`;

//PRODUCT
export const GET_PRODUCT_SELECT = `${CORE_API}/product/select?filter`;
//country devision
export const GET_CUSTOM_COUNTRY_DEVISION = `${CORE_API}/customcountrydevision/select?filter=`;
//User
export const GET_USER_PROFILE = `${RESOURCE_API}/employee/info?username=`;
export const CHANGE_USER_PASSWORD = `${RESOURCE_API}/changepassword/changepassword`;
export const GET_RECOVERY_CODE = `${RESOURCE_API}/changepassword/forgotpassword`;
export const CHECK_RECOVERY_CODE = `${RESOURCE_API}/changepassword/checktoken`;
