export const Base_url = "http://192.168.1.153:20000";
export const Base_url2 = "http://192.168.1.153:8090";
export const Base_url3 = "http://172.16.55.144:8090";
export const Base_url4="http://boxi.local:40000"
export const API_CONSIGNMENT = `${Base_url2}/core-api`;
export const API_CONSIGNMENT2 = `${Base_url}/resource-api`;
export const API_CONSIGNMENT3 = `${Base_url3}/core-api`;
export const API_URL = `/core-api`;
export const API_URL_2 = `/resource-api`;

const createUrl = (base, dir) => {
  return base + dir;
};

export const apiRoute = () => {
  return {
    get: {
      get_city:createUrl(API_URL, "/countryDevision/city/2/loc?filter="),
      get_province:createUrl(API_URL, "/countryDevision/province/1/city?filter="),
      get_province_city:createUrl(API_URL, "/countryDevision/province/1/city?filter="),
      get_province_loc:createUrl(API_URL, "/countryDevision/city/2/loc?filter="),
      get_select_province:createUrl(API_URL, "/countryDevision?filter="),
      login_Url: createUrl(API_URL, "/auth/login"),
      user_url: createUrl(API_URL, "/users/all"),
      filter_hub: createUrl(API_URL, "/hub/filter"),
      get_hub_type: createUrl(API_URL, "/hubCategory/selectHubTypes"),
      get_hub_category: createUrl(API_URL, "/hubCategory/select"),
      //hub_category
      filter_hub_category: createUrl(API_URL, "/hubCategory/filter"),
      //select hub category
      select_hub_category:createUrl(API_URL, "/hubCategory/select?filter"),
      //select hub
      select_hub:createUrl(API_URL, "/hub/select?filter="),
      //CUSTOM_GEOGRAPHIC
      get_custom_geographics: createUrl(
        API_CONSIGNMENT,
        "/customcountrydevision/filter"
      ),
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
      //Service
      GET_SERVICES: createUrl(API_URL, `/service/select?fliter=`),
    },
    post: {
      // create
      hub: createUrl(API_URL, "/hub"),

      // filter
      filterRole: createUrl(API_CONSIGNMENT2, "/role"),
      filterPersonnel: createUrl(API_CONSIGNMENT2, "/employee"),
      serviceDefine: createUrl(API_CONSIGNMENT3, "/service"),
    },
    delete: {
      role: createUrl(API_CONSIGNMENT2, "/role"),
      personnel: createUrl(API_CONSIGNMENT2, "/employee"),
    },
  };
};
