import Checkbox from "../../../../components/checkbox/Checkbox";
import InputText from "../../../../global/InputText/InputText";

const CustomerUsernameInformation = ({ formik, currentData }: any) => {
  const { values, errors, touched, handleChange }: any = formik;

  return (
    <div className="inputRow mt-6">
      <fieldset>
        <legend>اطلاعات کاربری</legend>
        <div className="inputRow -mb-3">
          <InputText
            important
            label="نام کاربری"
            values={values.username}
            name="username"
            handleChange={handleChange}
            error={touched.username && errors.username}
            readOnly={currentData && true}
          />
          {!currentData && (
            <>
              <InputText
                password
                important
                label="گذر واژه "
                values={values.password}
                name="password"
                handleChange={handleChange}
                error={touched.password && errors.password}
              />
              <InputText
                password
                important
                label="تایید گذرواژه"
                values={values.confirmPassword}
                name="confirmPassword"
                handleChange={handleChange}
                error={touched.confirmPassword && errors.confirmPassword}
              />
            </>
          )}
        </div>
      </fieldset>
      <div className="inputRow mt-8">
        <Checkbox
          handleChange={handleChange}
          name="extendGlobalVirtualSeries"
          values={values.extendGlobalVirtualSeries}
          title="استفاده از منبع بارکد عمومی"
        />
        <Checkbox handleChange={handleChange} name="dynamicPickupAllocation" values={values.dynamicPickupAllocation} title="تخصیص خودکار جمع آوری" />
      </div>
    </div>
  );
};

export default CustomerUsernameInformation;
