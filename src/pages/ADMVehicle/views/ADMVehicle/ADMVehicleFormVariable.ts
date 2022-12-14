import * as Yup from "yup";

export const ADMVehicleFormValidation = () =>
  Yup.object().shape({
    vehicleNumber0: Yup.number().required(),
    vehicleNumber1: Yup.string().required(),
    vehicleNumber2: Yup.string().required(),
    vehicleNumber3: Yup.number().required(),
    dayToStartWork: Yup.string().required(),
    dayToFinishWork: Yup.string().required(),
    timeToStartWork: Yup.string().required(),
    timeToFinishWork: Yup.string().required(),
    selectHub: Yup.object().shape({
      text: Yup.string().required(),
      id: Yup.string().required(),
    }),
    vehicleMakeSelect: Yup.object().shape({
      text: Yup.string().required(),
      id: Yup.string().required(),
    }),

    volumeCapacity: Yup.number().required(),
    weightCapacity: Yup.number().required(),
    name: Yup.string(),
    code: Yup.string(),
  });

export const ADMVehicleFormInitialValues = {
  vehicleNumber0: "",
  vehicleNumber1: "",
  vehicleNumber2: "",
  vehicleNumber3: "",
  weightCapacity: "",
  volumeCapacity: "",
  dayToStartWork: null,
  dayToFinishWork: null,
  timeToStartWork: "",
  timeToFinishWork: "",
  
  fleetTypeSelect: "",
  selectRoute: {},
  selectHub: {},
  vehicleMakeSelect: {},
};

export const ADMVehicleFormCurrentValues = (currentData: any) => {
  return {
    id: currentData?.id,
    vehicleNumber0: currentData?.vehicleNumber0,
    vehicleNumber1: currentData?.vehicleNumber1,
    vehicleNumber2: currentData?.vehicleNumber2,
    vehicleNumber3: currentData?.vehicleNumber3,
    weightCapacity: currentData?.weightCapacity,
    volumeCapacity: currentData?.volumeCapacity,
    dayToStartWork: {
      year: currentData?.dayToStartWork.year,
      month: currentData?.dayToStartWork.month,
      day: currentData?.dayToStartWork.day,
    },
    dayToFinishWork: {
      year: currentData?.dayToFinishWork.year,
      month: currentData?.dayToFinishWork.month,
      day: currentData?.dayToFinishWork.day,
    },
    timeToStartWork: currentData?.timeToStartWork,
    timeToFinishWork: currentData?.timeToFinishWork,
    fleetTypeSelect: {
      id: 0,
      text: "",
    },
    selectRoute: {
      id: currentData.selectRoute.id,
      text: currentData.selectRoute.text,
    },
    selectHub: {
      id: currentData.selectHub.id,
      text: currentData.selectHub.text,
    },
    vehicleMakeSelect: {
      id: currentData.vehicleMakeSelect.id,
      text: currentData.vehicleMakeSelect.text,
    },
  };
};
