import { FC } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { BiXCircle } from "react-icons/bi";
import CustomizeModal from "../../../../components/PerfesionalSearch/CustomizeModal";


interface ModalPerfetionalProps {
  open: boolean;
  handleOpen?: any;
  columns?: Array<any>;
  searchFilterList: Array<any>;
  selectedCol: Array<any>;
  setSelectedCol: (selectedCol: Array<any>) => void;
  setSearchFilterList: (selectedCol: Array<any>) => void;
}
const ModalPerfetional: FC<ModalPerfetionalProps> = ({
  open,
  handleOpen,
  columns,
  selectedCol,
  searchFilterList,
  setSelectedCol,
  setSearchFilterList,
}) => {
  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size={"md"}
      >
        <DialogHeader>
          <div className="flex-between-center w-full">
            <h6 className="text-sm">شخصی سازی</h6>
            <span
              onClick={() => handleOpen((prev: boolean) => !prev)}
              className="cursor-pointer"
            >
              <BiXCircle size={20} />
            </span>
          </div>
        </DialogHeader>
        <DialogBody divider>
          <CustomizeModal
            columns={columns ? columns : []}
            selectedCol={selectedCol}
            setSelectedCol={setSelectedCol}
            searchFilterList={searchFilterList}
            setSearchFilterList={setSearchFilterList}
          />
        </DialogBody>
        <DialogFooter>
          <Button
            onClick={() => handleOpen((prev: boolean) => !prev)}
            className="ml-2 text-dark bg-lightTomato"
          >
            <span>لغو</span>
          </Button>
          <Button
            onClick={() => handleOpen((prev: boolean) => !prev)}
            className="!bg-tomato text-white"
          >
            <span>ذخیره</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ModalPerfetional;
