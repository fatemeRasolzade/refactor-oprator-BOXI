import { ReactNode } from 'react';
import { ActionMeta, SingleValue } from 'react-select';

export interface ChildrenProps {
    children?: ReactNode
   
}

export interface PropState {
    show:boolean,
    setShow:React.Dispatch<React.SetStateAction<boolean>>
}

export interface PropsInput{
    handleChange ?:(e:string)=>string,
    text?:string,
    handelSubmit?:React.FormEventHandler<HTMLFormElement> 
}


export interface PropsSelect{
    handleChange :((newValue: SingleValue<{
        value: string;
        label: string;
    }>, actionMeta: ActionMeta<{
        value: string;
        label: string;
    }>) => void) | undefined,
    text:string,
   
}

export interface PropsModal {
    visible:boolean,
    setVisible:React.Dispatch<React.SetStateAction<boolean>>,
    children:ReactNode,
    width:string,
    height:string
  }