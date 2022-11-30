import { Button, Dialog } from "@material-tailwind/react";
import axios from "axios";
import React, {
  SyntheticEvent,
  FC,
  DragEvent,
  ChangeEvent,
  useRef,
  useState,
} from "react";
import { GrDocumentPdf, GrFormClose } from "react-icons/gr";
import { toast } from "react-toastify";

import SimpleButton from "../../global/SimpleButton/SimpleButton";
import { postDataHeaderToServer } from "../../services/Service_call";
interface AddExcelProps {
  url?: any;
  fileSampleName?: any;
}

const AddExcel: FC<AddExcelProps> = ({ url, fileSampleName }): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [theFile, setTheFile] = useState<any>();
  const [error, setError] = useState<string>("");
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [IsOpenModal, setIsOpenModal] = useState<boolean>(false);

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
        setError("");
      } else {
        setError("فرمت فایل صحیح نیست");
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setTheFile(e.target.files[0]);
      setError("");
    } else {
      setError("فرمت فایل صحیح نیست");
    }
  };

  const handleClose = () => {
    setTheFile(null);
  };

  const onButtonClick = () => {
    inputRef?.current?.click();
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    const headers = { "Content-Type": "multipart/form-data" };

    e.preventDefault();
    console.log("ssdfsdg");
    if (theFile) {
      let bodyFormData = new FormData();
      bodyFormData.append("file", theFile);
      try {
        axios({
          headers: headers,
          method: "post",
          url: url,
          data: bodyFormData,
        });
        toast.success("اطلاعات مورد نظر اضافه شد ");
        setIsOpenModal(false);
      } catch (error) {}
    }
  };
  return (
    <>
      <SimpleButton
        className=" w-[160px] h-[40px] centering rounded-lg text-black"
        text="افزودن گروهی"
        icon={<GrDocumentPdf color="black" />}
        handelClick={() => setIsOpenModal(!IsOpenModal)}
      />
      <Dialog
        open={IsOpenModal}
        handler={setIsOpenModal}
        className="height-[900px]"
      >
        <button
          className="flex w-[50px] h-[50px]  border-none items-center justify-center"
          onClick={() => setIsOpenModal(false)}
        >
          <GrFormClose />
        </button>
        <div className="w-full flex flex-col justify-center items-center mb-[40px]">
          <div className="flex text-lg font-semibold mt-0">آپلود فایل</div>
          <form
            onSubmit={handleSubmit}
            className="flex justify-center flex-col items-center"
          >
            <div
              className="w-[40rem] h-[20rem] max-w-[100%] text-center relative m-[20px]"
              onDragEnter={handleDrag}
            >
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
                style={{ backgroundColor: dragActive ? "#ffffff" : "#fff9f2" }}
                id="label-file-upload"
                htmlFor="input-file-upload"
                className="h-full flex justify-center items-center	 border-[2px] rounded-[30px] border-solid	 border-[#b1d4fd] "
              >
                <div className="m-2 flex flex-col gap-[10px] items-center   ">
                  <p className="opacity-40">
                    فایل را در این قسمت بکشید و رها کنید
                  </p>
                  <span>یا</span>

                  <Button
                    type="button"
                    className=" shadow-gray-500/20 hover:shadow-lg hover:shadow-gray-500/40 upload-button w-[70%] flex p-[10px] cursor-pointer text-[1rem] bg-[#ef5644] rounded-[10px] text-[white]  hover:bg-orange-800 justify-center"
                    onClick={onButtonClick}
                  >
                    یک فایل آپلود کنید
                  </Button>
                  <span
                    className={`text-[12px] ${
                      theFile ? "text-[blue]" : "text-[red]"
                    }`}
                  >
                    {theFile ? theFile?.name : "فایلی وجود ندارد"}
                  </span>
                  <span>{error && error}</span>
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
            <div className="flex w-[93%] justify-center">
              <div className="flex w-[25%] pt-8 justify-end gap-4">
                <a
                  href={`/assets/sampleFiles/${fileSampleName}`}
                  download={fileSampleName}
                  className="shadow-md shadow-gray-500/20 hover:shadow-lg hover:shadow-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none border-none hover:bg-orange-800 flex  w-full justify-center items-center p-[10px] cursor-pointer bg-[#ef5644] rounded-[10px] text-[white]   justify-center text-[13px] "
                >
                  دانلود قالب فایل
                </a>
              </div>

              <div className="flex w-[75%] pt-8 justify-end gap-4">
                <Button
                  type="submit"
                  className="border-none bg-[#ef5644] w-[30%] text-gray-200  shadow-gray-500/20 hover:shadow-lg hover:shadow-gray-500/40"
                  disabled={theFile ? false : true}
                >
                  افزودن
                  {/* {state.loading && (
						<ClipLoader className="inline-flex items-center" size={24} loading={true} color="#FFF" />
					)} */}
                </Button>
                <Button
                  type="button"
                  className="border-none bg-[#FFF8F0] w-[30%] text-gray-500  shadow-gray-500/20 hover:shadow-lg hover:shadow-gray-500/40"
                  onClick={handleClose}
                >
                  لغو
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default AddExcel;
