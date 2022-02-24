import axios from "axios";
import { IProject} from "../types/types";


//sends new object from UI and awaits respose 
export const getOneProject= async(projectName:string):Promise<IProject>  =>{ //gives back a promise of  object 
    const result = await axios.post('http://localhost:3001/getOneProject',{  
        body:projectName
    }) //gives back object
    console.log(result.data);
    return result.data;
    }