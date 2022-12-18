export const Base_url = "http://192.168.1.153:20000";
export const Base_url2 = "http://192.168.1.153:8090";
export const Base_url3 = "http://172.16.55.144:8090";
export const Base_url4 = "http://boxi.local:40000";
export const API_CONSIGNMENT = `${Base_url2}/core-api`;
export const API_CONSIGNMENT2 = `${Base_url4}/resource-api`;
export const API_CONSIGNMENT3 = `${Base_url3}/core-api`;
export const API_CONSIGNMENT4 = `${Base_url4}/core-api`;

export const API_URL = `/core-api`;
export const API_URL_2 = `/resource-api`;

export const CORE_API = `${process.env.REACT_APP_BASE_URL}core-api`;
export const RESOURCE_API = `${process.env.REACT_APP_BASE_URL}resource-api`;

const createUrl = (base: any, dir: any) => {
  return base + dir;
};

export const apiRoute = () => {
  return {
    get: {
      get_city: createUrl(API_URL, "/countryDevision/city/2/loc?filter="),
      get_province: createUrl(API_URL, "/countryDevision/province/1/city?filter="),
      get_province_city: createUrl(API_URL, "/countryDevision/province/1/city?filter="),
      get_province_loc: createUrl(API_URL, "/countryDevision/city/2/loc?filter="),
      get_select_province: createUrl(API_URL, "/countryDevision?filter="),
      login_Url: createUrl(API_URL, "/auth/login"),
      user_url: createUrl(API_URL, "/users/all"),
      filter_hub: createUrl(API_URL, "/hub/filter"),
      get_hub_type: createUrl(API_URL, "/hubCategory/selectHubTypes"),
      get_hub_category: createUrl(API_URL, "/hubCategory/select"),
      //hub_category
      filter_hub_category: createUrl(API_URL, "/hubCategory/filter"),
      //select hub category
      select_hub_category: createUrl(API_URL, "/hubCategory/select?filter"),
      //select hub
      select_hub: createUrl(API_URL, "/hub/select?filter="),
      //CUSTOM_GEOGRAPHIC
      get_custom_geographics: createUrl(API_CONSIGNMENT, "/customcountrydevision/filter"),
      //VENDOR
      get_venders: createUrl(API_URL, "/vendor/filter"),
      //VEHICLE_MODEL
      GET_VEHICLE_MODEL: createUrl(API_URL, "/vehicleMake/filter"),
      //VEHICLE
      GET_VEHICLE: createUrl(API_URL, "/vehicle/filter"),
      //ROUTE
      GET_ROUTE: createUrl(API_URL, "/route/filter"),
      //Gate
      GET_GATE: createUrl(API_URL, "/gate/filter"),
      //Dock
      GET_DOCKS: createUrl(API_URL, "/dock/filter"),
      //BAG
      GET_BAGS: createUrl(API_URL, "/bag/filter"),
      //CONNECTION
      GET_CONNECTION: createUrl(API_URL, "/connection/filter"),
      //PRODUCT
      GET_PRODUCT: createUrl(API_CONSIGNMENT4, "/vendor/select?filter="),
      //PRODUCT_GROUP
      GET_PRODUCT_GROUPS: createUrl(API_CONSIGNMENT4, "/productGroup/select?filter="),
      //SERVICE_TIME
      GET_SERVICE_TIME: createUrl(API_CONSIGNMENT, "/timecommitment/filter"),
      //ADM_VEHICLE
      GET_ADM_VEHICLE: createUrl(API_URL, "/admVehicle/filter"),
      //Service
      GET_SERVICES: createUrl(API_URL, `/service/select?fliter=`),
    },
    post: {
      // create
      hub: createUrl(API_URL, "/hub"),
      createProduct: createUrl(API_CONSIGNMENT4, "/product"),
      createVendor: createUrl(API_CONSIGNMENT4, "/vendor"),
      VehicleModel: createUrl(API_CONSIGNMENT4, "/vehicleMake"),
      // filter
      filterRole: createUrl(API_CONSIGNMENT2, "/role"),
      // employee
      filterPersonnel: createUrl(API_CONSIGNMENT2, "/employee"),
      serviceDefine: createUrl(API_CONSIGNMENT4, "/service"),
      product: createUrl(API_CONSIGNMENT4, "/product"),
      service_provision:createUrl(API_CONSIGNMENT4, "/servicedeliveryservice"),
      filterVendor: createUrl(API_CONSIGNMENT4, "/vendor"),
      Type_Hub_table:createUrl(API_CONSIGNMENT4 , "/hubCategory")
    },
    postExcel: {
      exception: createUrl(API_CONSIGNMENT3, "/exception"),
    },
    delete: {
      role: createUrl(API_CONSIGNMENT2, "/role"),
      personnel: createUrl(API_CONSIGNMENT2, "/employee"),
      VehicleModel: createUrl(API_CONSIGNMENT4, "/vehicleMake"),
      vendor: createUrl(API_CONSIGNMENT4, "/vendor"),
      serviceDefine: createUrl(API_CONSIGNMENT4, "/service"),
      productDefine: createUrl(API_CONSIGNMENT4, "/product"),
      hubTable: createUrl(API_CONSIGNMENT4, "/hub"),
    },
    edit: {
      EditVendor: createUrl(API_CONSIGNMENT4, "/vendor"),
      VehicleModel: createUrl(API_CONSIGNMENT4, "/vehicleMake"),
      productDefine: createUrl(API_CONSIGNMENT4, "/product"),
    },
  };
};

//Gloobal
export const GET_PROVINCES = `${API_URL}/countryDevision/province/1/city?filter=`;
export const GET_CITIES = `${API_URL}/countryDevision/province/1/city?filter=`;
export const GET_REGIONS = `${API_URL}/countryDevision/city/2/loc?filter=`;
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

//hub
export const HUB_SELECT = `${CORE_API}/hub/select`;
