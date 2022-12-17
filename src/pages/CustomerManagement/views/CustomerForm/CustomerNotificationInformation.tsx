import Checkbox from "../../../../components/checkbox/Checkbox";
import CustomSwitch from "../../../../global/Switch/Switch";

const CustomerNotificationInformation = ({ formik }: any) => {
  const { values, handleChange, setFieldValue }: any = formik;
  return (
    <div className="inputRow">
      <div className="border rounded-lg px-5 pt-8 mt-5 relative">
        <span className="absolute -top-3 right-8 px-2 bg-light text-darkGray">اطلاع رسانی جمع آوری از طریق</span>
        <div className="inputRow">
          <Checkbox handleChange={handleChange} name="emailNotification" values={values.emailNotification} title="پست الکترونیک  " />
          <Checkbox handleChange={handleChange} name="smsNotification" values={values.smsNotification} title="پیامک" />
          <Checkbox
            handleChange={handleChange}
            name="pickupPaperWithEmail"
            values={values.pickupPaperWithEmail}
            title="دریافت رسید تحویل از طریق پست الکترونیک"
          />
        </div>
      </div>
      <div className="centering w-60 mt-5">
        <CustomSwitch active={values.isActive} handleChange={() => setFieldValue("isActive", !values.isActive)} />
      </div>
    </div>
  );
};

export default CustomerNotificationInformation;
