import { toast } from "react-toastify";
import { deleteAddress, deletePhone } from "../../../../../services/GlobalApi";
import { ReverseArray } from "../../../../../tools/functions/Methods";
import CustomerAddressElements from "./ThirdPartyAddressElements";
import CustomerTelephoneElements from "./ThirdPartyTelephoneElements";

const ThirdPartyCommunicationInformation = ({ formik, handleOpenAddress, handleOpenPhone }: any) => {
  const { values, setFieldValue }: any = formik;

  const handleDeleteAddressElements = (id?: any) => {
    if (id.toString().includes("null")) {
      const filtered = values.addresses.filter((a: any) => a.id !== id);
      setFieldValue("addresses", filtered);
    } else {
      deleteAddress(id)
        .then(() => {
          const filtered = values.addresses.filter((a: any) => a.id !== id);
          setFieldValue("addresses", filtered);
        })
        .catch(() => {
          toast.error("حذف آدرس با مشکل مواجه شده است");
        });
    }
  };

  const handleDeleteTelephonesElements = (id: any) => {
    if (id.toString().includes("null")) {
      const filtered = values.telephones.filter((t: any) => t.id !== id);
      setFieldValue("telephones", filtered);
    } else {
      deletePhone(id)
        .then(() => {
          const filtered = values.telephones.filter((t: any) => t.id !== id);
          setFieldValue("telephones", filtered);
        })
        .catch(() => {
          toast.error("حذف تلفن با مشکل مواجه شده است");
        });
    }
  };

  return (
    <div className="flex-between-start gap-5 mt-3">
      <fieldset className="w-full">
        <legend>آدرس </legend>
        <p className="text-tomato cursor-pointer mb-5 " onClick={() => handleOpenAddress(1)}>
          + افزودن آدرس جدید
        </p>
        {values?.addresses.length > 0 &&
          ReverseArray(values?.addresses).map((address: any) => (
            <CustomerAddressElements
              address={address}
              handleEdit={() => handleOpenAddress(2, address, address.id)}
              handleDelete={() => handleDeleteAddressElements(address.id)}
            />
          ))}
      </fieldset>
      <fieldset className=" w-full">
        <legend>اطلاعات تماس </legend>
        <p className="text-tomato cursor-pointer mb-5 " onClick={() => handleOpenPhone(1)}>
          + افزودن اطلاعات تماس جدید
        </p>
        {values.telephones.length > 0 &&
          ReverseArray(values.telephones).map((phone: any) => (
            <CustomerTelephoneElements
              phone={phone}
              handleEdit={() => handleOpenPhone(2, phone, phone.id)}
              handleDelete={() => handleDeleteTelephonesElements(phone.id)}
            />
          ))}
      </fieldset>
    </div>
  );
};

export default ThirdPartyCommunicationInformation;
