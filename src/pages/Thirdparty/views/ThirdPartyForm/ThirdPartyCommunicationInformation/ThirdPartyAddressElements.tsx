import { BiTrash } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";

const ThirdPartyAddressElements = ({ address, handleEdit, handleDelete }: any) => {
  return (
    <div className="flex flex-col py-3 text-sm !text-darkGray">
      <div className="flex justify-start gap-8">
        <p className="!text-darkGray">نوع آدرس: {address?.selectAddressType?.text} </p>
        <p className="!text-darkGray">کد پستی: {address?.postalCode}</p>
      </div>
      <div className="flex justify-between gap-5">
        <p className="!text-darkGray">آدرس:{address?.address}</p>
        <div className="flex justify-end gap-4">
          <div className="flex gap-1 cursor-pointer" onClick={handleEdit}>
            <p className="!text-darkGray">ویرایش</p>
            <FiEdit className="!text-darkGray" />
          </div>
          <div className="flex gap-1 cursor-pointer" onClick={handleDelete}>
            <p className="!text-darkGray">حذف</p>
            <BiTrash className="!text-darkGray" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdPartyAddressElements;
