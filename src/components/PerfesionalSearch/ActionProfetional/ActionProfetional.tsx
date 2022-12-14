import ChipIcon from "../../../global/ChipIcon/ChipIcon";
import CustomSwitch from "../../../global/Switch/Switch";
import Checkbox from "../../checkbox/Checkbox";
const ActionProfetional = () => {
  const checkboxed = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-4">
        <h3 className="my-4">تمام عملیات</h3>
        {/* search Input */}
        {/* <InputText/> */}

        {/*sample checkbox */}
        <div className="h-300 overflow-auto mt-5" dir="ltr">
          <div dir="rtl" className="pr-5">
            {checkboxed.map((item) => {
              return "checkBox";
            })}
          </div>
        </div>
      </div>
      {/* second column */}
      <div className="col-span-8 flex">
        <div className="flex-1">
          <h3 className="my-4"> عملیات های انتخاب شده</h3>
          {/* <InputText/> */}
          <div className="h-300 overflow-auto mt-5" dir="ltr">
            <div dir="rtl">
              {checkboxed.map((item) => {
                return <ChipIcon text="text" id="" />;
              })}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="my-4">نمایش در صفحه اصلی</h3>
          <div className="mt-20"></div>
          <div className="h-300 overflow-auto mt-5 flex flex-col justify-center items-center">
            {checkboxed.map(() => {
              return (
                <div className="my-2">
                  <CustomSwitch
                    active={true}
                    handleChange={(checked: boolean) =>
                      console.log("isactive", checked)
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionProfetional;
