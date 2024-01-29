import { createContext} from "react";


export const Context = createContext(localStorage.getItem('data'));
export const weekContext = createContext(localStorage.getItem('week')||'')