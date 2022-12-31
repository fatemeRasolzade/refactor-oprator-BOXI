interface StatusBarProps {
  options: Array<any>;
}

const iconList = {
  All: "همه",
  Planned: "برنامه ریزی شده",
  NotPlanned: "برنامه ریزی نشده",
  InTransit: "در حال حمل",
  SuccessfulDelivery: "تحویل موفق",
  UnsuccessfulDelivery: "تحویل ناموفق",
  ScanInHub: "اسکن در هاب",
  Bagged: "کیسه شده",
  Loaded: "بارگیری شده",
  EntranceToHub: "ورودی به هاب",
  BackToOrigin: "بازگشتی به مبدا",
};

const textList = {};

const StatusBar = ({ options }: StatusBarProps) => {
  return <div>StatusBar</div>;
};

export default StatusBar;
