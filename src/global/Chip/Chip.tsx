import React, {useEffect, useState} from 'react'
import {BiX, BiXCircle} from 'react-icons/bi'
import {ServiceData} from "../../redux/ServiceDefine/ServiceDefineReducer";
import {toast} from "react-toastify";
import update = toast.update;




interface propsData {


    formData: any,
    filterData: any,
    // value?:any
    // value:never
}

const Chip: React.FC<propsData> = ({filterData, formData}: propsData) => {


    const [chipData, setChipData] = useState<any>([]);
    const handleRemoveChipData = ( id: number) => {
        const findData = chipData.find((item: { id: number; }) => item.id === id);
        const filterData = chipData.filter((item: { id: number; }) => item.id !== id);
        const searchData = filterData.map((item: string) => item.search);
        setChipData(filterData);
        if (findData.mainTitle === "pelak" || findData.mainTitle === "vehicleNumber") {
            formData.setFieldValue("vehicleNumber0", "");
            formData.setFieldValue("vehicleNumber1", "");
            formData.setFieldValue("vehicleNumber2", "");
            formData.setFieldValue("vehicleNumber3", "");
        }
        formData.setFieldValue(Object.keys(findData?.search).toString(), "");
        formData.handleSubmit(Object.assign({}, ...searchData));
    }


    const persianName:any= {
        code:  "کد هاب",
        name:  "نام هاب",
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
        fromCountryDevision: 'مبدا',
        toCountryDevision: 'مقصد'

    };

    useEffect(() => {
        const convertObject = Object.entries(filterData).map(([key, value], index) =>
            value
                ? {
                    search: {[`${key}`]: value},
                    id: index,
                    mainTitle: key,
                    title: persianName[key],
                    // @ts-ignore
                    value: value?.label
                        // @ts-ignore
                        ? value.label
                        // @ts-ignore
                        : value?.text
                            // @ts-ignore
                        ? value.text
                            // @ts-ignore
                        : value?.day
                                // @ts-ignore
                        ? value.year + "/" + value.month + "/" + value.day
                        : Array.isArray(value)
                        ? value.map((item) => item.text)
                        : value,
                }
                : ""
        );
        setChipData(convertObject.filter((item) => item));
    }, [filterData]);


    // @ts-ignore
    return (
        <>

            <div className='flex justify-start items-center gap-3 mt-6'>
                {chipData
                    .filter(
                        (item: { mainTitle: string; }) =>
                            item?.mainTitle !== "isActive" &&
                            item.mainTitle !== "vehicleNumber0" &&
                            item.mainTitle !== "vehicleNumber1" &&
                            item.mainTitle !== "vehicleNumber2" &&
                            item.mainTitle !== "vehicleNumber3"
                    )
                    .map(({ id, title, value }:any) => (
                        <div key={id}
                             className='bg-grayLight flex w-fit py-1 px-3 justify-between items-center rounded-md'>
                            <span>{title} : {value}</span>
                            <span className='mr-2 cursor-pointer' onClick={() => {
                                handleRemoveChipData( id)
                            }}><BiXCircle/></span>
                        </div>
                    ))}

                {chipData.length > 0 ? (
                    <div>
                        <button
                            className='w-122 h-21 flex justify-center items-center flex-row-reverse border-none text-tomato'
                            onClick={() => {
                                setChipData([])
                                formData.resetForm({});
                            }}>حذف جستجوها <span><BiX/></span></button>
                    </div>) : null}
            </div>


        </>
    )
}

export default Chip