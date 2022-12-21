import React from "react";
import NumberFormat from "react-number-format";

const CustomInput = (props) => {
	return <input {...props}  style={{ direction: "ltr", textAlign: "center" }} className={`${props.className} ${props?.readOnly ? 'bg-[#f2f2f2]':''}`} />;
};

export default  (props) => {

	return (
		<NumberFormat
			displayType="input"
			className={`w-full ${props?.readOnly ? 'bg-[#f2f2f2]':'bg-blue-500'}  px-3 py-2 text-base leading-tight text-gray-700 border border-gray-300  appearance-none focus:outline-none focus:shadow-outline placeholder:text-gray-400`}
			customInput={CustomInput}
			{...props}
		/>
	);
};
