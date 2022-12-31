import { useEffect, useState } from "react";
import Modal from "../../global/Modal/Modal";
import { GET_USER_PROFILE } from "../../services/apiRoute";
import UserService from "../../services/keycloakService";
import { getDataFromServer } from "../../services/Service_call";

interface ProfileModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const ProfileModal = ({ open, setOpen }: ProfileModalProps) => {
  const [user, setUser] = useState({
    username: "...",
    name: "...",
    nationalCode: "...",
    personelCode: "...",
    mobile: "...",
    email: "...",
  });
  useEffect(() => {
    if (open) {
      getDataFromServer(`${GET_USER_PROFILE}${UserService.getUsername()}`).then((res) => {
        setUser(res);
      });
    }
  }, [open]);
  return (
    <Modal visible={open} setVisible={setOpen} title="پروفایل کاربر">
      <div className="flex flex-col gap-4 text-sm min-w-[20rem]">
        <div className="flex-between-center gap-10">
          <span>نام کاربری </span>
          <span>{user?.username || "..."}</span>
        </div>
        <div className="flex-between-center gap-10">
          <span>نام و نام خانوادگی </span>
          <span>{user?.name || "..."}</span>
        </div>
        <div className="flex-between-center gap-10">
          <span>کدملی </span>
          <span>{user?.nationalCode || "..."}</span>
        </div>
        <div className="flex-between-center gap-10">
          <span>کد پرسنلی </span>
          <span>{user?.personelCode || "..."}</span>
        </div>
        <div className="flex-between-center gap-10">
          <span>موبایل </span>
          <span>{user?.mobile || "..."}</span>
        </div>
        <div className="flex-between-center gap-10">
          <span>ایمیل </span>
          <span>{user?.email || "..."}</span>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
