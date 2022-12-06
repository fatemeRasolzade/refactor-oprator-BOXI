import Switch from "react-switch";
const CustomSwitch = ({
  handleChange,
  active,
}: {
  handleChange?: any;
  active?: any;
}) => {

  return (
    <div>
      <label className="flex justify-center items-center flex-row-reverse w-fit">
        <span className="mr-2 w-20">{active ? "فعال" : "غیر فعال"}</span>
        <Switch
          onChange={handleChange}
          checked={active}
          onColor="#FFEAE9"
          offColor="#F9FAFC"
          onHandleColor="#EF5644"
          offHandleColor="#e7e5e5"
          width={40}
          height={20}
        />
      </label>
    </div>
  );
};

export default CustomSwitch;
