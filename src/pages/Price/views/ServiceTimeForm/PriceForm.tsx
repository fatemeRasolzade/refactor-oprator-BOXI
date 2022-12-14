import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Modal from "../../../../global/Modal/Modal";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
import { EditDataParams, postDataToServer } from "../../../../services/Service_call";
import PriceFormInformation from "./PriceFormInformation";
import PriceAttributeForm from "./PriceAttributeForm";
import { PriceFormCurrentValues, PriceFormInitialValues, PriceFormValidation } from "./PriceFormVariable";
import { PRICE_API } from "../../../../services/apiRoute";
import { priceData } from "../../../../redux/PriceData/PriceData";
import { DateCompare } from "../../../../tools/functions/Methods";

type PriceFormFormProps = {
  currentData?: any;
  open: boolean;
  setOpen: (value: boolean) => void;
};

const PriceForm = ({ currentData, open, setOpen }: PriceFormFormProps) => {
  const [Attributes, setAttributes] = useState<any>([]);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const convertToObjects = (from?: any, to?: any, id?: any, customDevision?: any, isActive?: any, consignmentType?: any) => {
    let arr = [];
    for (let i = 0; i < from.length; i++) {
      for (let j = 0; j < to.length; j++) {
        arr.push({
          fromCountryDevision: from[i],
          toCountryDevision: to[j],
          id: id,
          isActive: isActive,
          consignmentType: consignmentType || null,
        });
      }
    }
    return arr;
  };

  useEffect(() => {
    if (currentData) {
      let array: any = [];
      currentData?.priceListDetails.map((a: any) => {
        let object = {
          ...a,
          classification:
            a.priceDetailDevisions.length !== 0
              ? { id: 2, text: "استاندارد" }
              : a?.customDevision && Object.keys(a?.customDevision).length !== 0
              ? { id: 1, text: "سفارشی" }
              : undefined,
          totalWight: { from: a.fromWeight || "", to: a.toWeight || "" },
          totalDim: { from: a.fromDim || "", to: a.toDimension || "" },
          totalValue: { from: a.fromValue || "", to: a.toValue || "" },
          totalNumber: { from: a.fromNumber || "", to: a.toNumber || "" },
          fromCountryDevision:
            a.priceDetailDevisions.length !== 0
              ? a.priceDetailDevisions
                  .map((from: any) => from.fromCountryDevision)
                  .flat(1)
                  .filter((division: any) => division.countryType === "PROVINCE")
                  .filter((elem: any, index: any, arr: any) => index === arr.findIndex((t: any) => t.id === elem.id))
              : undefined,
          fromSourceCity:
            a.priceDetailDevisions.length !== 0
              ? a.priceDetailDevisions
                  .map((from: any) => from.fromCountryDevision)
                  .flat(1)
                  .filter((division: any) => division.countryType === "CITY")
                  .filter((elem: any, index: any, arr: any) => index === arr.findIndex((t: any) => t.id === elem.id))
              : undefined,
          fromSourceLocation:
            a.priceDetailDevisions.length !== 0
              ? a.priceDetailDevisions
                  .map((from: any) => from.fromCountryDevision)
                  .flat(1)
                  .filter((division: any) => division.countryType === "REGION")
                  .filter((elem: any, index: any, arr: any) => index === arr.findIndex((t: any) => t.id === elem.id))
              : undefined,

          toCountryDevision:
            a.priceDetailDevisions.length !== 0
              ? a.priceDetailDevisions
                  .map((from: any) => from.toCountryDevision)
                  .flat(1)
                  .filter((division: any) => division.countryType === "PROVINCE")
                  .filter((elem: any, index: any, arr: any) => index === arr.findIndex((t: any) => t.id === elem.id))
              : undefined,
          fromDestinationCity:
            a.priceDetailDevisions.length !== 0
              ? a.priceDetailDevisions
                  .map((from: any) => from.toCountryDevision)
                  .flat(1)
                  .filter((division: any) => division.countryType === "CITY")
                  .filter((elem: any, index: any, arr: any) => index === arr.findIndex((t: any) => t.id === elem.id))
              : undefined,
          fromDestinationLocation:
            a.priceDetailDevisions.length !== 0
              ? a.priceDetailDevisions
                  .map((from: any) => from.toCountryDevision)
                  .flat(1)
                  .filter((division: any) => division.countryType === "REGION")
                  .filter((elem: any, index: any, arr: any) => index === arr.findIndex((t: any) => t.id === elem.id))
              : undefined,
        };
        array.push(object);
      });

      const finalData = array.map((item: any) => ({
        ...item,
        priceDetailDevisions:
          item.fromDestinationLocation && item.fromDestinationLocation.length !== 0
            ? convertToObjects(item.fromDestinationLocation, item.fromSourceLocation, item.id, item.customDevision, item.isActive)
            : item.fromDestinationCity && item.fromDestinationCity.length !== 0
            ? convertToObjects(item.fromDestinationCity, item.fromSourceCity, item.id, item.customDevision, item.isActive)
            : item.fromDestinationState && item.fromDestinationState.length !== 0
            ? convertToObjects(item.fromDestinationState, item.fromSourceState, item.id, item.customDevision, item.isActive)
            : [],
        // fromCountryDevision:
        //   item.fromDestinationLocation && item.fromDestinationLocation.length !== 0
        //     ? item.fromDestinationLocation
        //     : item.fromDestinationCity && item.fromDestinationCity.length !== 0
        //     ? item.fromDestinationCity
        //     : item.fromDestinationState && item.fromDestinationState.length !== 0
        //     ? item.fromDestinationState
        //     : "",
        // toCountryDevision:
        //   item.fromSourceLocation && item.fromSourceLocation.length !== 0
        //     ? item.fromSourceLocation
        //     : item.fromSourceCity && item.fromSourceCity.length !== 0
        //     ? item.fromSourceCity
        //     : item.fromSourceState && item.fromSourceState.length !== 0
        //     ? item.fromSourceState
        //     : "",
      }));
      setAttributes(finalData);
    }
  }, [currentData]);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: PriceFormValidation,
    validate: (values) => {
      const errors = {};
      const [isValid, errDate] = DateCompare(values.validDateFrom, values.validDateTo);
      if (!isValid) {
        // @ts-ignore
        errors.validDateFrom = errDate;
      }
      return errors;
    },
    initialValues: currentData ? PriceFormCurrentValues(currentData) : PriceFormInitialValues,
    onSubmit: (values: any) => {
      setLoading(true);
      if (Attributes.length === 0) {
        toast.error("هنوز رکوردی ثبت نشده است");
      } else {
        if (currentData) {
          EditDataParams(PRICE_API, {
            ...values,
            priceListDetails: Attributes,
            id: currentData.id,
          })
            .then(() => {
              dispatch(priceData({}) as any);
              setOpen(false);
              toast.success("نرخ نامه ویرایش شد");
            })
            .catch(() => {})
            .finally(() => setLoading(false));
        } else {
          values.priceListDetails = Attributes.map((a: any) => {
            return { ...a, id: undefined };
          });
          postDataToServer(PRICE_API, values)
            .then(() => {
              dispatch(priceData({}) as any);
              setOpen(false);
              toast.success("نرخ نامه افزوده شد");
            })
            .finally(() => setLoading(false));
        }
      }
    },
  });

  const { handleSubmit, handleReset }: any = formik;

  const handleCloseCustomerForm = () => setOpen(false);

  useEffect(() => {
    handleReset();
    if (!currentData) {
      setAttributes([]);
    }
  }, [handleReset, open]);

  return (
    <Modal visible={open} setVisible={setOpen} title={currentData ? "ویرایش نرخ نامه" : "تعریف نرخ نامه"}>
      <form onSubmit={handleSubmit}>
        <PriceFormInformation formik={formik} open={open} />
      </form>
      <PriceAttributeForm
        Attributes={Attributes}
        setAttributes={setAttributes}
        open={open}
        handleResetOuter={handleReset}
        currentData={currentData}
      />
      <div className="flex-end-center mt-5 gap-3">
        <SimpleButton handelClick={handleCloseCustomerForm} text="لغو" className="full-lightTomato-btn" />
        <SimpleButton
          handelClick={handleSubmit}
          loading={Loading}
          type="submit"
          text={currentData ? "ویرایش" : "افزودن"}
          className="full-tomato-btn"
        />
      </div>
    </Modal>
  );
};

export default PriceForm;
