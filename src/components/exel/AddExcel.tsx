import React, {
  SyntheticEvent,
  FC,
  DragEvent,
  ChangeEvent,
  useRef,
  useState,
} from "react";
interface AddExcelProps {}

const AddExcel: FC<AddExcelProps> = (): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [theFile, setTheFile] = useState<any>();
  const [error, setError] = useState<string>("");
  const [dragActive, setDragActive] = useState<boolean>(false);

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
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (theFile) {
      let bodyFormData = new FormData();
      bodyFormData.append("file", theFile);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div onDragEnter={handleDrag}>
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
              <p className="opacity-40">فایل را در این قسمت بکشید و رها کنید</p>
              <span>یا</span>

              <button
                type="button"
                className="upload-button w-[70%] flex p-[10px] cursor-pointer text-[1rem] bg-[#ef5644] rounded-[10px] text-[white]  hover:bg-orange-800 justify-center"
                onClick={onButtonClick}
              >
                یک فایل آپلود کنید
              </button>
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
        </div>
      </form>
    </>
  );
};

export default AddExcel;
