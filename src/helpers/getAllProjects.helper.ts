import axios from "axios";
import { IProject, IProjectList } from "../types/types";


//sends new object from UI and awaits respose 
export const getAllProjects= async():Promise<IProject[]>  =>{ //gives back a promise of an array of objects 
    const result = await axios.get<IProject[]>('http://localhost:3001/getAllProjects',{  
    }) //gives back an array of objects
    // console.log(result.data);
    return result.data;
    }