import * as Yup from "yup";

export const ADMVehicleFormValidation = () =>
  Yup.object().shape({
    vehicleNumber0: Yup.string().required(),
    vehicleNumber1: Yup.string().required(),
    vehicleNumber2: Yup.string().required(),
    vehicleNumber3: Yup.string().required(),
    dayToStartWork: Yup.object().shape({
      day: Yup.number().required(),
      month: Yup.number().required(),
      year: Yup.number().required(),
    }),
    dayToFinishWork: Yup.object().shape({
      day: Yup.number().required(),
      month: Yup.number().required(),
      year: Yup.number().required(),
    }),
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
    isActive: Yup.boolean(),
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
  isActive: true,
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
    selectRoute: currentData.selectRoute,
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
