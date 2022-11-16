import {toast} from "react-toastify"

export const SuccessAlert=(text:string)=>{
    return toast.success(text);
}

export const ErrorAlert=(text:string)=>{
    return toast.error(text);
}

