import {toast} from "react-toastify"

export const SuccessAlert=(text)=>{
    return toast.success(text);
}

export const ErrorAlert=(text)=>{
    return toast.error(text);
}

