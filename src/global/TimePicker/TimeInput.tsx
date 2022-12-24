import React from "react";
import {PatternFormat} from "react-number-format";


type PropTime = {
    error?: any;
    label?: string;
    placeholder?: string;
    important?: boolean;
    readOnly?: boolean;
    classNames?: string;
    wrapperClassName?: string;
    format: any;
    name: string;
    onValueChange: any;
    value: any
};


const CustomInput = (props: any) => {
    return <input {...props} style={{direction: "ltr", textAlign: "center"}}
                  className={`w-full appearance-none focus:outline-none focus:shadow-outline ${props.className}   `}/>;
};

const Timeinput = ({
                       wrapperClassName,
                       classNames,
                       readOnly,
                       important,
                       label,
                       error,
                       format,
                       name,
                       onValueChange,
                       value,
                       placeholder
                   }: PropTime) => {
    return (
        <div className={`flex flex-col ${wrapperClassName}`}>
            <div className={`autocompleteWrapper ${classNames} ${error && "border-red"} ${readOnly && "opacity-40"} `}>
                <div className={`autocompleteLabel  ${error && "text-red"} top-[-17px]`}>
                    {label} <span className="text-tomato font-extrabold text-lg h-4">{important ? "*" : " "}</span>
                </div>
                <PatternFormat
                    displayType="input"
                    className={'autocompleteInput text-center '}
                    customInput={CustomInput}
                    format={format}
                    name={name}
                    prefix=""
                    mask=""
                    placeholder={placeholder}
                    onValueChange={onValueChange}
                    value={value}

                />
            </div>
            <p className="text-red text-xs pr-3 h-4 mt-1">{error}</p>
        </div>
    );
};
export default Timeinput

