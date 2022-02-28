import axios from "axios";
import { IProjectFromBackend} from "../types/types";


//sends new object from UI and awaits respose 
export const getOneProject= async(projectName:string):Promise<IProjectFromBackend>  =>{ //gives back a promise of  object 
    const result= await axios.post<IProjectFromBackend>('http://localhost:3001/getOneProject',{  
        body:projectName
    }) //gives back object
    // console.log('result.data');
    // console.log(result);
    return result.data;
    }