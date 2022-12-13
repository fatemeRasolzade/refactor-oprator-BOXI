import Checkbox from "../../../../components/checkbox/Checkbox";
import InputText from "../../../../global/InputText/InputText";

const ThirdPartyUsernameInformation = ({ formik, currentData }: any) => {
  const { values, errors, touched, handleChange }: any = formik;

  return (
    <div className="inputRow">
      <div className="border rounded-lg px-5 pt-10 mt-10 relative">
        <span className="absolute -top-3 right-8 px-2 bg-light text-darkGray">اطلاعات کاربری</span>
        <div className="inputRow">
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
                important
                label="گذر واژه "
                values={values.password}
                name="password"
                handleChange={handleChange}
                error={touched.password && errors.password}
              />
              <InputText
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
      </div>
      <div className="inputRow mt-16">
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

export default ThirdPartyUsernameInformation;
