import { Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";


interface  PropsData{
    label?:any,
    pholder?:any,
    data:any,
    onSelected:any,
    onChange:any,
}


export default function InputAuto({
                                      label,
                                      pholder,
                                      data,
                                      onSelected,
                                      onChange
                                  }:PropsData) {
    const [suggestions, setSugesstions] = useState([]);
    const [isHideSuggs, setIsHideSuggs] = useState(false);
    const [selectedVal, setSelectedVal] = useState("");

    const handler = (e: { target: { value: any; }; }) => {
        setSugesstions(data.filter((i: string) => i.startsWith(e.target.value)));
    };
    const handleChange = (e: { target: { value: any; }; }) => {
        const input = e.target.value;
        setIsHideSuggs(false);
        setSelectedVal(input);
        onChange(input);
    };

    const hideSuggs = (value: React.SetStateAction<string>) => {
        onSelected(value);
        setSelectedVal(value);
        setIsHideSuggs(true);
    };

    // @ts-ignore
    return (
        <div className='autoComplete relative'  >
                <input
                       // icon={<FiSearch />}
                       type="search"
                       variant="outlined"
                       label={label}
                       value={selectedVal}
                       onChange={handleChange}
                    // @ts-ignore
                       onKeyUp={handler}

                />
                {/*<input*/}
                {/*    placeholder={pholder}*/}
                {/*    type="search"*/}
                {/*    value={selectedVal}*/}
                {/*    onChange={handleChange}*/}
                {/*    // @ts-ignore*/}
                {/*    onKeyUp={handler}*/}
                {/*/>*/}


            <div
                className="suggestions absolute"
                style={{ display: isHideSuggs ? "none" : "block" }}
            >
                {suggestions.map((item, idx) => (
                    <div
                        key={"" + item + idx}
                        onClick={() => {
                            hideSuggs(item);
                        }}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}
