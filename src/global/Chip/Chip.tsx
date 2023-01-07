import React, { useEffect, useState } from "react";
import { BiX, BiXCircle } from "react-icons/bi";
import SimpleButton from "../SimpleButton/SimpleButton";

interface propsData {
  formData: any;
  filterData: any;
}

const Chip: React.FC<propsData> = ({ filterData, formData }: propsData) => {
  const [chipData, setChipData] = useState<any>([]);
  const handleRemoveChipData = (id: number) => {
    const findData = chipData.find((item: { id: number }) => item.id === id);
    const filterData = chipData.filter((item: { id: number }) => item.id !== id);
    const searchData = filterData.map((item: string) => item.search);
    setChipData(filterData);
    if (findData.mainTitle === "pelak" || findData.mainTitle === "vehicleNumber") {
      formData.setFieldValue("vehicleNumber0", "");
      formData.setFieldValue("vehicleNumber1", "");
      formData.setFieldValue("vehicleNumber2", "");
      formData.setFieldValue("vehicleNumber3", "");
    }
    formData.setFieldValue(Object.keys(findData?.search).toString(), ""); //empty input data
    formData.handleSubmit(Object.assign({}, ...searchData)); //run filter data
  };

  //remove all filtered search
  const handleRemoveSearchFilters = () => {
    setChipData([]);
    formData.resetForm({});
    // setShowSearchFilters(false);
    formData.handleSubmit();
  };
  const persianName: any = {
    code: "کد ",
    name: "نام ",
    search: "کد",
    hub: "نام هاب",
    hubTypeId: "نوع هاب",
    hubCategoryId: "گونه هاب",
    parentHubId: "هاب والد",
    bagNumber: "شماره کیسه",
    selectBagType: "نوع کیسه",
    sourceHub: "هاب مقصد",
    destinationHub: "هاب مبدا",
    hubCode: "کد هاب",
    hubName: "نام هاب",
    route: "مسیر",
    pelak: "پلاک",
    description: "توضیحات",
    productGroup: "گروه محصول",
    timeUnit: "واحد",
    vehicleNumber: "شماره پلاک",
    phone: "شماره موبایل",
    email: "پست الکترونیکی",
    username: "نام کاربری",
    nationalCode: "کد ملی",
    postalCode: "کد پستی",
    address: "آدرس",
    telNumber: "شماره تلفن",
    selectParentCustomer: "مشتری والد",
    zipCode: "کد پستی",
    parentClient: "مشتری والد",
    personelCode: "کد پرسنلی",
    priceListDate: "تاریخ نرخ نامه",
    product: "محصول",
    consignmentType: "نوع مرسوله",
    classification: "نوع رده",
    source: "مبدا",
    destination: "مقصد",
    type: "نوع",
    priceList: "نرخ نامه",
    selectThirdPartyCategory: "گروه شخصیت",
    customerSegments: "مشتری ها",
    saleschannels: "کانال فروش",
    serviceDeliveryCustomers: "گروه مشتری",
    service: "سرویس",
    fromCountryDevision: "مبدا",
    toCountryDevision: "مقصد",
    vehicleMakeSelect: "مدل",
    selectRoute: "نام مسیر",
    fuelTypeSelect: "نوع سوخت",
    consignmentCapacity: "ظرفیت مرسوله",
    volumeCapacity: "ظرفیت حجمی",
    weightCapacity: "ظرفیت وزنی",
    vendorSelect: "شرکت نقلیه",
    customercode: "کد مشتری",
    consigmentnumber: "شماره مرسوله",
    tripnumber: "شماره سفر",
  };
  const valueAccessor = (value: any) => {
    if (value["label"]) {
      return value.label;
    } else if (value["text"]) {
      return value.text;
    } else if (value["day"]) {
      return value.day;
    } else if (value["year"] && value["month"] && value["day"]) {
      return value.year + "/" + value.month + "/" + value.day;
    } else if (Array.isArray(value)) {
      return value.map((item) => item.text);
    } else {
      return value;
    }
  };
  useEffect(() => {
    delete filterData?.isActive;
    const convertObject = Object.entries(filterData).map(([key, value]: any, index) =>
      value
        ? {
            search: { [`${key}`]: value },
            id: index,
            mainTitle: key,
            title: persianName[key],
            value: valueAccessor(value),
          }
        : ""
    );
    setChipData(convertObject.filter((item) => item));
  }, [filterData]);

  // @ts-ignore
  return (
    <>
      <div className="flex justify-start items-center gap-3">
        {chipData
          .filter(
            (item: { mainTitle: string }) =>
              item?.mainTitle !== "isActive" &&
              item.mainTitle !== "vehicleNumber0" &&
              item.mainTitle !== "vehicleNumber1" &&
              item.mainTitle !== "vehicleNumber2" &&
              item.mainTitle !== "vehicleNumber3"
          )
          .map(({ id, title, value }: any) => (
            <div key={id} className="bg-mainGray w-fit py-1 px-3 flex-between-center rounded-lg  shadow">
              <span className="text-darkGray pl-1">{title}:</span>
              <span className="text-dark">{value}</span>
              <span
                className="cursor-pointer mr-2"
                onClick={() => {
                  handleRemoveChipData(id);
                }}
              >
                <BiXCircle size={18} className="text-dark" />
              </span>
            </div>
          ))}
        {chipData.length > 0 ? (
          <SimpleButton handelClick={handleRemoveSearchFilters} className="line-tomato-btn p-0" text="حذف جستجوها" icon={<BiX size={22} />} />
        ) : null}
      </div>
    </>
  );
};

export default Chip;
