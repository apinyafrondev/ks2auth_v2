import { createContext } from "react";
interface xContextType{
    ctx_username:string;
    ctx_firstname:string;
    ctx_lastname:string;
}
export const DataUserContext = createContext<xContextType>({ctx_username:"",ctx_firstname:"",ctx_lastname:""});