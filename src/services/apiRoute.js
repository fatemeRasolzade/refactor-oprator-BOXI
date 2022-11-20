export const Base_url = "http://192.168.1.153:8090";
export const Base_url2 = "http://172.16.38.210:8090";
export const Base_url3 ="http://172.16.55.144:8090"
export const API_CONSIGNMENT = `${Base_url2}/core-api`;
export const API_URL =`/core-api`;



const createUrl =(base, dir) => {
  return base + dir;
};

export const apiRoute = () => {
  return {
    get: {
      
      login_Url: createUrl(API_URL, "/auth/login"),
      user_url: createUrl(API_URL, "/users/all"),
      filter_hub: createUrl(API_URL, "/hub/filter"),
      get_hub_type: createUrl(API_URL, "/hubCategory/selectHubTypes"),
      get_hub_category: createUrl(API_URL, "/hubCategory/select"),
      //hub_category
      filter_hub_category: createUrl(API_URL, "/hubCategory/filter"),
      //CUSTOM_GEOGRAPHIC
      get_custom_geographics: createUrl(API_CONSIGNMENT,"/customcountrydevision/filter"),
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
      GET_PRODUCT: createUrl(API_CONSIGNMENT, "/product/filter"),
      //PRODUCT_GROUP
      GET_PRODUCT_GROUPS: createUrl(API_CONSIGNMENT, "/productGroup/filter"),
      //SERVICE_TIME
      GET_SERVICE_TIME: createUrl(API_CONSIGNMENT, "/timecommitment/filter"),
      //ADM_VEHICLE
      GET_ADM_VEHICLE: createUrl(API_URL, "/admVehicle/filter"),
    },
    post:{
      hub:createUrl(API_URL, "/hub"),
    }
  };
};
