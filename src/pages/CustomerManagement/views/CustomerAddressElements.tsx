import { BiTrash } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";

const CustomerAddressElements = ({
  address,
  handleEdit,
  handleDelete,
}: any) => {
  return (
    <div className="flex flex-col py-3 text-sm text-mainGray">
      <div className="flex justify-start gap-8">
        <p>نوع آدرس: {address?.selectAddressType?.text} </p>
        <p>کد پستی: {address?.postalCode}</p>
      </div>
      <div className="flex justify-between gap-5">
        <p>آدرس:{address?.address}</p>
        <div className="flex justify-end gap-4">
          <div className="flex gap-1 cursor-pointer" onClick={handleEdit}>
            <p>ویرایش</p>
            {/* <IconEdit /> */}
            <FiEdit />
          </div>
          <div className="flex gap-1 cursor-pointer" onClick={handleDelete}>
            <p>حذف</p>
            <BiTrash />
            {/* <IconTrash /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAddressElements;
