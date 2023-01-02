import Checkbox from "../../../../components/checkbox/Checkbox";
import CustomSwitch from "../../../../global/Switch/Switch";

const CustomerNotificationInformation = ({ formik }: any) => {
  const { values, handleChange, setFieldValue }: any = formik;
  return (
    <div className="inputRow">
      <fieldset>
        <legend>اطلاع رسانی جمع آوری از طریق</legend>
        <div className="inputRow mb-1">
          <Checkbox handleChange={handleChange} name="emailNotification" values={values.emailNotification} title="پست الکترونیک  " />
          <Checkbox handleChange={handleChange} name="smsNotification" values={values.smsNotification} title="پیامک" />
          <Checkbox
            handleChange={handleChange}
            name="pickupPaperWithEmail"
            values={values.pickupPaperWithEmail}
            title="دریافت رسید تحویل از طریق پست الکترونیک"
          />
        </div>
      </fieldset>
      <div className="centering w-60 mt-4">
        <CustomSwitch active={values.isActive} handleChange={() => setFieldValue("isActive", !values.isActive)} />
      </div>
    </div>
  );
};

export default CustomerNotificationInformation;
