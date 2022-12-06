import { BiTrash } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";

const CustomerTelephoneElements = ({
  phone,
  handleEdit,
  handleDelete,
}: any) => {
  return (
    <div className="flex flex-col py-3 text-sm text-mainGray">
      <div className="flex justify-between gap-5">
        <div className="flex justify-start gap-8">
          <p>تماس از طریق: {phone?.selectPhoneType?.text} </p>
          <p>
            شماره تماس: {phone?.telephonePrefix?.text}
            {phone?.telNumber}
          </p>
        </div>
        <div className="flex justify-end gap-3">
          <div className="flex gap-1 cursor-pointer" onClick={handleEdit}>
            <p>ویرایش</p>
            <FiEdit />
          </div>
          <div className="flex gap-1 cursor-pointer" onClick={handleDelete}>
            <p>حذف</p>
            <BiTrash />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerTelephoneElements;
