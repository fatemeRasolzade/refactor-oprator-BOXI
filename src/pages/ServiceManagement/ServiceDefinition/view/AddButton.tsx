import { useState } from "react";
import { Dialog } from "@material-tailwind/react";
import { GrFormClose } from "react-icons/gr";
import ModalOperation from "../../../../pages/Roles/view/ModalOperation";
import ActionForms from "../../../../pages/ServiceManagement/ServiceDefinition/view/ActionsForm";
interface PropAddButton {
  text?: string;
  subItemOne?: string;
  subItemTwo?: string;
  RightIcon?: JSX.Element;
  LeftIcon?: JSX.Element;
  color?: string;
  textColor?: string;
}

const AddButton = ({
  text = "افزودن",
  subItemOne,
  subItemTwo,
  RightIcon,
  LeftIcon,
  color,
  textColor,
}: PropAddButton) => {
  const [toggle, setToggle] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState(null);
  const handelClick = () => {
    setToggle(false);
    setIsModalOpen(true);
  };

  return (
    <div className="w-160 relative">
      <button className={`btn  full-tomato-btn`} onClick={() => setToggle(!toggle)}>
        <span>{LeftIcon}</span> <span className="text-lg">{text}</span> <span>{RightIcon}</span>
      </button>
      {toggle ? (
        <div className="w-full bg-red  absolute  right-0 shadow-lg rounded-md ">
          <ul>
            <li>
              <button
                className="w-full py-2 px-3 border-none hover:bg-gray-200  text-right "
                onClick={handelClick}
              >
                افزودن
                {/* {subItemOne} */}
              </button>
            </li>
            <li>
              <button className="w-full py-2 px-3 border-none hover:bg-gray-200 text-right" onClick={handelClick}>
                {subItemTwo}
              </button>
            </li>
          </ul>
        </div>
      ) : null}
      <Dialog open={isModalOpen} handler={setIsModalOpen} size={'lg'}>
        <button
          className="flex w-[50px] h-[50px]  border-none items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <GrFormClose />
        </button>
        <div className="p-5">
        <ActionForms />
        </div>
        
      </Dialog>
    </div>
  );
};

export default AddButton;
