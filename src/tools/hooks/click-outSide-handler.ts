import React, { useEffect } from "react";

interface useOnClickOutSideProps {
  ref: React.RefObject<HTMLDivElement>;
  isOpened: boolean;
  setIsOpened: (state: boolean) => void;
}
export const useOnClickOutSide = (ref: React.RefObject<HTMLDivElement>, isOpened: boolean, setIsOpened: (state: boolean) => void) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpened(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, isOpened, setIsOpened]);
};
