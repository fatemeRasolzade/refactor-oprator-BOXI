import React, { useEffect, useRef, useState } from "react";


const DropButton = ({options}:any) => {

    const myRef = useRef(null);

    const [toggleDrop, setToggleDrop] = useState<boolean>(false);
    const [toggleIcon, setToggleIcon] = useState<boolean>(false);
    useEffect(() => {
        if (!toggleDrop) {
            setToggleIcon(false);
            return;
        }
        function handleClick(event: { target: { type: string; }; }) {
            // @ts-ignore
            if ((toggleDrop && !myRef.current?.contains(event.target)) || event.target.type ==='submit') {
                setToggleDrop(false);
                setToggleIcon(false);
            } else if (toggleDrop) {
                setToggleIcon(!toggleIcon);
            }
        }
        // @ts-ignore
        window.addEventListener("click", handleClick);
        // @ts-ignore
        return () => window.removeEventListener("click", handleClick);
    }, [toggleDrop]);




    return (
        <div className="relative" ref={myRef}>

            <div className="w-160 relative">
                <button className={`btn  full-tomato-btn`} onClick={() => setToggleDrop(!toggleDrop)}>
                    <span>{}</span> <span className="text-lg">افزودن</span> <span>{}</span>
                </button>


            <div
                className={`min-w-[200px]  rounded-lg shadow-gray-400 bg-white absolute top-10 right-0  shadow-lg z-10   ${
                    !toggleDrop ? "hidden" : "inline-block"
                }`}
            >

                {
                   options &&
                    options.map((item:any, index: React.Key | null | undefined) => (
                        <div key={index}>
                            { (
                                <p
                                    className="cursor-pointer px-4 py-2  text-base text-black "
                                    key={index}
                                    onClick={() => {
                                        item.clickSub(item.type);

                                        setToggleDrop(false);
                                    }}
                                >
                                    {item.name}
                                </p>
                            )}
                        </div>
                    ))}
            </div>
        </div>
        </div>
    );
};
export default React.memo(DropButton)
