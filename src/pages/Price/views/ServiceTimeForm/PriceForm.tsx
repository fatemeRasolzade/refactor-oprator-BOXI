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
              : "",
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
              : "",
          fromSourceCity:
            a.priceDetailDevisions.length !== 0
              ? a.priceDetailDevisions
                  .map((from: any) => from.fromCountryDevision)
                  .flat(1)
                  .filter((division: any) => division.countryType === "REGION")
                  .filter((elem: any, index: any, arr: any) => index === arr.findIndex((t: any) => t.id === elem.id))
              : "",
          fromSourceLocation:
            a.priceDetailDevisions.length !== 0
              ? a.priceDetailDevisions
                  .map((from: any) => from.fromCountryDevision)
                  .flat(1)
                  .filter((division: any) => division.countryType === "CITY")
                  .filter((elem: any, index: any, arr: any) => index === arr.findIndex((t: any) => t.id === elem.id))
              : "",

          toCountryDevision:
            a.priceDetailDevisions.length !== 0
              ? a.priceDetailDevisions
                  .map((from: any) => from.toCountryDevision)
                  .flat(1)
                  .filter((division: any) => division.countryType === "PROVINCE")
                  .filter((elem: any, index: any, arr: any) => index === arr.findIndex((t: any) => t.id === elem.id))
              : "",
          fromDestinationCity:
            a.priceDetailDevisions.length !== 0
              ? a.priceDetailDevisions
                  .map((from: any) => from.toCountryDevision)
                  .flat(1)
                  .filter((division: any) => division.countryType === "REGION")
                  .filter((elem: any, index: any, arr: any) => index === arr.findIndex((t: any) => t.id === elem.id))
              : "",
          fromDestinationLocation:
            a.priceDetailDevisions.length !== 0
              ? a.priceDetailDevisions
                  .map((from: any) => from.toCountryDevision)
                  .flat(1)
                  .filter((division: any) => division.countryType === "CITY")
                  .filter((elem: any, index: any, arr: any) => index === arr.findIndex((t: any) => t.id === elem.id))
              : "",
        };
        array.push(object);
      });
      setAttributes(array);
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
  }, [handleReset, open]);

  return (
    <Modal visible={open} setVisible={setOpen} title={currentData ? "ویرایش نرخ نامه" : "تعریف نرخ نامه"}>
      <form onSubmit={handleSubmit}>
        <PriceFormInformation formik={formik} />
      </form>
      <PriceAttributeForm Attributes={Attributes} setAttributes={setAttributes} open={open} handleResetOuter={handleReset} />
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
