import axios from "axios";
import {
  SyntheticEvent,
  FC,
  DragEvent,
  ChangeEvent,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import Modal from "../../global/Modal/Modal";
import UploadFileIcon from "../../assets/icons/UploadFileIcon";
import SimpleButton from "../../global/SimpleButton/SimpleButton";

interface AddExcelProps {
  excelInfo: any;
  OpenModal: boolean;
  setOpenModal: (value: boolean) => void;
  setUpdate?: () => void;
}

const AddExcel: FC<AddExcelProps> = ({
  excelInfo,
  OpenModal,
  setOpenModal,
  setUpdate,
}): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [theFile, setTheFile] = useState<any>();
  const [dragActive, setDragActive] = useState<boolean>(false);

  const persianResponse: any = {
    Product: "محصول",
    priceList: "نرخ نامه",
    priceListDetails: "مشخصات نرخ نامه",
    service: "سرویس",
    productAttribute: "مشخصات محصول",
    vehicle: "وسیله نقیه",
  };

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if (
        e.dataTransfer.files[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        setTheFile(e.dataTransfer.files[0]);
      } else {
        toast.error("فرمت فایل صحیح نیست");
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setTheFile(e.target.files[0]);
    } else {
      toast.error("فرمت فایل صحیح نیست");
    }
  };

  const handleClear = () => {
    setTheFile(null);
    setOpenModal(false);
  };

  const handleOpenUpload = () => inputRef?.current?.click();

  const handleSubmit = async (e: SyntheticEvent) => {
    const headers = { "Content-Type": "multipart/form-data" };
    e.preventDefault();
    if (theFile) {
      let bodyFormData = new FormData();
      bodyFormData.append("file", theFile);
      try {
        const response = await axios({
          headers: headers,
          method: "post",
          url: process.env.REACT_APP_BASE_URL + excelInfo.url,
          data: bodyFormData,
        });
        toast.success("اطلاعات مورد نظر اضافه شد ");
        setOpenModal(false);
        handleClear();
        setUpdate && setUpdate();
        if (response.status) {
          const convert = Object.entries(response.data.payload).map(
            ([key, value]) =>
              persianResponse[key]
                ? "تعداد" +
                  " " +
                  value +
                  " " +
                  persianResponse[key] +
                  " " +
                  "اضافه شد"
                : ` تعداد ${value} عدد اضافه شد`
          );
            convert.forEach((response) => {
              toast.success(response);
            });
        }
      } catch (error: any) {
        if (error?.response?.status === 406) {
          toast.error(
            error?.response?.data?.errors?.message || "فیلد ها تکراری است "
          );
        }
      }
    }
  };
  return (
    <>
      <Modal visible={OpenModal} setVisible={setOpenModal} title="آپلود فایل">
        <form onSubmit={handleSubmit} className="centering flex-col w-[30rem]">
          <div className="text-center mb-5 w-full" onDragEnter={handleDrag}>
            <input
              accept=".xlsx"
              type="file"
              id="input-file-upload"
              ref={inputRef}
              multiple={true}
              onChange={handleChange}
              className="hidden"
            />
            <label
              id="label-file-upload"
              htmlFor="input-file-upload"
              className={`centering border-2 border-dashed border-tomato  py-3 ${
                dragActive ? "bg-lightTomato" : "bg-light"
              } `}
            >
              <div className="my-4 centering flex-col gap-3  ">
                <UploadFileIcon />
                <p className="text-base text-darkGray leading-7 text-center">
                  فایل را در این قسمت بکشید و رها کنید <br />
                  یا یک
                  <button
                    type="button"
                    className="px-1 text-tomato underline cursor-pointer"
                    onClick={handleOpenUpload}
                  >
                    فایل آپلود
                  </button>
                  کنید
                </p>
                <span className={`my-2 ${theFile ? "text-green" : "text-red"}`}>
                  {theFile ? theFile?.name : "فایلی وجود ندارد"}
                </span>
              </div>
            </label>
            {dragActive && (
              <div
                className="absolute w-full h-full rounded-[1px] top-0	right-0 bottom-0 left-0	"
                id="drag-file-element"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              ></div>
            )}
          </div>
          <div className="flex-between-start w-full">
            <a
              href={require(`../../assets/sample/${excelInfo.fileName}`)}
              download={excelInfo.fileName}
              className="btn px-0 w-fit "
              target={"_blank"}
              rel="noreferrer"
            >
              دانلود قالب فایل
            </a>

            <div className="flex-end-start gap-4">
              <SimpleButton
                className="full-gray-btn"
                text="لغو"
                handelClick={handleClear}
              />
              <SimpleButton
                type="submit"
                text="افزودن"
                disabled={theFile ? false : true}
                className="full-tomato-btn"
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddExcel;
