import { useRef, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { useOnClickOutSide } from "../../tools/hooks/click-outSide-handler";

interface VehiclePelakDrapDownProps {
  list?: Array<string>;
  value: any;
  setValue: any;
  name: string;
}

const VehiclePelakDrapDown = ({ list = [], value, name, setValue }: VehiclePelakDrapDownProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const WrapperRef = useRef(null);
  useOnClickOutSide(WrapperRef, open, setOpen);

  const handleClick = (vl: any) => {
    setOpen(false);
    setValue(name, vl);
  };

  const handleChange = (e: any) => {
    setSearch(e.target.value);
  };

  const listFilter = () => list.filter((l) => l.includes(search));

  return (
    <div className="relative flex-start-center w-12">
      <RiArrowDownSLine size={30} />
      <div ref={WrapperRef}>
        <input className=" w-8 text-center" name="ffa" onFocus={() => setOpen(true)} value={value} onChange={handleChange} />
        {open && (
          <ul className="absolute shadow-md z-50 bg-light w-8 top-7 border">
            {/* <SimpleBar style={{ maxHeight: "10rem" }}> */}
            {listFilter().length !== 0 ? (
              listFilter().map((l) => (
                <li
                  key={l}
                  onClick={() => handleClick(l)}
                  className="px-1 py-1 transition-all duration-700 hover:cursor-pointer hover:bg-light-yellow text-main-grey text-center"
                >
                  {l}
                </li>
              ))
            ) : (
              <p className="py-3 text-center"> نشد</p>
            )}
            {/* </SimpleBar> */}
          </ul>
        )}
      </div>
    </div>
  );
};

export default VehiclePelakDrapDown;
