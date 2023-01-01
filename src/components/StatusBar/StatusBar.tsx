import { ElementsConsignment } from "../../models/consigment";

interface OptionsProps {
  name: string;
}

interface StatusBarProps {
  Options: Array<OptionsProps>;
}

const StatusBar = ({ Options }: StatusBarProps) => {
  return (
    <div className="flex-start-start gap-7 mb-5 flex-wrap">
      {Options.map((item: any) => (
        <div className="flex-start-center gap-2 border-l pl-4">
          <div>{ElementsConsignment[item.name].icon}</div>
          <div className="flex-between-end flex-col ">
            <p className="!text-darkGray text-base font-bold">{item.value}</p>
            <p className="!text-darkGray">
              {ElementsConsignment[item.name].text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusBar;
